// Carrusel reutilizable: diapositivas, puntos, flechas, deslizar con el dedo y avance automático
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { reducirMovimiento } from './utilidades'

interface Props { diapositivas: ReactNode[]; auto?: number; className?: string; etiqueta?: string }

export default function Carrusel({ diapositivas, auto, className = '', etiqueta = 'Galería' }: Props) {
  const n = diapositivas.length
  const [i, setI] = useState(0)
  const [pausa, setPausa] = useState(false)
  const x0 = useRef<number | null>(null)
  const ir = useCallback((k: number) => setI((k + n) % n), [n])

  // Avance automático: se detiene con el mouse encima, con el foco dentro o si la pestaña está oculta
  useEffect(() => {
    if (!auto || reducirMovimiento || pausa) return
    const t = setInterval(() => { if (!document.hidden) setI(v => (v + 1) % n) }, auto)
    return () => clearInterval(t)
  }, [auto, pausa, n, i])

  return (
    <div className={'car ' + className} aria-roledescription="carrusel" aria-label={etiqueta}
      onMouseEnter={() => setPausa(true)} onMouseLeave={() => setPausa(false)} onFocus={() => setPausa(true)} onBlur={() => setPausa(false)}
      onKeyDown={e => { if (e.key === 'ArrowLeft') ir(i - 1); if (e.key === 'ArrowRight') ir(i + 1) }}
      onPointerDown={e => { x0.current = e.clientX }}
      onPointerUp={e => { if (x0.current !== null && Math.abs(e.clientX - x0.current) > 50) ir(i + (e.clientX < x0.current ? 1 : -1)); x0.current = null }}>
      <div className="slides" style={{ transform: `translateX(${-100 * i}%)` }}>
        {diapositivas.map((d, k) => (
          <figure className="slide" key={k} role="group" aria-roledescription="diapositiva" aria-label={`${k + 1} de ${n}`} aria-hidden={k !== i}>{d}</figure>
        ))}
      </div>
      <button className="car-btn prev" type="button" aria-label="Anterior" onClick={() => ir(i - 1)}>&#8249;</button>
      <button className="car-btn next" type="button" aria-label="Siguiente" onClick={() => ir(i + 1)}>&#8250;</button>
      <div className="car-foot"><div className="dots">
        {diapositivas.map((_, k) => <button key={k} type="button" aria-label={`Ir a la diapositiva ${k + 1}`} aria-current={k === i} onClick={() => ir(k)} />)}
      </div></div>
    </div>
  )
}
