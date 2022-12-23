(async function () {
    let schema = {};
    const stats = new Stats();

    stats.addPanel('count', '#ff8', 0, () => {
        const container = tsParticles.domItem(0);
        if (container) {
            maxParticles = Math.max(container.particles.count, maxParticles);

            return {
                value: container.particles.count, maxValue: maxParticles
            };
        }
    });

    let maxParticles = 0;
    stats.showPanel(0);
    stats.dom.style.position = "absolute";
    stats.dom.style.left = "3px";
    stats.dom.style.top = "3px";
    stats.dom.id = "stats-graph";

    let initStats = function () {
        const update = function () {
            stats.begin();
            stats.end();

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    function distinct(value, index, self) {
        return self.indexOf(value) === index;
    }

    let updateParticles = async function (editor) {
        let presetId = localStorage.presetId || 'basic';

        if (presetId === "divEvents") {
            document.querySelectorAll('.bubble').forEach(elem => {
                elem.classList.add('d-block');
                elem.classList.remove('d-none');
            });
            document.querySelectorAll('.repulse').forEach(elem => {
                elem.classList.add('d-block');
                elem.classList.remove('d-none');
            });
            document.querySelectorAll('.bounce').forEach(elem => {
                elem.classList.add('d-block');
                elem.classList.remove('d-none');
            });
        } else {
            document.querySelectorAll('.bubble').forEach(elem => {
                elem.classList.add('d-none');
                elem.classList.remove('d-block');
            });
            document.querySelectorAll('.repulse').forEach(elem => {
                elem.classList.add('d-none');
                elem.classList.remove('d-block');
            });
            document.querySelectorAll('.bounce').forEach(elem => {
                elem.classList.add('d-none');
                elem.classList.remove('d-block');
            });
        }

        const particles = await tsParticles.load('tsparticles', tsParticles.configs[presetId]);

        localStorage.presetId = presetId;

        const omit = (obj) => {
            return _.omitBy(obj, (value, key) => {
                return _.startsWith(key, "_");
            })
        };

        const transform = (obj) => {
            return _.transform(omit(obj), function (result, value, key) {
                result[key] = _.isObject(value) ? transform(omit(value)) : value;
            })
        };

        editor.update(transform(particles.options));
        editor.expandAll();
    };

    const omit = (obj, keys) => {
        if (!keys.length) return obj;
        const key = keys.pop();
        const parts = key.split(".");
        if (parts.length > 1) {
            const { [parts[0]]: todo, ...rest } = obj;
            return {
                ...omit(rest, keys), [parts[0]]: omit(todo, [ parts[1] ]),
            };
        }
        const { [key]: omitted, ...rest } = obj;
        return omit(rest, keys);
    };

    let initSidebar = function () {
        const rightCaret = document.body.querySelector('.caret-right');
        const leftCaret = document.body.querySelector('.caret-left');
        const sidebar = document.getElementById('sidebar');
        const sidebarHidden = sidebar.hasAttribute('hidden');

        if (sidebarHidden) {
            leftCaret.setAttribute('hidden', '');
            rightCaret.removeAttribute('hidden');
        } else {
            rightCaret.setAttribute('hidden', '');
            leftCaret.removeAttribute('hidden');
        }
    };

    let toggleSidebar = function () {
        const rightCaret = document.body.querySelector('.caret-right');
        const leftCaret = document.body.querySelector('.caret-left');
        const sidebar = document.getElementById('sidebar');
        const sidebarHidden = sidebar.hasAttribute('hidden');

        if (sidebarHidden) {
            rightCaret.setAttribute('hidden', '');
            leftCaret.removeAttribute('hidden');
            sidebar.removeAttribute('hidden');
        } else {
            leftCaret.setAttribute('hidden', '');
            rightCaret.removeAttribute('hidden');
            sidebar.setAttribute('hidden', '');
        }

        tsParticles.domItem(0).refresh();
    };

    window.addEventListener('load', async function () {
        await loadHsvColorPlugin();

        await loadFull(tsParticles);

        await loadCanvasMaskPlugin(tsParticles);
        await loadEasingBackPlugin(tsParticles);
        await loadEasingCircPlugin(tsParticles);
        await loadEasingCubicPlugin(tsParticles);
        await loadEasingExpoPlugin(tsParticles);
        await loadEasingQuartPlugin(tsParticles);
        await loadEasingQuintPlugin(tsParticles);
        await loadEasingSinePlugin(tsParticles);
        await loadInfectionPlugin(tsParticles);
        await loadMotionPlugin(tsParticles);
        await loadPolygonMaskPlugin(tsParticles);
        await loadSoundsPlugin(tsParticles);
        await loadLightInteraction(tsParticles);
        await loadParticlesRepulseInteraction(tsParticles);
        await loadGradientUpdater(tsParticles);
        await loadOrbitUpdater(tsParticles);
        await loadCurvesPath(tsParticles);
        await loadPolygonPath(tsParticles);
        await loadPerlinNoisePath(tsParticles);
        await loadSimplexNoisePath(tsParticles);
        await loadBubbleShape(tsParticles);
        await loadCardsShape(tsParticles);
        await loadHeartShape(tsParticles);
        await loadMultilineTextShape(tsParticles);
        await loadPathShape(tsParticles);
        await loadRoundedRectShape(tsParticles);
        await loadSpiralShape(tsParticles);

        for (const presetId in tsParticles.configs) {
            const preset = tsParticles.configs[presetId];

            const option = document.createElement('option');
            option.value = presetId;
            option.text = preset.name || presetId;

            document.getElementById('presets').appendChild(option);
        }

        const element = document.getElementById('editor');
        const options = {
            mode: 'form', modes: [ 'code', 'form', 'view', 'preview', 'text' ], // allowed modes
            autocomplete: {
                filter: 'contain', trigger: 'focus'
            }, onError: function (err) {
                alert(err.toString())
            }, onModeChange: function (newMode, oldMode) {
            }, onChange: function () {
            }
        };
        const editor = new JSONEditor(element, options);

        const cmbPresets = document.getElementById('presets');

        cmbPresets.onchange = async function () {
            localStorage.presetId = this.value;

            await updateParticles(editor);
        };

        if (!localStorage.presetId) {
            localStorage.presetId = 'basic';
        }

        cmbPresets.value = localStorage.presetId;

        // Create a new 'change' event
        const event = new Event('change');

        // Dispatch it.
        cmbPresets.dispatchEvent(event);

        const btnUpdate = document.getElementById('btnUpdate');

        btnUpdate.onclick = function () {
            const particles = tsParticles.domItem(0);

            particles.options.load(editor.get());
            particles.refresh().then(() => {
                // do nothing
            });
        };

        document.body.querySelector('#stats').appendChild(stats.dom);

        const statsToggler = document.body.querySelector('#toggle-stats');

        statsToggler.addEventListener('click', function () {
            const statsEl = document.body.querySelector('#stats');
            if (statsEl.hasAttribute('hidden')) {
                statsEl.removeAttribute('hidden');
            } else {
                statsEl.setAttribute('hidden', '');
            }
        });

        const sidebarToggler = document.body.querySelector('.toggle-sidebar');

        sidebarToggler.addEventListener('click', function () {
            toggleSidebar();
        });

        document.getElementById('export-image').addEventListener('click', function () {
            const container = tsParticles.domItem(0);

            if (container) {
                container.exportImage(function (blob) {
                    const modalBody = document.body.querySelector('#exportModal .modal-body .modal-body-content');

                    modalBody.innerHTML = '';
                    modalBody.style.backgroundColor = container.canvas.element.style.backgroundColor;
                    modalBody.style.backgroundImage = container.canvas.element.style.backgroundImage;
                    modalBody.style.backgroundPosition = container.canvas.element.style.backgroundPosition;
                    modalBody.style.backgroundRepeat = container.canvas.element.style.backgroundRepeat;
                    modalBody.style.backgroundSize = container.canvas.element.style.backgroundSize;

                    const image = new Image();

                    image.className = 'img-fluid';
                    image.onload = () => URL.revokeObjectURL(image.src);
                    image.source = URL.createObjectURL(blob);

                    modalBody.appendChild(image);

                    const exportModal = new bootstrap.Modal(document.getElementById('exportModal'));

                    exportModal.show();
                });
            }
        });

        document.getElementById('export-config').addEventListener('click', function () {
            const container = tsParticles.domItem(0);

            if (container) {
                const modalBody = document.body.querySelector('#exportModal .modal-body .modal-body-content');

                modalBody.innerHTML = `<pre>${container.exportConfiguration()}</pre>`;

                const exportModal = new bootstrap.Modal(document.getElementById('exportModal'));

                exportModal.show();
            }
        });

        document.getElementById('codepen-export').addEventListener('click', function () {
            const container = tsParticles.domItem(0);

            if (container) {
                const form = document.getElementById("code-pen-form");
                const inputData = document.getElementById("code-pen-data");
                const particlesContainer = document.getElementById('tsparticles');
                const data = {
                    html: `<!-- tsParticles - https://particles.js.org - https://github.com/matteobruni/tsparticles -->
<div id="tsparticles"></div>`,
                    css: `/* ---- reset ---- */
body {
    margin: 0;
    font: normal 75% Arial, Helvetica, sans-serif;
}

canvas {
    display: block;
    vertical-align: bottom;
}
/* ---- tsparticles container ---- */
#tsparticles {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${particlesContainer.style.backgroundColor};
    background-image: ${particlesContainer.style.backgroundImage};
    background-repeat: ${particlesContainer.style.backgroundRepeat};
    background-size: ${particlesContainer.style.backgroundSize};
    background-position: ${particlesContainer.style.backgroundPosition};
}`,
                    js: `tsParticles.load("tsparticles", ${JSON.stringify(container.options)});`,
                    js_external: 'https://cdn.jsdelivr.net/npm/tsparticles@1/tsparticles.min.js',
                    title: 'tsParticles example',
                    description: 'This pen was created with tsParticles from https://particles.js.org',
                    tags: "tsparticles, javascript, typescript, design, animation",
                    editors: "001"
                }

                inputData.value = JSON.stringify(data)
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&apos;");

                form.submit();
            }
        });

        initSidebar();
        initStats();
    });
})();

function pixelFilter(pixel) {
    return pixel.r < 30 && pixel.g < 30 && pixel.b < 30 ? false : pixel.a > 0;
}

function pixelTextFilter(pixel) {
    return pixel.a > 0;
}

function explodeSoundCheck(args) {
    return args.data.particle.shape === "line";
}
