export class Messages {
    public static deprecationMessage(oldProperty: string, newProperty: string) {
        if (console) {
            console.warn(`The property ${oldProperty} is obsolete and will be removed in a future release. Please use the new property ${newProperty}.`);
        }
    }
}