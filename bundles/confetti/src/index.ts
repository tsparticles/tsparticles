import type { IConfettiOptions } from "./IConfettiOptions";
import type { RecursivePartial } from "tsparticles-engine";
import { getRandom } from "tsparticles-engine";

export type ConfettiOptions = RecursivePartial<IConfettiOptions>;
export type ConfettiFirstParam = string | ConfettiOptions;

export async function confetti(
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>
): Promise<void> {
    let options: ConfettiOptions;
    let id: string;

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options = confettiOptions ?? {};
    } else {
        id = `tsparticles_${Math.floor(getRandom() * 1000)}`;
        options = idOrOptions;
    }
}
