/* music catalogue: src/data/music.csv is the one table; this module parses it for the site and the audio script */

export const ARTISTS = ['søren', 'rangø', 'sven miesner'];
export const TYPES = ['live', 'single'];
export const COLUMNS = ['id', 'title', 'artist', 'type', 'date', 'venue', 'city', 'source', 'cover'];

// RFC 4180-style: commas, "quoted, fields", "" escapes, CRLF or LF
export function parseCsv(text) {
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(v => v.trim() !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some(v => v.trim() !== '')) rows.push(row);
  return rows;
}

// returns { tracks, errors }; a row with an error is left out
export function readCatalogue(text) {
  const [head, ...body] = parseCsv(text);
  const cols = head.map(h => h.trim().toLowerCase());
  const missing = COLUMNS.filter(c => c !== 'cover' && !cols.includes(c));
  if (missing.length) return { tracks: [], errors: ['music.csv: missing column(s) ' + missing.join(', ')] };
  const tracks = [], errors = [], seen = new Set();
  body.forEach((vals, n) => {
    const r = {};
    cols.forEach((c, i) => { r[c] = (vals[i] || '').trim(); });
    const line = 'music.csv line ' + (n + 2) + ': ';
    if (!/^[a-z0-9][a-z0-9-]*$/.test(r.id)) return errors.push(line + 'id must be lowercase a-z, 0-9 and "-" (got "' + r.id + '")');
    if (seen.has(r.id)) return errors.push(line + 'duplicate id "' + r.id + '"');
    if (!ARTISTS.includes(r.artist)) return errors.push(line + 'artist must be one of ' + ARTISTS.join(' / ') + ' (got "' + r.artist + '")');
    if (!TYPES.includes(r.type)) return errors.push(line + 'type must be ' + TYPES.join(' or ') + ' (got "' + r.type + '")');
    if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(r.date)) return errors.push(line + 'date must be YYYY, YYYY-MM or YYYY-MM-DD (got "' + r.date + '")');
    if (!r.title) return errors.push(line + 'title is empty');
    if (!r.source) return errors.push(line + 'source is empty');
    seen.add(r.id);
    tracks.push({ ...r, year: +r.date.slice(0, 4) });
  });
  // newest first; same date keeps table order
  tracks.sort((a, b) => b.date.localeCompare(a.date));
  return { tracks, errors };
}

export function place(t) { return [t.venue, t.city].filter(Boolean).join(', '); }

export function fmtTime(s) {
  s = Math.max(0, Math.floor(s || 0));
  const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = String(s % 60).padStart(2, '0');
  return h ? h + ':' + String(m).padStart(2, '0') + ':' + ss : m + ':' + ss;
}

// "41:20", "1:02:03", "2480" or "2480s" -> seconds
export function parseTime(v) {
  if (!v) return 0;
  if (/^\d+s?$/.test(v)) return parseInt(v, 10);
  const p = v.split(':').map(Number);
  if (p.some(isNaN)) return 0;
  return p.reduce((a, x) => a * 60 + x, 0);
}
