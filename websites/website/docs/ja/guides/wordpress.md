---
title: WordPress Guide
description: Complete guide for integrating tsParticles with WordPress using the plugin, blocks, shortcodes, and theme integration.
---

# WordPress Guide

## Table of Contents

1. [Installation](#installation)
2. [Plugin Activation](#plugin-activation)
3. [Widget and Block Usage](#widget-and-block-usage)
4. [Shortcode Usage](#shortcode-usage)
5. [PHP Filter Configuration](#php-filter-configuration)
6. [Custom Configuration via Filter](#custom-configuration-via-filter)
7. [Theme Integration](#theme-integration)

---

## Installation

The tsParticles WordPress plugin is available through the WordPress Plugin Directory. Install it directly from your WordPress admin dashboard.

### From WordPress Admin

1. Navigate to **Plugins → Add New**
2. Search for "tsParticles"
3. Click **Install Now** on the tsParticles plugin
4. Click **Activate**

### Manual Installation

1. Download the plugin ZIP from the WordPress Plugin Directory or the [releases page](https://github.com/tsparticles/wordpress/releases)
2. Navigate to **Plugins → Add New → Upload Plugin**
3. Choose the ZIP file and click **Install Now**
4. Click **Activate**

---

## Plugin Activation

Once activated, the plugin registers:

- A **Gutenberg block** named "tsParticles" available in the block inserter
- A **shortcode** `[tsparticles]` for use in the Classic Editor or custom PHP templates
- A **PHP filter** `tsparticles_options` for developers to inject configuration programmatically
- Front-end assets (JavaScript and CSS) that are enqueued only when the block or shortcode is present on the page

After activation, you can verify the plugin is working by visiting **Settings → tsParticles** in the WordPress admin sidebar, where a basic settings page may be available depending on the plugin version.

---

## Widget and Block Usage

The tsParticles plugin adds a custom Gutenberg block for the block editor (WordPress 5.0+).

### Adding the Block

1. Edit any post or page with the block editor (Gutenberg)
2. Click the **+** (Add Block) button
3. Search for "tsParticles" or "Particles"
4. Click the **tsParticles** block to insert it

### Block Settings

Once inserted, the block inspector panel (on the right side) provides settings:

- **Container ID** — a unique HTML ID for the particle container (default: `tsparticles`)
- **Width / Height** — set explicit dimensions or use full-screen mode
- **Z-Index** — controls layering relative to other content
- **Configuration** — paste a JSON options object to fully customize the particle appearance

For theme-sidebar or widget areas that do not support blocks, use the [Shortcode](#shortcode-usage) approach instead.

---

## Shortcode Usage

Use the `[tsparticles]` shortcode in the Classic Editor, custom HTML blocks, or directly in PHP template files to embed particle backgrounds anywhere on your site.

### Basic Shortcode

```
[tsparticles]
```

This renders the default particle configuration (simple floating circles on a dark background).

### Shortcode with Options

Pass JSON configuration directly in the shortcode using the `options` attribute:

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### Shortcode in PHP Templates

```php
// In your theme's header.php or footer.php
echo do_shortcode('[tsparticles]');
```

Or with custom options:

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

## PHP Filter Configuration

The plugin exposes a `tsparticles_options` filter that lets you override or extend the particle configuration from your theme's `functions.php` file or a custom plugin. This is the recommended approach for developers because it keeps configuration in PHP and avoids inline JSON.

### Basic Filter

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

This filter runs before the shortcode or block renders, so any instance of tsParticles on the page receives the customized configuration.

---

## Custom Configuration via Filter

Here is a complete custom configuration that demonstrates the full power of the filter — including interactivity, multiple shape types, and theme support.

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // Full-screen background
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // Particle settings
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

    // Interactivity
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

    // Background
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // Theme support — light mode toggle
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

## Theme Integration

To make tsParticles a persistent background across your entire WordPress theme, add the shortcode or a direct PHP call to your theme's `header.php` or `footer.php`.

### Header Background

```php
<!-- In header.php, right after <body> -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### Full-Screen Background Styles

Add the following CSS to your theme's `style.css` or via `wp_add_inline_style`:

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

/* Ensure content appears above the particles */
.site-content {
  position: relative;
  z-index: 1;
}
```

### Conditional Loading

To load tsParticles only on specific pages:

```php
// In functions.php — enqueue only on the front page
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

Combine this with the block or shortcode placement for a performant, page-specific particle background.

---

You now have everything needed to integrate tsParticles into a WordPress site. Whether you prefer the block editor, shortcodes, or full PHP control, each approach gives you a unique particle background with minimal effort.
