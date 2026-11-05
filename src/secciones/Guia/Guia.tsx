// «¿Cómo elegir tu café ideal?»: cada pregunta recomienda un café del catálogo
import { CAFES, GUIA } from '../../datos'
import Encabezado from '../../compartido/Encabezado'
import Revelar from '../../compartido/Revelar'
import { pedido } from '../../compartido/pedidoStore'
import { irA, reducirMovimiento, vars } from '../../compartido/utilidades'
import './Guia.css'

function verFicha(id: string) {
  irA('catalogo')
  const fila = document.getElementById('rail'), tarjeta = document.getElementById('cafe-' + id)
  if (fila && tarjeta) fila.scrollTo({ left: tarjeta.offsetLeft - fila.offsetLeft, behavior: reducirMovimiento ? 'auto' : 'smooth' })
}

export default function Guia() {
  return (
    <section id="guia"><div className="wrap">
      <Encabezado etiqueta="Guía rápida" texto="Cuéntanos qué sabores te gustan y te decimos cuál es para ti.">¿Cómo elegir tu <em>café ideal?</em></Encabezado>
      <div className="guia">
        {GUIA.map((g, k) => {
          const p = CAFES.find(c => c.id === g.id)
          if (!p) return null
          return (
            <Revelar como="article" className="guia-card" retraso={(k % 3) * 0.1} style={vars({ '--c': p.band })} key={g.id + k}>
              <p className="q">{g.pregunta}</p>
              <p>{g.texto}</p>
              <h3>{p.name}</h3>
              <div className="gb">
                <button className="btn ghost" type="button" onClick={() => verFicha(p.id)}>Ver ficha</button>
                <button className="btn" type="button" onClick={() => { pedido.agregar(p.id); irA('pedido') }}>Agregar al pedido</button>
              </div>
            </Revelar>
          )
        })}
      </div>
    </div></section>
  )
}
