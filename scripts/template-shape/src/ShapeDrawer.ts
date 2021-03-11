import type { Container, IParticle, IShapeDrawer, Particle } from "tsparticles-engine";

/**
 * The Shape Drawer used to draw this custom shape
 */
export class ShapeDrawer implements IShapeDrawer {
    /**
     * Returns the number of sides, for unknown shapes use 12. This number will be used for a regular polygon, use the closest one. Optional, if not defined 12 will be used
     */
    public getSidesCount(): number {
        return 12;
    }

    /**
     * The main draw function, only the drawing functions are needed. The context is ready to be used, the [0, 0] coordinate is the particle center. Required
     * @param context
     * @param particle
     * @param radius
     */
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        // Add code here
    }

    /**
     * Shape initialization method, it's called when the shape is found the first time. Optional
     * @param container
     */
    public async init(container: Container): Promise<void> {
        // Add initialization code here
    }

    /**
     * After Effect function, it's called after the main draw, this can be called for additional customizations. Optional
     * @param context
     * @param particle
     * @param radius
     * @param opacity
     * @param delta
     * @param pixelRatio
     */
    public afterEffect(
        context: CanvasRenderingContext2D,
        particle: IParticle,
        radius: number,
        opacity: number,
        delta: number,
        pixelRatio: number
    ): void {
        // Add after draw effects
    }

    /**
     * Shape removing method, when the container will need to remove the shape drawer this method will be called. Optional
     * @param container
     */
    public destroy(container: Container): void {
        // Add destroy code here, release unnecessary resources
    }

    /**
     * Shape loading method, this method will be called when a particle of this shape type will be created, if you need to store data in the particle this is the right place. Optional
     * @param particle
     */
    public loadShape(particle: Particle): void {
        // Load data in the particle, drawing will be more efficient if you store data in the particle and you retrieve that when drawing
    }
}
