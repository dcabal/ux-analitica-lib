# ux-analitica-lib
Biblioteca para la recolección de datos de usabilidad

## Prerrequisitos
[Node.js](https://nodejs.org) versión 14.15.5.

## Instalación de dependencias y construcción
Este proyecto utiliza [Rollup.js](https://www.rollupjs.org) para la transpilación y distribución de la biblioteca.

Instalar dependencias mediante el comando `npm install`.

### Construcción para desarrollo
Ejecutar el comando `npm run build:dev` para generar los ficheros de desarrollo. Crea un único fichero js en el directorio `dist` sin minificar y un *source map* en el mismo directorio para facilitar la depuración.

### Construcción para producción
Ejecutar el comando `npm run build` para generar el fichero de producción. Crea un único fichero js en el directorio `dist` minificado para su uso en producción.

## Uso de la biblioteca
Una vez realizada la construcción incluir el fichero generado en el directorio `dist` mediante una etiqueta `<script>`. Se debe añadir el atributo `defer` para que el script no se ejecute antes de que se cargue el DOM. Se debe incluir también el token de identificación que se generará en el lado cliente:

```html
<script defer src="path/to/ux-analitica-lib.js" data-uxa="token"></script>
```
