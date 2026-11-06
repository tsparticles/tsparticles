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
		let resolveTheme: (() => void) | undefined;
		const loadedContainer = {
			destroy: vi.fn(),
			loadTheme: vi.fn(
				() =>
					new Promise<void>(resolve => {
						resolveTheme = resolve;
					}),
			),
		};
		const loaded = vi.fn();
		let resolveLoad: ((container: typeof loadedContainer) => void) | undefined;

		loadMock.mockImplementationOnce(
			() =>
				new Promise(resolve => {
					resolveLoad = resolve;
				}),
		);

		const component = new Particles({ theme: "light", loaded }),
			loadPromise = component.loadContainer();

		await vi.waitFor(() => {
			expect(loadMock).toHaveBeenCalledTimes(1);
		});

		component.props = { ...component.props, theme: "dark" };
		component.componentDidUpdate({ theme: "light" });

		expect(loadedContainer.loadTheme).not.toHaveBeenCalled();

		resolveLoad?.(loadedContainer);

		await vi.waitFor(() => {
			expect(loadedContainer.loadTheme).toHaveBeenCalledWith("dark");
		});

		expect(loaded).not.toHaveBeenCalled();
		resolveTheme?.();
		await loadPromise;

		expect(loadedContainer.loadTheme).toHaveBeenCalledWith("dark");
		expect(loaded).toHaveBeenCalledWith(loadedContainer);
	});

	it("discards a load superseded by an options change", async () => {
		const staleContainer = {
				destroy: vi.fn(),
				loadTheme: vi.fn(),
			},
			latestContainer = {
				destroy: vi.fn(),
				loadTheme: vi.fn(),
			},
			oldOptions = {},
			newOptions = {},
			loaded = vi.fn();
		let resolveStaleLoad: ((container: typeof staleContainer) => void) | undefined;

		loadMock
			.mockImplementationOnce(
				() =>
					new Promise(resolve => {
						resolveStaleLoad = resolve;
					}),
			)
			.mockResolvedValueOnce(latestContainer);

		const component = new Particles({ options: oldOptions, theme: "dark", loaded }),
			staleLoad = component.loadContainer();

		await vi.waitFor(() => {
			expect(loadMock).toHaveBeenCalledTimes(1);
		});

		component.props = { ...component.props, options: newOptions };
		component.componentDidUpdate({ ...component.props, options: oldOptions });

		await vi.waitFor(() => {
			expect(loaded).toHaveBeenCalledTimes(1);
		});

		resolveStaleLoad?.(staleContainer);
		await staleLoad;

		expect(staleContainer.destroy).toHaveBeenCalledOnce();
		expect(staleContainer.loadTheme).not.toHaveBeenCalled();
		expect(latestContainer.loadTheme).toHaveBeenCalledWith("dark");
		expect(loaded).toHaveBeenCalledOnce();
		expect(loaded).toHaveBeenCalledWith(latestContainer);
	});

	it("recovers a playing container when its theme refresh rejects", async () => {
		const error = new Error("theme refresh failed"),
			loaded = vi.fn(),
			container = {
				destroy: vi.fn(),
				destroyed: false,
				animationStatus: true,
				loadTheme: vi.fn().mockRejectedValue(error),
				play: vi.fn(),
			};

		loadMock.mockResolvedValueOnce(container);

		await new Particles({ theme: "dark", loaded }).loadContainer();

		expect(loggerError).toHaveBeenCalledWith("Particles: error during theme load", error);
		expect(container.play).toHaveBeenCalledOnce();
		expect(loaded).toHaveBeenCalledWith(container);
	});

	it("does not resume playback when an older theme refresh rejects", async () => {
		const error = new Error("theme refresh failed");
		let rejectFirstTheme: ((error: Error) => void) | undefined, resolveSecondTheme: (() => void) | undefined;
		const container = {
			destroy: vi.fn(),
			destroyed: false,
			animationStatus: true,
			loadTheme: vi
				.fn()
				.mockImplementationOnce(
					() =>
						new Promise<void>((_, reject) => {
							rejectFirstTheme = reject;
						}),
				)
				.mockImplementationOnce(
					() =>
						new Promise<void>(resolve => {
							resolveSecondTheme = resolve;
						}),
				),
			play: vi.fn(),
		};

		loadMock.mockResolvedValueOnce(container);

		const component = new Particles({ theme: "dark" }),
			loadPromise = component.loadContainer();

		await vi.waitFor(() => {
			expect(container.loadTheme).toHaveBeenCalledTimes(1);
		});

		component.props = { ...component.props, theme: "light" };
		component.componentDidUpdate({ theme: "dark" });

		await vi.waitFor(() => {
			expect(container.loadTheme).toHaveBeenCalledTimes(2);
		});

		rejectFirstTheme?.(error);

		await vi.waitFor(() => {
			expect(loggerError).toHaveBeenCalledWith("Particles: error during theme load", error);
		});

		expect(container.play).not.toHaveBeenCalled();

		resolveSecondTheme?.();
		await loadPromise;
	});
});
