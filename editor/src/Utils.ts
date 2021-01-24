import type { Container } from "tsparticles-core";

const changeHandler = async (container: Container, callback?: (container: Container) => void): Promise<void> => {
    if (callback) {
        callback(container);
    }

    await container.refresh();
};

export { changeHandler };
