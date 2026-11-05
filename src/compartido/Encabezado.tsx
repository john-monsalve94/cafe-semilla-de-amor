// Título de sección: etiqueta pequeña, título grande y un texto opcional
import type { ReactNode } from 'react'
import Revelar from './Revelar'

export default function Encabezado({ etiqueta, children, texto }: { etiqueta: string; children: ReactNode; texto?: string }) {
  return (
    <Revelar className="head">
      <p className="kicker">{etiqueta}</p>
      <h2>{children}</h2>
      {texto && <p>{texto}</p>}
    </Revelar>
  )
}
