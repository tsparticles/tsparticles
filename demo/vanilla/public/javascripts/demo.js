(async () => {
    const initParticles = async (engine) => {
        await loadAll(engine);
    };

    //let schema = {};
    const stats = new Stats();

    stats.addPanel("count", "#ff8", 0, () => {
        const container = tsParticles.domItem(0);
        if (container) {
            maxParticles = Math.max(container.particles.count, maxParticles);

            return {
                value: container.particles.count,
                maxValue: maxParticles
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

    const particlesCount = document.getElementById("particles-count"),
        zParticlesCount = document.getElementById("z-particles-count"),
        poolCount = document.getElementById("pool-count");

    setInterval(() => {
        const container = tsParticles.domItem(0);

        if (container) {
            particlesCount.innerText = `${container.particles.count}`;
            zParticlesCount.innerText = `${container.particles._zArray.length}`;
            poolCount.innerText = `${container.particles._pool.length}`;
        }
    }, 100);

    let updateParticles = async (editor) => {
        let presetId = localStorage.presetId || "basic";

        if (presetId === "divEvents") {
            document.querySelectorAll(".bubble").forEach(elem => {
                elem.classList.add("d-block");
                elem.classList.remove("d-none");
            });
            document.querySelectorAll(".repulse").forEach(elem => {
                elem.classList.add("d-block");
                elem.classList.remove("d-none");
            });
            document.querySelectorAll(".bounce").forEach(elem => {
                elem.classList.add("d-block");
                elem.classList.remove("d-none");
            });
        } else {
            document.querySelectorAll(".bubble").forEach(elem => {
                elem.classList.add("d-none");
                elem.classList.remove("d-block");
            });
            document.querySelectorAll(".repulse").forEach(elem => {
                elem.classList.add("d-none");
                elem.classList.remove("d-block");
            });
            document.querySelectorAll(".bounce").forEach(elem => {
                elem.classList.add("d-none");
                elem.classList.remove("d-block");
            });
        }

        const particles = await tsParticles.load({ id: "tsparticles", options: tsParticles.configs[presetId] });

        localStorage.presetId = presetId;

        const omit = obj => {
            return _.omitBy(obj, (value, key) => {
                return _.startsWith(key, "_");
            });
        };

        const transform = obj => {
            return _.transform(omit(obj), function (result, value, key) {
                result[key] = !_.isArray(value) && _.isObject(value) ? transform(omit(value)) : value;
            });
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
                ...omit(rest, keys),
                [parts[0]]: omit(todo, [ parts[1] ])
            };
        }
        const { [key]: omitted, ...rest } = obj;
        return omit(rest, keys);
    };

    let initSidebar = function () {
        const rightCaret = document.body.querySelector(".caret-right");
        const leftCaret = document.body.querySelector(".caret-left");
        const sidebar = document.getElementById("sidebar");
        const sidebarHidden = sidebar.hasAttribute("hidden");

        if (sidebarHidden) {
            leftCaret.setAttribute("hidden", "");
            rightCaret.removeAttribute("hidden");
        } else {
            rightCaret.setAttribute("hidden", "");
            leftCaret.removeAttribute("hidden");
        }
    };

    let toggleSidebar = function () {
        const rightCaret = document.body.querySelector(".caret-right");
        const leftCaret = document.body.querySelector(".caret-left");
        const sidebar = document.getElementById("sidebar");
        const sidebarHidden = sidebar.hasAttribute("hidden");

        if (sidebarHidden) {
            rightCaret.setAttribute("hidden", "");
            leftCaret.removeAttribute("hidden");
            sidebar.removeAttribute("hidden");
        } else {
            leftCaret.setAttribute("hidden", "");
            rightCaret.removeAttribute("hidden");
            sidebar.setAttribute("hidden", "");
        }

        tsParticles.item(0).refresh();
    };

    document.addEventListener("DOMContentLoaded", async () => {
        await initParticles(tsParticles);

        for (const presetId in tsParticles.configs) {
            const preset = tsParticles.configs[presetId];

            const option = document.createElement("option");
            option.value = presetId;
            option.text = preset.name || presetId;

            document.getElementById("presets").appendChild(option);
        }

        const element = document.getElementById("editor"), options = {
            mode: "form",
            modes: [ "code", "form", "view", "preview", "text" ], // allowed modes
            onError: function (err) {
                alert(err.toString());
            },
            onModeChange: function (newMode, oldMode) {
            },
            onChange: function () {
            }
        };
        const editor = new JSONEditor(element, options);

        const cmbPresets = document.getElementById("presets");

        cmbPresets.onchange = async () => {
            localStorage.presetId = cmbPresets.value;

            try {
                await updateParticles(editor);
            } catch (e) {
                console.error(e);
            }
        };

        if (!localStorage.presetId) {
            localStorage.presetId = "basic";
        }

        cmbPresets.value = localStorage.presetId;

        // Create a new 'change' event
        const event = new Event("change");

        // Dispatch it.
        cmbPresets.dispatchEvent(event);

        const btnUpdate = document.getElementById("btnUpdate");

        btnUpdate.onclick = function () {
            const particles = tsParticles.domItem(0);

            particles.reset().then(() => {
                particles.options.load(editor.get());
                particles.refresh().then(() => {
                    // do nothing
                });
            });
        };

        document.body.querySelector("#stats").appendChild(stats.dom);

        const statsToggler = document.body.querySelector("#toggle-stats");

        statsToggler.addEventListener("click", function () {
            const statsEl = document.body.querySelector("#stats");
            if (statsEl.hasAttribute("hidden")) {
                statsEl.removeAttribute("hidden");
            } else {
                statsEl.setAttribute("hidden", "");
            }
        });

        const sidebarToggler = document.body.querySelector(".toggle-sidebar");

        sidebarToggler.addEventListener("click", function () {
            toggleSidebar();
        });

        document.getElementById("export-image").addEventListener("click", function () {
            const container = tsParticles.domItem(0);

            if (container) {
                container.export("image").then(function (blob) {
                    const modalBody = document.body.querySelector("#exportModal .modal-body .modal-body-content");

                    modalBody.innerHTML = "";
                    modalBody.style.backgroundColor = container.canvas.element.style.backgroundColor;
                    modalBody.style.backgroundImage = container.canvas.element.style.backgroundImage;
                    modalBody.style.backgroundPosition = container.canvas.element.style.backgroundPosition;
                    modalBody.style.backgroundRepeat = container.canvas.element.style.backgroundRepeat;
                    modalBody.style.backgroundSize = container.canvas.element.style.backgroundSize;

                    const image = document.createElement("img");

                    image.className = "img-fluid";
                    image.onload = () => URL.revokeObjectURL(image.src);
                    image.src = URL.createObjectURL(blob);

                    modalBody.appendChild(image);

                    const exportModal = new bootstrap.Modal(document.getElementById("exportModal"));

                    exportModal.show();
                });
            }
        });

        document.getElementById("export-video").addEventListener("click", function () {
            const container = tsParticles.domItem(0);

            if (container) {
                container.export("video").then(function (blob) {
                    const modalBody = document.body.querySelector("#exportModal .modal-body .modal-body-content");

                    modalBody.innerHTML = "";
                    modalBody.style.backgroundColor = container.canvas.element.style.backgroundColor;
                    modalBody.style.backgroundImage = container.canvas.element.style.backgroundImage;
                    modalBody.style.backgroundPosition = container.canvas.element.style.backgroundPosition;
                    modalBody.style.backgroundRepeat = container.canvas.element.style.backgroundRepeat;
                    modalBody.style.backgroundSize = container.canvas.element.style.backgroundSize;

                    const downloadLink = document.createElement("a");

                    downloadLink.className = "btn btn-primary";
                    downloadLink.download = "particles.mp4";
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.innerText = "Download";

                    const video = document.createElement("video");

                    video.className = "img-fluid";
                    video.onload = () => URL.revokeObjectURL(image.src);
                    video.autoplay = true;
                    video.controls = true;
                    video.loop = true;
                    video.src = URL.createObjectURL(blob);
                    video.load();

                    modalBody.appendChild(video);
                    modalBody.appendChild(downloadLink);

                    const exportModal = new bootstrap.Modal(document.getElementById("exportModal"));

                    exportModal.show();
                });
            }
        });

        document.getElementById("export-config").addEventListener("click", function () {
            const container = tsParticles.domItem(0);

            if (container) {
                container.export("json").then(function (blob) {
                    blob.text().then(function (json) {
                        const modalBody = document.body.querySelector("#exportModal .modal-body .modal-body-content");

                        modalBody.innerHTML = `<pre>${json}</pre>`;

                        const exportModal = new bootstrap.Modal(document.getElementById("exportModal"));

                        exportModal.show();
                    });
                });
            }
        });

        document.getElementById("codepen-export").addEventListener("click", function () {
            const container = tsParticles.domItem(0);

            if (container) {
                const form = document.getElementById("code-pen-form");
                const inputData = document.getElementById("code-pen-data");
                const particlesContainer = document.getElementById("tsparticles");
                const data = {
                    html: `<!-- tsParticles - https://particles.js.org - https://github.com/tsparticles/tsparticles -->
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
                    js: `tsParticles.load({ id: "tsparticles", options: ${JSON.stringify(container.options)} });`,
                    js_external: "https://cdn.jsdelivr.net/npm/tsparticles@1/tsparticles.min.js",
                    title: "tsParticles example",
                    description: "This pen was created with tsParticles from https://particles.js.org",
                    tags: "tsparticles, javascript, typescript, design, animation",
                    editors: "001"
                };

                inputData.value = JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;");

                form.submit();
            }
        });

        initSidebar();
        initStats();
    });
})();
