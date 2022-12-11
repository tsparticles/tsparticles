import type { Container } from "tsparticles-engine";

const changeHandler = async (container: Container, callback?: (container: Container) => void): Promise<void> => {
    if (callback) {
        callback(container);
    }

    await container.refresh();
};

const editorChangedEvent = "editorChanged";

export { changeHandler, editorChangedEvent };
