---
title: WordPress-Anleitung
description: Vollständige Anleitung zur Integration von tsParticles mit WordPress unter Verwendung des Plugins, Blocks, Shortcodes und Theme-Integration.
---

# WordPress-Anleitung

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Plugin-Aktivierung](#plugin-activation)
3. [Widget- und Block-Verwendung](#widget-and-block-usage)
4. [Shortcode-Verwendung](#shortcode-usage)
5. [PHP-Filter-Konfiguration](#php-filter-configuration)
6. [Benutzerdefinierte Konfiguration via Filter](#custom-configuration-via-filter)
7. [Theme-Integration](#theme-integration)

---

## Installation

Das tsParticles-WordPress-Plugin ist über das WordPress-Plugin-Verzeichnis verfügbar. Installieren Sie es direkt über Ihr WordPress-Admin-Dashboard.

### Vom WordPress-Admin

1. Navigieren Sie zu **Plugins → Installieren**
2. Suchen Sie nach "tsParticles"
3. Klicken Sie bei dem tsParticles-Plugin auf **Jetzt installieren**
4. Klicken Sie auf **Aktivieren**

### Manuelle Installation

1. Laden Sie das Plugin-ZIP vom WordPress-Plugin-Verzeichnis oder der [Releases-Seite](https://github.com/tsparticles/wordpress/releases) herunter
2. Navigieren Sie zu **Plugins → Installieren → Plugin hochladen**
3. Wählen Sie die ZIP-Datei und klicken Sie auf **Jetzt installieren**
4. Klicken Sie auf **Aktivieren**

---

## Plugin-Aktivierung

Nach der Aktivierung registriert das Plugin:

- Einen **Gutenberg-Block** namens "tsParticles", der im Block-Inserter verfügbar ist
- Einen **Shortcode** `[tsparticles]` für die Verwendung im Classic Editor oder in benutzerdefinierten PHP-Vorlagen
- Einen **PHP-Filter** `tsparticles_options` für Entwickler, um die Konfiguration programmatisch einzuspritzen
- Frontend-Assets (JavaScript und CSS), die nur dann eingereiht werden, wenn der Block oder Shortcode auf der Seite vorhanden ist

Nach der Aktivierung können Sie überprüfen, ob das Plugin funktioniert, indem Sie in der WordPress-Admin-Seitenleiste auf **Einstellungen → tsParticles** gehen, wo je nach Plugin-Version eine grundlegende Einstellungsseite verfügbar sein kann.

---

## Widget- und Block-Verwendung

Das tsParticles-Plugin fügt einen benutzerdefinierten Gutenberg-Block für den Block-Editor (WordPress 5.0+) hinzu.

### Hinzufügen des Blocks

1. Bearbeiten Sie einen beliebigen Beitrag oder eine Seite mit dem Block-Editor (Gutenberg)
2. Klicken Sie auf die **+** (Block hinzufügen)-Schaltfläche
3. Suchen Sie nach "tsParticles" oder "Particles"
4. Klicken Sie auf den **tsParticles**-Block, um ihn einzufügen

### Block-Einstellungen

Nach dem Einfügen bietet das Block-Inspektor-Panel (auf der rechten Seite) folgende Einstellungen:

- **Container-ID** — eine eindeutige HTML-ID für den Partikel-Container (Standard: `tsparticles`)
- **Breite / Höhe** — explizite Abmessungen festlegen oder Vollbildmodus verwenden
- **Z-Index** — steuert die Überlagerung relativ zu anderen Inhalten
- **Konfiguration** — ein JSON-Optionsobjekt einfügen, um das Partikel-Erscheinungsbild vollständig anzupassen

Für Theme-Seitenleisten oder Widget-Bereiche, die keine Blöcke unterstützen, verwenden Sie stattdessen den [Shortcode](#shortcode-usage)-Ansatz.

---

## Shortcode-Verwendung

Verwenden Sie den `[tsparticles]`-Shortcode im Classic Editor, in benutzerdefinierten HTML-Blöcken oder direkt in PHP-Vorlagendateien, um Partikel-Hintergründe überall auf Ihrer Website einzubetten.

### Einfacher Shortcode

```
[tsparticles]
```

Dies rendert die Standard-Partikel-Konfiguration (einfach schwebende Kreise auf dunklem Hintergrund).

### Shortcode mit Optionen

Übergeben Sie JSON-Konfiguration direkt im Shortcode mit dem `options`-Attribut:

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### Shortcode in PHP-Vorlagen

```php
// In der header.php oder footer.php Ihres Themes
echo do_shortcode('[tsparticles]');
```

Oder mit benutzerdefinierten Optionen:

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

## PHP-Filter-Konfiguration

Das Plugin stellt einen `tsparticles_options`-Filter bereit, mit dem Sie die Partikel-Konfiguration aus Ihrer `functions.php`-Datei des Themes oder einem benutzerdefinierten Plugin überschreiben oder erweitern können. Dies ist der empfohlene Ansatz für Entwickler, da er die Konfiguration in PHP hält und Inline-JSON vermeidet.

### Einfacher Filter

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

Dieser Filter wird ausgeführt, bevor der Shortcode oder Block rendert, sodass jede Instanz von tsParticles auf der Seite die angepasste Konfiguration erhält.

---

## Benutzerdefinierte Konfiguration via Filter

Hier ist eine vollständige benutzerdefinierte Konfiguration, die die volle Leistungsfähigkeit des Filters demonstriert — einschließlich Interaktivität, mehreren Formtypen und Theme-Unterstützung.

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // Vollbild-Hintergrund
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // Partikel-Einstellungen
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

    // Interaktivität
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

    // Hintergrund
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // Theme-Unterstützung — Hellmodus-Umschaltung
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

## Theme-Integration

Um tsParticles zu einem dauerhaften Hintergrund in Ihrem gesamten WordPress-Theme zu machen, fügen Sie den Shortcode oder einen direkten PHP-Aufruf in die `header.php` oder `footer.php` Ihres Themes ein.

### Header-Hintergrund

```php
<!-- In header.php, direkt nach <body> -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### Vollbild-Hintergrund-Styles

Fügen Sie das folgende CSS zu Ihrer `style.css` des Themes oder via `wp_add_inline_style` hinzu:

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

/* Stellen Sie sicher, dass der Inhalt über den Partikeln erscheint */
.site-content {
  position: relative;
  z-index: 1;
}
```

### Bedingtes Laden

Um tsParticles nur auf bestimmten Seiten zu laden:

```php
// In functions.php — nur auf der Startseite einreihen
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

Kombinieren Sie dies mit der Block- oder Shortcode-Platzierung für einen leistungsfähigen, seiten-spezifischen Partikel-Hintergrund.

---

Sie haben jetzt alles, was Sie benötigen, um tsParticles in eine WordPress-Seite zu integrieren. Egal, ob Sie den Block-Editor, Shortcodes oder die vollständige PHP-Steuerung bevorzugen, jeder Ansatz gibt Ihnen einen einzigartigen Partikel-Hintergrund mit minimalem Aufwand.
