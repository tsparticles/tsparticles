import { beforeEach, describe, expect, it, vi } from "vitest";

const { loadMock, loggerError } = vi.hoisted(() => ({
	loadMock: vi.fn(),
	loggerError: vi.fn(),
}));

vi.mock("@tsparticles/engine", () => ({
	getLogger: () => ({ error: loggerError }),
	tsParticles: { load: loadMock },
}));

vi.mock("../src/initParticlesEngine.js", () => ({
	waitForParticlesEngineInitialization: vi.fn(async () => Promise.resolve()),
}));

import Particles from "../src/Particles.js";

describe("Inferno Particles component", () => {
	beforeEach(() => {
		loadMock.mockReset();
		loggerError.mockReset();
	});

	it("applies the latest theme when a pending container load completes", async () => {
		const loadedContainer = {
			destroy: vi.fn(),
			loadTheme: vi.fn(async () => Promise.resolve()),
		};
		let resolveLoad: ((container: typeof loadedContainer) => void) | undefined;

		loadMock.mockImplementationOnce(
			() =>
				new Promise(resolve => {
					resolveLoad = resolve;
				}),
		);

		const component = new Particles({ theme: "light" }),
			loadPromise = component.loadContainer();

		await vi.waitFor(() => {
			expect(loadMock).toHaveBeenCalledTimes(1);
		});

		component.props = { ...component.props, theme: "dark" };
		component.componentDidUpdate({ theme: "light" });

		expect(loadedContainer.loadTheme).not.toHaveBeenCalled();

		resolveLoad?.(loadedContainer);
		await loadPromise;

		expect(loadedContainer.loadTheme).toHaveBeenCalledWith("dark");
	});
});
