export function transformLoadableObject(source) {
	return source.map((t) => {
		return {
			name: t.name,
			description: t.description,
			group: t.group,
		};
	});
}

export async function handlePlugin(source, pluginName, engine) {
	const bundle = source.find((t) => t.name === pluginName);

	if (bundle && bundle.load) {
		await bundle.load(engine);

		return true;
	}

	return false;
}
