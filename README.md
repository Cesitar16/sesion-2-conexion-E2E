# Sesion 2 - Conexion E2E

Este repositorio esta pensado como material de apoyo para aprender una idea muy concreta:

**como consultar una API desde el front-end y mostrar esa informacion en pantalla con React**.

El ejemplo actual consume la API publica de Dog CEO:

- `https://dog.ceo/api/breeds/image/random`

Cada consulta devuelve una URL distinta de una imagen de perro, y la aplicacion la muestra en la interfaz.

## Objetivo del repositorio

La meta no es solo "hacer una pagina bonita", sino entender el flujo completo:

1. el usuario entra a la pagina
2. React carga el componente principal
3. el componente consulta una API con `fetch`
4. la respuesta se guarda en el estado
5. React vuelve a renderizar la interfaz
6. el usuario ve la informacion actualizada en pantalla

Ese patron se repite en casi cualquier integracion front-end con APIs.

## Que hace esta aplicacion

La app actual:

- consulta una imagen aleatoria de perro al abrir la pagina
- permite pedir otra imagen con un boton
- muestra estados de carga
- muestra un mensaje de error si la consulta falla
- detecta la raza a partir de la URL devuelta por la API
- permite abrir la imagen original en una pestana nueva

## Como ejecutar el proyecto

### Requisitos

- Node.js instalado
- npm instalado

### Pasos

```bash
npm install
npm run dev
```

Luego abre la URL local que entrega Vite en la terminal, normalmente algo como:

```bash
http://localhost:5173
```

## Scripts disponibles

- `npm run dev`: levanta el entorno de desarrollo
- `npm run build`: genera la version lista para produccion en `dist/`
- `npm run preview`: sirve localmente la version generada
- `npm run lint`: revisa el codigo con ESLint

## Estructura del proyecto

```text
sesion-2-conexion-E2E/
+-- public/
|   +-- favicon.svg
|   `-- icons.svg
+-- src/
|   +-- App.jsx
|   +-- App.css
|   +-- index.css
|   `-- main.jsx
+-- index.html
+-- package.json
+-- vite.config.js
`-- README.md
```

## Para que sirve cada archivo

### `index.html`

Es la pagina base que carga la aplicacion. Tiene un `<div id="root"></div>` y ahi React monta todo.

### `src/main.jsx`

Es el punto de entrada de React. Importa los estilos globales, importa el componente `App` y lo renderiza dentro de `#root`.

### `src/App.jsx`

Es el componente principal del proyecto.

Ahi ocurre casi toda la logica importante del ejemplo:

- se define la URL de la API
- se hace la consulta con `fetch`
- se guarda la respuesta en estados de React
- se decide que mostrar en pantalla segun si esta cargando, si hubo error o si ya llego la imagen

### `src/App.css`

Contiene los estilos del componente principal. Define la apariencia visual de la tarjeta, el boton, la imagen, los mensajes y el layout de la pagina.

### `src/index.css`

Contiene estilos globales. Afecta al `body`, al `#root`, tipografias, fondo general y reglas base compartidas.

### `public/`

Guarda archivos estaticos que no pasan por React directamente, como el favicon.

## Como funciona el flujo dentro del front-end

Para alguien que nunca vio React, esta es la idea central:

1. `index.html` carga `src/main.jsx`
2. `src/main.jsx` renderiza `App`
3. `App` hace una peticion HTTP a la API
4. cuando la API responde, React guarda el resultado en memoria usando `useState`
5. al cambiar ese estado, React vuelve a dibujar la pantalla con los nuevos datos

En este proyecto el dato principal es la URL de una imagen. Cuando cambia esa URL, cambia el `src` del `<img>` y el navegador muestra otra foto.

## Conceptos de React que aparecen en este ejemplo

- `useState`: guarda datos que cambian en la interfaz
- `useEffect`: ejecuta logica al cargar el componente
- `useCallback`: reutiliza una funcion del componente
- `fetch`: hace la consulta HTTP a la API
- JSX: es la forma en la que React describe la interfaz usando una sintaxis parecida a HTML

## Relacion entre archivos

La relacion principal es esta:

```text
index.html
  -> src/main.jsx
      -> src/index.css
      -> src/App.jsx
          -> src/App.css
          -> fetch("https://dog.ceo/api/breeds/image/random")
```

En otras palabras:

- `main.jsx` conecta React con el HTML
- `App.jsx` contiene la logica y la interfaz
- `App.css` y `index.css` controlan la presentacion visual

## Que pueden practicar desde aqui

Este repositorio sirve como base para ejercicios como:

- cambiar la API por otra publica
- mostrar mas de una tarjeta
- agregar un historial de resultados
- guardar favoritos
- mostrar loaders mas claros
- separar la interfaz en mas componentes

## Recursos

Hay una lista de APIs publicas sugeridas en [recursos.md](./recursos.md).

La idea es que este repositorio sirva para practicar como:

- leer documentacion de una API
- hacer una peticion desde el front-end
- interpretar la respuesta JSON
- guardar el resultado en React
- mostrarlo en la interfaz
