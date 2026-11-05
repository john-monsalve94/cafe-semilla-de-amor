// «De nuestra cocina»: mosaico de fotos (las fotos y sus textos están en datos/sabores.json)
import { SABORES } from '../../datos'
import Encabezado from '../../compartido/Encabezado'
import { img } from '../../compartido/utilidades'
import './Sabores.css'

export default function Sabores() {
  return (
    <section className="band" id="sabores"><div className="wrap">
      <Encabezado etiqueta="De nuestra cocina">Para <em>acompañar tu café</em></Encabezado>
      <ul className="sabores">
        {SABORES.map(s => (
          <li key={s.img}><figure><img src={img(s.img)} alt={s.texto} loading="lazy" width={300} height={300} /><figcaption>{s.texto}</figcaption></figure></li>
        ))}
      </ul>
    </div></section>
  )
}
