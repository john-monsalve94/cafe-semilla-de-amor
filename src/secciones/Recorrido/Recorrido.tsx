// «De la semilla a tu taza»: cuatro pasos ilustrados que se dibujan al aparecer
import Encabezado from '../../compartido/Encabezado'
import Revelar from '../../compartido/Revelar'
import './Recorrido.css'

export default function Recorrido() {
  const paso = (n: number, titulo: string, texto: string, icono: React.ReactNode) => (
    <Revelar como="article" className="step" extra="go" retraso={(n - 1) * 0.12}>
      {icono}
      <p className="num">Paso {n}</p><h3>{titulo}</h3><p>{texto}</p>
    </Revelar>
  )
  return (
    <section id="historia"><div className="wrap">
      <Encabezado etiqueta="Nuestro recorrido" texto="Somos un puente entre los caficultores del Cauca y quienes disfrutan un buen café, con prácticas sostenibles y comercio justo.">De la <em>semilla</em> a tu taza</Encabezado>
      <div className="steps" style={{ position: 'relative' }}>
        <span className="traveler" aria-hidden="true"><svg viewBox="0 0 40 24"><use href="#bean" /></svg></span>
        {paso(1, 'Semilla', 'Nace en fincas de pequeños productores del Cauca.',
          <svg className="ico" viewBox="0 0 120 120" role="img" aria-label="Una semilla germinando"><circle className="bg" cx="60" cy="60" r="56" /><path pathLength="1" d="M30 88 Q60 74 90 88" /><path pathLength="1" d="M60 80 V50" /><path pathLength="1" d="M60 60 C44 60 36 48 38 36 C52 36 60 46 60 60" /><path className="acc" pathLength="1" d="M60 52 C76 52 84 40 82 28 C68 28 60 38 60 52" /></svg>)}
        {paso(2, 'Cereza', 'Se cosecha y se procesa: natural, honey o suave lavado.',
          <svg className="ico" viewBox="0 0 120 120" role="img" aria-label="Rama con cerezas de café"><circle className="bg" cx="60" cy="60" r="56" /><path pathLength="1" d="M22 42 Q60 28 98 50" /><path pathLength="1" d="M50 38 V64" /><path pathLength="1" d="M74 44 V68" /><circle className="fillw" cx="50" cy="74" r="10" /><circle className="fillw" cx="74" cy="78" r="10" /><path className="acc" pathLength="1" d="M28 46 C32 30 50 26 62 32 C54 42 42 48 28 46" /></svg>)}
        {paso(3, 'Tueste', 'Café tostado de especialidad, con perfiles de aroma y sabor para descubrir.',
          <svg className="ico" viewBox="0 0 120 120" role="img" aria-label="Grano de café con calor"><circle className="bg" cx="60" cy="60" r="56" /><ellipse pathLength="1" cx="60" cy="66" rx="22" ry="32" transform="rotate(35 60 66)" /><path pathLength="1" d="M46 44 C66 58 52 72 74 88" /><path className="acc" pathLength="1" d="M34 40 C28 34 38 30 32 22" /><path className="acc" pathLength="1" d="M88 40 C82 34 92 30 86 22" /></svg>)}
        {paso(4, 'Taza', 'La preparamos en filtrados, espresso y capuchinos, o te la llevas en bolsa.',
          <svg className="ico" viewBox="0 0 120 120" role="img" aria-label="Taza de café humeante"><circle className="bg" cx="60" cy="60" r="56" /><path pathLength="1" d="M32 58 H88 V72 C88 90 76 100 60 100 C44 100 32 90 32 72 Z" /><path pathLength="1" d="M88 64 C102 64 102 84 86 86" /><path className="acc steam" pathLength="1" d="M48 46 C42 38 54 34 48 24" style={{ strokeDasharray: 'none' }} /><path className="acc steam b" pathLength="1" d="M68 46 C62 38 74 34 68 24" style={{ strokeDasharray: 'none' }} /></svg>)}
      </div>
    </div></section>
  )
}
