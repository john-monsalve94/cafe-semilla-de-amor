// Galería de fotos e ilustraciones con carrusel
import Encabezado from '../../compartido/Encabezado'
import Carrusel from '../../compartido/Carrusel'
import { img, imgAbsoluta, vars } from '../../compartido/utilidades'
import './Galeria.css'

/** Corazón dibujado con granos de café */
function CorazonDeGranos() {
  const granos: JSX.Element[] = []
  ;([[1, 26], [.72, 18], [.44, 10]] as const).forEach(([s, n]) => {
    for (let k = 0; k < n; k++) {
      const t = k / n * 2 * Math.PI
      const x = 16 * Math.pow(Math.sin(t), 3), y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
      const px = 200 + x * s * 10.5, py = 190 + y * s * 10.5 + 10
      granos.push(<use key={`${s}-${k}`} href="#beanl" x={(px - 18).toFixed(1)} y={(py - 11).toFixed(1)} width="36" height="22" transform={`rotate(${(k * 47) % 90 - 45} ${px.toFixed(1)} ${py.toFixed(1)})`} />)
    }
  })
  return <svg viewBox="0 0 400 400" role="img" aria-label="Corazón hecho de granos de café"><g className="spin">{granos}</g></svg>
}

function Cata() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Ilustración de una cata de café"><ellipse cx="200" cy="330" rx="180" ry="16" fill="#000" opacity=".25" />
      <g className="bob"><rect x="60" y="214" width="120" height="86" rx="6" fill="#fff" /><path d="M76 238 H164 M76 256 H150 M76 274 H158" stroke="#e9e3e4" strokeWidth="3" strokeLinecap="round" /><circle cx="148" cy="236" r="14" fill="#F4E7E8" /><path d="M148 236 L148 224 A12 12 0 0 1 158 242Z" fill="#B8913A" /></g>
      <path d="M215 250 H300 V276 C300 304 280 318 258 318 C236 318 215 304 215 276Z" fill="#fff" /><ellipse cx="258" cy="250" rx="42" ry="9" fill="#F4E7E8" /><ellipse cx="258" cy="251" rx="36" ry="6" fill="#4B3621" /><path d="M300 262 C322 262 322 292 298 294" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
      <path d="M300 250 H360 V270 C360 292 345 302 330 302 C315 302 300 292 300 270Z" fill="#F4E7E8" /><ellipse cx="330" cy="250" rx="30" ry="7" fill="#fff" /><ellipse cx="330" cy="251" rx="25" ry="4.5" fill="#4B3621" />
      <path className="steam" d="M250 232 C244 220 258 214 252 202" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" /><path className="steam b" d="M330 234 C324 222 338 216 332 204" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" />
      <rect x="40" y="318" width="320" height="12" rx="6" fill="#B8913A" /></svg>
  )
}

/** Una diapositiva con foto de fondo difuminado */
const Foto = ({ ruta, texto }: { ruta: string; texto: string }) => (
  <>
    <div className="stage" style={vars({ '--img': `url('${imgAbsoluta(ruta)}')` })}><img src={img(ruta)} alt={texto} /></div>
    <figcaption>{texto}</figcaption>
  </>
)
const Dibujo = ({ children, texto }: { children: React.ReactNode; texto: string }) => (
  <><div className="stage">{children}</div><figcaption>{texto}</figcaption></>
)

export default function Galeria() {
  return (
    <section><div className="wrap">
      <Encabezado etiqueta="Galería">Nuestra <em>casa y nuestro café</em></Encabezado>
      <Carrusel className="gal" auto={5200} diapositivas={[
        <Foto ruta="images/casa/fachada.jpg" texto="Nuestra casa en el centro de Popayán" />,
        <Dibujo texto="Talleres de cata y de tueste"><Cata /></Dibujo>,
        <Foto ruta="images/casa/cerezas.jpg" texto="Cerezas de café recién cosechadas" />,
        <Dibujo texto="Con semilla de amor"><CorazonDeGranos /></Dibujo>,
      ]} />
    </div></section>
  )
}
