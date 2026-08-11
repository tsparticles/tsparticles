---
title: Guida WordPress
description: Guida completa per integrare tsParticles con WordPress usando il plugin, blocchi, shortcode e integrazione tema.
---

# Guida WordPress

## Indice dei Contenuti

1. [Installazione](#installazione)
2. [Attivazione del Plugin](#attivazione-del-plugin)
3. [Utilizzo Widget e Blocco](#utilizzo-widget-e-blocco)
4. [Utilizzo Shortcode](#utilizzo-shortcode)
5. [Configurazione tramite Filtro PHP](#configurazione-tramite-filtro-php)
6. [Configurazione Personalizzata tramite Filtro](#configurazione-personalizzata-tramite-filtro)
7. [Integrazione Tema](#integrazione-tema)

---

## Installazione

Il plugin tsParticles per WordPress è disponibile nella Directory dei Plugin di WordPress. Installalo direttamente dalla dashboard di amministrazione di WordPress.

### Dalla Dashboard WordPress

1. Vai su **Plugin → Aggiungi Nuovo**
2. Cerca "tsParticles"
3. Clicca **Installa Ora** sul plugin tsParticles
4. Clicca **Attiva**

### Installazione Manuale

1. Scarica il file ZIP del plugin dalla Directory dei Plugin di WordPress o dalla [pagina delle release](https://github.com/tsparticles/wordpress/releases)
2. Vai su **Plugin → Aggiungi Nuovo → Carica Plugin**
3. Scegli il file ZIP e clicca **Installa Ora**
4. Clicca **Attiva**

---

## Attivazione del Plugin

Una volta attivato, il plugin registra:

- Un **blocco Gutenberg** chiamato "tsParticles" disponibile nell'inseritore di blocchi
- Uno **shortcode** `[tsparticles]` per l'uso nell'Editor Classico o nei template PHP personalizzati
- Un **filtro PHP** `tsparticles_options` per gli sviluppatori per iniettare la configurazione programmaticamente
- Asset front-end (JavaScript e CSS) che vengono accodati solo quando il blocco o lo shortcode è presente sulla pagina

Dopo l'attivazione, puoi verificare che il plugin funzioni visitando **Impostazioni → tsParticles** nella barra laterale di amministrazione di WordPress, dove potrebbe essere disponibile una pagina di impostazioni di base a seconda della versione del plugin.

---

## Utilizzo Widget e Blocco

Il plugin tsParticles aggiunge un blocco Gutenberg personalizzato per l'editor a blocchi (WordPress 5.0+).

### Aggiungere il Blocco

1. Modifica qualsiasi articolo o pagina con l'editor a blocchi (Gutenberg)
2. Clicca sul pulsante **+** (Aggiungi Blocco)
3. Cerca "tsParticles" o "Particelle"
4. Clicca sul blocco **tsParticles** per inserirlo

### Impostazioni del Blocco

Una volta inserito, il pannello di ispezione del blocco (sul lato destro) fornisce le impostazioni:

- **ID Container** — un ID HTML univoco per il container delle particelle (predefinito: `tsparticles`)
- **Larghezza / Altezza** — imposta dimensioni esplicite o usa la modalità a schermo intero
- **Z-Index** — controlla la stratificazione rispetto ad altri contenuti
- **Configurazione** — incolla un oggetto opzioni JSON per personalizzare completamente l'aspetto delle particelle

Per aree widget o sidebar del tema che non supportano blocchi, usa invece l'approccio [Shortcode](#utilizzo-shortcode).

---

## Utilizzo Shortcode

Usa lo shortcode `[tsparticles]` nell'Editor Classico, blocchi HTML personalizzati o direttamente nei file template PHP per incorporare sfondi di particelle ovunque nel tuo sito.

### Shortcode Base

```
[tsparticles]
```

Questo renderizza la configurazione predefinita delle particelle (semplici cerchi fluttuanti su sfondo scuro).

### Shortcode con Opzioni

Passa la configurazione JSON direttamente nello shortcode usando l'attributo `options`:

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### Shortcode nei Template PHP

```php
// Nel tuo tema header.php o footer.php
echo do_shortcode('[tsparticles]');
```

Oppure con opzioni personalizzate:

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

## Configurazione tramite Filtro PHP

Il plugin espone un filtro `tsparticles_options` che ti permette di sovrascrivere o estendere la configurazione delle particelle dal file `functions.php` del tuo tema o da un plugin personalizzato. Questo è l'approccio consigliato per gli sviluppatori perché mantiene la configurazione in PHP ed evita JSON inline.

### Filtro Base

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

Questo filtro viene eseguito prima che lo shortcode o il blocco venga renderizzato, quindi qualsiasi istanza di tsParticles sulla pagina riceve la configurazione personalizzata.

---

## Configurazione Personalizzata tramite Filtro

Ecco una configurazione personalizzata completa che dimostra tutta la potenza del filtro — inclusa interattività, tipi di forma multipli e supporto tema.

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // Sfondo a schermo intero
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // Impostazioni particelle
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

    // Interattività
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

    // Sfondo
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // Supporto tema — modalità chiara
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

## Integrazione Tema

Per rendere tsParticles uno sfondo persistente in tutto il tuo tema WordPress, aggiungi lo shortcode o una chiamata PHP diretta al file `header.php` o `footer.php` del tuo tema.

### Sfondo nell'Header

```php
<!-- In header.php, subito dopo <body> -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### Stili per Sfondo a Schermo Intero

Aggiungi il seguente CSS al file `style.css` del tuo tema o tramite `wp_add_inline_style`:

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

/* Assicura che il contenuto appaia sopra le particelle */
.site-content {
  position: relative;
  z-index: 1;
}
```

### Caricamento Condizionale

Per caricare tsParticles solo su pagine specifiche:

```php
// In functions.php — accoda solo nella pagina principale
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

Combina questo con il posizionamento del blocco o dello shortcode per uno sfondo di particelle performante e specifico per pagina.

---

Ora hai tutto il necessario per integrare tsParticles in un sito WordPress. Che tu preferisca l'editor a blocchi, gli shortcode o il controllo PHP completo, ogni approccio ti offre uno sfondo di particelle unico con il minimo sforzo.
