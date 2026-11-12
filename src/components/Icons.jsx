const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const Arrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Chevron = (p) => (
  <svg {...base} width={14} height={14} {...p}><path d="M6 9l6 6 6-6" /></svg>
);
export const Menu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const Close = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Pin = (p) => (
  <svg {...base} width={16} height={16} {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const Check = (p) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export const Pause = (p) => (
  <svg {...base} width={16} height={16} {...p}><path d="M9 6v12M15 6v12" /></svg>
);
export const Play = (p) => (
  <svg {...base} width={16} height={16} {...p}><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
);
export const Phone = (p) => (
  <svg {...base} width={16} height={16} {...p}><path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 006.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 01-1.6 1.5A16.5 16.5 0 013.5 5.6 1.5 1.5 0 015 4z" /></svg>
);
export const Route = (p) => (
  <svg {...base} width={16} height={16} {...p}><path d="M12 2.8l8.4 8.4a1.1 1.1 0 010 1.6L12 21.2a1.1 1.1 0 01-1.6 0L2.8 12.8a1.1 1.1 0 010-1.6L11.2 2.8a1.1 1.1 0 01.8 0z" /><path d="M9.5 13.5v-2a1.5 1.5 0 011.5-1.5h4M13 8l2 2-2 2" /></svg>
);
export const Calendar = (p) => (
  <svg {...base} width={16} height={16} {...p}><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>
);
export const Locate = (p) => (
  <svg {...base} width={18} height={18} {...p}><circle cx="12" cy="12" r="6.5" /><circle cx="12" cy="12" r="2" fill="currentColor" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" /></svg>
);
export const Search = (p) => (
  <svg {...base} width={18} height={18} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
);
export const External = (p) => (
  <svg {...base} width={14} height={14} {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0116.5 20h-11A1.5 1.5 0 014 18.5v-11A1.5 1.5 0 015.5 6H10" /></svg>
);

export const Social = {
  Instagram: () => (
    <svg {...base}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" /></svg>
  ),
  TikTok: () => (
    <svg {...base}><path d="M14 3.5v11.2a3.8 3.8 0 11-3.8-3.8" /><path d="M14 3.5c.4 2.8 2.3 4.6 5 4.8" /></svg>
  ),
  Facebook: () => (
    <svg {...base}><path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0011 8.5V11H8.5v3.5H11V21h3.5v-6.5H17l.5-3.5h-3V9a.5.5 0 01.5-.5z" /></svg>
  ),
  LinkedIn: () => (
    <svg {...base}><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V16M8 7.8v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" /></svg>
  ),
  YouTube: () => (
    <svg {...base}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10.2 9.2l4.8 2.8-4.8 2.8z" fill="currentColor" /></svg>
  ),
  WhatsApp: () => (
    <svg {...base}><path d="M4 20l1.3-4A8.3 8.3 0 1112 20.3a8.4 8.4 0 01-4-1z" /><path d="M9 8.6c0 3.3 3 6.4 6.4 6.4l.9-1.6-1.9-.9-.9.8a5 5 0 01-2.8-2.8l.8-.9-.9-1.9z" fill="currentColor" stroke="none" /></svg>
  ),
};
