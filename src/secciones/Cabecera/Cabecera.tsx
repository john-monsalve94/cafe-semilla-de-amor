// Barra superior: logo, menú, barra de progreso de lectura y menú móvil
import { useEffect, useState } from 'react'
import { img, LOGO } from '../../compartido/utilidades'
import './Cabecera.css'

const ENLACES = [['historia', 'Historia'], ['catalogo', 'Catálogo'], ['pedido', 'Pedido'], ['menu', 'Carta'], ['talleres', 'Talleres'], ['visitanos', 'Visítanos']]

export default function Cabecera() {
  const [abierto, setAbierto] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [activo, setActivo] = useState('')

  // Barra de progreso: cuánto de la página llevas leído
  useEffect(() => {
    const f = () => { const h = document.documentElement.scrollHeight - innerHeight; setProgreso(h > 0 ? Math.min(100, scrollY / h * 100) : 0) }
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  // Resalta en el menú la sección que estás viendo (solo las que existan en la página)
  useEffect(() => {
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActivo(e.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    ENLACES.forEach(([id]) => { const s = document.getElementById(id); if (s) o.observe(s) })
    return () => o.disconnect()
  }, [])

  return (
    <header className="top">
      <div className="wrap">
        <a className="brand" href="#inicio"><img src={img(LOGO)} alt="Logo Café Semilla de Amor" /><b>Semilla<br />de Amor Café</b></a>
        <nav className={'main' + (abierto ? ' open' : '')} aria-label="Principal" onClick={e => { if ((e.target as HTMLElement).closest('a')) setAbierto(false) }}>
          {ENLACES.map(([id, texto]) => <a key={id} href={'#' + id} aria-current={activo === id}>{texto}</a>)}
        </nav>
        <button className="nav-toggle" type="button" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>Menú</button>
      </div>
      <div className="progress" aria-hidden="true" style={{ width: progreso + '%' }} />
    </header>
  )
}
