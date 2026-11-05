// Pie de página
import './Pie.css'

export default function Pie() {
  return (
    <footer><div className="wrap">
      <div className="foot-cols">
        <div><b>Semilla de Amor Café</b>Tienda de café de especialidad.<br />Café de productores caucanos.</div>
        <div><b>Horario</b>Lunes a viernes 8:30 a. m. a 7:30 p. m.<br />Sábado 11 a. m. a 7 p. m.</div>
        <div><b>Contacto</b>Pedidos: 313 582 7664 · 313 605 6922<br />Carrera Octava #3-77, Popayán<br /><a href="https://www.instagram.com/semilladeamorcafe/" target="_blank" rel="noopener noreferrer">@semilladeamorcafe</a></div>
      </div>
      <div className="wordmark" aria-hidden="true">Semilla de Amor</div>
    </div></footer>
  )
}
