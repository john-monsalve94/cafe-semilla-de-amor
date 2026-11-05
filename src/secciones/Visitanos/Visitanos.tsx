// «Visítanos»: horario, dirección, teléfonos y enlaces
import { NEGOCIO } from '../../datos'
import Encabezado from '../../compartido/Encabezado'
import Revelar from '../../compartido/Revelar'
import { ahoraBogota, fmtH } from '../../compartido/horario'
import './Visitanos.css'

export default function Visitanos() {
  const { dia } = ahoraBogota()
  return (
    <section className="band" id="visitanos"><div className="wrap">
      <Encabezado etiqueta="Te esperamos">Visítanos en <em>Popayán</em></Encabezado>
      <div className="visit">
        <Revelar className="vcard">
          <h3>Horario</h3>
          <table className="hours" aria-label="Horario de atención"><tbody>
            {[1, 2, 3, 4, 5, 6, 0].map(d => {
              const h = NEGOCIO.HOURS[d]
              return <tr key={d} className={d === dia ? 'today' : ''}><td>{NEGOCIO.DAYS[d]}</td><td>{h ? `${fmtH(h[0])} a ${fmtH(h[1])}` : 'Cerrado'}</td></tr>
            })}
          </tbody></table>
          <p className="note" style={{ marginTop: '.7rem' }}>Domingo: por confirmar.</p>
        </Revelar>
        <Revelar className="vcard" retraso={0.12}>
          <h3>Cómo encontrarnos</h3>
          <div className="vlist">
            <div><b>Dirección</b>Carrera Octava #3-77, centro de Popayán, Cauca</div>
            <div><b>Pedidos</b>313 582 7664 · 313 605 6922</div>
            <div><b>Instagram</b><a href="https://www.instagram.com/semilladeamorcafe/" target="_blank" rel="noopener noreferrer">@semilladeamorcafe</a></div>
            <div><span className="rate">4,5 de 5 en Google Maps · 22 reseñas</span></div>
            <div><a className="btn" href="https://www.google.com/maps/search/?api=1&query=Semilla+de+Amor+Caf%C3%A9+Especial+Popay%C3%A1n" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>Abrir en Google Maps</a></div>
          </div>
        </Revelar>
      </div>
    </div></section>
  )
}
