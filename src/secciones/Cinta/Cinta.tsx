// Cinta de textos que se desplaza sola bajo la portada
import './Cinta.css'

const TEXTOS = ['Café de especialidad', 'Origen Cauca', 'Geisha', 'Bourbon Rosado', 'Capuchino Semilla de Amor', 'Filtrados V60 y Chemex', 'Talleres de cata', 'Desde 2022']

export default function Cinta() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq">
        {/* se repite dos veces para que el movimiento no tenga saltos */}
        {[0, 1].map(v => TEXTOS.map(t => <span key={v + t}>{t}<svg viewBox="0 0 40 24" aria-hidden="true"><use href="#beanl" /></svg></span>))}
      </div>
    </div>
  )
}
