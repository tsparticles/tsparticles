import { Container } from "tsparticles/dist/Core/Container";

export async function changeHandler(container: Container, callback?: (container: Container) => void): Promise<void> {
    if (callback) {
        callback(container);
    }

    await container.refresh();
}