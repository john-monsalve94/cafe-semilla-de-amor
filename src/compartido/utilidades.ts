// Funciones pequeñas que usan varias secciones
import type { CSSProperties } from 'react'

export const cop = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

export const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** ¿La persona pidió menos movimiento en su dispositivo? */
export const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Ruta de una imagen de public/images (funciona en cualquier carpeta del hosting) */
export const img = (ruta: string) => import.meta.env.BASE_URL + ruta
/** Igual pero absoluta: necesaria cuando la imagen se usa desde CSS (url(...)) */
export const imgAbsoluta = (ruta: string) => new URL(img(ruta), document.baseURI).href

export const LOGO = 'images/marca/logo.png'

/** Atajo para pasar variables CSS (--d, --c, ...) en el atributo style */
export const vars = (o: Record<string, string>) => o as CSSProperties

/** Baja suavemente hasta el elemento con ese id. Si no existe, no hace nada. */
export const irA = (id: string, opts: ScrollIntoViewOptions = {}) =>
  document.getElementById(id)?.scrollIntoView({ behavior: reducirMovimiento ? 'auto' : 'smooth', ...opts })
