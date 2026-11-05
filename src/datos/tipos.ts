// Forma de los datos de los archivos .json (así TypeScript avisa si algo no cuadra)

/** Un producto de la carta: [nombre, precio, descripción opcional] */
export type ItemCarta = [nombre: string, precio: number, descripcion?: string]

export interface Cafe {
  id: string
  name: string
  chip: string
  process: string
  aroma: string
  acidez?: string
  notas: string[]
  band: string
  prices: Record<string, number>
  img?: string
}

export interface Pregunta { id: string; pregunta: string; texto: string }
export interface Favorito { n: string; icon: string }
export interface Negocio {
  PHONE: string
  HOURS: Record<string, [number, number] | null>
  DAYS: string[]
  HOUSE: Favorito[]
}
export interface Foto { img: string; texto: string }

/** Elemento de la lista plana que usan la carta y el chat */
export interface Producto {
  n: string
  p: number
  d?: string
  g: string      // grupo
  tab: string    // pestaña
  cafe?: Cafe    // si es un café en bolsa
}
