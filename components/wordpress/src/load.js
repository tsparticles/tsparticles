import { getBundles, handleBundles } from './plugins/bundles';
import { getInteractions, handleInteractions } from './plugins/interactions';
import { getMovers, handleMovers } from './plugins/movers';
import { getPaths, handlePaths } from './plugins/paths';
import { getPlugins, handlePlugins } from './plugins/plugins';
import { getPresets, handlePresets } from './plugins/presets';
import { getShapes, handleShapes } from './plugins/shapes';
import { getUpdaters, handleUpdaters } from './plugins/updaters';

export function getAllPlugins(attributes) {
	const allPlugins = [];

	allPlugins.push(...getBundles());
	allPlugins.push(...getInteractions());
	allPlugins.push(...getMovers());
	allPlugins.push(...getPaths());
	allPlugins.push(...getPlugins());
	allPlugins.push(...getPresets());
	allPlugins.push(...getShapes());
	allPlugins.push(...getUpdaters());

	if (!attributes) {
		return allPlugins;
	}

	return allPlugins.filter(
		(plugin) =>
			Object.hasOwn(attributes, plugin.name) && attributes[plugin.name]
	);
}

export async function loadWordpressParticles(engine, plugins) {
	for (const plugin of plugins) {
		const pluginName = typeof plugin === 'string' ? plugin : plugin.name;

		if (await handleBundles(pluginName, engine)) return;
		if (await handleInteractions(pluginName, engine)) return;
		if (await handleMovers(pluginName, engine)) return;
		if (await handlePaths(pluginName, engine)) return;
		if (await handlePlugins(pluginName, engine)) return;
		if (await handlePresets(pluginName, engine)) return;
		if (await handleShapes(pluginName, engine)) return;
		if (await handleUpdaters(pluginName, engine)) return;
	}
}
