import { getBundles, handleBundles } from "./plugins/bundles";
import { getEffects, handleEffects } from "./plugins/effects.js";
import { getInteractions, handleInteractions } from "./plugins/interactions";
import { getPaths, handlePaths } from "./plugins/paths";
import { getPlugins, handlePlugins } from "./plugins/plugins";
import { getPresets, handlePresets } from "./plugins/presets";
import { getShapes, handleShapes } from "./plugins/shapes";
import { getUpdaters, handleUpdaters } from "./plugins/updaters";

export function getAllPlugins(attributes) {
	const allPlugins = [
		...getBundles(),
		...getEffects(),
		...getInteractions(),
		...getPaths(),
		...getPlugins(),
		...getPresets(),
		...getShapes(),
		...getUpdaters()
	];

	if (!attributes) {
		return allPlugins;
	}

	return allPlugins.filter(plugin => Object.hasOwn(attributes, plugin.name) && attributes[plugin.name]);
}

export async function loadWordpressParticles(engine, plugins) {
	const loadedPlugins = new Set();

	for (const plugin of plugins) {
		const pluginName = typeof plugin === "string" ? plugin : plugin.name;

		if (loadedPlugins.has(pluginName)) {
			continue;
		}

		if (await handleBundles(pluginName, engine)) {
			loadedPlugins.add(pluginName);
			continue;
		}

		if (await handleEffects(pluginName, engine)) {
			loadedPlugins.add(pluginName);
			continue;
		}

		if (await handleInteractions(pluginName, engine)) {
			loadedPlugins.add(pluginName);
			continue;
		}

		if (await handlePaths(pluginName, engine)) {
			loadedPlugins.add(pluginName);
			continue;
		}

		if (await handlePlugins(pluginName, engine)) {
			loadedPlugins.add(pluginName);
			continue;
		}

		if (await handlePresets(pluginName, engine)) {
			loadedPlugins.add(pluginName);
			continue;
		}

		if (await handleShapes(pluginName, engine)) {
			loadedPlugins.add(pluginName);
			continue;
		}

		if (await handleUpdaters(pluginName, engine)) {
			loadedPlugins.add(pluginName);
		}
	}
}
