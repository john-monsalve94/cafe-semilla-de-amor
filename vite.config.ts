import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' hace que el build funcione en cualquier carpeta o dominio del hosting
export default defineConfig({ base: './', plugins: [react()] })
