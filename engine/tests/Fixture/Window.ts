import { JSDOM } from "jsdom";

const testWindow = new JSDOM("").window as any;

export { testWindow as TestWindow };
