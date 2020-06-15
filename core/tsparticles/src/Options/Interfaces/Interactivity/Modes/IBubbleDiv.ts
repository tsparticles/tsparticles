import type { IOptionLoader } from "../../IOptionLoader";
import type { IBubbleBase } from "./IBubbleBase";
import type { IModeDiv } from "./IModeDiv";

export interface IBubbleDiv extends IOptionLoader<IBubbleDiv>, IBubbleBase, IModeDiv {}
