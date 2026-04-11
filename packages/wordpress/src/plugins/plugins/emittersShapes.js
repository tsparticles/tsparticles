import { __ } from "@wordpress/i18n";

export function getEmitterShapes(group, localizeFn) {
	return [
		{
			name: "plugin-emitters-shape-canvas",
			description: localizeFn(__("Canvas")),
			group,
			load: async (engine) => {
				const { loadEmittersShapeCanvas } = await import(
					"@tsparticles/plugin-emitters-shape-canvas"
					);

				await loadEmittersShapeCanvas(engine);
			}
		},
		{
			name: "plugin-emitters-shape-circle",
			description: localizeFn(__("Circle")),
			group,
			load: async (engine) => {
				const { loadEmittersShapeCircle } = await import(
					"@tsparticles/plugin-emitters-shape-circle"
					);

				await loadEmittersShapeCircle(engine);
			}
		},
		{
			name: "plugin-emitters-shape-path",
			description: localizeFn(__("Path")),
			group,
			load: async (engine) => {
				const { loadEmittersShapePath } = await import(
					"@tsparticles/plugin-emitters-shape-path"
					);

				await loadEmittersShapePath(engine);
			}
		},
		{
			name: "plugin-emitters-shape-polygon",
			description: localizeFn(__("Polygon")),
			group,
			load: async (engine) => {
				const { loadEmittersShapePolygon } = await import(
					"@tsparticles/plugin-emitters-shape-polygon"
					);

				await loadEmittersShapePolygon(engine);
			}
		},
		{
			name: "plugin-emitters-shape-square",
			description: localizeFn(__("Square")),
			group,
			load: async (engine) => {
				const { loadEmittersShapeSquare } = await import(
					"@tsparticles/plugin-emitters-shape-square"
					);

				await loadEmittersShapeSquare(engine);
			}
		},
	];
}
