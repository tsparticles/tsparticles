---
title: Guía de WordPress
description: Guía completa para integrar tsParticles con WordPress usando el plugin, bloques, shortcodes e integración con temas.
---

# Guía de WordPress

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Activación del Plugin](#activación-del-plugin)
3. [Uso de Widgets y Bloques](#uso-de-widgets-y-bloques)
4. [Uso de Shortcodes](#uso-de-shortcodes)
5. [Configuración con Filtros PHP](#configuración-con-filtros-php)
6. [Configuración Personalizada mediante Filtro](#configuración-personalizada-mediante-filtro)
7. [Integración con Temas](#integración-con-temas)

---

## Instalación

El plugin de tsParticles para WordPress está disponible a través del Directorio de Plugins de WordPress. Instálalo directamente desde el panel de administración de WordPress.

### Desde el Administrador de WordPress

1. Navega a **Plugins → Añadir nuevo**
2. Busca "tsParticles"
3. Haz clic en **Instalar ahora** en el plugin tsParticles
4. Haz clic en **Activar**

### Instalación Manual

1. Descarga el ZIP del plugin desde el Directorio de Plugins de WordPress o la [página de lanzamientos](https://github.com/tsparticles/wordpress/releases)
2. Navega a **Plugins → Añadir nuevo → Subir plugin**
3. Elige el archivo ZIP y haz clic en **Instalar ahora**
4. Haz clic en **Activar**

---

## Activación del Plugin

Una vez activado, el plugin registra:

- Un **bloque de Gutenberg** llamado "tsParticles" disponible en el insertador de bloques
- Un **shortcode** `[tsparticles]` para usar en el Editor Clásico o plantillas PHP personalizadas
- Un **filtro PHP** `tsparticles_options` para que los desarrolladores inyecten configuración programáticamente
- Assets de front-end (JavaScript y CSS) que se encolan solo cuando el bloque o shortcode está presente en la página

Después de la activación, puedes verificar que el plugin funciona visitando **Ajustes → tsParticles** en la barra lateral de administración de WordPress, donde una página de ajustes básicos puede estar disponible dependiendo de la versión del plugin.

---

## Uso de Widgets y Bloques

El plugin tsParticles añade un bloque Gutenberg personalizado para el editor de bloques (WordPress 5.0+).

### Añadiendo el Bloque

1. Edita cualquier entrada o página con el editor de bloques (Gutenberg)
2. Haz clic en el botón **+** (Añadir bloque)
3. Busca "tsParticles" o "Particles"
4. Haz clic en el bloque **tsParticles** para insertarlo

### Ajustes del Bloque

Una vez insertado, el panel de inspección del bloque (en el lado derecho) proporciona ajustes:

- **ID del Contenedor** — un ID HTML único para el contenedor de partículas (por defecto: `tsparticles`)
- **Ancho / Alto** — establece dimensiones explícitas o usa el modo de pantalla completa
- **Z-Index** — controla la superposición relativa a otro contenido
- **Configuración** — pega un objeto JSON de opciones para personalizar completamente la apariencia de las partículas

Para áreas de barra lateral del tema o widgets que no soportan bloques, usa el enfoque de [Shortcode](#uso-de-shortcodes) en su lugar.

---

## Uso de Shortcodes

Usa el shortcode `[tsparticles]` en el Editor Clásico, bloques HTML personalizados, o directamente en archivos de plantilla PHP para incrustar fondos de partículas en cualquier lugar de tu sitio.

### Shortcode Básico

```
[tsparticles]
```

Esto renderiza la configuración de partículas por defecto (círculos flotantes simples sobre un fondo oscuro).

### Shortcode con Opciones

Pasa configuración JSON directamente en el shortcode usando el atributo `options`:

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### Shortcode en Plantillas PHP

```php
// En el header.php o footer.php de tu tema
echo do_shortcode('[tsparticles]');
```

O con opciones personalizadas:

```php
$options = [
    'particles' => [
        'number' => ['value' => 80],
        'color'  => ['value' => '#00d4ff'],
        'shape'  => ['type' => 'circle'],
        'links'  => [
            'enable'   => true,
            'distance' => 150,
            'color'    => '#00d4ff',
            'opacity'  => 0.3,
        ],
        'move' => [
            'enable'  => true,
            'speed'   => 1.5,
            'outModes' => ['default' => 'bounce'],
        ],
    ],
    'background' => ['color' => '#0d1117'],
];

echo do_shortcode('[tsparticles options=\'' . wp_json_encode($options) . '\']');
```

---

## Configuración con Filtros PHP

El plugin expone un filtro `tsparticles_options` que te permite sobrescribir o extender la configuración de partículas desde el archivo `functions.php` de tu tema o un plugin personalizado. Este es el enfoque recomendado para desarrolladores porque mantiene la configuración en PHP y evita JSON en línea.

### Filtro Básico

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {
    $options['background'] = ['color' => '#0d1117'];
    $options['particles']['number']['value'] = 100;
    $options['particles']['color']['value'] = '#00d4ff';
    $options['particles']['shape']['type'] = 'circle';
    $options['particles']['opacity']['value'] = 0.6;
    $options['particles']['size']['value'] = ['min' => 2, 'max' => 5];
    $options['particles']['links']['enable'] = true;
    $options['particles']['links']['distance'] = 150;
    $options['particles']['links']['color'] = '#00d4ff';
    $options['particles']['links']['opacity'] = 0.3;
    $options['particles']['move']['enable'] = true;
    $options['particles']['move']['speed'] = 1.5;
    $options['particles']['move']['outModes']['default'] = 'bounce';
    return $options;
});
```

Este filtro se ejecuta antes de que el shortcode o bloque se renderice, por lo que cualquier instancia de tsParticles en la página recibe la configuración personalizada.

---

## Configuración Personalizada mediante Filtro

Aquí hay una configuración personalizada completa que demuestra todo el poder del filtro — incluyendo interactividad, múltiples tipos de formas y soporte de temas.

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // Fondo de pantalla completa
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // Ajustes de partículas
    $options['particles'] = [
        'number' => [
            'value' => 60,
            'density' => ['enable' => true, 'width' => 800, 'height' => 800],
        ],
        'color' => [
            'value' => ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
        ],
        'shape' => [
            'type' => ['circle', 'triangle', 'polygon'],
            'options' => [
                'polygon' => ['sides' => 6],
            ],
        ],
        'opacity' => [
            'value' => ['min' => 0.4, 'max' => 0.8],
        ],
        'size' => [
            'value' => ['min' => 3, 'max' => 8],
        ],
        'links' => [
            'enable' => true,
            'distance' => 200,
            'color' => '#ffffff',
            'opacity' => 0.15,
            'width' => 1,
        ],
        'move' => [
            'enable' => true,
            'speed' => 2,
            'direction' => 'none',
            'random' => true,
            'straight' => false,
            'outModes' => ['default' => 'out'],
        ],
    ];

    // Interactividad
    $options['interactivity'] = [
        'events' => [
            'onHover' => ['enable' => true, 'mode' => 'attract'],
            'onClick' => ['enable' => true, 'mode' => 'repulse'],
        ],
        'modes' => [
            'attract' => ['distance' => 200, 'duration' => 0.4, 'factor' => 1],
            'repulse' => ['distance' => 200, 'duration' => 0.4],
        ],
    ];

    // Fondo
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // Soporte de temas — modo claro
    $options['themes'] = [
        [
            'name' => 'light',
            'default' => ['value' => false],
            'options' => [
                'background' => ['color' => '#f0f0f5'],
                'particles' => [
                    'color' => ['value' => ['#e74c3c', '#2ecc71', '#3498db', '#f1c40f']],
                    'links' => ['color' => '#333333', 'opacity' => 0.2],
                ],
            ],
        ],
    ];

    return $options;
});
```

---

## Integración con Temas

Para hacer de tsParticles un fondo persistente en todo tu tema de WordPress, añade el shortcode o una llamada PHP directa al `header.php` o `footer.php` de tu tema.

### Fondo en el Header

```php
<!-- En header.php, justo después de <body> -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### Estilos de Fondo a Pantalla Completa

Añade el siguiente CSS al `style.css` de tu tema o mediante `wp_add_inline_style`:

```css
#tsparticles-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

/* Asegura que el contenido aparezca sobre las partículas */
.site-content {
  position: relative;
  z-index: 1;
}
```

### Carga Condicional

Para cargar tsParticles solo en páginas específicas:

```php
// En functions.php — encola solo en la página principal
add_action('wp', function () {
    if (is_front_page()) {
        add_filter('tsparticles_options', function (array $options): array {
            $options['particles']['number']['value'] = 120;
            $options['particles']['color']['value'] = '#ffffff';
            $options['particles']['move']['speed'] = 0.8;
            $options['background']['color'] = '#1a1a2e';
            return $options;
        });
    }
});
```

Combina esto con la colocación del bloque o shortcode para un fondo de partículas eficiente y específico para cada página.

---

Ahora tienes todo lo necesario para integrar tsParticles en un sitio WordPress. Ya sea que prefieras el editor de bloques, los shortcodes o el control PHP completo, cada enfoque te brinda un fondo de partículas único con un esfuerzo mínimo.
