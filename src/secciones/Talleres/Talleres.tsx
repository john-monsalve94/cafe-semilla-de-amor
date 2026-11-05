// Talleres de café y formulario de reserva (la solicitud se envía por WhatsApp)
import { useRef, useState, type FormEvent } from 'react'
import { MENU, NEGOCIO } from '../../datos'
import { cop, irA } from '../../compartido/utilidades'
import './Talleres.css'

const TALLERES = Object.values(MENU['Talleres'])[0]
const SUBTITULO: Record<string, string> = { 'Taller de introducción al café (individual)': 'Individual', 'Taller de tueste de café': 'Aprende a tostar' }
const TITULO: Record<string, string> = { 'Taller de introducción al café (individual)': 'Introducción al café' }

export default function Talleres() {
  const hoy = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' })
  const [que, setQue] = useState('Mesa')
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState(hoy)
  const [hora, setHora] = useState('16:00')
  const [personas, setPersonas] = useState('2')
  const [aviso, setAviso] = useState('')
  const campoNombre = useRef<HTMLInputElement>(null)

  const reservar = (taller: string) => {
    setQue(taller)
    irA('reservas', { block: 'center' })
    setTimeout(() => campoNombre.current?.focus({ preventScroll: true }), 400)
  }
  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const txt = `Hola, quiero reservar ${que.toLowerCase()} a nombre de ${nombre}, ${personas} persona(s), el ${fecha} a las ${hora}.`
    setAviso('Te abrimos WhatsApp para enviar tu solicitud al café.')
    window.open(`https://wa.me/${NEGOCIO.PHONE}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener')
  }

  return (
    <section className="tall" id="talleres"><div className="wrap">
      <div>
        <p className="kicker" style={{ color: 'var(--gold-soft)' }}>Talleres</p>
        <h2 style={{ marginTop: '.4rem' }}>Aprende de <em>café</em></h2>
        <p className="intro">Dos experiencias para vivir el café de cerca: aprende a probarlo y a tostarlo, guiado por el equipo de Semilla de Amor.</p>
        {TALLERES.map(([nombreTaller, precio]) => (
          <div className="taller" key={nombreTaller}>
            <div><h3>{TITULO[nombreTaller] ?? nombreTaller}</h3><small>{SUBTITULO[nombreTaller]}</small></div>
            <span className="pr">{cop(precio).replace('$', '$ ')}</span>
            <button className="btn gold" type="button" onClick={() => reservar(nombreTaller)}>Reservar</button>
          </div>
        ))}
      </div>
      <div className="card" id="reservas">
        <h3>Reserva tu lugar</h3>
        <form className="res" onSubmit={enviar}>
          <label htmlFor="r-what">¿Qué quieres reservar?
            <select id="r-what" value={que} onChange={e => setQue(e.target.value)}>
              <option>Mesa</option>{TALLERES.map(([t]) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label htmlFor="r-name">Nombre<input id="r-name" ref={campoNombre} required autoComplete="name" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)} /></label>
          <div className="row2">
            <label htmlFor="r-date">Fecha<input id="r-date" type="date" required min={hoy} value={fecha} onChange={e => setFecha(e.target.value)} /></label>
            <label htmlFor="r-time">Hora<input id="r-time" type="time" required value={hora} onChange={e => setHora(e.target.value)} /></label>
          </div>
          <label htmlFor="r-people">Personas
            <select id="r-people" value={personas} onChange={e => setPersonas(e.target.value)}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}</select>
          </label>
          <button className="btn" type="submit">Enviar solicitud</button>
        </form>
        {aviso && <div className="msg">{aviso}</div>}
      </div>
    </div></section>
  )
}
