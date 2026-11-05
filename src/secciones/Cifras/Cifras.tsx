// Cuatro cifras que cuentan desde 0 cuando aparecen en pantalla
import { useEffect, useRef, useState } from 'react'
import { TOTAL_CARTA } from '../../datos'
import { reducirMovimiento } from '../../compartido/utilidades'
import './Cifras.css'

function Numero({ fin }: { fin: number }) {
  const ref = useRef<HTMLElement>(null)
  const [n, setN] = useState(fin)
  useEffect(() => {
    if (reducirMovimiento || !ref.current) return
    setN(0)
    const o = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return
      o.disconnect()
      const t0 = performance.now()
      const paso = (ahora: number) => { const k = Math.min(1, (ahora - t0) / 1200); setN(Math.round(fin * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(paso) }
      requestAnimationFrame(paso)
    }, { threshold: .6 })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [fin])
  return <b ref={ref}>{n}</b>
}

export default function Cifras() {
  return (
    <section className="stats"><div className="wrap">
      <div className="stat"><b>2022</b><span>año en que abrimos en Popayán</span></div>
      <div className="stat"><Numero fin={4} /><span>cafés de origen en el catálogo</span></div>
      <div className="stat"><Numero fin={3} /><span>municipios del Cauca: Popayán, Piendamó y Tambo</span></div>
      <div className="stat"><Numero fin={TOTAL_CARTA} /><span>productos en la carta</span></div>
    </div></section>
  )
}
