[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# jquery-particles

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Албан ёсны [tsParticles](https://github.com/matteobruni/tsparticles) jQuery залгаас

## Татах

```shell script
npm install jquery-particles jquery
```

эсвэл jsDelivr -ээс

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)

```html
<!-- эхлээд tsParticles -ийн оруулах -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles"></script>

<!-- дараа нь jquery wrapper оруулах -->
<script src="https://cdn.jsdelivr.net/npm/jquery-particles"></script>
```

## Хэрхэн ашиглах

HTML

```html
<div id="tsparticles"></div>
```

```javascript
$("#tsparticles")
  .particles()
  .init(
    {
      background: {
        color: {
          value: "#0d47a1",
        },
      },
      fpsLimit: 60,
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
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    },
    function (container) {
      // container бол тоглох/зогсоох эсвэл зогсоох/эхлүүлэж болох particles агуулагч.
      // container аль хэдийн эхэлсэн учир гар аргаар эхлүүлэх шаардлагагүй.
    }
  );
// эсвэл

$("#tsparticles")
  .particles()
  .ajax("particles.json", function (container) {
    // container бол тоглох/зогсоох эсвэл зогсоох/эхлүүлэж болох particles агуулагч.
    // container аль хэдийн эхэлсэн учир гар аргаар эхлүүлэх шаардлагагүй.
  });
```

## Жишээ

Жишээ [энд](https://particles.js.org)

<https://particles.js.org>

CodePen -ий байнга шинэчлэгдэж байдаг цуглуулга [энд](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
