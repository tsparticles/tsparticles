import type { Container } from "tsparticles";

const changeHandler = async (container: Container, callback?: (container: Container) => void): Promise<void> => {
    if (callback) {
        callback(container);
    }

    await container.refresh();
};

export { changeHandler };
