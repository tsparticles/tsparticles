import { JSDOM } from "jsdom";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
const testWindow = new JSDOM("").window as any;

export { testWindow as TestWindow };
