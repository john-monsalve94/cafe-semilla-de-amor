// Asistente de chat: botón flotante y ventana con preguntas rápidas
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { responder } from './respuestas'
import './Chat.css'

interface Mensaje { de: 'me' | 'bot'; texto: string }
const RAPIDAS = ['¿Qué notas tiene el Geisha?', '¿Cuánto vale el V60?', '¿A qué hora cierran?']

export default function Chat() {
  const [abierto, setAbierto] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([{ de: 'bot', texto: '¡Hola! Soy el asistente de Semilla de Amor. Puedo contarte precios, perfiles de café, talleres y cómo pedir.' }])
  const [texto, setTexto] = useState('')
  const log = useRef<HTMLDivElement>(null)
  const campo = useRef<HTMLInputElement>(null)

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }) }, [mensajes])
  useEffect(() => { if (abierto) campo.current?.focus() }, [abierto])

  const preguntar = (q: string) => {
    setMensajes(m => [...m, { de: 'me', texto: q }])
    setTimeout(() => setMensajes(m => [...m, { de: 'bot', texto: responder(q) }]), 250)
  }
  const enviar = (e: FormEvent) => { e.preventDefault(); const v = texto.trim(); if (v) { preguntar(v); setTexto('') } }

  return (
    <>
      <button className="btn chat-fab" type="button" aria-expanded={abierto} aria-controls="chat" onClick={() => setAbierto(!abierto)}>Pregúntanos</button>
      <div className="chat" id="chat" hidden={!abierto} role="dialog" aria-label="Asistente del café">
        <header><div>Asistente de Semilla de Amor</div><button type="button" aria-label="Cerrar chat" onClick={() => setAbierto(false)}>&times;</button></header>
        <div className="log" ref={log} aria-live="polite">{mensajes.map((m, i) => <div key={i} className={'bubble ' + m.de}>{m.texto}</div>)}</div>
        <div className="quick">{RAPIDAS.map(q => <button key={q} type="button" onClick={() => preguntar(q)}>{q}</button>)}</div>
        <form onSubmit={enviar}>
          <input ref={campo} aria-label="Escribe tu pregunta" placeholder="¿Qué notas tiene el Geisha?" autoComplete="off" value={texto} onChange={e => setTexto(e.target.value)} />
          <button className="btn" type="submit">Enviar</button>
        </form>
      </div>
    </>
  )
}
