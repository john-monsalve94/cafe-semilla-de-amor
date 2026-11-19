// Portada: foto de fondo (public/images/marca/portada.webp), logo, texto y botones centrados.
// Para cambiar la foto, reemplaza ese archivo (ideal: menos de 400 KB y el centro despejado).
import { useEffect, useState } from 'react'
import { estadoAbierto } from '../../compartido/horario'
import { img, LOGO } from '../../compartido/utilidades'
import './Portada.css'

export default function Portada() {
  const [estado, setEstado] = useState(estadoAbierto())
  useEffect(() => { const t = setInterval(() => setEstado(estadoAbierto()), 60000); return () => clearInterval(t) }, [])

  return (
    <section className="hero">
      {/* Arte decorativo: no lleva texto, solo adorna */}
      <img className="arte" src={img('images/marca/fondo.webp')} alt="" aria-hidden="true" />

      <span className={'status' + (estado.abierto ? ' open' : '')} aria-live="polite"><span className="dot" /><span>{estado.texto}</span></span>

      <div className="wrap">
        <div className="badge-wrap">
          <svg viewBox="0 0 460 460" role="img" aria-label="Insignia de Café Semilla de Amor, desde 2022">
            <g className="ring">
              <path id="ringPath" d="M230,230 m-190,0 a190,190 0 1,1 380,0 a190,190 0 1,1 -380,0" fill="none" />
              <text className="ring-text"><textPath href="#ringPath" textLength="1180" lengthAdjust="spacing">CAFÉ DE ESPECIALIDAD · POPAYÁN · CAUCA · DESDE 2022 · CAFÉ DE ORIGEN ·</textPath></text>
            </g>
            <circle cx="230" cy="230" r="142" fill="#fff" />
            <circle cx="230" cy="230" r="150" fill="none" stroke="#E7C777" strokeWidth="3" />
            <image href={img(LOGO)} x="102" y="102" width="256" height="256" />
          </svg>
        </div>
        
        <p className="lead">Café de especialidad del Cauca, preparado en el centro de Popayán desde 2022. Cafés filtrados, capuchinos de la casa y café en bolsa para llevar.</p>
        <div className="cta"><a className="btn gold" href="#menu">Ver la carta</a><a className="btn" href="#pedido">Pedir café en bolsa</a></div>
        
      </div>
    </section>
  )
}
