import { Container } from "tsparticles/dist/Core/Container";

const changeHandler = async (container: Container, callback?: (container: Container) => void): Promise<void> => {
    if (callback) {
        callback(container);
    }

    await container.refresh();
};

export { changeHandler };
