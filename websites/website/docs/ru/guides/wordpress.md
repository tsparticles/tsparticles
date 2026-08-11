---
title: WordPress Guide
description: Полное руководство по интеграции tsParticles с WordPress с использованием плагина, блоков, шорткодов и интеграции в тему.
---

# WordPress Guide

## Содержание

1. [Установка](#установка)
2. [Активация плагина](#активация-плагина)
3. [Использование виджета и блока](#использование-виджета-и-блока)
4. [Использование шорткода](#использование-шорткода)
5. [Конфигурация через PHP-фильтр](#конфигурация-через-php-фильтр)
6. [Пользовательская конфигурация через фильтр](#пользовательская-конфигурация-через-фильтр)
7. [Интеграция в тему](#интеграция-в-тему)

---

## Установка

Плагин tsParticles для WordPress доступен в каталоге плагинов WordPress. Установите его прямо из панели администратора WordPress.

### Из панели администратора WordPress

1. Перейдите в **Плагины → Добавить новый**
2. Найдите "tsParticles"
3. Нажмите **Установить сейчас** на плагине tsParticles
4. Нажмите **Активировать**

### Ручная установка

1. Скачайте ZIP-архив плагина из каталога плагинов WordPress или со [страницы релизов](https://github.com/tsparticles/wordpress/releases)
2. Перейдите в **Плагины → Добавить новый → Загрузить плагин**
3. Выберите ZIP-файл и нажмите **Установить сейчас**
4. Нажмите **Активировать**

---

## Активация плагина

После активации плагин регистрирует:

- **Блок Gutenberg** с названием "tsParticles", доступный в инсертере блоков
- **Шорткод** `[tsparticles]` для использования в классическом редакторе или пользовательских PHP-шаблонах
- **PHP-фильтр** `tsparticles_options` для разработчиков, чтобы программно внедрять конфигурацию
- Фронтенд-ресурсы (JavaScript и CSS), которые подключаются только при наличии блока или шорткода на странице

После активации вы можете проверить работу плагина, перейдя в **Настройки → tsParticles** в боковом меню администратора WordPress, где может быть доступна базовая страница настроек в зависимости от версии плагина.

---

## Использование виджета и блока

Плагин tsParticles добавляет пользовательский блок Gutenberg для редактора блоков (WordPress 5.0+).

### Добавление блока

1. Отредактируйте любую запись или страницу с помощью редактора блоков (Gutenberg)
2. Нажмите кнопку **+** (Добавить блок)
3. Найдите "tsParticles" или "Particles"
4. Нажмите на блок **tsParticles**, чтобы вставить его

### Настройки блока

После вставки панель инспектора блока (справа) предоставляет настройки:

- **Container ID** — уникальный HTML ID для контейнера частиц (по умолчанию: `tsparticles`)
- **Width / Height** — задайте явные размеры или используйте полноэкранный режим
- **Z-Index** — управляет наложением относительно другого контента
- **Configuration** — вставьте JSON-объект опций для полной настройки внешнего вида частиц

Для боковых панелей темы или областей виджетов, не поддерживающих блоки, используйте подход [Шорткод](#использование-шорткода).

---

## Использование шорткода

Используйте шорткод `[tsparticles]` в классическом редакторе, пользовательских HTML-блоках или напрямую в PHP-файлах шаблонов, чтобы встраивать фон с частицами в любом месте вашего сайта.

### Базовый шорткод

```
[tsparticles]
```

Он отображает конфигурацию частиц по умолчанию (простые плавающие круги на тёмном фоне).

### Шорткод с опциями

Передайте JSON-конфигурацию напрямую в шорткод, используя атрибут `options`:

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### Шорткод в PHP-шаблонах

```php
// В header.php или footer.php вашей темы
echo do_shortcode('[tsparticles]');
```

Или с пользовательскими опциями:

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

## Конфигурация через PHP-фильтр

Плагин предоставляет фильтр `tsparticles_options`, который позволяет переопределять или расширять конфигурацию частиц из файла `functions.php` вашей темы или пользовательского плагина. Это рекомендуемый подход для разработчиков, поскольку он хранит конфигурацию в PHP и избегает встроенного JSON.

### Базовый фильтр

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

Этот фильтр выполняется перед рендерингом шорткода или блока, поэтому любой экземпляр tsParticles на странице получает настроенную конфигурацию.

---

## Пользовательская конфигурация через фильтр

Вот полная пользовательская конфигурация, демонстрирующая всю мощь фильтра — включая интерактивность, несколько типов форм и поддержку тем.

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // Полноэкранный фон
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // Настройки частиц
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

    // Интерактивность
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

    // Фон
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // Поддержка тем — переключение светлого режима
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

## Интеграция в тему

Чтобы сделать tsParticles постоянным фоном во всей вашей теме WordPress, добавьте шорткод или прямой PHP-вызов в `header.php` или `footer.php` вашей темы.

### Фон в шапке

```php
<!-- В header.php, сразу после <body> -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### Стили для полноэкранного фона

Добавьте следующий CSS в `style.css` вашей темы или через `wp_add_inline_style`:

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

/* Убедитесь, что контент отображается поверх частиц */
.site-content {
  position: relative;
  z-index: 1;
}
```

### Условная загрузка

Чтобы загружать tsParticles только на определённых страницах:

```php
// В functions.php — подключение только на главной странице
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

Комбинируйте это с размещением блока или шорткода для производительного фона с частицами на конкретных страницах.

---

Теперь у вас есть всё необходимое для интеграции tsParticles в сайт WordPress. Предпочитаете ли вы редактор блоков, шорткоды или полный PHP-контроль — каждый подход даёт уникальный фон с частицами с минимальными усилиями.
