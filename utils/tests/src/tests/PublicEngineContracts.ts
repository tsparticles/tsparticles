import { AnimationOptions, OptionLoader, RangedAnimationOptions, createEngine } from "@tsparticles/engine";
import type {
  Container,
  CustomEventListener,
  IOptionLoader,
  IPlugin,
  Options,
  RecursivePartial,
} from "@tsparticles/engine";
import { describe, expect, it } from "vitest";

interface ConsumerOptions {
  enabled: boolean;
}

class CustomOptions extends OptionLoader<ConsumerOptions> implements ConsumerOptions {
  enabled = false;

  protected override doLoad(data: RecursivePartial<ConsumerOptions>): void {
    this.enabled = data.enabled ?? this.enabled;
  }
}

class DerivedAnimationOptions extends AnimationOptions {
  label = "consumer";
}

describe("public engine contracts", () => {
  it("keeps option loaders, derived classes, event callbacks, and plugins usable from the package root", async () => {
    const customOptions = new CustomOptions(),
      optionLoader: IOptionLoader<ConsumerOptions> = customOptions,
      derivedOptions = new DerivedAnimationOptions(),
      rangedOptions = new RangedAnimationOptions(),
      engine = createEngine(),
      callback: CustomEventListener = args => {
        expect(args?.data).toBe("consumer-event");
      },
      plugin: IPlugin = {
        id: "public-contract-plugin",
        getPlugin: (_container: Container) => Promise.resolve({}),
        loadOptions: (_container: Container, _options: Options) => undefined,
        needsPlugin: () => true,
      };

    optionLoader.load({ enabled: true });
    derivedOptions.load({ speed: 2 });
    engine.addEventListener("consumer", callback);
    await engine.pluginManager.register(current => {
      current.pluginManager.addPlugin(plugin);
    });
    await engine.init();
    engine.dispatchEvent("consumer", { data: "consumer-event" });

    expect(customOptions.enabled).toBe(true);
    expect(derivedOptions.speed).toBe(2);
    expect(derivedOptions.label).toBe("consumer");
    expect(rangedOptions.mode).toBe("auto");
    expect(engine.pluginManager.getPlugin(plugin.id)).toBe(plugin);
  });
});
