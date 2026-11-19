// «De la casa»: los tres productos que llevan el nombre del café, en formato revista.
// El primero va en grande (a la izquierda) y los otros dos más pequeños, apilados a la derecha.
// Con mouse, al pasar sobre una foto hace zoom suave y aparece la descripción; en celular la descripción se ve siempre.
import { NEGOCIO, PRODUCTOS } from '../../datos'
import Encabezado from '../../compartido/Encabezado'
import Revelar from '../../compartido/Revelar'
import { cop, img } from '../../compartido/utilidades'
import './DeLaCasa.css'

// Foto de cada producto de la casa (están en public/images/sabores/). `pos` ajusta qué parte de la foto se ve al recortar.
// Si un producto no tiene foto aquí, la tarjeta muestra su ícono de siempre.
const FOTOS: Record<string, { ruta: string; alt: string; pos: string }> = {
  'Capuchino Semilla de Amor': { ruta: 'images/sabores/duo-capuchino-wafles.jpg', alt: 'Capuchino con arte de corazón y mini wafles', pos: 'center 40%' },
  'Latte Semilla de Amor': { ruta: 'images/sabores/duo-latte-arepa.jpg', alt: 'Latte en taza rosada con arepa de plátano maduro', pos: 'center 45%' },
  'Granizado Semilla de Amor': { ruta: 'images/sabores/duo-granizados.jpg', alt: 'Dos granizados de café con el logo de la casa y un miniwafle', pos: 'center 90%' },
}

export default function DeLaCasa() {
  return (
    <section><div className="wrap">
      <Encabezado etiqueta="De la casa">Los que llevan <em>nuestro nombre</em></Encabezado>
      <div className="picks">
        {NEGOCIO.HOUSE.map((h, k) => {
          const it = PRODUCTOS.find(i => i.n === h.n)
          if (!it) return null
          const foto = FOTOS[it.n]
          const clases = 'pick' + (foto ? ' con-foto' : '') + (k === 0 ? ' grande' : '')
          return (
            <Revelar como="article" className={clases} retraso={k * 0.14} key={h.n}>
              {foto
                ? <img className="foto" src={img(foto.ruta)} alt={foto.alt} loading="lazy" style={{ objectPosition: foto.pos }} />
                : <div className="circ" dangerouslySetInnerHTML={{ __html: h.icon }} />}
              <div className="velo">
                <small>{it.g}</small>
                <h3>{it.n}</h3>
                <span className="p">{cop(it.p)}</span>
                {/* Descripción y enlace: con mouse aparecen al pasar encima o al enfocar con el teclado */}
                <div className="extra"><div>
                  {it.d && <p className="desc">{it.d}</p>}
                  <a className="ver" href="#menu">Ver en la carta →</a>
                </div></div>
              </div>
            </Revelar>
          )
        })}
      </div>
    </div></section>
  )
}
