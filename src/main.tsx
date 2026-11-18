// Punto de entrada: monta la página dentro de <div id="root"> de index.html
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './estilos/base.css'
import App from './App'
import './estilos/animaciones.css'
import './estilos/vida.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
