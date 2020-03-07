export class Messages {
    public static deprecated(oldProperty: string, newProperty: string): void {
        /* eslint no-console: "error" */
        if (console) {
            const obsolete =`The property ${oldProperty} is obsolete and will be removed in a future release.`;
            const useNew = `Please use the new property ${newProperty}.`;
            /* eslint no-console: "error" */
            console.warn(`${obsolete} ${useNew}`);
        }
    }
}
