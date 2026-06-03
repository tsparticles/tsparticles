import { ribbons } from '@tsparticles/ribbons';
import './style.css';
import './cookie-consent.js';
import ace from 'ace-builds';
import { js_beautify } from 'js-beautify';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-xcode';
import javascriptWorkerUrl from 'ace-builds/src-noconflict/worker-javascript.js?url';
import htmlWorkerUrl from 'ace-builds/src-noconflict/worker-html.js?url';
import cssWorkerUrl from 'ace-builds/src-noconflict/worker-css.js?url';

ace.config.setModuleUrl('ace/mode/javascript_worker', javascriptWorkerUrl);
ace.config.setModuleUrl('ace/mode/html_worker', htmlWorkerUrl);
ace.config.setModuleUrl('ace/mode/css_worker', cssWorkerUrl);

window.ribbons = ribbons;

const editors = [];

const sharePlatformTemplates = {
  facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  x: (url, text) => `https://x.com/intent/tweet?url=${url}&text=${text}`,
  linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  reddit: (url, text) => `https://www.reddit.com/submit?url=${url}&title=${text}`,
  telegram: (url, text) => `https://t.me/share/url?url=${url}&text=${text}`,
  whatsapp: (url, text) => `https://wa.me/?text=${text}%20${url}`,
  email: (url, text) => `mailto:?subject=${text}&body=${url}`,
};
const shareDesktopOrder = ['facebook', 'x', 'linkedin', 'reddit', 'telegram', 'whatsapp', 'email'];
const shareMobileOrder = ['x', 'whatsapp', 'telegram', 'facebook', 'linkedin', 'reddit', 'email'];

let activeTheme = 'dark';
let currentStep = parseInt(localStorage.getItem('tsparticles-ribbons/theme'), 10) || 0;

const prefersLightTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
const themes = {
  light: 'ace/theme/xcode',
  dark: 'ace/theme/monokai',
};

const getPreferedTheme = function () {
  return prefersLightTheme ? (prefersLightTheme.matches ? 'light' : 'dark') : 'dark';
};

const updateShareLinks = function () {
  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedText = encodeURIComponent(document.title || 'tsParticles Ribbons');

  Array.from(document.querySelectorAll('[data-share-link]')).forEach((link) => {
    const platform = link.getAttribute('data-share-link');
    const template = sharePlatformTemplates[platform];

    if (!template) {
      return;
    }

    link.setAttribute('href', template(encodedUrl, encodedText));
  });
};

const canTrackAnalytics = function () {
  return !!window.gtag;
};

const trackShare = function (platform) {
  if (!canTrackAnalytics() || !window.gtag) {
    return;
  }

  window.gtag('event', 'share_click', {
    method: platform,
    page_path: window.location.pathname,
    page_title: document.title,
  });
};

const trackCopyLink = function () {
  if (!canTrackAnalytics() || !window.gtag) {
    return;
  }

  window.gtag('event', 'share_copy_link', {
    method: 'copy_link',
    page_path: window.location.pathname,
    page_title: document.title,
  });
};

const updateShareOrder = function () {
  const currentOrder = window.matchMedia('(max-width: 768px)').matches
    ? shareMobileOrder
    : shareDesktopOrder;

  Array.from(document.querySelectorAll('.social-share')).forEach((shareContainer) => {
    const linksByPlatform = {};

    Array.from(shareContainer.querySelectorAll('[data-share-link]')).forEach((link) => {
      const platform = link.getAttribute('data-share-link');

      if (platform) {
        linksByPlatform[platform] = link;
      }
    });

    currentOrder.forEach((platform) => {
      const link = linksByPlatform[platform];

      if (link) {
        shareContainer.appendChild(link);
      }
    });

    const copyButton = shareContainer.querySelector('#shareCopyLinkButton');

    if (copyButton) {
      shareContainer.appendChild(copyButton);
    }
  });
};

const setupShareActions = function () {
  const shareDropdown = document.querySelector('.share-menu');

  if (shareDropdown) {
    document.addEventListener('click', (event) => {
      if (!shareDropdown.contains(event.target)) {
        shareDropdown.removeAttribute('open');
      }
    });
  }

  Array.from(document.querySelectorAll('[data-share-link]')).forEach((link) => {
    const platform = link.getAttribute('data-share-link') || 'unknown';

    link.addEventListener('click', () => {
      trackShare(platform);
    });
  });

  Array.from(document.querySelectorAll('#shareCopyLinkButton')).forEach((copyButton) => {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);

        const originalLabel = copyButton.textContent;

        copyButton.textContent = 'Copied';

        trackCopyLink();

        window.setTimeout(() => {
          copyButton.textContent = originalLabel;
        }, 1800);
      } catch (err) {
        console.error('Unable to copy share link.', err);
      }
    });
  });
};

const setTheme = function (isAuto, theme) {
  if (isAuto) {
    document.body.setAttribute('auto-theme', true);

    activeTheme = getPreferedTheme();
  } else {
    document.body.removeAttribute('auto-theme');

    activeTheme = theme;
  }

  document.body.setAttribute('data-theme', activeTheme);

  editors.forEach(function (editor) {
    editor.setTheme(themes[activeTheme]);
  });
};

const handleSystemThemeChange = () => {
  if (currentStep === 0) {
    setTheme(true);
  }
};

const updateTheme = function (step) {
  currentStep = step;

  switch (step) {
    case 0:
      setTheme(true);

      prefersLightTheme && prefersLightTheme.addEventListener('change', handleSystemThemeChange);

      break;

    case 1:
    case 2:
      setTheme(false, step === 1 ? 'dark' : 'light');

      prefersLightTheme && prefersLightTheme.removeEventListener('change', handleSystemThemeChange);

      break;
  }

  localStorage.setItem('tsparticles-ribbons/theme', currentStep);
};

updateTheme(currentStep);

document.getElementById('themeToggle').addEventListener('click', function () {
  updateTheme(++currentStep % 3);
});

const modes = [
  {
    id: 'basic',
    name: 'Basic Ribbons',
    description: [
      {
        cssClass: '',
        text: 'The default mode... ribbons fall from random positions across the top of the page with default colors and physics.',
      },
    ],
    fn: function () {
      ribbons();
    },
  },

  {
    id: 'colors',
    name: 'Custom Colors',
    description: [
      {
        cssClass: '',
        text: 'You can customize the ribbon colors to match your brand or theme. Use any hex, rgb, or named color.',
      },
      {
        cssClass: 'center',
        text: '🔥 Ocean to flame color transition! 🔥',
      },
    ],
    fn: function () {
      ribbons({
        colors: ['#FF4500', '#FF6347', '#FFD700', '#FF8C00', '#FF0000'],
      });

      setTimeout(() => {
        ribbons({
          colors: ['#00BFFF', '#1E90FF', '#00CED1', '#7FFFD4', '#E0FFFF'],
        });
      }, 1200);
    },
  },

  {
    id: 'multiple',
    name: 'Multiple Bursts',
    description: [
      {
        cssClass: '',
        text: 'Spawn multiple ribbon bursts with staggered timing for a layered cascading effect.',
      },
    ],
    fn: function () {
      ribbons();

      setTimeout(() => {
        ribbons();
      }, 300);

      setTimeout(() => {
        ribbons();
      }, 600);
    },
  },

  {
    id: 'continuous',
    name: 'Continuous Fall',
    description: [
      {
        cssClass: '',
        text: 'Why click a button repeatedly when you can have code do it for you? Spawn ribbons continuously for 8 seconds from random positions.',
      },
    ],
    fn: function () {
      const duration = 8000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        ribbons();
      }, 260);
    },
  },

  {
    id: 'fixed-position',
    name: 'Fixed Position',
    description: [
      {
        cssClass: '',
        text: 'A single burst of ribbons from a fixed point (x: 50, y: 0) — useful for triggering from a button or specific element.',
      },
    ],
    fn: function () {
      ribbons({
        position: { x: 50, y: 0 },
        emitterSize: { width: 0, height: 0 },
      });
    },
  },

  {
    id: 'custom-canvas',
    name: 'Custom Canvas',
    description: [
      {
        cssClass: '',
        text: 'You can limit where the ribbons appear by providing your own canvas element. Great for keeping ribbons within a specific section of your page.',
      },
    ],
    fn: function () {
      (async () => {
        const canvas = document.getElementById('my-canvas');

        canvas.ribbons =
          canvas.ribbons ||
          (await ribbons.create(canvas, {
            zIndex: 0,
          }));

        const duration = 8000;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(function () {
          if (Date.now() >= animationEnd) {
            return clearInterval(interval);
          }

          canvas.ribbons();
        }, 300);
      })();
    },
  },
];

function renderModes(modes) {
  return modes
    .map(
      (mode) => `
    <div class="container">
      <div class="group" data-name="${mode.id}">
        <div class="flex-rows">
          <div class="left">
            <h2>
              <a href="#${mode.id}" id="${mode.id}" class="anchor">
                ${mode.name}
              </a>
            </h2>
            <button class="run">
              Run
              <span class="icon">
                <svg class="icon">
                  <use xlink:href="#run"></use>
                </svg>
              </span>
            </button>
          </div>
          <div class="description">
            ${mode.description.map((d) => `<p class="${d.cssClass}">${d.text}</p>`).join('')}
          </div>
        </div>
        <div class="editor"></div>
        ${
          mode.id === 'custom-canvas'
            ? `
          <div class="flex-rows">
            <canvas
              id="my-canvas"
              style="width: 100%; height: 380px; max-width: 1000px"
              class="custom-canvas"
            ></canvas>
          </div>
        `
            : ''
        }
      </div>
    </div>
  `
    )
    .join('\n');
}

function pretty(val) {
  return js_beautify(val, {
    indent_size: 2,
    brace_style: 'preserve-inline',
  });
}

function getCode(name) {
  const mode = modes.find((t) => t.id === name);

  let code = pretty(mode.fn.toString());

  code = code
    .split('\n')
    .slice(1)
    .slice(0, -1)
    .map(function (s) {
      return s.trim();
    })
    .join('\n');

  return pretty(code);
}

document.addEventListener('DOMContentLoaded', async () => {
  await ribbons.init();

  updateShareLinks();
  updateShareOrder();
  setupShareActions();

  window.addEventListener('resize', updateShareOrder);

  Array.from(document.querySelectorAll('.html-group')).forEach(function (group) {
    const codeElem = group.querySelector('.editor'),
      editor = ace.edit(codeElem);

    editor.setTheme(themes[activeTheme]);

    editor.session.setMode('ace/mode/html');
    editor.session.setUseSoftTabs(true);
    editor.session.setTabSize(2);

    const count = editor.session.getLength();

    codeElem.style.minHeight = 14 * count + 1 + 'px';
    codeElem.style.height = count + 'rem';

    editors.push(editor);
  });

  document.getElementById('ribbons-modes').innerHTML = renderModes(modes);

  Array.from(document.querySelectorAll('.group')).forEach(function (group) {
    const name = group.getAttribute('data-name'),
      button = group.querySelector('.run'),
      codeElem = group.querySelector('.editor'),
      editor = ace.edit(codeElem);

    editor.setTheme(themes[activeTheme]);

    editor.session.on('changeMode', function (e, session) {
      if ('ace/mode/javascript' === session.getMode().$id) {
        if (session.$worker) {
          session.$worker.send('setOptions', [
            {
              esversion: 9,
              esnext: false,
            },
          ]);
        }
      }
    });

    editor.session.setMode('ace/mode/javascript');
    editor.session.setUseSoftTabs(true);
    editor.session.setTabSize(2);
    editor.session.setValue(getCode(name));

    const count = editor.session.getLength();

    codeElem.style.minHeight = 14 * count + 1 + 'px';
    codeElem.style.height = count + 'rem';

    button.addEventListener('click', (ev) => {
      if (ev && typeof ev.preventDefault === 'function') {
        ev.preventDefault();
      }

      try {
        eval(editor.getValue());
      } catch (err) {
        console.error(err);
      }
    });

    editors.push(editor);
  });
});
