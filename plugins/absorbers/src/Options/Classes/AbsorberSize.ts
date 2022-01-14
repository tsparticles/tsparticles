import { AbsorberSizeLimit } from "./AbsorberSizeLimit";
import type { IAbsorberSize } from "../Interfaces/IAbsorberSize";
import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import { ValueWithRandom } from "tsparticles-engine";

export class AbsorberSize extends ValueWithRandom implements IAbsorberSize, IOptionLoader<IAbsorberSize> {
    density;
    limit: AbsorberSizeLimit;

    constructor() {
        super();
        this.density = 5;
        this.value = 50;
        this.limit = new AbsorberSizeLimit();
    }

    load(data?: RecursivePartial<IAbsorberSize>): void {
        if (!data) {
            return;
        }

        super.load(data);

        if (data.density !== undefined) {
            this.density = data.density;
        }

        if (typeof data.limit === "number") {
            this.limit.radius = data.limit;
        } else {
            this.limit.load(data.limit);
        }
    }
}
