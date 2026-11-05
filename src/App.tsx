// La página completa. Cada línea es una sección: para quitar una, borra su línea (y su import).
// Para agregar una nueva, crea su carpeta en src/secciones/ y ponla aquí en el orden que quieras.
import Simbolos from './compartido/Simbolos'
import Cabecera from './secciones/Cabecera/Cabecera'
import Portada from './secciones/Portada/Portada'
import Cinta from './secciones/Cinta/Cinta'
import Recorrido from './secciones/Recorrido/Recorrido'
import Cifras from './secciones/Cifras/Cifras'
import DeLaCasa from './secciones/DeLaCasa/DeLaCasa'
import Nosotros from './secciones/Nosotros/Nosotros'
import Catalogo from './secciones/Catalogo/Catalogo'
import Guia from './secciones/Guia/Guia'
import Pedido from './secciones/Pedido/Pedido'
import Carta from './secciones/Carta/Carta'
import Sabores from './secciones/Sabores/Sabores'
import Talleres from './secciones/Talleres/Talleres'
import Galeria from './secciones/Galeria/Galeria'
import Visitanos from './secciones/Visitanos/Visitanos'
import Pie from './secciones/Pie/Pie'
import Chat from './secciones/Chat/Chat'

export default function App() {
  return (
    <>
      <Simbolos />
      <Cabecera />
      <main id="inicio">
        <Portada />
        <Cinta />
        <Recorrido />
        <Cifras />
        <DeLaCasa />
        <Nosotros />
        <Catalogo />
        <Guia />
        <Pedido />
        <Carta />
        <Sabores />
        <Talleres />
        <Galeria />
        <Visitanos />
      </main>
      <Pie />
      <Chat />
    </>
  )
}
