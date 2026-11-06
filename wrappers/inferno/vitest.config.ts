import { transformAsync } from "@babel/core";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		{
			name: "inferno-babel",
			enforce: "pre",
			async transform(code, id) {
				if (!id.endsWith(".tsx")) {
					return null;
				}

				const result = await transformAsync(code, { filename: id, babelrc: true });

				return result?.code ? { code: result.code, map: result.map } : null;
			},
		},
	],
	test: {
		environment: "node",
		include: ["tests/**/*.test.ts"],
	},
});
