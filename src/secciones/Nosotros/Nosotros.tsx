// «Sobre nosotros»: la historia del café y el logo grande
import Revelar from '../../compartido/Revelar'
import { img, LOGO } from '../../compartido/utilidades'
import './Nosotros.css'

export default function Nosotros() {
  return (
    <section className="band"><div className="wrap about">
      <Revelar>
        <p className="kicker">Sobre nosotros</p>
        <h2 style={{ marginBlock: '.5rem 1.2rem' }}>Un rincón cafetero en el <em>corazón de Popayán</em></h2>
        <p>Semilla de Amor Café es una cafetería dedicada a resaltar la riqueza cafetera del departamento del Cauca. Ofrece café de especialidad preparado con granos seleccionados de pequeños productores locales.</p>
        <p>Además de la experiencia en tienda, comercializa café verde de alta calidad para exportación, como puente entre los caficultores del Cauca y el mundo.</p>
        <div className="tags"><span>Café verde de especialidad</span><span>Natural, honey y suave lavado</span><span>Registro Invima</span></div>
      </Revelar>
      <Revelar como="img" className="logo-big" retraso={0.15} src={img(LOGO)} alt="Logo Semilla de Amor Café, desde 2022" />
    </div></section>
  )
}
