/* eslint-disable */
import { describe, expect, it, vi } from "vitest";
import { handlePlugin, transformLoadableObject } from "../src/utils.js";

describe("wordpress utils", () => {
	describe("transformLoadableObject", () => {
		it("maps entries to name, description and group only", () => {
			const source = [
				{ name: "bundle-a", description: "Bundle A", group: "bundles", load: vi.fn(), extra: true },
				{ name: "bundle-b", description: "Bundle B", group: "bundles", load: vi.fn() },
			];

			expect(transformLoadableObject(source)).toEqual([
				{ name: "bundle-a", description: "Bundle A", group: "bundles" },
				{ name: "bundle-b", description: "Bundle B", group: "bundles" },
			]);
		});

		it("returns an empty array for an empty source", () => {
			expect(transformLoadableObject([])).toEqual([]);
		});
	});

	describe("handlePlugin", () => {
		it("loads the matching plugin with the engine and reports success", async () => {
			const engine = { id: "engine" },
				load = vi.fn(async () => Promise.resolve()),
				source = [{ name: "bundle-a", load }];

			await expect(handlePlugin(source, "bundle-a", engine)).resolves.toBe(true);
			expect(load).toHaveBeenCalledWith(engine);
		});

		it("returns false when the plugin is not present", async () => {
			await expect(handlePlugin([], "missing", {})).resolves.toBe(false);
		});

		it("returns false when the matching plugin has no load function", async () => {
			const source = [{ name: "bundle-a" }];

			await expect(handlePlugin(source, "bundle-a", {})).resolves.toBe(false);
		});
	});
});
