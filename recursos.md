# Recursos

Este archivo junta APIs publicas simples que pueden usar para practicar consumo de datos desde el front-end.

La idea del repositorio es que sirva para **entender como consultar APIs y pasar esos datos a la interfaz hecha con React**.

El flujo que se busca practicar es siempre parecido:

1. leer la documentacion
2. identificar el endpoint
3. hacer la peticion con `fetch`
4. revisar el JSON que devuelve la API
5. guardar los datos en el estado
6. mostrarlos en pantalla

## APIs sugeridas

### Dog CEO

- Sitio: https://dog.ceo/dog-api/
- Uso sugerido: mostrar una imagen aleatoria de perro, listar razas o filtrar por raza
- Ideal para practicar: imagenes, botones de recarga, estados de carga y renderizado visual

### RandomFox

- Sitio: https://randomfox.ca/
- Uso sugerido: mostrar una imagen aleatoria de zorro
- Ideal para practicar: consumo de JSON simple y reemplazo de imagenes en pantalla

### Random D.uk

- Sitio: https://random-d.uk/api
- Uso sugerido: mostrar patos aleatorios
- Ideal para practicar: comparar respuestas entre APIs parecidas y adaptar el front-end a distintos formatos de respuesta

### Agify

- Sitio: https://agify.io/#api
- Uso sugerido: ingresar un nombre y estimar una edad probable
- Ideal para practicar: formularios, inputs controlados, consultas dinamicas y renderizado de resultados de texto

### Genderize

- Sitio: https://genderize.io/#api
- Uso sugerido: ingresar un nombre y estimar un genero probable
- Ideal para practicar: formularios, llamadas con query params y presentacion de resultados basados en texto

## Como usar estas APIs en este repositorio

Pueden tomar el mismo proyecto actual y reemplazar la URL de la API en `src/App.jsx`.

Por ejemplo:

- hoy el proyecto consulta una API de perros
- manana podria consultar zorros, patos, edad probable o genero probable

Lo importante no es solo cambiar el endpoint, sino entender:

- que datos devuelve la API
- que parte del JSON necesitan
- como guardar ese dato en React
- como cambiar la interfaz segun el tipo de respuesta

## Sugerencias de ejercicios

### Nivel 1

- reemplazar perros por zorros
- reemplazar perros por patos
- cambiar textos e imagenes segun la API usada

### Nivel 2

- agregar un input para consultar `Agify`
- agregar un input para consultar `Genderize`
- mostrar errores cuando el usuario no escriba un nombre

### Nivel 3

- crear un selector para elegir entre varias APIs
- separar la app en varios componentes
- agregar historial de consultas
- reutilizar una misma tarjeta para mostrar distintos resultados

## Estructura base del front-end

Si nunca vieron React, esta es la estructura minima que ya tienen en este repositorio:

- `index.html`: pagina base donde React se monta
- `src/main.jsx`: punto de entrada de la aplicacion
- `src/App.jsx`: componente principal con la logica y la interfaz
- `src/App.css`: estilos del componente principal
- `src/index.css`: estilos globales

## Idea pedagogica de este repositorio

Este proyecto no busca esconder la complejidad con demasiadas carpetas o abstracciones.

Al contrario, esta hecho para que sea facil ver:

- donde se hace la peticion
- donde se guarda la respuesta
- donde se renderiza el resultado
- donde se cambian los estilos

Cuando ese flujo quede claro, recien tiene sentido pasar a:

- multiples componentes
- custom hooks
- manejo de rutas
- llamadas a APIs mas complejas
