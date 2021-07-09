# Colores

Los colores de **tsParticles** pueden tener una variedad de valores y todas las propiedades de color (excepto {@link IParticles.color | particles color}) en las opciones, aceptan todos estos valores.

Todas las propiedades `color` aceptan `string`s y `object`s. El color `object` tiene una única propiedad: `value`.

Exploremos todos los valores válidos.

## Strings

### hex (sintáxis corta

```javascript
color: '#fff'
```

### hex (sintáxis completa)

```javascript
color: '#ffffff'
```

### Sintáxis rgb

*alpha será ignorado, la propiedad `opacity` está para eso*

```javascript
color: 'rgb(255, 255, 255)'
```

### Sintáxis hsl

*alpha será ignorado, la propiedad `opacity` está para eso*

```javascript
color: 'hsl(0, 100%, 100%)'
```

### Aleatorio

```javascript
random: 'random' // se elegirá un color aleatorio
```

Esa es la parte sencilla, ahora vamos un poco más profundo.

---

## Objeto Color

### strings, de nuevo

```javascript
color: {
  value: '#fff' // No repetiré lo que ya dije, todos los valores string de antes son válidos aquí también
}
```

### Objeto rgb

```javascript
color: {
  value: {
    r: 255,
    g: 255,
    b: 255
  }
}
```

### Objeto hsl

```javascript
color: {
  value: {
    h: 0,
    s: 100,
    l: 100
  }
}
```

### Objeto rgb/hsl anidado

```javascript
color: {
  value: {
    rgb: { r: 255, g: 255, b: 255 } // en línea, por brevedad. Es el mismo objeto rgb de antes
    hsl: { h: 0, s: 100, l: 100 } // en línea, por brevedad. Es el mismo objeto hsl de antes
  }
}
```

*si definimos las propiedades `rgb` y `hsl` al mismo tiempo, solo se usará `rgb`.*

---

## Múltiples colores

Toda propiedad `color.value` acepta un arreglo heterogéneo de sus valores, pero ten cuidado: el color será elegido aleatoriamente.

Para algunos objetos, este comportamiento será adecuado. Otros objetos, como `links` se generan en tiempo de ejecución y tendrán distintos colores en cada fotograma.
