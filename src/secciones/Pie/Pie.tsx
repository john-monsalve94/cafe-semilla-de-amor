// Pie de página
import './Pie.css'
import { FaInstagram} from 'react-icons/fa'
import { AiFillTikTok } from "react-icons/ai";
export default function Pie() {
  return (
    <footer><div className="wrap">
      <div className="foot-cols">
        <div><b>Café Semilla de Amor</b>Tienda de café de especialidad.<br />Café de productores caucanos.</div>
        <div><b>Horario</b>Lunes a viernes 8:30 a. m. a 7:30 p. m.<br />Sábado 11 a. m. a 7 p. m.</div>
        <div><b>Contacto</b>Pedidos: 313 582 7664 · 313 605 6922<br />Carrera Octava #3-77, Popayán<br /></div>
      </div>
      <div style={{display:'flex', justifyContent:'center', gap:'1rem', marginTop:'1rem'}}>
        
        <a href="https://www.instagram.com/semilladeamorcafe/" target="_blank" rel="noopener noreferrer">
        <FaInstagram style={{ fill: 'url(#grad-instagram)',width: 'clamp(28px, 6vw, 44px)',height: 'clamp(28px, 6vw, 44px)', }}/> 
        </a>
        <a href="https://www.tiktok.com/@semilladeamorcafepopayan" target="_blank" rel="noopener noreferrer">
        <AiFillTikTok  style={{ fill: '#080808', borderRadius: 8 ,width: 'clamp(28px, 6vw, 44px)',height: 'clamp(28px, 6vw, 44px)',}} />
        </a> 
      </div>
      {/* <div className="wordmark" aria-hidden="true">Semilla de Amor</div> */}
    </div></footer>
  )
}
