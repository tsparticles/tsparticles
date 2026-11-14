import { beforeEach, describe, expect, it, vi } from "vitest";

const { loadMock, loggerError } = vi.hoisted(() => ({
	loadMock: vi.fn(),
	loggerError: vi.fn(),
}));

const engine = {
	load: loadMock,
	init: vi.fn(async () => undefined),
} as unknown as import("@tsparticles/engine").Engine;

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

	it("waits for the newest theme before publishing the container", async () => {
		let finishFirst!: () => void, finishSecond!: () => void;
		const container = {
			destroy: vi.fn(),
			loadTheme: vi
				.fn()
				.mockImplementationOnce(
					() =>
						new Promise<void>(resolve => {
							finishFirst = resolve;
						}),
				)
				.mockImplementationOnce(
					() =>
						new Promise<void>(resolve => {
							finishSecond = resolve;
						}),
				),
		};
		const loaded = vi.fn(),
			ref = { current: undefined };
		loadMock.mockResolvedValueOnce(container);
		const component = new Particles({ engine, theme: "first", loaded, container: ref });
		const loading = component.loadContainer();
		await vi.waitFor(() => expect(container.loadTheme).toHaveBeenCalledTimes(1));
		component.props = { engine, ...component.props, theme: "second" };
		component.componentDidUpdate({ engine, theme: "first" });
		finishFirst();
		await new Promise(resolve => setTimeout(resolve, 0));
		expect(loaded).not.toHaveBeenCalled();
		expect(ref.current).toBeUndefined();
		finishSecond();
		await loading;
		expect(loaded).toHaveBeenCalledWith(container);
		expect(ref.current).toBe(container);
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

		const component = new Particles({ engine, theme: "light", loaded }),
			loadPromise = component.loadContainer();

		await vi.waitFor(() => {
			expect(loadMock).toHaveBeenCalledTimes(1);
		});

		component.props = { engine, ...component.props, theme: "dark" };
		component.componentDidUpdate({ engine, theme: "light" });

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

		const component = new Particles({ engine, options: oldOptions, theme: "dark", loaded }),
			staleLoad = component.loadContainer();

		await vi.waitFor(() => {
			expect(loadMock).toHaveBeenCalledTimes(1);
		});

		component.props = { engine, ...component.props, options: newOptions };
		component.componentDidUpdate({ engine, ...component.props, options: oldOptions });

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
				refresh: vi.fn().mockResolvedValue(undefined),
			};

		loadMock.mockResolvedValueOnce(container);

		await new Particles({ engine, theme: "dark", loaded }).loadContainer();

		expect(loggerError).toHaveBeenCalledWith("Particles: error during theme load", error);
		expect(container.refresh).toHaveBeenCalledOnce();
		expect(loaded).toHaveBeenCalledWith(container);
	});

	it("restores initial playback after overlapping theme refreshes both reject", async () => {
		const error = new Error("theme refresh failed");
		let rejectFirstTheme: ((error: Error) => void) | undefined,
			rejectSecondTheme: ((error: Error) => void) | undefined,
			isPlaying = true;
		const container = {
			destroy: vi.fn(),
			destroyed: false,
			get animationStatus() {
				return isPlaying;
			},
			loadTheme: vi
				.fn()
				.mockImplementationOnce(
					() =>
						new Promise<void>((_, reject) => {
							isPlaying = false;
							rejectFirstTheme = reject;
						}),
				)
				.mockImplementationOnce(
					() =>
						new Promise<void>((_, reject) => {
							rejectSecondTheme = reject;
						}),
				),
			refresh: vi.fn().mockImplementation(async () => {
				isPlaying = true;
			}),
		};

		loadMock.mockResolvedValueOnce(container);

		const component = new Particles({ engine, theme: "dark" }),
			loadPromise = component.loadContainer();

		await vi.waitFor(() => {
			expect(container.loadTheme).toHaveBeenCalledTimes(1);
		});

		component.props = { engine, ...component.props, theme: "light" };
		component.componentDidUpdate({ engine, theme: "dark" });

		await vi.waitFor(() => {
			expect(container.loadTheme).toHaveBeenCalledTimes(2);
		});

		rejectFirstTheme?.(error);
		rejectSecondTheme?.(error);
		await loadPromise;

		await vi.waitFor(() => {
			expect(container.refresh).toHaveBeenCalledOnce();
		});

		expect(container.refresh).toHaveBeenCalledOnce();
	});

	it.each([
		{ animationStatus: false, destroyed: false, name: "stopped" },
		{ animationStatus: true, destroyed: true, name: "destroyed" },
	])("does not recover a $name container after its theme load rejects", async ({ animationStatus, destroyed }) => {
		const container = {
				destroy: vi.fn(),
				destroyed,
				animationStatus,
				loadTheme: vi.fn().mockRejectedValue(new Error("theme refresh failed")),
				refresh: vi.fn(),
			},
			component = new Particles({ engine });

		await component.loadTheme(container, "dark");

		expect(container.refresh).not.toHaveBeenCalled();
	});

	it("recreates a container when theme recovery initialization fails", async () => {
		const themeError = new Error("theme refresh failed"),
			recoveryError = new Error("container refresh failed"),
			container = {
				destroy: vi.fn(),
				destroyed: false,
				animationStatus: true,
				loadTheme: vi.fn().mockRejectedValue(themeError),
				refresh: vi.fn().mockRejectedValue(recoveryError),
			},
			recreatedContainer = {
				destroy: vi.fn(),
				loadTheme: vi.fn().mockResolvedValue(undefined),
			};

		loadMock.mockResolvedValueOnce(container).mockResolvedValueOnce(recreatedContainer);

		const component = new Particles({ engine, theme: "dark" });

		await component.loadContainer();
		component.props = { engine, ...component.props, theme: "light" };
		component.componentDidUpdate({ engine, theme: "dark" });

		await vi.waitFor(() => {
			expect(loadMock).toHaveBeenCalledTimes(2);
		});

		await vi.waitFor(() => {
			expect(component._container).toBe(recreatedContainer);
		});
		expect(loggerError).toHaveBeenCalledWith("Particles: error during theme recovery", recoveryError);
	});

	it("does not recover a stale failed theme request", async () => {
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
			refresh: vi.fn(),
		};

		loadMock.mockResolvedValueOnce(container);

		const component = new Particles({ engine, theme: "dark" }),
			loadPromise = component.loadContainer();

		await vi.waitFor(() => {
			expect(container.loadTheme).toHaveBeenCalledTimes(1);
		});

		component.props = { engine, ...component.props, theme: "light" };
		component.componentDidUpdate({ engine, theme: "dark" });

		await vi.waitFor(() => {
			expect(container.loadTheme).toHaveBeenCalledTimes(2);
		});

		rejectFirstTheme?.(error);
		await vi.waitFor(() => {
			expect(loggerError).toHaveBeenCalledWith("Particles: error during theme load", error);
		});

		expect(container.refresh).not.toHaveBeenCalled();
		resolveSecondTheme?.();
		await loadPromise;
		expect(container.refresh).not.toHaveBeenCalled();
	});
});
