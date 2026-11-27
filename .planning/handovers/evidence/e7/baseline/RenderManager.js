import { defaultCompositeValue, defaultTransformValue, defaultZoom, minStrokeWidth, minimumSize, originPoint, zIndexFactorOffset, } from "../Utils/Constants.js";
import { getStyleFromOklch, rangeColorToOklch } from "../../Utils/ColorUtils.js";
import { DrawLayer } from "../../Enums/DrawLayer.js";
const fColorIndex = 0, sColorIndex = 1;
function setTransformValue(factor, newFactor, key) {
    const newValue = newFactor[key];
    if (newValue !== undefined) {
        factor[key] = (factor[key] ?? defaultTransformValue) * newValue;
    }
}
export class RenderManager {
    #backgroundElement;
    #backgroundWarnings;
    #canvasClearPlugins;
    #canvasManager;
    #colorPlugins;
    #container;
    #context;
    #contextSettings;
    #drawParticlePlugins;
    #drawParticlesCleanupPlugins;
    #drawParticlesSetupPlugins;
    #layers;
    #pluginManager;
    #postDrawUpdaters;
    #preDrawUpdaters;
    #reusableColorStyles = {};
    #reusablePluginColors = [
        undefined,
        undefined,
    ];
    #reusableTransform = {};
    constructor(pluginManager, container, canvasManager) {
        this.#pluginManager = pluginManager;
        this.#container = container;
        this.#canvasManager = canvasManager;
        this.#context = null;
        this.#backgroundElement = null;
        this.#backgroundWarnings = new Set();
        this.#preDrawUpdaters = [];
        this.#postDrawUpdaters = [];
        this.#canvasClearPlugins = [];
        this.#colorPlugins = [];
        this.#drawParticlePlugins = [];
        this.#drawParticlesCleanupPlugins = [];
        this.#drawParticlesSetupPlugins = [];
        this.#layers = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
        };
    }
    get settings() {
        return this.#contextSettings;
    }
    canvasClear() {
        if (!this.#container.actualOptions.clear) {
            return;
        }
        this.draw(ctx => {
            ctx.clearRect(originPoint.x, originPoint.y, this.#canvasManager.size.width, this.#canvasManager.size.height);
        });
    }
    clear() {
        const visited = new Set();
        for (const plugin of this.#canvasClearPlugins) {
            visited.add(plugin);
            if (plugin.canvasClear?.() ?? false) {
                return plugin;
            }
        }
        for (const layer of Object.values(DrawLayer)) {
            if (typeof layer === "number") {
                for (const plugin of this.#getLayerPlugins(layer)) {
                    if (visited.has(plugin)) {
                        continue;
                    }
                    visited.add(plugin);
                    if (plugin.canvasClear?.() ?? false) {
                        return plugin;
                    }
                }
            }
        }
        this.canvasClear();
        return undefined;
    }
    destroy() {
        this.stop();
        this.#backgroundElement = null;
        this.#backgroundWarnings.clear();
        this.#preDrawUpdaters = [];
        this.#postDrawUpdaters = [];
        this.#canvasClearPlugins = [];
        this.#colorPlugins = [];
        this.#drawParticlePlugins = [];
        this.#drawParticlesCleanupPlugins = [];
        this.#drawParticlesSetupPlugins = [];
        for (const layer of Object.values(DrawLayer)) {
            if (typeof layer === "number") {
                this.#layers[layer] = [];
            }
        }
    }
    draw(cb) {
        const ctx = this.#context;
        if (!ctx) {
            return;
        }
        return cb(ctx);
    }
    drawParticle(particle, delta) {
        if (particle.spawning || particle.destroyed) {
            return;
        }
        const radius = particle.getRadius();
        if (radius <= minimumSize) {
            return;
        }
        const pfColor = particle.getFillColor(), psColor = particle.getStrokeColor();
        let [fColor, sColor] = this.#getPluginParticleColors(particle);
        fColor ??= pfColor;
        sColor ??= psColor;
        if (!fColor && !sColor) {
            return;
        }
        const container = this.#container, zIndexOptions = particle.options.zIndex, zIndexFactor = zIndexFactorOffset - particle.zIndexFactor, { fillOpacity, opacity, strokeOpacity } = particle.getOpacity(), transform = this.#reusableTransform, colorStyles = this.#reusableColorStyles, fill = fColor
            ? getStyleFromOklch(fColor, container.hdr, fillOpacity * opacity, container.peakNits, container.hdrMode, container.outputColorSpace)
            : undefined, stroke = sColor
            ? getStyleFromOklch(sColor, container.hdr, strokeOpacity * opacity, container.peakNits, container.hdrMode, container.outputColorSpace)
            : fill;
        transform.a = transform.b = transform.c = transform.d = undefined;
        colorStyles.fill = fill;
        colorStyles.stroke = stroke;
        this.draw((context) => {
            for (const plugin of this.#drawParticlesSetupPlugins) {
                plugin.drawParticleSetup?.(context, particle, delta);
            }
            this.#applyPreDrawUpdaters(context, particle, radius, opacity, colorStyles, transform);
            this.#drawParticle({
                container,
                context,
                particle,
                delta,
                colorStyles,
                radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
                opacity: opacity,
                transform,
            });
            this.#applyPostDrawUpdaters(particle);
            for (const plugin of this.#drawParticlesCleanupPlugins) {
                plugin.drawParticleCleanup?.(context, particle, delta);
            }
        });
    }
    drawParticlePlugins(particle, delta) {
        this.draw(ctx => {
            for (const plugin of this.#drawParticlePlugins) {
                this.#drawParticlePlugin(ctx, plugin, particle, delta);
            }
        });
    }
    drawParticles(delta) {
        const { particles, actualOptions } = this.#container;
        this.clear();
        particles.update(delta);
        this.draw(ctx => {
            const width = this.#canvasManager.size.width, height = this.#canvasManager.size.height;
            if (this.#backgroundElement) {
                try {
                    ctx.drawImage(this.#backgroundElement, originPoint.x, originPoint.y, width, height);
                }
                catch {
                    this.#warnOnce("background-element-draw-error", "Error drawing background element onto canvas");
                }
            }
            const background = actualOptions.background;
            if (background.draw) {
                try {
                    background.draw(ctx, delta);
                }
                catch {
                    this.#warnOnce("background-draw-error", "Error in background.draw callback");
                }
            }
            for (const plugin of this.#getLayerPlugins(DrawLayer.BackgroundMask)) {
                plugin.canvasPaint?.();
            }
            for (const plugin of this.#getLayerPlugins(DrawLayer.CanvasSetup)) {
                plugin.drawSettingsSetup?.(ctx, delta);
            }
            for (const plugin of this.#getLayerPlugins(DrawLayer.PluginContent)) {
                plugin.draw?.(ctx, delta);
            }
            particles.drawParticles(delta);
            for (const plugin of this.#getLayerPlugins(DrawLayer.CanvasCleanup)) {
                plugin.clearDraw?.(ctx, delta);
                plugin.drawSettingsCleanup?.(ctx, delta);
            }
        });
    }
    init() {
        this.initUpdaters();
        this.initPlugins();
        this.#resolveBackgroundElement();
        this.paint();
    }
    initPlugins() {
        this.#canvasClearPlugins = [];
        this.#colorPlugins = [];
        this.#drawParticlePlugins = [];
        this.#drawParticlesSetupPlugins = [];
        this.#drawParticlesCleanupPlugins = [];
        for (const layer of Object.values(DrawLayer)) {
            if (typeof layer === "number") {
                this.#layers[layer] = [];
            }
        }
        this.#initPluginsArray();
    }
    initUpdaters() {
        this.#preDrawUpdaters = [];
        this.#postDrawUpdaters = [];
        for (const updater of this.#container.particleUpdaters) {
            if (updater.afterDraw) {
                this.#postDrawUpdaters.push(updater);
            }
            if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
                this.#preDrawUpdaters.push(updater);
            }
        }
    }
    paint() {
        let handled = false;
        for (const plugin of this.#getLayerPlugins(DrawLayer.BackgroundMask)) {
            handled = plugin.canvasPaint?.() ?? false;
            if (handled) {
                break;
            }
        }
        if (handled) {
            return;
        }
        this.paintBase();
    }
    paintBase(baseColor) {
        this.draw(ctx => {
            ctx.fillStyle = baseColor ?? "rgba(0,0,0,0)";
            ctx.fillRect(originPoint.x, originPoint.y, this.#canvasManager.size.width, this.#canvasManager.size.height);
        });
    }
    paintImage(image, opacity) {
        this.draw(ctx => {
            if (!image) {
                return;
            }
            const prevAlpha = ctx.globalAlpha;
            ctx.globalAlpha = opacity;
            ctx.drawImage(image, originPoint.x, originPoint.y, this.#canvasManager.size.width, this.#canvasManager.size.height);
            ctx.globalAlpha = prevAlpha;
        });
    }
    setContext(context) {
        this.#context = context;
        if (this.#context) {
            this.#context.globalCompositeOperation = defaultCompositeValue;
        }
    }
    setContextSettings(settings) {
        this.#contextSettings = settings;
    }
    stop() {
        this.draw(ctx => {
            ctx.clearRect(originPoint.x, originPoint.y, this.#canvasManager.size.width, this.#canvasManager.size.height);
        });
    }
    updateBackgroundElement() {
        this.#resolveBackgroundElement();
    }
    #applyPostDrawUpdaters(particle) {
        for (const updater of this.#postDrawUpdaters) {
            updater.afterDraw?.(particle);
        }
    }
    #applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform) {
        for (const updater of this.#preDrawUpdaters) {
            if (updater.getColorStyles) {
                const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
                if (fill) {
                    colorStyles.fill = fill;
                }
                if (stroke) {
                    colorStyles.stroke = stroke;
                }
            }
            if (updater.getTransformValues) {
                const updaterTransform = updater.getTransformValues(particle);
                for (const key in updaterTransform) {
                    setTransformValue(transform, updaterTransform, key);
                }
            }
            updater.beforeDraw?.(particle);
        }
    }
    #drawAfterEffect(drawer, data) {
        if (!drawer?.drawAfter) {
            return;
        }
        const { particle } = data;
        if (!particle.effect) {
            return;
        }
        drawer.drawAfter(data);
    }
    #drawBeforeEffect(drawer, data) {
        if (!drawer?.drawBefore) {
            return;
        }
        const { particle } = data;
        if (!particle.effect) {
            return;
        }
        drawer.drawBefore(data);
    }
    #drawParticle(data) {
        const { container, context, particle, delta, colorStyles, radius, opacity, transform } = data, { effectDrawers, shapeDrawers } = container, pos = particle.getPosition(), transformData = particle.getTransformData(transform), drawScale = defaultZoom, drawPosition = {
            x: pos.x,
            y: pos.y,
        };
        context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
        if (colorStyles.fill) {
            context.fillStyle = colorStyles.fill;
        }
        const fillEnabled = !!particle.fillEnabled, strokeWidth = particle.strokeWidth ?? minStrokeWidth;
        context.lineWidth = strokeWidth;
        if (colorStyles.stroke) {
            context.strokeStyle = colorStyles.stroke;
        }
        const drawData = {
            context,
            particle,
            radius,
            drawRadius: radius * drawScale,
            opacity,
            delta,
            pixelRatio: container.retina.pixelRatio,
            fill: fillEnabled,
            stroke: strokeWidth > minStrokeWidth,
            transformData,
            position: { ...pos },
            drawPosition,
            drawScale,
        };
        for (const plugin of container.plugins) {
            plugin.drawParticleTransform?.(drawData);
        }
        const effect = particle.effect ? effectDrawers.get(particle.effect) : undefined, shape = particle.shape ? shapeDrawers.get(particle.shape) : undefined;
        this.#drawBeforeEffect(effect, drawData);
        this.#drawShapeBeforeDraw(shape, drawData);
        this.#drawShape(shape, drawData);
        this.#drawShapeAfterDraw(shape, drawData);
        this.#drawAfterEffect(effect, drawData);
        context.resetTransform();
    }
    #drawParticlePlugin(context, plugin, particle, delta) {
        if (!plugin.drawParticle) {
            return;
        }
        plugin.drawParticle(context, particle, delta);
    }
    #drawShape(drawer, data) {
        if (!drawer) {
            return;
        }
        const { context, fill, particle, stroke } = data;
        if (!particle.shape) {
            return;
        }
        context.beginPath();
        drawer.draw(data);
        if (particle.shapeClose) {
            context.closePath();
        }
        if (fill) {
            context.fill();
        }
        if (stroke) {
            context.stroke();
        }
    }
    #drawShapeAfterDraw(drawer, data) {
        if (!drawer?.afterDraw) {
            return;
        }
        const { particle } = data;
        if (!particle.shape) {
            return;
        }
        drawer.afterDraw(data);
    }
    #drawShapeBeforeDraw(drawer, data) {
        if (!drawer?.beforeDraw) {
            return;
        }
        const { particle } = data;
        if (!particle.shape) {
            return;
        }
        drawer.beforeDraw(data);
    }
    #getLayerPlugins(layer) {
        return this.#layers[layer];
    }
    #getPluginParticleColors(particle) {
        let fColor, sColor;
        for (const plugin of this.#colorPlugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = rangeColorToOklch(this.#pluginManager, plugin.particleFillColor(particle));
            }
            if (!sColor && plugin.particleStrokeColor) {
                sColor = rangeColorToOklch(this.#pluginManager, plugin.particleStrokeColor(particle));
            }
            if (fColor && sColor) {
                break;
            }
        }
        this.#reusablePluginColors[fColorIndex] = fColor;
        this.#reusablePluginColors[sColorIndex] = sColor;
        return this.#reusablePluginColors;
    }
    #initLayerPlugin(plugin) {
        const layerMap = [
            [DrawLayer.BackgroundMask, !!plugin.canvasPaint],
            [DrawLayer.CanvasSetup, !!plugin.drawSettingsSetup],
            [DrawLayer.PluginContent, !!plugin.draw],
            [
                DrawLayer.CanvasCleanup,
                !!(plugin.clearDraw ?? plugin.drawSettingsCleanup),
            ],
        ];
        for (const [layer, active] of layerMap) {
            if (active) {
                this.#layers[layer].push(plugin);
            }
        }
    }
    #initPluginsArray() {
        for (const plugin of this.#container.plugins) {
            if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
                this.#colorPlugins.push(plugin);
            }
            if (plugin.drawParticle) {
                this.#drawParticlePlugins.push(plugin);
            }
            if (plugin.drawParticleSetup) {
                this.#drawParticlesSetupPlugins.push(plugin);
            }
            if (plugin.drawParticleCleanup) {
                this.#drawParticlesCleanupPlugins.push(plugin);
            }
            if (plugin.canvasClear) {
                this.#canvasClearPlugins.push(plugin);
            }
            this.#initLayerPlugin(plugin);
        }
    }
    #isSupportedElement(element) {
        return ((typeof HTMLCanvasElement !== "undefined" && element instanceof HTMLCanvasElement) ||
            (typeof OffscreenCanvas !== "undefined" && element instanceof OffscreenCanvas) ||
            (typeof HTMLVideoElement !== "undefined" && element instanceof HTMLVideoElement) ||
            (typeof HTMLImageElement !== "undefined" && element instanceof HTMLImageElement));
    }
    #resolveBackgroundElement() {
        const background = this.#container.actualOptions.background;
        this.#backgroundElement = null;
        if (!background.element) {
            return;
        }
        if (typeof background.element === "string") {
            if (typeof document !== "undefined") {
                let node;
                try {
                    node = document.querySelector(background.element);
                }
                catch {
                    this.#warnOnce("background-element-invalid-selector", `Background element selector "${background.element}" is invalid`);
                    return;
                }
                if (node && this.#isSupportedElement(node)) {
                    this.#backgroundElement = node;
                }
                else if (node) {
                    this.#warnOnce("background-element-not-supported", `Background element "${background.element}" is not a supported drawable element (canvas, video, or img)`);
                }
                else {
                    this.#warnOnce("background-element-not-found", `Background element selector "${background.element}" not found`);
                }
            }
        }
        else if (this.#isSupportedElement(background.element)) {
            this.#backgroundElement = background.element;
        }
    }
    #warnOnce(key, message) {
        if (!this.#backgroundWarnings.has(key)) {
            this.#backgroundWarnings.add(key);
            this.#container.engine.getLogger().warning(message);
        }
    }
}
