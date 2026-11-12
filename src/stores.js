// The 14 Belotti centres, transcribed from each centre's page on
// belottiotticaudito.ch (address, phone, e-mail, hours, services).
// Coordinates are street-level approximations used only to sort by distance
// and draw the schematic map — directions go to Google Maps by address.
//
// hours: [days, open, close]; days use JS getDay() numbers (0 = Sunday).
import { SITE } from './data.js';

export const STORE_BOOKING = 'https://zfrmz.eu/4V1ZSIuqC7qZHQ2SmQa2';

const WEEK = [1, 2, 3, 4, 5];
const SAT = [6];
const ALL = [0, 1, 2, 3, 4, 5, 6];
const STD = (satClose = '17:00') => [[WEEK, '09:00', '18:30'], [SAT, '09:00', satClose]];
const FULL = ['eyeExam', 'licence', 'contacts', 'hearingSolution', 'avs', 'hearingTest'];

export const STORES = [
  { id: 'lugano', name: 'Lugano', region: 'sottoceneri', street: 'Via Nassa, 19', zip: '6900', city: 'Lugano', phone: '+41 91 921 08 08', email: 'lugano@belottiotticaudito.ch', hours: STD('18:00'), services: FULL, lat: 46.0031, lng: 8.9505, path: '/lugano' },
  { id: 'cassarate', name: 'Lugano Cassarate', region: 'sottoceneri', street: 'Via delle Scuole, 10', zip: '6900', city: 'Lugano-Cassarate', phone: '+41 91 972 10 22', email: 'cassarate@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 46.0062, lng: 8.9652, path: '/cassarate' },
  { id: 'molino-nuovo', name: 'Lugano Molino Nuovo', region: 'sottoceneri', street: 'Via Trevano, 38', zip: '6900', city: 'Lugano', phone: '+41 91 971 09 84', email: 'molinonuovo@belottiotticaudito.ch', hours: [[WEEK, '09:00', '12:30'], [WEEK, '13:30', '18:30']], services: FULL, lat: 46.0132, lng: 8.9553, path: '/molino-nuovo' },
  { id: 'paradiso', name: 'Lugano Paradiso', region: 'sottoceneri', street: 'Viale San Salvatore, 11/A', zip: '6900', city: 'Paradiso', phone: '+41 91 980 02 22', email: 'paradiso@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 45.9893, lng: 8.9462, path: '/Lugano-paradiso' },
  { id: 'agno', name: 'Agno', region: 'sottoceneri', street: 'Via Lugano, 8', zip: '6982', city: 'Agno', phone: '+41 91 966 07 60', email: 'agno@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 46.0012, lng: 8.9043, path: '/agno' },
  { id: 'chiasso', name: 'Chiasso', region: 'sottoceneri', street: 'Corso San Gottardo, 23', zip: '6830', city: 'Chiasso', phone: '+41 91 682 93 63', email: 'chiasso@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 45.8339, lng: 9.0306, path: '/chiasso' },
  { id: 'mendrisio', name: 'Mendrisio', region: 'sottoceneri', street: 'Via Lavizzari, 25', zip: '6850', city: 'Mendrisio', phone: '+41 91 646 85 58', email: 'mendrisio@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 45.8705, lng: 8.9818, path: '/mendrisio' },
  { id: 'foxtown', name: 'FoxTown', region: 'sottoceneri', street: 'Via A. Maspoli, 18', zip: '6850', city: 'Mendrisio', phone: '+41 91 646 30 31', email: 'foxtown@belottiotticaudito.ch', hours: [[ALL, '11:00', '19:00']], services: ['eyeExam', 'licence', 'contacts'], lat: 45.8617, lng: 8.9946, path: '/foxTown' },
  { id: 'bellinzona', name: 'Bellinzona', region: 'sopraceneri', street: 'Piazza Nosetto, 3', zip: '6500', city: 'Bellinzona', phone: '+41 91 825 81 83', email: 'bellinzona@belottiotticaudito.ch', hours: [[WEEK, '08:30', '18:30'], [SAT, '08:30', '18:00']], services: FULL, lat: 46.1927, lng: 9.0206, path: '/bellinzona' },
  { id: 'castione', name: 'Castione', region: 'sopraceneri', kind: 'hq', street: 'Via Retica, 2', zip: '6532', city: 'Castione-Arbedo', phone: '+41 91 820 02 20', email: null, hours: [[WEEK, '08:00', '17:30']], services: [], lat: 46.2226, lng: 9.0435, path: '/castione' },
  { id: 'biasca', name: 'Biasca', region: 'sopraceneri', street: 'Via Lucomagno, 3', zip: '6710', city: 'Biasca', phone: '+41 91 862 45 75', email: 'biasca@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 46.3593, lng: 8.9706, path: '/biasca' },
  { id: 'locarno', name: 'Locarno', region: 'sopraceneri', street: 'Piazza Grande, 14', zip: '6600', city: 'Locarno', phone: '+41 91 760 07 40', email: 'locarno@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 46.1693, lng: 8.7955, path: '/locarno' },
  { id: 'ascona', name: 'Ascona', region: 'sopraceneri', street: 'Piazza Giuseppe Motta, 3', zip: '6612', city: 'Ascona', phone: '+41 91 792 11 77', email: 'ascona@belottiotticaudito.ch', hours: STD(), services: FULL, lat: 46.1547, lng: 8.7724, path: '/ascona' },
  { id: 'mobile', name: 'Centro mobile', nameKey: 'stores.mobileName', region: 'mobile', kind: 'mobile', street: 'Via Retica, 2', zip: '6532', city: 'Castione', phone: '079 861 58 54', email: 'prevenzione@belottiotticaudito.ch', hours: null, services: [], lat: null, lng: null, path: '/centro-mobile' },
].map((s) => ({ ...s, url: SITE + s.path }));

export const telHref = (phone) => 'tel:' + (phone.startsWith('+') ? phone.replace(/\s/g, '') : '+41' + phone.replace(/\s/g, '').slice(1));

export const mapsHref = (s) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`Belotti OtticaUdito, ${s.street}, ${s.zip} ${s.city}`);

// Current wall-clock time in Ticino, independent of the visitor's timezone.
function zurichNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zurich', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
const toMin = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));

// { state: 'open' | 'closed' | 'onRequest', until?, next? }
export function openStatus(store, date) {
  if (!store.hours) return { state: 'onRequest' };
  const { day, minutes } = zurichNow(date);
  for (const [days, o, c] of store.hours) {
    if (days.includes(day) && minutes >= toMin(o) && minutes < toMin(c)) return { state: 'open', until: c };
  }
  // Next opening: later today, otherwise the following days.
  for (let d = 0; d < 7; d++) {
    const wd = (day + d) % 7;
    const spans = store.hours.filter(([days]) => days.includes(wd)).sort((a, b) => toMin(a[1]) - toMin(b[1]));
    for (const [, o] of spans) {
      if (d > 0 || toMin(o) > minutes) return { state: 'closed', next: { day: wd, time: o, today: d === 0, tomorrow: d === 1 } };
    }
  }
  return { state: 'closed' };
}

// Great-circle distance in km.
export function distanceKm(a, b) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// schema.org openingHoursSpecification for JSON-LD.
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const hoursSpec = (store) =>
  (store.hours || []).map(([days, opens, closes]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days.map((d) => `https://schema.org/${DAY_NAMES[d]}`),
    opens,
    closes,
  }));
