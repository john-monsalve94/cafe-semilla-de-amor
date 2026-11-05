// Portada: estado «abierto ahora», título, insignia giratoria y granos flotantes
import { useEffect, useRef, useState } from 'react'
import { estadoAbierto } from '../../compartido/horario'
import { img, imgAbsoluta, LOGO, reducirMovimiento, vars } from '../../compartido/utilidades'
import './Portada.css'

const GRANOS: [string, number, string, string][] = [
  ['#beanl', 1.4, 'left:2%;top:10%;width:62px', ''], ['#bean', 2.2, 'right:0;top:22%;width:48px', ''],
  ['#bean', 1.8, 'left:8%;bottom:8%;width:54px', ''], ['#beanl', 2.6, 'right:6%;bottom:2%;width:70px', ''], ['#bean', 1, 'left:46%;top:-2%;width:40px', ''],
]
const pos = (s: string) => Object.fromEntries(s.split(';').map(p => { const [k, v] = p.split(':'); return [k, v] }))

export default function Portada() {
  const [estado, setEstado] = useState(estadoAbierto())
  const ref = useRef<HTMLElement>(null)

  useEffect(() => { const t = setInterval(() => setEstado(estadoAbierto()), 60000); return () => clearInterval(t) }, [])

  // Los granos flotantes se mueven un poco con el mouse
  const mover = (e: React.PointerEvent) => {
    if (reducirMovimiento || !matchMedia('(pointer:fine)').matches || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
    ref.current.querySelectorAll<HTMLElement>('.fl').forEach(f => { const d = Number(f.dataset.depth || 1); f.style.transform = `translate(${(x * d * 26).toFixed(1)}px,${(y * d * 26).toFixed(1)}px)` })
  }

  return (
    <section className="hero" ref={ref} onPointerMove={mover} style={vars({ '--beans': `url("${imgAbsoluta('images/marca/granos.jpg')}")` })}>
      <div className="wrap">
        <div>
          <span className={'status' + (estado.abierto ? ' open' : '')} aria-live="polite"><span className="dot" /><span>{estado.texto}</span></span>
          <h1>De la <em>semilla</em> a la taza, con amor.</h1>
          <p className="lead">Café de especialidad del Cauca, preparado en el centro de Popayán desde 2022. Cafés filtrados, capuchinos de la casa y café en bolsa para llevar.</p>
          <div className="cta"><a className="btn gold" href="#menu">Ver la carta</a><a className="btn line" href="#pedido">Pedir café en bolsa</a></div>
          <p className="mini">Carrera Octava #3-77 · Popayán, Cauca</p>
        </div>
        <div className="badge-wrap">
          <svg viewBox="0 0 460 460" role="img" aria-label="Insignia de Semilla de Amor Café, desde 2022">
            <g className="ring">
              <path id="ringPath" d="M230,230 m-190,0 a190,190 0 1,1 380,0 a190,190 0 1,1 -380,0" fill="none" />
              <text className="ring-text"><textPath href="#ringPath" textLength="1180" lengthAdjust="spacing">CAFÉ DE ESPECIALIDAD · POPAYÁN · CAUCA · DESDE 2022 · CAFÉ DE ORIGEN ·</textPath></text>
            </g>
            <circle cx="230" cy="230" r="142" fill="#fff" />
            <circle cx="230" cy="230" r="150" fill="none" stroke="#E7C777" strokeWidth="3" />
            <image href={img(LOGO)} x="102" y="102" width="256" height="256" />
          </svg>
          {GRANOS.map(([g, prof, estilo], i) => (
            <div key={i} className="fl" data-depth={prof} style={pos(estilo)}><svg viewBox="0 0 40 24" aria-hidden="true"><use href={g} /></svg></div>
          ))}
        </div>
      </div>
    </section>
  )
}
