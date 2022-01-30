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

let updateBackground = function () {
    const el = $("#tsparticles");
    const options = tsParticles.domItem(0).sourceOptions;
    const config = options.config_demo;
    let backgroundImage;

    if (config.background_image) {
        if (config.background_image.startsWith("url(")) {
            backgroundImage = config.background_image;
        } else {
            backgroundImage = `url('${config.background_image}')`;
        }
    } else {
        backgroundImage = '';
    }

    el.css({
        "background-color": config.background_color,
        "background-image": backgroundImage,
        "background-position": config.background_position,
        "background-repeat": config.background_repeat,
        "background-size": config.background_size
    });
};

let updateParticles = function (editor) {
    let presetId = localStorage.presetId || 'default';

    $('#tsparticles').particles().ajax(`/presets/${presetId}.json`, (particles) => {
        localStorage.presetId = presetId;
        editor.set(particles.options);
        editor.expandAll();
        updateBackground();
        updateStats();
    });
};

$(document).ready(function () {
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
            updateBackground();
        }
    };
    const editor = new JSONEditor(element, options);

    const cmbPresets = $('#presets');

    cmbPresets.change(function () {
        localStorage.presetId = this.value;

        updateParticles(editor);
    });

    if (!localStorage.presetId) {
        localStorage.presetId = 'default';
    }

    cmbPresets.val(localStorage.presetId);
    cmbPresets.change();

    const btnUpdate = $('#btnUpdate');
    btnUpdate.click(function () {
        const particles = tsParticles.domItem(0);

        particles.options = editor.get();
        particles.refresh();

        updateBackground();
    });

    document.body.querySelector('#tsparticles-container').appendChild(stats.dom);
});
