// Memoria compartida del pedido. El catálogo y la guía agregan cafés aquí y la sección Pedido los muestra.
// Si quitas la sección Pedido, el resto de la página sigue funcionando.
import { useSyncExternalStore } from 'react'
import { CAFES } from '../datos'

export interface Fila { id: string; size: number; qty: number }

let filas: Fila[] = [{ id: 'geisha', size: 500, qty: 1 }]
const oyentes = new Set<() => void>()
const avisar = () => oyentes.forEach(f => f())

const primerTamano = (id: string) => Number(Object.keys(CAFES.find(c => c.id === id)!.prices)[0])

export const pedido = {
  agregar(id: string) { filas = [...filas, { id, size: primerTamano(id), qty: 1 }]; avisar() },
  quitar(k: number) { if (filas.length > 1) { filas = filas.filter((_, i) => i !== k); avisar() } },
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
