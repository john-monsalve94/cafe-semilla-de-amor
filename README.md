# Café Semilla de Amor · Sitio web (React + TypeScript)

## Cómo verlo

Necesitas tener **Node.js** instalado (https://nodejs.org, versión LTS). En una terminal, dentro de esta carpeta:

```
npm install        (solo la primera vez)
npm run dev        abre la página en http://localhost:5173 y se actualiza sola al guardar
```

Para generar la versión final que se sube al hosting: `npm run build`. Queda en la carpeta `dist/`.

## Cómo está organizado

```
index.html              entrada; React dibuja la página dentro de <div id="root">
public/images/          logo y fotos (marca/, casa/, cafes/, sabores/)
src/
  main.tsx              arranca React
  App.tsx               LA PÁGINA: una línea por sección, en orden
  secciones/            una carpeta por sección, con su código y su estilo juntos
    Portada/Portada.tsx + Portada.css
    Catalogo/Catalogo.tsx + Catalogo.css
    ... (Cabecera, Cinta, Recorrido, Cifras, DeLaCasa, Nosotros, Guia, Pedido,
         Carta, Sabores, Talleres, Galeria, Visitanos, Pie, Chat)
  compartido/           piezas que usan varias secciones (carrusel, utilidades, horario)
  datos/                LO QUE CAMBIA CON FRECUENCIA
    menu.json           carta: pestaña > grupo > [nombre, precio, descripción opcional]
    cafes.json          cafés en bolsa
    guia.json           «¿Cómo elegir tu café ideal?»
    sabores.json        fotos de «De nuestra cocina»
    negocio.json        horario, WhatsApp, especiales de la casa
  estilos/              base.css (colores en :root) y animaciones.css
```

## Quitar o agregar una sección

- **Quitar:** en `src/App.tsx` borra su línea `<Seccion />` (y su `import`). El resto de la página sigue igual.
- **Agregar:** crea `src/secciones/MiSeccion/MiSeccion.tsx` y `MiSeccion.css`, impórtala en `App.tsx` y ponla donde quieras.

## ¿Qué archivo toco?

| Quiero cambiar... | Archivo |
|---|---|
| Un precio o una bebida | `src/datos/menu.json` |
| Un café en bolsa | `src/datos/cafes.json` |
| Una foto de «De nuestra cocina» | `public/images/sabores/` y `src/datos/sabores.json` |
| Horario o WhatsApp | `src/datos/negocio.json` |
| Los textos de una sección | `src/secciones/<Sección>/<Sección>.tsx` |
| Colores | `src/estilos/base.css` (bloque `:root`) |
| El estilo de una sección | `src/secciones/<Sección>/<Sección>.css` |

Si algo se rompe, mira el error en la terminal o en la consola del navegador (F12). En los `.json`, una coma de más o de menos lo daña: cambia una cosa a la vez.

## Git

```
git add -A && git commit -m "Cambié un precio"
```
