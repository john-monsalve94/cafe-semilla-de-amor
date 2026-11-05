// «Abierto ahora» y formato de horas (hora de Bogotá)
import { NEGOCIO } from '../datos'

export const fmtH = (h: number) => {
  const H = Math.floor(h), M = Math.round((h - H) * 60)
  const s = H >= 12 ? 'p. m.' : 'a. m.'
  const x = H % 12 === 0 ? 12 : H % 12
  return `${x}:${String(M).padStart(2, '0')} ${s}`
}

export function ahoraBogota() {
  const partes = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Bogota', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date())
  const get = (t: string) => partes.find(p => p.type === t)!.value
  return { dia: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), h: Number(get('hour')) + Number(get('minute')) / 60 }
}

export function estadoAbierto(): { abierto: boolean; texto: string } {
  const { dia, h } = ahoraBogota()
  const t = NEGOCIO.HOURS[dia]
  if (t && h >= t[0] && h < t[1]) return { abierto: true, texto: 'Abierto ahora · cierra a las ' + fmtH(t[1]) }
  if (t && h < t[0]) return { abierto: false, texto: 'Cerrado · abre hoy a las ' + fmtH(t[0]) }
  for (let k = 1; k <= 7; k++) {
    const d = (dia + k) % 7
    const t2 = NEGOCIO.HOURS[d]
    if (t2) return { abierto: false, texto: `Cerrado · abre ${k === 1 ? 'mañana' : NEGOCIO.DAYS[d].toLowerCase()} a las ${fmtH(t2[0])}` }
  }
  return { abierto: false, texto: 'Cerrado' }
}
