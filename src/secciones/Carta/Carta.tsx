// La carta de la cafetería: pestañas por categoría y buscador
import { useState } from 'react'
import { MENU, PRODUCTOS } from '../../datos'
import type { ItemCarta } from '../../datos/tipos'
import Encabezado from '../../compartido/Encabezado'
import { cop, norm } from '../../compartido/utilidades'
import './Carta.css'

const Item = ([n, p, d]: ItemCarta) => (
  <li className="item" key={n}><span className="name">{n}{d && <small>{d}</small>}</span><span className="dots" /><span className="price">{cop(p)}</span></li>
)

export default function Carta() {
  const pestañas = Object.keys(MENU)
  const [tab, setTab] = useState(pestañas[0])
  const [q, setQ] = useState('')
  const buscado = q.trim()

  // Con búsqueda: resultados agrupados. Sin búsqueda: los grupos de la pestaña elegida.
  let grupos: [string, ItemCarta[]][]
  if (buscado) {
    const por: Record<string, ItemCarta[]> = {}
    PRODUCTOS.filter(i => !i.cafe && norm(i.n).includes(norm(buscado))).forEach(h => (por[h.g] ||= []).push([h.n, h.p, h.d]))
    grupos = Object.entries(por)
  } else grupos = Object.entries(MENU[tab])
  const hay = grupos.reduce((a, [, l]) => a + l.length, 0)

  return (
    <section id="menu"><div className="wrap">
      <Encabezado etiqueta="La carta" texto="Precios en pesos colombianos.">Para <em>tomar y compartir</em></Encabezado>
      <div className="menu-layout">
        <div className="menu-side">
          <label htmlFor="q">Buscar en la carta
            <input id="q" type="search" placeholder="Ej. capuchino, V60, arepa" autoComplete="off" value={q} onChange={e => setQ(e.target.value)} />
          </label>
          <div className="tabs" role="tablist">
            {pestañas.map(k => <button type="button" role="tab" key={k} aria-selected={k === tab} onClick={() => { setTab(k); setQ('') }}>{k}</button>)}
          </div>
        </div>
        <div>
          {buscado && <p className="res-count">{hay ? `${hay} resultado(s) para "${buscado}"` : `Sin resultados para "${buscado}". Prueba con otra palabra.`}</p>}
          <div className="groups">
            {grupos.map(([g, lista]) => <div className="group" key={g}><h3>{g}</h3><ul>{lista.map(Item)}</ul></div>)}
          </div>
        </div>
      </div>
    </div></section>
  )
}
