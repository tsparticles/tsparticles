# Migración desde Particles.js

tsParticles es completamente compatible con Particles.js y la migración es realmente sencilla de realizar.

Revisemos un posible código HTML.

## Solución sencilla

Debes tener algo como el siguiente código

```html
<script src="particles.min.js"></script>
```

Para migrar desde particles.js a tsParticles todo lo que debes hacer es reemplazar lo anterior, a esto:

```html
<script src="tsparticles.min.js"></script>
```

Si has configurado el css de esta forma

```css
.particles-js-canvas-element {
    /* your awesome CSS code */
}
```

Debes cambiarlo a lo siguiente

```css
.tsparticles-canvas-element {
    /* your awesome CSS code */
}
```

Y hemos terminado. Sencillo, ¿no?

## Solución avanzada

Probablemente notaste algunas advertencias en la consola. En efecto es sencillo hacer la migración, pero nuevas características requieren nuevas configuraciones y el arreglar algunos defectos puede estropear algunas cosas.

Si no te es familiar JavaScript, no te preocupes. Puedes saltarte esta parte y dejar las advertencias, todo va a funcionar bien.

Si te importan las advertencias en la consola, estás en el lugar correcto.

El identificador de particlesJS ahora está obsoleto. La biblioteca tiene un nuevo nombre, por lo que ha cambiado.

Ahora revisemos el código de JavaScript, debes tener algo como lo siguiente

```javascript
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
```

o algo así

```javascript
particlesJS('particles-js', { /* aquí van las opciones */ });
```

Todo lo que debes hacer es utilizar los nuevos identificadores reemplazando la función

`particlesJS()` por `tsParticles.load()`

o la función

`particlesJS.load()` por `tsParticles.loadJSON()`

**Advertencia aquí, `loadJSON` no tiene un tercer parámetro. Si necesitas un callback utiliza la función `then`.**

Sigue siendo muy sencillo.

Hay que convertir el ejemplo provisto antes para entender

```javascript
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
tsParticles.loadJSON('particles-js', 'assets/particles.json').then(function(p) {
  // p es el contenedor cargado para ser usado más adelante
  console.log('callback - configuración de particles.js cargada');
});

tsParticles.load('particles-js', { /* aquí van las opciones */ });
```

Pero probablemente notaste que las advertencias siguen ahí. Las opciones también han cambiado, pero como el identificador, esto no es un problema.

## Transformando Opciones

Revisemos la advertencia de opciones. Nos recomiendan cambiar las propiedades antiguas por las nuevas.

Las propiedades cambiadas aún continúan funcionando, pero serán reemplazadas por nuevas características.

Si encuentras una propiedad con un `_` en el nombre, esa propiedad fue renombrada. Podemos tomar la propiedad `line_linked` como un ejemplo. Ahora ha sido renombrada a `lineLinked`.

¡Boom! ¡Otra advertencia se ha ido!

Revisa las advertencias para encontrar todas las propiedades que han sido renombradas.
