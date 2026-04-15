const stats = new Stats();

stats.addPanel('count', '#ff8', 0, () => {
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

let updateParticles = function (editor) {
    let presetId = localStorage.presetId || 'basic';

    $('#tsparticles').particles().init(tsParticles.configs[presetId], (particles) => {
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
        updateStats();
    });
};

$(document).ready(function () {
    for (const presetId in tsParticles.configs) {
        const preset = tsParticles.configs[presetId];

        const option = document.createElement('option');
        option.value = presetId;
        option.text = preset.name || presetId;

        document.getElementById('presets').appendChild(option);
    }

    const element = document.getElementById('editor');
    const options = {
        mode: 'tree',
        modes: [ 'code', 'form', 'text', 'tree', 'view', 'preview' ], // allowed modes
        onError: function (err) {
            alert(err.toString())
        },
        onModeChange: function (newMode, oldMode) {
        },
        onChange: function () {
        }
    };

    const editor = new JSONEditor(element, options);

    const cmbPresets = $('#presets');

    cmbPresets.change(function () {
        localStorage.presetId = this.value;

        updateParticles(editor);
    });

    if (!localStorage.presetId) {
        localStorage.presetId = 'basic';
    }

    cmbPresets.val(localStorage.presetId);
    cmbPresets.change();

    const btnUpdate = $('#btnUpdate');
    btnUpdate.click(function () {
        const particles = tsParticles.domItem(0);

        particles.reset().then(() => {
            particles.options.load(editor.get());
            particles.refresh().then(() => {
                // do nothing
            });
        });
    });

    //document.body.querySelector('#tsparticles-container').appendChild(stats.dom);
});
