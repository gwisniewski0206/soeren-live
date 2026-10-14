/* build-time view of the catalogue for the Astro pages: only recordings whose audio has been built */
import CSV from '../data/music.csv?raw';
import AINFO from '../data/audio.json';
import { readCatalogue, place, fmtTime } from './music.js';

const { tracks, errors } = readCatalogue(CSV);
if (errors.length) throw new Error(errors.join('\n'));
export const RECORDINGS = tracks.filter(t => AINFO[t.id]).map(t => ({ ...t, duration: AINFO[t.id].duration }));
export const line = t => t.title + ' — ' + t.artist + (place(t) ? ', ' + place(t) : '') + ' · ' + t.year + ' · ' + fmtTime(t.duration);
export const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
