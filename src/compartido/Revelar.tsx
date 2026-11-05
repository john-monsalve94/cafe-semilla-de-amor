// Hace que un bloque aparezca con una animación suave al entrar en pantalla
import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react'
import { reducirMovimiento } from './utilidades'

interface Props {
  como?: ElementType
  className?: string
  retraso?: number        // segundos de espera antes de animar
  extra?: string          // clases que se agregan al aparecer, además de «in»
  style?: CSSProperties
  children?: ReactNode
  [otro: string]: unknown
}

export default function Revelar({ como: Etiqueta = 'div', className = '', retraso, extra = '', style, children, ...resto }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visto, setVisto] = useState(false)

  useEffect(() => {
    if (reducirMovimiento || !ref.current) return
    const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { setVisto(true); o.disconnect() } }, { threshold: 0.15 })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  const s = (retraso !== undefined ? { ...style, '--d': retraso + 's' } : style) as CSSProperties
  return <Etiqueta ref={ref} className={`rv ${className} ${visto ? 'in ' + extra : ''}`.trim()} style={s} {...resto}>{children}</Etiqueta>
}
