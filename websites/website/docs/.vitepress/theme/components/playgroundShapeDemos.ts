import type { DemoPreset } from "./playgroundTypes";

const fruitImageSrc = "https://particles.js.org/images/hdr/fruits/strawberry.png";

function base(shape: Record<string, unknown>): Record<string, unknown> {
  return {
    background: {
      color: {
        value: "#0b1120",
      },
    },
    particles: {
      move: {
        enable: true,
        speed: 1.1,
      },
      number: {
        value: 42,
      },
      opacity: {
        value: { min: 0.35, max: 0.85 },
      },
      paint: {
        fill: {
          color: {
            value: ["#60a5fa", "#34d399", "#f59e0b", "#f472b6"],
          },
          enable: true,
        },
        stroke: {
          color: {
            value: "#ffffff",
          },
          width: 0,
        },
      },
      shape,
      size: {
        value: { min: 4, max: 10 },
      },
    },
  };
}

export const shapeDemos: DemoPreset[] = [
  {
    key: "shape-circle",
    title: "Circle Shape",
    description: "Circle with explicit options block.",
    category: "background",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "circle",
      close: true,
      options: {
        circle: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-square",
    title: "Square/Edge Shape",
    description: "Square alias with explicit options block.",
    category: "background",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "square",
      close: true,
      options: {
        square: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-triangle",
    title: "Triangle Shape",
    description: "Triangle with explicit options block.",
    category: "background",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "triangle",
      close: true,
      options: {
        triangle: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-polygon",
    title: "Polygon Shape",
    description: "Polygon with sides option.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "polygon",
      close: true,
      options: {
        polygon: {
          close: true,
          sides: 6,
        },
      },
    }),
  },
  {
    key: "shape-star",
    title: "Star Shape",
    description: "Star with sides/inset options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "star",
      close: true,
      options: {
        star: {
          close: true,
          inset: 2,
          sides: 5,
        },
      },
    }),
  },
  {
    key: "shape-line",
    title: "Line Shape (Stroke)",
    description: "Line with stroke-only rendering and cap option.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: {
      ...base({
        type: "line",
        close: false,
        options: {
          line: {
            cap: "round",
            close: false,
          },
        },
      }),
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 42,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        paint: {
          fill: {
            enable: false,
          },
          stroke: {
            color: {
              value: ["#22d3ee", "#a78bfa", "#f472b6"],
            },
            width: 2,
          },
        },
        shape: {
          type: "line",
          close: false,
          options: {
            line: {
              cap: "round",
              close: false,
            },
          },
        },
        size: {
          value: { min: 10, max: 24 },
        },
      },
    },
  },
  {
    key: "shape-image",
    title: "Image Shape",
    description: "Image shape with working fruit URL and full options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: {
      ...base({
        type: "image",
        close: true,
        options: {
          image: {
            close: true,
            gif: false,
            height: 64,
            name: "strawberry",
            replaceColor: false,
            src: fruitImageSrc,
            width: 64,
          },
        },
      }),
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 18,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        paint: {
          fill: {
            color: {
              value: ["#60a5fa", "#34d399", "#f59e0b", "#f472b6"],
            },
            enable: true,
          },
          stroke: {
            color: {
              value: "#ffffff",
            },
            width: 0,
          },
        },
        shape: {
          type: "image",
          close: true,
          options: {
            image: {
              close: true,
              gif: false,
              height: 64,
              name: "strawberry",
              replaceColor: false,
              src: fruitImageSrc,
              width: 64,
            },
          },
        },
        size: {
          value: { min: 20, max: 38 },
        },
      },
    },
  },
  {
    key: "shape-text",
    title: "Text Shape",
    description: "Text shape with font/value/style/weight options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: {
      ...base({
        type: "text",
        close: true,
        options: {
          text: {
            close: true,
            font: "Verdana",
            style: "",
            value: ["TS", "DOCS", "2026"],
            weight: "700",
          },
        },
      }),
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 30,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        paint: {
          fill: {
            color: {
              value: ["#60a5fa", "#34d399", "#f59e0b", "#f472b6"],
            },
            enable: true,
          },
          stroke: {
            color: {
              value: "#ffffff",
            },
            width: 0,
          },
        },
        shape: {
          type: "text",
          close: true,
          options: {
            text: {
              close: true,
              font: "Verdana",
              style: "",
              value: ["TS", "DOCS", "2026"],
              weight: "700",
            },
          },
        },
        size: {
          value: { min: 12, max: 22 },
        },
      },
    },
  },
  {
    key: "shape-emoji",
    title: "Emoji Shape",
    description: "Emoji shape with explicit emoji options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: {
      ...base({
        type: "emoji",
        close: true,
        options: {
          emoji: {
            close: true,
            font: "Apple Color Emoji",
            padding: 0,
            value: ["😀", "🎉", "✨", "🚀", "🔥"],
          },
        },
      }),
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 28,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        paint: {
          fill: {
            color: {
              value: ["#60a5fa", "#34d399", "#f59e0b", "#f472b6"],
            },
            enable: true,
          },
          stroke: {
            color: {
              value: "#ffffff",
            },
            width: 0,
          },
        },
        shape: {
          type: "emoji",
          close: true,
          options: {
            emoji: {
              close: true,
              font: "Apple Color Emoji",
              padding: 0,
              value: ["😀", "🎉", "✨", "🚀", "🔥"],
            },
          },
        },
        size: {
          value: { min: 16, max: 28 },
        },
      },
    },
  },
  {
    key: "shape-arrow",
    title: "Arrow Shape",
    description: "Arrow with body/head/height options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "arrow",
      close: true,
      options: {
        arrow: {
          close: true,
          bodyHeightFactor: 0.45,
          headWidthFactor: 0.35,
          heightFactor: 1,
        },
      },
    }),
  },
  {
    key: "shape-heart",
    title: "Heart Shape",
    description: "Heart with explicit options block.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "heart",
      close: true,
      options: {
        heart: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-cog",
    title: "Cog Shape",
    description: "Cog with notch/radius options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "cog",
      close: true,
      options: {
        cog: {
          close: true,
          holeRadius: 0.35,
          innerRadius: 0.75,
          innerTaper: 0.5,
          notches: 8,
          outerTaper: 0.6,
        },
      },
    }),
  },
  {
    key: "shape-rounded-rect",
    title: "Rounded Rect Shape",
    description: "Rounded rectangle with radius option.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "rounded-rect",
      close: true,
      options: {
        "rounded-rect": {
          close: true,
          radius: 0.35,
        },
      },
    }),
  },
  {
    key: "shape-rounded-polygon",
    title: "Rounded Polygon Shape",
    description: "Rounded polygon with radius/sides options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "rounded-polygon",
      close: true,
      options: {
        "rounded-polygon": {
          close: true,
          radius: 0.45,
          sides: 6,
        },
      },
    }),
  },
  {
    key: "shape-spiral",
    title: "Spiral Shape",
    description: "Spiral stroke-like setup with open path options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: {
      ...base({
        type: "spiral",
        close: false,
        options: {
          spiral: {
            close: false,
            innerRadius: 1,
            lineSpacing: 1.5,
            widthFactor: 1,
          },
        },
      }),
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 42,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        paint: {
          fill: {
            enable: false,
          },
          stroke: {
            color: {
              value: ["#22d3ee", "#a78bfa", "#f472b6"],
            },
            width: 2,
          },
        },
        shape: {
          type: "spiral",
          close: false,
          options: {
            spiral: {
              close: false,
              innerRadius: 1,
              lineSpacing: 1.5,
              widthFactor: 1,
            },
          },
        },
        size: {
          value: { min: 4, max: 10 },
        },
      },
    },
  },
  {
    key: "shape-squircle",
    title: "Squircle Shape",
    description: "Squircle with exponent/steps options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "squircle",
      close: true,
      options: {
        squircle: {
          close: true,
          exponent: 4,
          steps: 128,
        },
      },
    }),
  },
  {
    key: "shape-matrix",
    title: "Matrix Shape",
    description: "Matrix with interval option and explicit shape options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: {
      ...base({
        type: "matrix",
        close: true,
        options: {
          matrix: {
            close: true,
            interval: {
              min: 120,
              max: 420,
            },
          },
        },
      }),
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 42,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        paint: {
          fill: {
            color: {
              value: "#22c55e",
            },
            enable: true,
          },
          stroke: {
            color: {
              value: "#14532d",
            },
            width: 1,
          },
        },
        shape: {
          type: "matrix",
          close: true,
          options: {
            matrix: {
              close: true,
              interval: {
                min: 120,
                max: 420,
              },
            },
          },
        },
        size: {
          value: { min: 4, max: 10 },
        },
      },
    },
  },
  {
    key: "shape-path",
    title: "Path Shape",
    description: "Path with explicit segments options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "path",
      close: true,
      options: {
        path: {
          close: true,
          half: false,
          segments: [
            {
              type: "move",
              values: [{ x: -0.8, y: 0 }],
            },
            {
              type: "line",
              values: [{ x: 0.8, y: 0 }],
            },
            {
              type: "line",
              values: [{ x: 0, y: -0.9 }],
            },
            {
              type: "line",
              values: [{ x: -0.8, y: 0 }],
            },
          ],
        },
      },
    }),
  },
  {
    key: "shape-card",
    title: "Card Shape",
    description: "Playing card with suit/value options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "card",
      close: true,
      options: {
        card: {
          close: true,
          suit: "spades",
          value: "A",
        },
      },
    }),
  },
  {
    key: "shape-spade",
    title: "Spade Suit Shape",
    description: "Card suit shape (spade).",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "spade",
      close: true,
      options: {
        spade: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-heart-suit",
    title: "Heart Suit Shape",
    description: "Card suit shape (hearts).",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "hearts",
      close: true,
      options: {
        hearts: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-club",
    title: "Club Suit Shape",
    description: "Card suit shape (club).",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "club",
      close: true,
      options: {
        club: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-diamond",
    title: "Diamond Suit Shape",
    description: "Card suit shape (diamond).",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "diamond",
      close: true,
      options: {
        diamond: {
          close: true,
        },
      },
    }),
  },
  {
    key: "shape-infinity",
    title: "Infinity Shape",
    description: "Infinity rendered stroke-only with explicit options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: {
      ...base({
        type: "infinity",
        close: false,
        options: {
          infinity: {
            close: false,
          },
        },
      }),
      particles: {
        move: {
          enable: true,
          speed: 1.1,
        },
        number: {
          value: 42,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        paint: {
          fill: {
            enable: false,
          },
          stroke: {
            color: {
              value: ["#22d3ee", "#a78bfa", "#f472b6"],
            },
            width: 2,
          },
        },
        shape: {
          type: "infinity",
          close: false,
          options: {
            infinity: {
              close: false,
            },
          },
        },
        size: {
          value: { min: 4, max: 10 },
        },
      },
    },
  },
  {
    key: "shape-ribbon",
    title: "Ribbon Shape",
    description: "Ribbon with chain-based physics simulation, darken, and oscillation options.",
    category: "interactive",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: "ribbon",
      close: true,
      options: {
        ribbon: {
          close: true,
          angle: 45,
          count: 40,
          drag: 0.02,
          mass: 1,
          oscillationDistance: {
            min: 80,
            max: 120,
          },
          oscillationSpeed: {
            min: 3,
            max: 5,
          },
          particleDist: 8,
          velocityInherit: {
            min: 4,
            max: 6,
          },
          darken: {
            enable: true,
            value: 30,
          },
        },
      },
    }),
  },
  {
    key: "shape-mixed-core",
    title: "Mixed Core Shapes",
    description: "Comparison scene with explicit options for each core shape.",
    category: "background",
    kind: "shape",
    recipePath: "/demos/shapes",
    options: base({
      type: ["circle", "triangle", "polygon", "star", "square"],
      close: true,
      options: {
        circle: {
          close: true,
        },
        triangle: {
          close: true,
        },
        square: {
          close: true,
        },
        polygon: {
          close: true,
          sides: 6,
        },
        star: {
          close: true,
          inset: 2,
          sides: 5,
        },
      },
    }),
  },
];
