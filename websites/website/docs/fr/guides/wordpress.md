---
title: Guide WordPress
description: Guide complet pour intégrer tsParticles avec WordPress en utilisant le plugin, les blocs, les shortcodes et l'intégration de thème.
---

# Guide WordPress

## Table des matières

1. [Installation](#installation)
2. [Activation du plugin](#activation-du-plugin)
3. [Utilisation du widget et du bloc](#utilisation-du-widget-et-du-bloc)
4. [Utilisation du shortcode](#utilisation-du-shortcode)
5. [Configuration via filtre PHP](#configuration-via-filtre-php)
6. [Configuration personnalisée via filtre](#configuration-personnalisée-via-filtre)
7. [Intégration dans un thème](#intégration-dans-un-thème)

---

## Installation

Le plugin WordPress tsParticles est disponible via l'annuaire des plugins WordPress. Installez-le directement depuis votre tableau de bord WordPress.

### Depuis l'administration WordPress

1. Allez dans **Plugins → Ajouter**
2. Recherchez "tsParticles"
3. Cliquez sur **Installer maintenant** sur le plugin tsParticles
4. Cliquez sur **Activer**

### Installation manuelle

1. Téléchargez le ZIP du plugin depuis l'annuaire des plugins WordPress ou la [page des versions](https://github.com/tsparticles/wordpress/releases)
2. Allez dans **Plugins → Ajouter → Téléverser un plugin**
3. Choisissez le fichier ZIP et cliquez sur **Installer maintenant**
4. Cliquez sur **Activer**

---

## Activation du plugin

Une fois activé, le plugin enregistre :

- Un **bloc Gutenberg** nommé "tsParticles" disponible dans l'inséreur de blocs
- Un **shortcode** `[tsparticles]` pour une utilisation dans l'éditeur classique ou les templates PHP personnalisés
- Un **filtre PHP** `tsparticles_options` pour que les développeurs puissent injecter une configuration par programmation
- Des ressources front-end (JavaScript et CSS) qui ne sont mises en file d'attente que lorsque le bloc ou le shortcode est présent sur la page

Après activation, vous pouvez vérifier que le plugin fonctionne en visitant **Réglages → tsParticles** dans la barre latérale d'administration WordPress, où une page de réglages de base peut être disponible selon la version du plugin.

---

## Utilisation du widget et du bloc

Le plugin tsParticles ajoute un bloc Gutenberg personnalisé pour l'éditeur de blocs (WordPress 5.0+).

### Ajout du bloc

1. Modifiez n'importe quel article ou page avec l'éditeur de blocs (Gutenberg)
2. Cliquez sur le bouton **+** (Ajouter un bloc)
3. Recherchez "tsParticles" ou "Particles"
4. Cliquez sur le bloc **tsParticles** pour l'insérer

### Paramètres du bloc

Une fois inséré, le panneau d'inspection du bloc (sur le côté droit) fournit des réglages :

- **ID du conteneur** — un ID HTML unique pour le conteneur de particules (défaut : `tsparticles`)
- **Largeur / Hauteur** — définissez des dimensions explicites ou utilisez le mode plein écran
- **Z-Index** — contrôle la superposition par rapport aux autres contenus
- **Configuration** — collez un objet JSON d'options pour personnaliser entièrement l'apparence des particules

Pour les barres latérales de thème ou les zones de widgets qui ne prennent pas en charge les blocs, utilisez plutôt l'approche [Shortcode](#utilisation-du-shortcode).

---

## Utilisation du shortcode

Utilisez le shortcode `[tsparticles]` dans l'éditeur classique, les blocs HTML personnalisés, ou directement dans les fichiers template PHP pour intégrer des arrière-plans de particules n'importe où sur votre site.

### Shortcode de base

```
[tsparticles]
```

Ceci affiche la configuration de particules par défaut (cercles flottants simples sur fond sombre).

### Shortcode avec options

Passez une configuration JSON directement dans le shortcode en utilisant l'attribut `options` :

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### Shortcode dans les templates PHP

```php
// Dans le header.php ou footer.php de votre thème
echo do_shortcode('[tsparticles]');
```

Ou avec des options personnalisées :

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

## Configuration via filtre PHP

Le plugin expose un filtre `tsparticles_options` qui vous permet de remplacer ou d'étendre la configuration des particules depuis le fichier `functions.php` de votre thème ou un plugin personnalisé. C'est l'approche recommandée pour les développeurs car elle garde la configuration en PHP et évite le JSON en ligne.

### Filtre de base

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

Ce filtre s'exécute avant le rendu du shortcode ou du bloc, donc toute instance de tsParticles sur la page reçoit la configuration personnalisée.

---

## Configuration personnalisée via filtre

Voici une configuration personnalisée complète qui démontre toute la puissance du filtre — incluant l'interactivité, les types de formes multiples et le support des thèmes.

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // Arrière-plan plein écran
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // Paramètres des particules
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

    // Interactivité
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

    // Arrière-plan
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // Support des thèmes — basculement en mode clair
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

## Intégration dans un thème

Pour faire de tsParticles un arrière-plan persistant sur tout votre thème WordPress, ajoutez le shortcode ou un appel PHP direct dans le `header.php` ou `footer.php` de votre thème.

### Arrière-plan dans l'en-tête

```php
<!-- Dans header.php, juste après <body> -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### Styles d'arrière-plan plein écran

Ajoutez le CSS suivant au `style.css` de votre thème ou via `wp_add_inline_style` :

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

/* Assurez-vous que le contenu apparaît au-dessus des particules */
.site-content {
  position: relative;
  z-index: 1;
}
```

### Chargement conditionnel

Pour charger tsParticles uniquement sur des pages spécifiques :

```php
// Dans functions.php — mettre en file d'attente uniquement sur la page d'accueil
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

Combinez ceci avec le placement du bloc ou du shortcode pour un arrière-plan de particules performant et spécifique à une page.

---

Vous avez maintenant tout ce qu'il faut pour intégrer tsParticles dans un site WordPress. Que vous préfériez l'éditeur de blocs, les shortcodes ou le contrôle PHP complet, chaque approche vous offre un arrière-plan de particules unique avec un effort minimal.
