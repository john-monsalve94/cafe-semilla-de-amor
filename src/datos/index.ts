// Aquí se cargan los .json. Para cambiar precios, horarios o textos edita esos archivos, no este.
import menuJson from './menu.json'
import cafesJson from './cafes.json'
import negocioJson from './negocio.json'
import guiaJson from './guia.json'
import saboresJson from './sabores.json'
import type { Cafe, ItemCarta, Negocio, Pregunta, Foto, Producto } from './tipos'

export const MENU = menuJson as unknown as Record<string, Record<string, ItemCarta[]>>
export const CAFES = cafesJson as unknown as Cafe[]
export const NEGOCIO = negocioJson as unknown as Negocio
export const GUIA = guiaJson as Pregunta[]
export const SABORES = saboresJson as Foto[]

/** Lista plana de todo lo que se puede buscar: la carta y los cafés en bolsa */
export const PRODUCTOS: Producto[] = []
Object.entries(MENU).forEach(([tab, grupos]) =>
  Object.entries(grupos).forEach(([g, lista]) =>
    lista.forEach(([n, p, d]) => PRODUCTOS.push({ n, p, d, g, tab }))))
export const TOTAL_CARTA = PRODUCTOS.length
CAFES.forEach(c => Object.entries(c.prices).forEach(([tam, p]) =>
  PRODUCTOS.push({ n: `Bolsa ${c.name} ${tam} g`, p, g: 'Café en bolsa', tab: 'Bolsa', cafe: c })))
