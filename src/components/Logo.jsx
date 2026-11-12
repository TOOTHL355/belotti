import { useId } from 'react';
import { LOGO_PATHS } from './logoPaths.js';

/**
 * BELOTTI — Since 1988.
 * The "O" is a lens/iris: a gradient ring (amber → plum → teal, the three
 * campaign colours) around a pupil with a catch-light, wrapped by a thin
 * sound arc — vision and hearing in one mark. All lettering is outlined
 * (logoPaths.js), so the mark needs no web font and never shifts.
 */
export default function Logo({ variant = 'dark', className = '', title = 'Belotti OtticaUdito — Since 1988' }) {
  const light = variant === 'light';
  const ink = light ? '#ffffff' : '#17131f';
  const sub = light ? 'rgba(255,255,255,.72)' : '#6b5b7b';
  const id = useId().replace(/:/g, '');

  return (
    <svg className={className} viewBox="0 0 530 96" role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9a24f" />
          <stop offset=".5" stopColor="#7b3fa0" />
          <stop offset="1" stopColor="#1fa69a" />
        </linearGradient>
        <radialGradient id={`${id}i`} cx=".42" cy=".4" r=".7">
          <stop offset="0" stopColor="#c08be0" />
          <stop offset=".55" stopColor="#5b2a85" />
          <stop offset="1" stopColor="#2a1640" />
        </radialGradient>
      </defs>
      <path d={LOGO_PATHS.bel} fill={ink} />
      <g transform="translate(160 45)">
        <circle r="26" fill="none" stroke={`url(#${id}r)`} strokeWidth="11" />
        <circle r="12.5" fill={`url(#${id}i)`} />
        <circle r="5" fill={light ? '#17131f' : '#0d0912'} />
        <circle cx="-4.5" cy="-5" r="2.6" fill="#fff" opacity=".95" />
        <path d="M33 -16 A36 36 0 0 1 33 16" fill="none" stroke="#1fa69a" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d={LOGO_PATHS.tti} fill={ink} />
      <line x1="326" y1="12" x2="326" y2="86" stroke={ink} strokeOpacity=".35" strokeWidth="1.5" />
      <path d={LOGO_PATHS.since} fill={ink} />
      <path d={LOGO_PATHS.tag} fill={sub} />
    </svg>
  );
}
