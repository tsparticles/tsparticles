---
title: Guia WordPress
description: Guia completo para integrar tsParticles com WordPress usando o plugin, blocos, shortcodes e integração com temas.
---

# Guia WordPress

## Índice

1. [Instalação](#instalação)
2. [Ativação do Plugin](#ativação-do-plugin)
3. [Uso de Widget e Bloco](#uso-de-widget-e-bloco)
4. [Uso de Shortcode](#uso-de-shortcode)
5. [Configuração via Filtro PHP](#configuração-via-filtro-php)
6. [Configuração Personalizada via Filtro](#configuração-personalizada-via-filtro)
7. [Integração com Temas](#integração-com-temas)

---

## Instalação

O plugin tsParticles para WordPress está disponível através do Diretório de Plugins do WordPress. Instale-o diretamente do painel administrativo do WordPress.

### No Painel WordPress

1. Navegue até **Plugins → Adicionar Novo**
2. Pesquise por "tsParticles"
3. Clique em **Instalar Agora** no plugin tsParticles
4. Clique em **Ativar**

### Instalação Manual

1. Baixe o ZIP do plugin do Diretório de Plugins do WordPress ou da [página de releases](https://github.com/tsparticles/wordpress/releases)
2. Navegue até **Plugins → Adicionar Novo → Enviar Plugin**
3. Escolha o arquivo ZIP e clique em **Instalar Agora**
4. Clique em **Ativar**

---

## Ativação do Plugin

Uma vez ativado, o plugin registra:

- Um **bloco Gutenberg** chamado "tsParticles" disponível no inseridor de blocos
- Um **shortcode** `[tsparticles]` para uso no Editor Clássico ou em templates PHP personalizados
- Um **filtro PHP** `tsparticles_options` para desenvolvedores injetarem configuração programaticamente
- Assets front-end (JavaScript e CSS) que são enfileirados apenas quando o bloco ou shortcode está presente na página

Após a ativação, você pode verificar se o plugin está funcionando visitando **Configurações → tsParticles** na barra lateral do admin WordPress, onde uma página de configurações básicas pode estar disponível dependendo da versão do plugin.

---

## Uso de Widget e Bloco

O plugin tsParticles adiciona um bloco Gutenberg personalizado para o editor de blocos (WordPress 5.0+).

### Adicionando o Bloco

1. Edite qualquer post ou página com o editor de blocos (Gutenberg)
2. Clique no botão **+** (Adicionar Bloco)
3. Pesquise por "tsParticles" ou "Particles"
4. Clique no bloco **tsParticles** para inseri-lo

### Configurações do Bloco

Uma vez inserido, o painel de inspeção do bloco (no lado direito) fornece configurações:

- **ID do Container** — um ID HTML único para o container de partículas (padrão: `tsparticles`)
- **Largura / Altura** — defina dimensões explícitas ou use o modo tela cheia
- **Z-Index** — controla a camada em relação a outro conteúdo
- **Configuração** — cole um objeto JSON de opções para personalizar completamente a aparência das partículas

Para áreas de sidebar do tema ou widgets que não suportam blocos, use a abordagem de [Shortcode](#uso-de-shortcode).

---

## Uso de Shortcode

Use o shortcode `[tsparticles]` no Editor Clássico, blocos HTML personalizados ou diretamente em arquivos de template PHP para incorporar fundos de partículas em qualquer lugar do seu site.

### Shortcode Básico

```
[tsparticles]
```

Isso renderiza a configuração padrão de partículas (círculos flutuantes simples em fundo escuro).

### Shortcode com Opções

Passe configuração JSON diretamente no shortcode usando o atributo `options`:

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### Shortcode em Templates PHP

```php
// No header.php ou footer.php do seu tema
echo do_shortcode('[tsparticles]');
```

Ou com opções personalizadas:

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

## Configuração via Filtro PHP

O plugin expõe um filtro `tsparticles_options` que permite sobrescrever ou estender a configuração das partículas a partir do arquivo `functions.php` do seu tema ou de um plugin personalizado. Esta é a abordagem recomendada para desenvolvedores porque mantém a configuração em PHP e evita JSON inline.

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

Este filtro é executado antes do shortcode ou bloco renderizar, então qualquer instância de tsParticles na página recebe a configuração personalizada.

---

## Configuração Personalizada via Filtro

Aqui está uma configuração personalizada completa que demonstra todo o poder do filtro — incluindo interatividade, múltiplos tipos de forma e suporte a temas.

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // Fundo tela cheia
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // Configurações das partículas
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

    // Interatividade
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

    // Fundo
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // Suporte a tema — alternância para modo claro
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

## Integração com Temas

Para tornar o tsParticles um fundo persistente em todo o seu tema WordPress, adicione o shortcode ou uma chamada PHP direta ao `header.php` ou `footer.php` do seu tema.

### Fundo no Cabeçalho

```php
<!-- No header.php, logo após <body> -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### Estilos de Fundo Tela Cheia

Adicione o seguinte CSS ao `style.css` do seu tema ou via `wp_add_inline_style`:

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

/* Garantir que o conteúdo apareça acima das partículas */
.site-content {
  position: relative;
  z-index: 1;
}
```

### Carregamento Condicional

Para carregar tsParticles apenas em páginas específicas:

```php
// Em functions.php — enfileirar apenas na página inicial
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

Combine isso com a colocação do bloco ou shortcode para um fundo de partículas eficiente e específico por página.

---

Você tem agora tudo que precisa para integrar tsParticles em um site WordPress. Quer prefira o editor de blocos, shortcodes ou controle total via PHP, cada abordagem fornece um fundo de partículas único com esforço mínimo.
