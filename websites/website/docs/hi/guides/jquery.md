# jQuery इंटीग्रेशन

अपने jQuery-आधारित प्रोजेक्ट में आधिकारिक jQuery प्लगइन रैपर के साथ tsParticles को एकीकृत करें।

## इंस्टॉलेशन

### CDN के माध्यम से

jQuery, tsParticles और jQuery प्लगइन को स्क्रिप्ट टैग के माध्यम से शामिल करें:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### npm + बिल्ड के माध्यम से

आवश्यक पैकेज इंस्टॉल करें:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

अपने प्रोजेक्ट में आयात करें:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## इंजन आरंभीकरण

पार्टिकल्स रेंडर होने से पहले, tsParticles इंजन को आवश्यक सुविधाओं के साथ आरंभ किया जाना चाहिए। यह `$.particles.init` के माध्यम से किया जाता है:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **यह क्यों आवश्यक है?** tsParticles एक मॉड्यूलर आर्किटेक्चर का उपयोग करता है। `loadFull` सभी अंतर्निहित आकार, इंटरैक्शन और अपडेटर पंजीकृत करता है। आप बंडल आकार कम करने के लिए छोटे बंडल (जैसे, `tsparticles-slim`) आयात कर सकते हैं।

## मूल उपयोग

एक बार इंजन आरंभ हो जाने और DOM तैयार हो जाने पर, एक कंटेनर एलिमेंट चुनें और `.particles().load()` कॉल करें:

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

कंटेनर एलिमेंट DOM में मौजूद होना चाहिए:

```html
<div id="tsparticles"></div>
```

## कस्टम कॉन्फ़िगरेशन

`.load()` विधि पूर्ण `ISourceOptions` ऑब्जेकट स्वीकार करती है। यहाँ एक व्यापक उदाहरण है:

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## प्रीसेट लोडिंग

यदि आपने एक प्रीसेट पैकेज (जैसे `tsparticles-preset-stars`) इंस्टॉल किया है, तो इसे इंजन आरंभीकरण के दौरान लोड करें और कॉन्फ़िगरेशन में इसका संदर्भ दें:

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## इवेंट हैंडलिंग और कंटेनर नियंत्रण

`.particles()` एक jQuery प्लगइन इंस्टेंस लौटाता है। अंतर्निहित tsParticles `Container` तक पहुँचने और `play()`, `pause()`, या `destroy()` जैसी विधियाँ कॉल करने के लिए:

```javascript
const $container = $("#tsparticles");

// पार्टिकल्स लोड करें
$container.particles().load({
  /* options */
});

// कुछ सेकंड बाद प्ले/पॉज़ करें
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## पूर्ण उदाहरण

नीचे एक पूर्ण, आत्मनिर्भर HTML पेज है जो CDN के माध्यम से tsParticles लोड करता है और इंटरैक्टिव प्रभावों के साथ एक पार्टिकल दृश्य रेंडर करता है:

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
            fpsLimit: 60,
            particles: {
              number: { value: 100 },
              color: { value: "#ffffff" },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
              },
              move: {
                enable: true,
                speed: 2,
                outModes: "out",
              },
              size: {
                value: { min: 1, max: 4 },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 200, links: { opacity: 0.5 } },
                push: { quantity: 4 },
              },
            },
            background: { color: "#0d47a1" },
          });
      });
    </script>
  </body>
</html>
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## API संदर्भ

| विधि                               | विवरण                                                  |
| ---------------------------------- | ------------------------------------------------------ |
| `$.particles.init(fn)`             | लोडर कॉलबैक के साथ इंजन आरंभ करें                      |
| `$(el).particles()`                | एलिमेंट पर पार्टिकल्स प्लगइन इंस्टेंस बनाएँ            |
| `$(el).particles().load(opts)`     | पार्टिकल कॉन्फ़िगरेशन लोड और प्रारंभ करें              |
| `$(el).particles().destroy()`      | पार्टिकल इंस्टेंस नष्ट करें और साफ़ करें               |
| `$(el).particles().getContainer()` | अनिवार्य नियंत्रण के लिए अंतर्निहित `Container` लौटाएँ |
