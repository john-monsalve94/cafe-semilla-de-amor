// Dibujos SVG que se reutilizan en varias secciones (granos, bolsa y logo)
import { img, LOGO } from './utilidades'

export default function Simbolos() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="bean" viewBox="0 0 40 24"><ellipse cx="20" cy="12" rx="18" ry="10.5" fill="#4B3621" /><path d="M3 14 Q20 6 37 10" stroke="#2A1D12" fill="none" strokeWidth="2.2" strokeLinecap="round" /></symbol>
        <symbol id="beanl" viewBox="0 0 40 24"><ellipse cx="20" cy="12" rx="18" ry="10.5" fill="#7A2430" /><path d="M3 14 Q20 6 37 10" stroke="#F4E7E8" fill="none" strokeWidth="2.2" strokeLinecap="round" /></symbol>
        <symbol id="logoSym" viewBox="0 0 100 100"><image href={img(LOGO)} width="100" height="100" /></symbol>
        <symbol id="bag" viewBox="0 0 120 150">
          <path d="M22 30 H98 L106 138 Q106 146 98 146 H22 Q14 146 14 138 Z" fill="#fff" stroke="#58111A" strokeWidth="2" />
          <path d="M22 30 H98 L99 42 H21 Z" fill="#EADBD6" />
          <use href="#logoSym" x="35" y="52" width="50" height="50" />
          <rect x="22" y="108" width="76" height="24" rx="3" style={{ fill: 'var(--band,#58111A)' }} />
        </symbol>
      </defs>
    </svg>
  )
}
