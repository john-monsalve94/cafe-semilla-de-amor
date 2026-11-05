// «De la casa»: los tres productos que llevan el nombre del café
import { NEGOCIO, PRODUCTOS } from '../../datos'
import Encabezado from '../../compartido/Encabezado'
import Revelar from '../../compartido/Revelar'
import { cop } from '../../compartido/utilidades'
import './DeLaCasa.css'

export default function DeLaCasa() {
  return (
    <section><div className="wrap">
      <Encabezado etiqueta="De la casa">Los que llevan <em>nuestro nombre</em></Encabezado>
      <div className="picks">
        {NEGOCIO.HOUSE.map((h, k) => {
          const it = PRODUCTOS.find(i => i.n === h.n)
          if (!it) return null
          return (
            <Revelar como="article" className="pick" retraso={k * 0.12} key={h.n}>
              <div className="circ" dangerouslySetInnerHTML={{ __html: h.icon }} />
              <div><small>{it.g}</small><h3>{it.n}</h3></div>
              <span className="p">{cop(it.p)}</span>
            </Revelar>
          )
        })}
      </div>
    </div></section>
  )
}
