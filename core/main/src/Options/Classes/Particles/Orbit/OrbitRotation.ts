import type { IOrbitRotation } from "../../../Interfaces/Particles/Orbit/IOrbitRotation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * @category Options
 */
export class OrbitRotation extends ValueWithRandom implements IOrbitRotation, IOptionLoader<IOrbitRotation> {
    public value: number;

    constructor() {
        super();

        this.value = 45;
        this.random.enable = false;
        this.random.minimumValue = 0;
    }

    public load(data?: RecursivePartial<IOrbitRotation>): void {
        if (data === undefined) {
            return;
        }

        super.load(data);

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
