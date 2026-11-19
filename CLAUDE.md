# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio web de una sola página para Café Semilla de Amor (cafetería en Popayán, Colombia). React 18 + TypeScript + Vite, sin router, sin backend y sin framework de CSS. Publicado en Vercel. **Todo el código, los nombres, los comentarios, los archivos y los mensajes de commit están en español**: hay que mantenerlo así. El README está escrito para la dueña, que no es programadora, así que los comentarios en el código deben ser sencillos y explicativos, con ese mismo estilo.

## Zonas delicadas

No toques la lógica del carrito ni el botón de WhatsApp sin avisar primero. Eso incluye:
- Carrito: `src/compartido/pedidoStore.ts` y el cálculo del total en `src/secciones/Pedido/Pedido.tsx`.
- WhatsApp: el enlace `wa.me` de `Pedido.tsx` («Enviar por WhatsApp»), el de la reserva en `src/secciones/Talleres/Talleres.tsx` y `PHONE` en `src/datos/negocio.json`.

## Comandos

```bash
npm run dev       # servidor de Vite en http://localhost:5173
npm run build     # tsc (solo revisa tipos, noEmit) y luego vite build → dist/
npm run preview   # sirve lo que quedó en dist/
```

No hay pruebas automáticas ni linter. `npm run build` es la forma de verificar: `tsc` en modo estricto detecta cuando un JSON no tiene la forma que esperan los tipos.

## Cómo está armado

- `src/App.tsx` es toda la página: una línea `<Seccion />` por sección, en el orden en que se ven. Una sección se quita o se desactiva borrando o comentando su línea (por ejemplo, `<Cinta />` está comentada ahora). Cada sección debe seguir funcionando aunque se quite cualquier otra.
- `src/secciones/<Nombre>/<Nombre>.tsx` + `<Nombre>.css`: cada sección tiene su propio código y su propio estilo. El CSS es global (no son CSS modules), así que los nombres de clase se comparten en toda la página.
- `src/datos/*.json` guarda el contenido que cambia seguido (precios de la carta, cafés en bolsa, horario y WhatsApp, guía, fotos de comida). `src/datos/index.ts` los carga, les pone los tipos de `tipos.ts` y arma `PRODUCTOS`: una lista plana con todo lo de la carta más cada tamaño de café en bolsa, que usan el buscador (Carta) y el chat. El contenido se cambia en los JSON, no en `index.ts`. Los productos de la carta son tuplas `[nombre, precio, descripcion?]` dentro de `pestaña > grupo`.
- `src/compartido/`:
  - `pedidoStore.ts`: "memoria" pequeña del pedido con `useSyncExternalStore`; Catálogo y Guía agregan cafés y la sección Pedido los muestra.
  - `horario.ts`: calcula si está abierto o cerrado con la hora de `America/Bogota`, a partir de `HOURS` en `negocio.json` (por día de la semana, domingo = 0; `null` = cerrado).
  - `Revelar.tsx`: envoltorio que anima los bloques al entrar en pantalla (IntersectionObserver agrega `.in`); respeta la opción de reducir movimiento.
  - `Simbolos.tsx`: dibujos SVG ocultos (`<symbol>`: granos, bolsa, logo, degradados) que las secciones usan con `<use href="#...">`.
  - `utilidades.ts`: `cop()` para mostrar precios en pesos, `norm()` para quitar tildes, y `img()` / `imgAbsoluta()` para las rutas de imágenes.
- `src/secciones/Chat/respuestas.ts`: asistente basado en reglas (expresiones regulares), no es una IA. Lee de `datos`, pero **algunas respuestas tienen datos del negocio escritos a mano** (texto del horario, dirección, teléfonos, Instagram): si cambian, hay que actualizarlos aquí además de en `negocio.json`.
- Estilos generales, cargados en `main.tsx`: `estilos/base.css` (colores y tamaños en `:root`: paleta vino, dorado y café; fuentes Playfair Display + Poppins; variantes de `.btn`), `animaciones.css` (animaciones continuas, todas dentro de `prefers-reduced-motion`) y `vida.css` (capa opcional de fondos y sombras decorativas; se quita borrando su import).

## Imágenes y rutas

`vite.config.ts` usa `base: './'` para que el sitio funcione en cualquier carpeta o dominio. Las imágenes están en `public/images/{marca,casa,cafes,sabores}`. En los `.tsx`, arma las rutas con `img('images/...')` (y `imgAbsoluta` cuando la imagen va en un `url()` de CSS por estilo en línea), en vez de escribir `/images/...` a mano. Ojo: `vida.css` usa ahora rutas absolutas `url(/images/...)`, que solo funcionan si el sitio está en la raíz del dominio. Para fotos grandes, mejor usar `.webp` (en commits recientes se pasó el fondo de la portada a ese formato).
