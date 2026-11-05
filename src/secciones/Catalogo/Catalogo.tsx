// Catálogo de cafés en bolsa: tarjetas en una fila que se desliza
import { useRef } from 'react'
import { CAFES } from '../../datos'
import Encabezado from '../../compartido/Encabezado'
import { pedido } from '../../compartido/pedidoStore'
import { cop, img, irA, reducirMovimiento, vars } from '../../compartido/utilidades'
import './Catalogo.css'

export default function Catalogo() {
  const fila = useRef<HTMLDivElement>(null)
  const mover = (px: number) => fila.current?.scrollBy({ left: px, behavior: reducirMovimiento ? 'auto' : 'smooth' })

  return (
    <section id="catalogo"><div className="wrap">
      <Encabezado etiqueta="Café en bolsa" texto="Seis cafés de origen Cauca, cada uno con su perfil. Desliza o usa las flechas.">Catálogo de <em>cafés especiales</em></Encabezado>
      <div className="rail-wrap">
        <button className="rail-btn prev" type="button" aria-label="Anteriores" onClick={() => mover(-330)}>&#8249;</button>
        <div className="rail" id="rail" ref={fila} tabIndex={0} aria-label="Catálogo de cafés">
          {CAFES.map(p => (
            <article className="cafe-card" id={'cafe-' + p.id} key={p.id}>
              <div className="cafe-art">
                <span className="chip">{p.chip}</span>
                {p.img
                  ? <img className="etiqueta" src={img(p.img)} alt={`Etiqueta del café ${p.name}`} loading="lazy" />
                  : <svg viewBox="0 0 120 150" role="img" aria-label={`Bolsa de café ${p.name}`} style={vars({ '--band': p.band })}><use href="#bag" /></svg>}
              </div>
              <div className="cafe-body">
                <h3>{p.name}</h3><p className="proc">{p.process}</p>
                <div className="notes">{p.notas.map(n => <span key={n}>{n}</span>)}</div>
                <dl>
                  <div><dt>Aroma: </dt><dd>{p.aroma}</dd></div>
                  {p.acidez && <div><dt>Acidez: </dt><dd>{p.acidez}</dd></div>}
                </dl>
                <div className="sizes">{Object.entries(p.prices).map(([s, v]) => <span key={s}>{s} g · {cop(v)}</span>)}</div>
                <button className="btn" type="button" onClick={() => { pedido.agregar(p.id); irA('pedido') }}>Agregar al pedido</button>
              </div>
            </article>
          ))}
        </div>
        <button className="rail-btn next" type="button" aria-label="Siguientes" onClick={() => mover(330)}>&#8250;</button>
      </div>
    </div></section>
  )
}
