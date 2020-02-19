(function() {
    window.loadCodePen = function() {
        return $('.js-box-codepen').on('click', function() {
            var data, dataString, data_input, res, res_css, res_json, stats_js;
            res = window.p.exportConfig();
            res_json = JSON.stringify(res.js);
            res_css = res.css;
            stats_js = `var stats = new Stats;
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
        var count_particles = document.querySelector('.js-count-particles');
        var update = function() {
            stats.begin(); stats.end();
            if (tsParticles.domItem(0).particles.array) {
                count_particles.innerText = tsParticles.domItem(0).particles.array.length;
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);`;
            data = {
                title: 'tsParticles demo',
                description: 'Made with tsParticles, a lightweight TypeScript library for creating particles',
                html: `<!-- tsParticles container -->
                <div id="tsparticles"></div>
                <!-- stats - count particles -->
                <div class="count-particles"><span class="js-count-particles">--</span> particles </div>
                <!-- tsParticles lib - https://github.com/matteobruni/tsparticles -->
                <script src="https://cdn.jsdelivr.net/npm/tsparticles@1.5.2/dist/tsparticles.min.js" integrity="sha256-CxqmPoQu65PhBiDVTd5h3DRXDYE8/+W5NRJhoSXS2R4=" crossorigin="anonymous"></script>
                <!-- stats.js lib -->
                <script src="http://threejs.org/examples/js/libs/stats.min.js"></script>`,
                html_pre_processor: '',
                css: `/* ---- reset ---- */
                body{ margin:0; font:normal 75% Arial, Helvetica, sans-serif; }
                canvas{ display: block; vertical-align: bottom; }
                /* ---- tsparticles container ---- */
                #tsparticles{ position:absolute; width: 100%; height: 100%; background-color: ${res_css.background_color}; background-image: url("${res_css.background_image}"); background-repeat: ${res_css.background_repeat}; background-size: ${res_css.background_size}; background-position: ${res_css.background_position}; }
                /* ---- stats.js ---- */ .count-particles{ background: #000022; position: absolute; top: 48px; left: 0; width: 80px; color: #13E8E9; font-size: .8em; text-align: left; text-indent: 4px; line-height: 14px; padding-bottom: 2px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; }
                .js-count-particles{ font-size: 1.1em; }
                #stats, .count-particles{ -webkit-user-select: none; margin-top: 5px; margin-left: 5px; }
                #stats{ border-radius: 3px 3px 0 0; overflow: hidden; }
                .count-particles{ border-radius: 0 0 3px 3px; }`,
                css_pre_processor: '',
                css_starter: '',
                css_prefix: '',
                js: `tsParticles.load("tsparticles", ${res_json}); ${stats_js};`,
                js_pre_processor: '',
                js_modernizr: '',
                js_library: '',
                html_classes: '',
                css_external: '',
                js_external: ''
            };
            dataString = JSON.stringify(data);
            data_input = document.getElementById('data-input');
            data_input.value = dataString;
            $('.js-codepen-button').click();
            return false;
        });
    };

}).call(this);