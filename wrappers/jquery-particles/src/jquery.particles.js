(function ($) {
    $.fn.particles = function () {
        var items = this;

        return {
            init: function (params, callback) {
                items.each(function (index, element) {
                    if (element.id === undefined) {
                        element.id = "tsparticles" + Math.floor(Math.random() * 1000);
                    }

                    tsParticles.load(element.id, params).then(callback);
                });
            },
            ajax: function (jsonUrl, callback) {
                items.each(function (index, element) {
                    if (element.id === undefined) {
                        element.id = "tsparticles" + Math.floor(Math.random() * 1000);
                    }

                    tsParticles.loadJSON(element.id, jsonUrl).then(callback);
                });
            }
        };
    }
}(jQuery));
