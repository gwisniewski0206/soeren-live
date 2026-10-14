#!/usr/bin/env node
/* npm run audio [-- --force] [-- <id> ...]
   For every row in src/data/music.csv: audio-src/<source>  ->  public/audio/<id>/index.m3u8 + 6 s segments,
   and duration + waveform peaks into src/data/audio.json (both committed; audio-src/ is not). */
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { readCatalogue } from '../src/lib/music.js';

const ROOT = new URL('..', import.meta.url).pathname;
const CSV = join(ROOT, 'src/data/music.csv'), OUT_JSON = join(ROOT, 'src/data/audio.json');
const SRC = join(ROOT, 'audio-src'), OUT = join(ROOT, 'public/audio');
const BITRATE = '160k', SEGMENT_S = 6, PEAKS = 400;

const args = process.argv.slice(2), force = args.includes('--force'), only = args.filter(a => !a.startsWith('--'));
const run = (cmd, a, opts = {}) => {
  const r = spawnSync(cmd, a, { maxBuffer: 1 << 30, ...opts });
  if (r.error) throw new Error(cmd + ' not found — install ffmpeg (brew install ffmpeg)');
  if (r.status !== 0) throw new Error(cmd + ' failed:\n' + String(r.stderr).split('\n').slice(-8).join('\n'));
  return r.stdout;
};

const { tracks, errors } = readCatalogue(readFileSync(CSV, 'utf8'));
errors.forEach(e => console.error('✗ ' + e));
const info = existsSync(OUT_JSON) ? JSON.parse(readFileSync(OUT_JSON, 'utf8')) : {};
let built = 0, kept = 0, missing = 0;

for (const t of tracks) {
  if (only.length && !only.includes(t.id)) continue;
  const src = join(SRC, t.source), dir = join(OUT, t.id), m3u8 = join(dir, 'index.m3u8');
  if (!existsSync(src)) {
    if (existsSync(m3u8) && info[t.id]) { kept++; continue; }
    console.warn('… ' + t.id + ': no master at audio-src/' + t.source + ' — left off the site until it exists');
    missing++; continue;
  }
  if (!force && existsSync(m3u8) && info[t.id] && statSync(m3u8).mtimeMs >= statSync(src).mtimeMs) { kept++; continue; }

  process.stdout.write('▸ ' + t.id + ' … ');
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  // version tag in segment names: a re-encoded master gets new URLs, so segments can be cached as immutable
  const st = statSync(src), v = createHash('sha1').update(st.size + ':' + st.mtimeMs + ':' + BITRATE).digest('hex').slice(0, 8);
  run('ffmpeg', ['-v', 'error', '-y', '-i', src, '-vn', '-map_metadata', '-1', '-ac', '2', '-ar', '44100', '-c:a', 'aac', '-b:a', BITRATE,
    '-f', 'hls', '-hls_time', String(SEGMENT_S), '-hls_playlist_type', 'vod', '-hls_flags', 'independent_segments',
    '-hls_segment_filename', join(dir, v + '-%04d.ts'), m3u8]);

  const duration = parseFloat(String(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src])));
  // waveform: mono 2 kHz PCM, RMS loudness per slice (peaks saturate on mastered music), scaled to the loudest slice
  const pcm = run('ffmpeg', ['-v', 'error', '-i', src, '-ac', '1', '-ar', '2000', '-f', 's16le', '-']);
  const n = pcm.length >> 1, per = Math.max(1, Math.floor(n / PEAKS)), raw = [];
  for (let b = 0; b < PEAKS; b++) {
    let s = 0, c = 0; const end = Math.min(n, (b + 1) * per);
    for (let i = b * per; i < end; i++) { const v = pcm.readInt16LE(i * 2); s += v * v; c++; }
    raw.push(c ? Math.sqrt(s / c) : 0);
  }
  const top = Math.max(1, ...raw);
  info[t.id] = { duration: Math.round(duration * 10) / 10, peaks: raw.map(v => Math.max(4, Math.round(Math.pow(v / top, 1.4) * 100))) };
  const segs = readdirSync(dir).filter(f => f.endsWith('.ts')).length;
  console.log(Math.round(duration) + ' s, ' + segs + ' segments');
  built++;
}

// drop data for rows that left the table; report orphan folders (not deleted — your call)
const ids = new Set(tracks.map(t => t.id));
for (const k of Object.keys(info)) if (!ids.has(k)) delete info[k];
if (existsSync(OUT)) for (const d of readdirSync(OUT)) if (!ids.has(d)) console.warn('… public/audio/' + d + ' is not in music.csv any more — delete it if it should go');

const sorted = Object.fromEntries(Object.keys(info).sort().map(k => [k, info[k]]));
writeFileSync(OUT_JSON, JSON.stringify(sorted, null, 0).replace(/\},"/g, '},\n"') + '\n');
console.log('done: ' + built + ' built, ' + kept + ' unchanged, ' + missing + ' without master' + (errors.length ? ', ' + errors.length + ' table error(s)' : ''));
if (errors.length) process.exitCode = 1;
