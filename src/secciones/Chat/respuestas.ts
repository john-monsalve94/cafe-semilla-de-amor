// Cerebro del asistente: busca en los datos y responde con reglas simples
import { CAFES, MENU, NEGOCIO, PRODUCTOS } from '../../datos'
import type { Producto } from '../../datos/tipos'
import { estadoAbierto } from '../../compartido/horario'
import { cop, norm } from '../../compartido/utilidades'

const STOP = ['cuanto', 'cuesta', 'vale', 'precio', 'tienen', 'tiene', 'hay', 'quiero', 'cual', 'cuales', 'sobre', 'para', 'como', 'donde', 'que', 'con', 'una', 'unos', 'del', 'los', 'las', 'por', 'notas', 'sabor']

function buscar(q: string): Producto[] {
  const palabras = norm(q).split(/[^a-z0-9]+/).filter(w => w.length >= 3 && !STOP.includes(w))
  if (!palabras.length) return []
  let mejor = 0
  let res: Producto[] = []
  PRODUCTOS.forEach(i => {
    const n = norm(i.n)
    const puntos = palabras.filter(w => n.includes(w)).length
    if (puntos > mejor) { mejor = puntos; res = [i] } else if (puntos === mejor && puntos > 0) res.push(i)
  })
  return res
}
const lista = (arr: Producto[]) => arr.slice(0, 5).map(i => `${i.n}: ${cop(i.p)}`).join('\n') + (arr.length > 5 ? `\ny ${arr.length - 5} más en la carta.` : '')

export function responder(q: string): string {
  const t = norm(q)
  const cafe = CAFES.find(p => norm(p.name).split(/[^a-z]+/).some(w => w.length > 3 && w !== 'castillo' && t.includes(w)))
  if (cafe && /nota|sabor|aroma|acidez|perfil|como es|que es/.test(t)) return `${cafe.name}\nAroma: ${cafe.aroma}\nAcidez: ${cafe.acidez ?? '—'}\nNotas: ${cafe.notas.join(', ')}\nProceso: ${cafe.process}`
  if (/hora|abre|abren|cierra|cierran|horario/.test(t)) return estadoAbierto().texto + '.\nLunes a viernes 8:30 a. m. a 7:30 p. m. Sábado 11 a. m. a 7 p. m.'
  if (/direcc|ubic|donde|queda|llegar/.test(t)) return 'Carrera Octava #3-77, centro de Popayán. Hay un botón de Google Maps en "Visítanos".'
  if (/whatsapp|telefono|celular|contacto|instagram/.test(t)) return 'Pedidos: 313 582 7664 o 313 605 6922.\nInstagram: @semilladeamorcafe'
  if (/taller|aprender|catar|cata/.test(t)) return 'Talleres:\n' + lista(PRODUCTOS.filter(i => i.tab === 'Talleres')) + '\nPuedes reservar en la sección "Talleres".'
  if (/reserv|mesa/.test(t)) return 'Puedes reservar en la sección "Talleres", donde está el formulario.'
  if (/pedido|bolsa|grano|llevar|domicilio|envio/.test(t)) return 'Arma tu pedido en "Arma tu pedido": eliges variedad y tamaño, ves el total y lo envías por WhatsApp.'
  if (/recomiend|casa|especialidad|estrella/.test(t)) return 'De la casa:\n' + lista(NEGOCIO.HOUSE.map(h => PRODUCTOS.find(i => i.n === h.n)).filter((x): x is Producto => !!x))
  if (cafe) return lista(PRODUCTOS.filter(i => i.cafe === cafe))
  const aciertos = buscar(q)
  if (aciertos.length) return lista(aciertos)
  if (/menu|carta|precio/.test(t)) return 'Tenemos ' + Object.keys(MENU).join(', ').toLowerCase() + ' y café en bolsa. Dime qué producto te interesa.'
  return 'Aún estoy aprendiendo. Pregúntame por precios, perfiles de café, talleres, pedidos, horarios o ubicación.'
}
