(async function () {
  const engine = tsParticles.createEngine();
  const stats = new Stats();

  stats.addPanel("count", "#ff8", 0, () => {
    const container = engine.item(0);
    if (container) {
      maxParticles = Math.max(container.particles.count, maxParticles);

      return {
        value: container.particles.count,
        maxValue: maxParticles,
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

  let updateParticles = async function (editor) {
    eval(editor.getValue());
  };

  const omit = (obj, keys) => {
    if (!keys.length) {
      return obj;
    }

    const key = keys.pop(),
      parts = key.split(".");

    if (parts.length > 1) {
      const { [parts[0]]: todo, ...rest } = obj;
      return {
        ...omit(rest, keys),
        [parts[0]]: omit(todo, [parts[1]]),
      };
    }

    const { [key]: omitted, ...rest } = obj;

    return omit(rest, keys);
  };

  let initSidebar = function () {
    const rightCaret = document.body.querySelector(".caret-right"),
      leftCaret = document.body.querySelector(".caret-left"),
      sidebar = document.getElementById("sidebar"),
      sidebarHidden = sidebar.hasAttribute("hidden");

    if (sidebarHidden) {
      leftCaret.setAttribute("hidden", "");
      rightCaret.removeAttribute("hidden");
    } else {
      rightCaret.setAttribute("hidden", "");
      leftCaret.removeAttribute("hidden");
    }
  };

  let toggleSidebar = function () {
    const rightCaret = document.body.querySelector(".caret-right"),
      leftCaret = document.body.querySelector(".caret-left"),
      sidebar = document.getElementById("sidebar"),
      sidebarHidden = sidebar.hasAttribute("hidden");

    if (sidebarHidden) {
      rightCaret.setAttribute("hidden", "");
      leftCaret.removeAttribute("hidden");
      sidebar.removeAttribute("hidden");
    } else {
      leftCaret.setAttribute("hidden", "");
      rightCaret.removeAttribute("hidden");
      sidebar.setAttribute("hidden", "");
    }

    engine.item(0).refresh();
  };

  window.addEventListener("load", async function () {
    await loadHsvColorPlugin(engine);
    await loadOklchColorPlugin(engine);

    await loadFull(engine);

    await loadCanvasMaskPlugin(engine);
    await loadEasingBackPlugin(engine);
    await loadEasingCircPlugin(engine);
    await loadEasingCubicPlugin(engine);
    await loadEasingExpoPlugin(engine);
    await loadEasingQuartPlugin(engine);
    await loadEasingQuintPlugin(engine);
    await loadEasingSinePlugin(engine);
    await loadInfectionPlugin(engine);
    await loadMotionPlugin(engine);
    await loadPolygonMaskPlugin(engine);
    await loadSoundsPlugin(engine);
    await loadLightInteraction(engine);
    await loadParticlesRepulseInteraction(engine);
    await loadGradientUpdater(engine);
    await loadOrbitUpdater(engine);
    await loadCurvesPath(engine);
    await loadPolygonPath(engine);
    await loadPerlinNoisePath(engine);
    await loadSimplexNoisePath(engine);
    await loadBubbleShape(engine);
    await loadCardsShape(engine);
    await loadCogShape(engine);
    await loadHeartShape(engine);
    await loadMultilineTextShape(engine);
    await loadPathShape(engine);
    await loadRoundedRectShape(engine);
    await loadSpiralShape(engine);

    const editor = ace.edit("editor");

    //editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");

    updateParticles(editor);

    const btnUpdate = document.getElementById("btnUpdate");

    btnUpdate.addEventListener("click", function () {
      updateParticles(editor);
    });

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
      const container = engine.item(0);

      if (container) {
        container.exportImage(function (blob) {
          const modalBody = document.body.querySelector("#exportModal .modal-body .modal-body-content");

          modalBody.innerHTML = "";
          modalBody.style.backgroundColor = container.canvas.domElement.style.backgroundColor;
          modalBody.style.backgroundImage = container.canvas.domElement.style.backgroundImage;
          modalBody.style.backgroundPosition = container.canvas.domElement.style.backgroundPosition;
          modalBody.style.backgroundRepeat = container.canvas.domElement.style.backgroundRepeat;
          modalBody.style.backgroundSize = container.canvas.domElement.style.backgroundSize;

          const image = new Image();

          image.className = "img-fluid";
          image.onload = () => URL.revokeObjectURL(image.src);
          image.source = URL.createObjectURL(blob);

          modalBody.appendChild(image);

          const exportModal = new bootstrap.Modal(document.getElementById("exportModal"));

          exportModal.show();
        });
      }
    });

    document.getElementById("export-config").addEventListener("click", function () {
      const container = engine.item(0);

      if (container) {
        const modalBody = document.body.querySelector("#exportModal .modal-body .modal-body-content");

        modalBody.innerHTML = `<pre>${container.exportConfiguration()}</pre>`;

        const exportModal = new bootstrap.Modal(document.getElementById("exportModal"));

        exportModal.show();
      }
    });

    document.getElementById("codepen-export").addEventListener("click", function () {
      const container = engine.item(0);

      if (container) {
        const form = document.getElementById("code-pen-form"),
          inputData = document.getElementById("code-pen-data"),
          data = {
            html: `<!-- tsParticles - https://particles.js.org - https://github.com/tsparticles/tsparticles -->
<div id="tsparticles"></div>`,
            css: "",
            js: editor.getValue(),
            js_external: "https://cdn.jsdelivr.net/npm/tsparticles@1/tsparticles.min.js",
            title: "tsParticles example",
            description: "This pen was created with tsParticles from https://particles.js.org",
            tags: "tsparticles, javascript, typescript, design, animation",
            editors: "001",
          };

        inputData.value = JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;");

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
