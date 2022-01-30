# Plugins/Personalizaciones

tsParticles ahora soporta personalizaciones 🥳.

**AHORA PUEDES CREAR TUS PROPIAS FIGURAS O AJUSTES PREDEFINIDOS**

## Crear una figura personalizada

Ahora puedes crear un script con tu propia figura para usarla en tu sitio web o para distribuir. Todo lo que debes hacer es una función que dibuje, darle un nombre y usarla en la configuración.

Publica tus figuras con la etiqueta `tsparticles-shape` en `NPM` para que todos lo puedan encontrar.

Encontrarás un ejemplo más abajo.

### Espiral de ejemplo

_spiral.js_ - El script de tu figura personalizada, puedes distribuirla o reutilizarla en todos tus sitios web.

```javascript
// llama este método antes de inicializar tsParticles, esta figura estará disponible en todas las instancias de tsParticles
// parámetros: nombre de la figura, método de dibujo
// la opacidad es solo para figuras que necesitan un manejo de la opacidad distinto, como imágenes
tsParticles.addShape("spiral", function (context, particle, radius, opacity) {
  const shapeData = particle.shapeData;
  const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

  for (let i = 0; i < realWidth * 10; i++) {
    const angle = 0.1 * i;
    const x =
      (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.cos(angle);
    const y =
      (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.sin(angle);

    context.lineTo(x, y);
  }
});
```

Si prefieres utilizar clases, lo puedes hacer. La interfaz {@link IShapeDrawer} puede ser implementada en tu código o al menos una clase con cuatro métodos {@link IShapeDrawer.draw |draw(context, particle, radius, opacity, delta)}, {@link IShapeDrawer.init | init(container)}, {@link IShapeDrawer.afterEffect | afterEffect(context, particle, radius, opacity, delta)}, {@link IShapeDrawer.destroy | destroy(container)} en ella. Puedes encontrar un ejemplo debajo.

```javascript
class SpiralDrawer {
  draw(context, particle, radius, opacity, delta) {
    const shapeData = particle.shapeData;
    const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

    for (let i = 0; i < realWidth * 10; i++) {
      const angle = 0.1 * i;
      const x =
        (shapeData.innerRadius + shapeData.lineSpacing * angle) *
        Math.cos(angle);
      const y =
        (shapeData.innerRadius + shapeData.lineSpacing * angle) *
        Math.sin(angle);

      context.lineTo(x, y);
    }
  }
}

// llama este método antes de inicializar tsParticles, esta figura estará disponible en todas las instancias de tsParticles
// parámetros: nombre de la figura, clase para dibujar
tsParticles.addShape("spiral", new SpiralDrawer());
```

#### Burbuja de ejemplo (con efecto posterior)

_bubble.js_ - El script para la figura personalizada

```javascript
tsParticles.addShape(
    "bubble",
    function (context, particle, radius) { // función que dibuja
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    },
    undefined, // no se requiere la función init
    function (context, particle, radius) { // función para el ejemplo posterior
        context.save();
        context.beginPath();
        context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
        context.restore();
    }
);
```

### Configuración

_config.json_ - La sección de configuración para añadir tu configuración o en el readme de tu plugin para enseñar a otros cómo usarlo.

```javascript
{
  // [... omitido para ser breves]
  "particles": {
    // [... omitido para ser breves]
    "shape": {
      "type": "spiral", // esto debe concordar con el nombre anterior, el tipo funciona como siempre, puedes usar un arreglo con tu figura personalizada en él
      "custom": {
        // esto debe concordar con el nombre anterior, estos son valores definidos en particle.shapeData (la primera línea del método anterior)
        // puedes usar arreglos como valores aquí también, los valores se tomarán aleatoriamente, como en figuras estándar
        "spiral": {
          "innerRadius": 1,
          "lineSpacing": 1,
          "close": false, // este valor es usado en tsParticles para cerrar el trazo, si no quieres cerrarlo, pon este valor en false
          "fill": false // este valor es usado en tsParticles para rellenar la figura con el color de las partículas, si solo quieres el trazo, pon este valor en false
        }
      }
      // [... omitido para ser breves]
    }
    // [... omitido para ser breves]
  }
  // [... omitido para ser breves]
}
```

## Creando un ajuste predefinido personalizado

Ahora puedes crear un script con tu propio ajuste predefinido para usar en tu sitio web o para su distribución. Todo lo que tienes que hacer es darle un nombre y definir todas las opciones que necesitas para que carge correctamente. Recuerda no importar toda la configuración, las propiedades no necesarias pueden omitirse.

Publica tus ajustes predefinidos con la etiqueta `tsparticles-preset` en `NPM` para que todos lo puedan encontrar.

Encontrarás un ejemplo debajo.

### Ejemplo de ajustes predefinidos de Fuego

_fire.preset.js_ - El script con ajustes predefinidos, puedes distribuirlo o usarlo en todos tus sitios web.

```javascript
// llama este método antes de inicializar tsParticles, esta figura estará disponible en todas las instancias de tsParticles
// parámetros: nombre de los ajustes, opciones parciales del ajuste
tsParticles.addPreset("fire", {
  fpsLimit: 40,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
    },
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
  },
  background: {
    image: "radial-gradient(#4a0000, #000)",
  },
});
```

_config.json_ - La sección de configuración para agregar en tu configuración o en el readme de tu plugin, para enseñar a otros cómo usarlo.

```javascript
{
  "preset": "fire" // esto debe concordar con el nombre anterior, puede usarse en valores de un arreglo también, va a cargarse en orden como todo lo demás
}
```
