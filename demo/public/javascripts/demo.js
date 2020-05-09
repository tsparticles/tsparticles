(function () {
    let schema = {};
    const stats = new Stats();

    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "3px";
    stats.domElement.style.top = "3px";
    stats.domElement.id = "stats-graph";

    let initStats = function () {
        const count_particles = document.querySelector(".js-count-particles");
        const update = function () {
            stats.begin();
            stats.end();

            const container = tsParticles.domItem(0);

            if (container) {
                count_particles.innerText = container.particles.count;
            } else {
                count_particles.innerText = 0;
            }

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    function distinct(value, index, self) {
        return self.indexOf(value) === index;
    }

    let getValuesFromProp = function (prop, path, index) {
        if (prop) {
            if (prop.type) {
                switch (prop.type) {
                    case 'boolean':
                        return ['true', 'false'];
                    case 'number':
                        return prop.enum;
                    case 'string':
                        return prop.enum;
                    case 'array':
                        return getSchemaValuesFromProp(prop.items);
                }
            } else if (prop["$ref"]) {
                const def = prop["$ref"].split('/');
                const type = def[def.length - 1];
                const typeDef = schema.definitions[type];

                return getSchemaValuesFromPath(typeDef, path, index + (/I[A-Z]/.exec(type) ? 1 : 0));
            } else if (prop.anyOf) {
                let res = [];

                for (const type of prop.anyOf) {
                    const values = getSchemaValuesFromProp(type, path, index);

                    for (const value of values) {
                        res.push(value);
                    }
                }

                return res.filter(distinct);
            }
        }
    }

    let getSchemaValuesFromPath = function (obj, path, index) {
        const key = path[index];

        const prop = obj.properties ? obj.properties[key] : obj;

        return getValuesFromProp(prop, path, index);
    }

    let jsonEditorAutoComplete = function (text, path, input, editor) {
        switch (input) {
            case 'field':
                break;
            case 'value':
                return getSchemaValuesFromPath(schema, path, 0).filter(function (v) {
                    return v.includes(text);
                });
        }

        return null;
    };

    let updateParticles = function (editor) {
        let presetId = localStorage.presetId || 'default';

        if (presetId === "divRepulse") {
            document.getElementById('repulse-div').className = 'd-block';
        } else {
            document.getElementById('repulse-div').className = 'd-none';
        }

        tsParticles.loadJSON('tsparticles', `/presets/${presetId}.json`).then((particles) => {
            localStorage.presetId = presetId;
            editor.set(particles.options);
            editor.expandAll();
        });
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

    window.addEventListener('load', function () {
        const element = document.getElementById('editor');
        const options = {
            mode: 'form',
            modes: ['form', 'view', 'preview'], // allowed modes
            autocomplete: {
                filter: 'contain',
                trigger: 'focus',
                getOptions: jsonEditorAutoComplete
            },
            onError: function (err) {
                alert(err.toString())
            },
            onModeChange: function (newMode, oldMode) {
            },
            onChange: function () {
            }
        };
        const editor = new JSONEditor(element, options);

        const cmbPresets = document.getElementById('presets');

        cmbPresets.onchange = function () {
            localStorage.presetId = this.value;

            updateParticles(editor);
        };

        if (!localStorage.presetId) {
            localStorage.presetId = 'default';
        }

        cmbPresets.value = localStorage.presetId;

        // Create a new 'change' event
        const event = new Event('change');

        // Dispatch it.
        cmbPresets.dispatchEvent(event);

        fetch('/schema/options.schema.json').then(function (response) {
            response.json().then(function (data) {
                schema = data;
                editor.setSchema(schema);
            });
        });

        const btnUpdate = document.getElementById('btnUpdate');
        btnUpdate.onclick = function () {
            const particles = tsParticles.domItem(0);
            particles.options.load(editor.get());
            particles.refresh().then(() => {
            });
        };

        document.body.querySelector('#stats').appendChild(stats.domElement);

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

                    $('#exportModal').modal('show');
                });
            }
        });

        document.getElementById('export-config').addEventListener('click', function () {
            const container = tsParticles.domItem(0);

            if (container) {
                const modalBody = document.body.querySelector('#exportModal .modal-body .modal-body-content');

                modalBody.innerHTML = `<pre>${container.exportConfiguration()}</pre>`;

                $('#exportModal').modal('show');
            }
        });

        document.getElementById('codepen-export').addEventListener('click', function () {
            const container = tsParticles.domItem(0);

            if (container) {
                const form = document.getElementById("code-pen-form");
                const inputData = document.getElementById("code-pen-data");
                const particlesContainer = document.getElementById('tsparticles');
                const data = {
                    html: `<!-- tsParticles - https://particles.matteobruni.it - https://github.com/matteobruni/tsparticles -->
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
                    js_external: 'https://cdn.jsdelivr.net/npm/tsparticles@1.10.4/dist/tsparticles.min.js',
                    title: 'tsParticles example',
                    description: 'This pen was created with tsParticles from https://particles.matteobruni.it',
                    tags: "tsparticles, javascript, typescript, design, animation",
                    editors: "001"
                }

                inputData.value = JSON.stringify(data)
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&apos;");

                form.submit()
            }
        });

        initSidebar();
        initStats();
    });
})();