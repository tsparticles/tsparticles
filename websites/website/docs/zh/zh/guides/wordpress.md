---
title: WordPress 指南
description: 使用插件、块、短代码和主题集成将 tsParticles 与 WordPress 集成的完整指南。
---

# WordPress 指南

## 目录

1. [安装](#installation)
2. [插件激活](#plugin-activation)
3. [小工具和块使用](#widget-and-block-usage)
4. [短代码使用](#shortcode-usage)
5. [PHP 过滤器配置](#php-filter-configuration)
6. [通过过滤器自定义配置](#custom-configuration-via-filter)
7. [主题集成](#theme-integration)

---

## 安装

tsParticles WordPress 插件可通过 WordPress 插件目录获取。直接从你的 WordPress 管理后台安装。

### 从 WordPress 管理后台

1. 导航至 **插件 → 安装插件**
2. 搜索 "tsParticles"
3. 在 tsParticles 插件上点击 **立即安装**
4. 点击 **启用**

### 手动安装

1. 从 WordPress 插件目录或[发布页面](https://github.com/tsparticles/wordpress/releases)下载插件 ZIP 文件
2. 导航至 **插件 → 安装插件 → 上传插件**
3. 选择 ZIP 文件并点击 **立即安装**
4. 点击 **启用**

---

## 插件激活

激活后，插件将注册：

- 一个名为 "tsParticles" 的 **Gutenberg 块**，可在块插入器中使用
- 一个 `[tsparticles]` **短代码**，用于经典编辑器或自定义 PHP 模板
- 一个 **PHP 过滤器** `tsparticles_options`，供开发者以编程方式注入配置
- 前端资源（JavaScript 和 CSS），仅在页面中存在块或短代码时才会入列

激活后，你可以通过访问 WordPress 管理侧边栏中的 **设置 → tsParticles** 来验证插件是否正常工作，根据插件版本，可能会显示一个基本设置页面。

---

## 小工具和块使用

tsParticles 插件为块编辑器（WordPress 5.0+）添加了一个自定义的 Gutenberg 块。

### 添加块

1. 使用块编辑器（Gutenberg）编辑任何文章或页面
2. 点击 **+**（添加块）按钮
3. 搜索 "tsParticles" 或 "Particles"
4. 点击 **tsParticles** 块以插入

### 块设置

插入后，块检查器面板（右侧）提供以下设置：

- **容器 ID** — 粒子容器的唯一 HTML ID（默认：`tsparticles`）
- **宽度 / 高度** — 设置明确的尺寸或使用全屏模式
- **Z-Index** — 控制相对于其他内容的层级
- **配置** — 粘贴 JSON 配置对象以完全自定义粒子外观

对于不支持块的主题侧边栏或小工具区域，请改用[短代码](#shortcode-usage)方式。

---

## 短代码使用

在经典编辑器、自定义 HTML 块或直接在 PHP 模板文件中使用 `[tsparticles]` 短代码，在站点任意位置嵌入粒子背景。

### 基本短代码

```
[tsparticles]
```

这将渲染默认的粒子配置（深色背景上的简单浮动圆形）。

### 带选项的短代码

使用 `options` 属性直接在短代码中传入 JSON 配置：

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### 在 PHP 模板中的短代码

```php
// 在你的主题的 header.php 或 footer.php 中
echo do_shortcode('[tsparticles]');
```

或者使用自定义选项：

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

## PHP 过滤器配置

插件暴露了一个 `tsparticles_options` 过滤器，让你可以从主题的 `functions.php` 文件或自定义插件中覆盖或扩展粒子配置。这是推荐给开发者的方式，因为它将配置保留在 PHP 中，避免了内联 JSON。

### 基本过滤器

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

此过滤器在短代码或块渲染之前运行，因此页面上任何 tsParticles 实例都会收到自定义配置。

---

## 通过过滤器自定义配置

以下是一个完整的自定义配置，展示了过滤器的全部功能——包括交互功能、多种形状类型和主题支持。

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // 全屏背景
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // 粒子设置
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

    // 交互
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

    // 背景
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // 主题支持——浅色模式切换
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

## 主题集成

要将 tsParticles 作为整个 WordPress 主题的持久背景，将短代码或直接 PHP 调用添加到主题的 `header.php` 或 `footer.php`。

### 页眉背景

```php
<!-- 在 header.php 中，紧跟 <body> 之后 -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### 全屏背景样式

将以下 CSS 添加到主题的 `style.css` 或通过 `wp_add_inline_style` 添加：

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

/* 确保内容出现在粒子之上 */
.site-content {
  position: relative;
  z-index: 1;
}
```

### 有条件的加载

要仅在特定页面上加载 tsParticles：

```php
// 在 functions.php 中——仅在前台页面入列
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

将其与块或短代码放置结合使用，可创建高性能、页面特定的粒子背景。

---

你现在已拥有将 tsParticles 集成到 WordPress 站点所需的全部内容。无论你偏好块编辑器、短代码还是完整的 PHP 控制，每种方式都能以最小的努力为你带来独特的粒子背景。
