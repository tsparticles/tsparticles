const engine = tsParticles.createEngine();
tsParticles.loadConfigs(engine);

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
stats.dom.style.left = "0px";
stats.dom.style.top = "0px";

let updateStats = function () {
  const update = function () {
    stats.begin();
    stats.end();

    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

// Note: initialization is performed during document ready below. We avoid
// starting an early init here to prevent stale/rejected init promises from
// interfering with the demo flow.

let updateParticles = function (editor) {
  const presetId = localStorage.presetId || "basic";

  // Now safe to use the jQuery wrapper API (init is performed once at
  // document ready to ensure the wrapper's initialization flags are set).
  const options = engine.pluginManager.configs[presetId];

  if (!options) {
    console.warn("no options found for preset", presetId);
    return;
  }

  $("#tsparticles")
    .particles(engine)
    .load(options)
    .then(container => {
      localStorage.presetId = presetId;

      const omit = obj => _.omitBy(obj, (value, key) => _.startsWith(key, "_"));

      const transform = obj =>
        _.transform(omit(obj), function (result, value, key) {
          result[key] = !_.isArray(value) && _.isObject(value) ? transform(omit(value)) : value;
        });

      editor.update(transform(container?.options));
      editor.expandAll();
      updateStats();
    })
    .catch(e => {
      console.error("failed to load particles with jQuery wrapper:", e);
    });
};

$(document).ready(function () {
  for (const presetId in engine.pluginManager.configs) {
    const preset = engine.pluginManager.configs[presetId];

    const option = document.createElement("option");
    option.value = presetId;
    option.text = preset.name || presetId;

    document.getElementById("presets").appendChild(option);
  }

  const element = document.getElementById("editor");
  const options = {
    mode: "tree",
    modes: ["code", "form", "text", "tree", "view", "preview"], // allowed modes
    onError: function (err) {
      alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {},
    onChange: function () {},
  };

  const editor = new JSONEditor(element, options);

  const cmbPresets = $("#presets");

  cmbPresets.change(function () {
    localStorage.presetId = this.value;

    updateParticles(editor);
  });

  if (!localStorage.presetId) {
    localStorage.presetId = "basic";
  }

  (async () => {
    await $.particles(engine).init(loadFull);

    // Now trigger initial preset load
    cmbPresets.val(localStorage.presetId);
    cmbPresets.change();
  })();

  const btnUpdate = $("#btnUpdate");
  btnUpdate.click(function () {
    const particles = engine.item(0);

    particles.reset().then(() => {
      particles.options.c(editor.get());
      particles.refresh().then(() => {
        // do nothing
      });
    });
  });

  //document.body.querySelector('#tsparticles-container').appendChild(stats.dom);
});
