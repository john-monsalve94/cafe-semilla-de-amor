// Memoria compartida del pedido. El catálogo y la guía agregan cafés aquí y la sección Pedido los muestra.
// Si quitas la sección Pedido, el resto de la página sigue funcionando.
import { useSyncExternalStore } from 'react'
import { CAFES } from '../datos'

export interface Fila { id: string; size: number; qty: number }

// El pedido empieza vacío: solo aparece lo que la persona elige
let filas: Fila[] = []
const oyentes = new Set<() => void>()
const avisar = () => oyentes.forEach(f => f())

const primerTamano = (id: string) => Number(Object.keys(CAFES.find(c => c.id === id)!.prices)[0])

export const pedido = {
  // Si ese café (con ese tamaño) ya está en el pedido, suma una unidad en vez de repetir la fila
  agregar(id: string) {
    const size = primerTamano(id)
    const donde = filas.findIndex(f => f.id === id && f.size === size)
    filas = donde >= 0
      ? filas.map((f, i) => i === donde ? { ...f, qty: Math.min(50, f.qty + 1) } : f)
      : [...filas, { id, size, qty: 1 }]
    avisar()
  },
  quitar(k: number) { filas = filas.filter((_, i) => i !== k); avisar() },
  cambiar(k: number, cambio: Partial<Fila>) {
    filas = filas.map((f, i) => i === k ? { ...f, ...cambio } : f)
    if (cambio.id) filas[k].size = primerTamano(cambio.id)
    avisar()
  },
}
export const usePedido = () => useSyncExternalStore(
  cb => { oyentes.add(cb); return () => { oyentes.delete(cb) } },
  () => filas,
)
