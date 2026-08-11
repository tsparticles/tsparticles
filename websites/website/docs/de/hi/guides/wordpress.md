---
title: वर्डप्रेस गाइड
description: प्लगइन, ब्लॉक, शॉर्टकोड और थीम एकीकरण का उपयोग करके tsParticles को वर्डप्रेस के साथ एकीकृत करने की पूर्ण मार्गदर्शिका।
---

# वर्डप्रेस गाइड

## विषय सूची

1. [स्थापना](#installation)
2. [प्लगइन सक्रियण](#plugin-activation)
3. [विजेट और ब्लॉक उपयोग](#widget-and-block-usage)
4. [शॉर्टकोड उपयोग](#shortcode-usage)
5. [PHP फ़िल्टर कॉन्फ़िगरेशन](#php-filter-configuration)
6. [फ़िल्टर के माध्यम से कस्टम कॉन्फ़िगरेशन](#custom-configuration-via-filter)
7. [थीम एकीकरण](#theme-integration)

---

## स्थापना

tsParticles वर्डप्रेस प्लगइन वर्डप्रेस प्लगइन निर्देशिका के माध्यम से उपलब्ध है। इसे सीधे अपने वर्डप्रेस एडमिन डैशबोर्ड से स्थापित करें।

### वर्डप्रेस एडमिन से

1. **प्लगइन → नया जोड़ें** पर जाएँ
2. "tsParticles" खोजें
3. tsParticles प्लगइन पर **अभी स्थापित करें** क्लिक करें
4. **सक्रिय करें** क्लिक करें

### मैन्युअल स्थापना

1. वर्डप्रेस प्लगइन निर्देशिका या [रिलीज़ पेज](https://github.com/tsparticles/wordpress/releases) से प्लगइन ZIP डाउनलोड करें
2. **प्लगइन → नया जोड़ें → प्लगइन अपलोड करें** पर जाएँ
3. ZIP फ़ाइल चुनें और **अभी स्थापित करें** क्लिक करें
4. **सक्रिय करें** क्लिक करें

---

## प्लगइन सक्रियण

सक्रिय होने के बाद, प्लगइन पंजीकृत करता है:

- एक **गुटेनबर्ग ब्लॉक** जिसका नाम "tsParticles" है, जो ब्लॉक इन्सर्टर में उपलब्ध है
- एक **शॉर्टकोड** `[tsparticles]` क्लासिक एडिटर या कस्टम PHP टेम्पलेट में उपयोग के लिए
- एक **PHP फ़िल्टर** `tsparticles_options` डेवलपर्स के लिए प्रोग्रामेटिक रूप से कॉन्फ़िगरेशन इंजेक्ट करने हेतु
- फ्रंट-एंड संसाधन (जावास्क्रिप्ट और CSS) जो केवल तभी एनक्यू किए जाते हैं जब पृष्ठ पर ब्लॉक या शॉर्टकोड मौजूद हो

सक्रियण के बाद, आप वर्डप्रेस एडमिन साइडबार में **सेटिंग → tsParticles** पर जाकर सत्यापित कर सकते हैं कि प्लगइन काम कर रहा है, जहाँ प्लगइन संस्करण के आधार पर एक मूल सेटिंग पृष्ठ उपलब्ध हो सकता है।

---

## विजेट और ब्लॉक उपयोग

tsParticles प्लगइन ब्लॉक एडिटर (वर्डप्रेस 5.0+) के लिए एक कस्टम गुटेनबर्ग ब्लॉक जोड़ता है।

### ब्लॉक जोड़ना

1. ब्लॉक एडिटर (गुटेनबर्ग) से किसी भी पोस्ट या पृष्ठ को संपादित करें
2. **+** (ब्लॉक जोड़ें) बटन क्लिक करें
3. "tsParticles" या "Particles" खोजें
4. इसे सम्मिलित करने के लिए **tsParticles** ब्लॉक क्लिक करें

### ब्लॉक सेटिंग

सम्मिलित करने के बाद, ब्लॉक इंस्पेक्टर पैनल (दाईं ओर) सेटिंग प्रदान करता है:

- **कंटेनर आईडी** — कण कंटेनर के लिए एक अद्वितीय HTML आईडी (डिफ़ॉल्ट: `tsparticles`)
- **चौड़ाई / ऊँचाई** — स्पष्ट आयाम सेट करें या पूर्ण-स्क्रीन मोड का उपयोग करें
- **Z-इंडेक्स** — अन्य सामग्री के सापेक्ष लेयरिंग को नियंत्रित करता है
- **कॉन्फ़िगरेशन** — कण स्वरूप को पूरी तरह से अनुकूलित करने के लिए JSON ऑप्शन ऑब्जेक्ट पेस्ट करें

थीम-साइडबार या विजेट क्षेत्रों के लिए जो ब्लॉक का समर्थन नहीं करते, इसके बजाय [शॉर्टकोड](#shortcode-usage) दृष्टिकोण का उपयोग करें।

---

## शॉर्टकोड उपयोग

अपनी साइट पर कहीं भी कण पृष्ठभूमि एम्बेड करने के लिए क्लासिक एडिटर, कस्टम HTML ब्लॉक, या सीधे PHP टेम्पलेट फ़ाइलों में `[tsparticles]` शॉर्टकोड का उपयोग करें।

### मूल शॉर्टकोड

```
[tsparticles]
```

यह डिफ़ॉल्ट कण कॉन्फ़िगरेशन (गहरे रंग की पृष्ठभूमि पर सरल तैरते वृत्त) प्रस्तुत करता है।

### विकल्पों के साथ शॉर्टकोड

`options` विशेषता का उपयोग करके सीधे शॉर्टकोड में JSON कॉन्फ़िगरेशन पास करें:

```
[tsparticles options='{"particles":{"number":{"value":50},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":1,"outModes":{"default":"bounce"}}},"background":{"color":"#1a1a2e"}}']
```

### PHP टेम्पलेट में शॉर्टकोड

```php
// आपकी थीम के header.php या footer.php में
echo do_shortcode('[tsparticles]');
```

या कस्टम विकल्पों के साथ:

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

## PHP फ़िल्टर कॉन्फ़िगरेशन

प्लगइन एक `tsparticles_options` फ़िल्टर उजागर करता है जो आपको अपनी थीम की `functions.php` फ़ाइल या कस्टम प्लगइन से कण कॉन्फ़िगरेशन को ओवरराइड या विस्तारित करने देता है। यह डेवलपर्स के लिए अनुशंसित दृष्टिकोण है क्योंकि यह कॉन्फ़िगरेशन को PHP में रखता है और इनलाइन JSON से बचाता है।

### मूल फ़िल्टर

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

यह फ़िल्टर शॉर्टकोड या ब्लॉक रेंडर होने से पहले चलता है, इसलिए पृष्ठ पर tsParticles का कोई भी इंस्टेंस अनुकूलित कॉन्फ़िगरेशन प्राप्त करता है।

---

## फ़िल्टर के माध्यम से कस्टम कॉन्फ़िगरेशन

यहाँ एक पूर्ण कस्टम कॉन्फ़िगरेशन है जो फ़िल्टर की पूरी क्षमता प्रदर्शित करता है — जिसमें इंटरैक्टिविटी, एकाधिक आकार प्रकार और थीम समर्थन शामिल हैं।

```php
// functions.php
add_filter('tsparticles_options', function (array $options): array {

    // पूर्ण-स्क्रीन पृष्ठभूमि
    $options['fullScreen'] = [
        'enable' => true,
        'zIndex' => -1,
    ];

    $options['fpsLimit'] = 60;

    // कण सेटिंग
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

    // इंटरैक्टिविटी
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

    // पृष्ठभूमि
    $options['background'] = [
        'color' => '#0f0f23',
    ];

    // थीम समर्थन — लाइट मोड टॉगल
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

## थीम एकीकरण

tsParticles को अपनी पूरी वर्डप्रेस थीम में एक स्थायी पृष्ठभूमि बनाने के लिए, अपनी थीम के `header.php` या `footer.php` में शॉर्टकोड या सीधा PHP कॉल जोड़ें।

### हेडर पृष्ठभूमि

```php
<!-- header.php में, <body> के तुरंत बाद -->
<?php if (function_exists('do_shortcode')): ?>
<div id="tsparticles-background">
    <?php echo do_shortcode('[tsparticles]'); ?>
</div>
<?php endif; ?>
```

### पूर्ण-स्क्रीन पृष्ठभूमि शैलियाँ

अपनी थीम के `style.css` में या `wp_add_inline_style` के माध्यम से निम्नलिखित CSS जोड़ें:

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

/* सुनिश्चित करें कि सामग्री कणों के ऊपर दिखाई दे */
.site-content {
  position: relative;
  z-index: 1;
}
```

### सशर्त लोडिंग

केवल विशिष्ट पृष्ठों पर tsParticles लोड करने के लिए:

```php
// functions.php में — केवल मुख्य पृष्ठ पर एनक्यू करें
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

इसे ब्लॉक या शॉर्टकोड प्लेसमेंट के साथ मिलाकर एक कुशल, पृष्ठ-विशिष्ट कण पृष्ठभूमि प्राप्त करें।

---

अब आपके पास tsParticles को वर्डप्रेस साइट में एकीकृत करने के लिए आवश्यक सब कुछ है। चाहे आप ब्लॉक एडिटर, शॉर्टकोड, या पूर्ण PHP नियंत्रण पसंद करें, प्रत्येक दृष्टिकोण आपको न्यूनतम प्रयास के साथ एक अद्वितीय कण पृष्ठभूमि देता है।
