// Calculadora de pedido: elige variedad, tamaño y cantidad y lo envía por WhatsApp con el total
import { CAFES, NEGOCIO } from '../../datos'
import Encabezado from '../../compartido/Encabezado'
import { pedido, usePedido } from '../../compartido/pedidoStore'
import { cop, img, LOGO } from '../../compartido/utilidades'
import './Pedido.css'

const cafe = (id: string) => CAFES.find(c => c.id === id)!

export default function Pedido() {
  const filas = usePedido()
  const lineas = filas.map(f => ({ txt: `${f.qty} × ${cafe(f.id).name} ${f.size} g`, sub: cafe(f.id).prices[f.size] * f.qty }))
  const total = lineas.reduce((a, l) => a + l.sub, 0)
  const mensaje = 'Hola, quiero hacer este pedido:\n' + lineas.map(l => `- ${l.txt}`).join('\n') + `\nTotal estimado: ${cop(total)}`

  return (
    <section className="band" id="pedido"><div className="wrap">
      <Encabezado etiqueta="Pídelo desde casa" texto="Elige variedad, tamaño y cantidad. Ves el total al instante y lo envías por WhatsApp.">Arma tu <em>pedido</em></Encabezado>
      <div className="order-grid">
        <div>
          <div>
            {filas.map((f, k) => (
              <div className="row" key={k}>
                <label htmlFor={`o-p${k}`}>Variedad
                  <select id={`o-p${k}`} value={f.id} onChange={e => pedido.cambiar(k, { id: e.target.value })}>
                    {CAFES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </label>
                <label htmlFor={`o-s${k}`}>Tamaño
                  <select id={`o-s${k}`} value={f.size} onChange={e => pedido.cambiar(k, { size: Number(e.target.value) })}>
                    {Object.keys(cafe(f.id).prices).map(s => <option key={s} value={s}>{s} g</option>)}
                  </select>
                </label>
                <label htmlFor={`o-q${k}`}>Cantidad
                  <input id={`o-q${k}`} type="number" min={1} max={50} value={f.qty} onChange={e => pedido.cambiar(k, { qty: Math.max(1, Math.min(50, Number(e.target.value) || 1)) })} />
                </label>
                <button className="btn ghost del" type="button" disabled={filas.length === 1} onClick={() => pedido.quitar(k)}>Quitar</button>
              </div>
            ))}
          </div>
          <button className="btn ghost" type="button" onClick={() => pedido.agregar('tambo')}>+ Agregar otra variedad</button>
        </div>
        <aside className="ticket" aria-live="polite">
          <div className="t-head"><img src={img(LOGO)} alt="" /><div><b>Tu pedido</b><small>Café Semilla de Amor</small></div></div>
          <div>
            <ul>{lineas.map((l, i) => <li key={i}><span>{l.txt}</span><span>{cop(l.sub)}</span></li>)}</ul>
            <div className="sum"><span>Total estimado</span><span>{cop(total)}</span></div>
            <small className="fine">Precios de la carta. No incluye envío; se confirma por WhatsApp.</small>
          </div>
          <a className="btn" href={`https://wa.me/${NEGOCIO.PHONE}?text=${encodeURIComponent(mensaje)}`} target="_blank" rel="noopener noreferrer">Enviar por WhatsApp</a>
        </aside>
      </div>
    </div></section>
  )
}
