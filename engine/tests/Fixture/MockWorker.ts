export class Worker {
    url;
    onmessage;

    constructor(stringUrl: string) {
        this.url = stringUrl;
        this.onmessage = (msg: string) => {
            // nothing to do
        };
    }

    postMessage(msg: string): void {
        this.onmessage(msg);
    }

    addEventListener(msg: string, cb: any): void {
        if (msg === "message") {
            this.onmessage = cb;
        }
    }
}
