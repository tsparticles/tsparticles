import { Context, createContext } from "react";

export type TFrameContext = {
    chosenFrame: number;
    switchFrame: (frameIndex: number) => void;
}

export const FrameContext: Context<TFrameContext> = createContext({
    chosenFrame: 0,
    switchFrame: (frameIndex: number) => {}
});