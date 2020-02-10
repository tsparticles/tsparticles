import { pJSUtils } from './pjsutils';
import { pJSParticle } from './pjsparticle';
import { pJSContainer } from './pjscontainer';

'use strict';

export class pJSInteract {
    readonly pJSContainer: pJSContainer;

    constructor(pJSContainer: pJSContainer) {
        this.pJSContainer = pJSContainer;
    }

    /* ---------- pJS functions - particles interaction ------------ */
    linkParticles(p1: pJSParticle, p2: pJSParticle) {
        const pJS = this.pJSContainer;
        const options = pJS.options;

        const x1 = p1.x + p1.offsetX;
        const x2 = p2.x + p2.offsetX;
        const dx = x1 - x2;
        const y1 = p1.y + p1.offsetY;
        const y2 = p2.y + p2.offsetY;
        const dy = y1 - y2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        /* draw a line between p1 and p2 if the distance between them is under the config distance */
        if (dist <= options.particles.line_linked.distance) {
            const opacity_line = options.particles.line_linked.opacity - (dist * options.particles.line_linked.opacity) / options.particles.line_linked.distance;

            if (opacity_line > 0) {
                /* style */
                if (!options.particles.line_linked.color_rgb) {
                    options.particles.line_linked.color_rgb = pJSUtils.hexToRgb(options.particles.line_linked.color);
                }

                if (!pJS.canvas.ctx) return;

                const color_line = options.particles.line_linked.color_rgb;

                if (color_line) {
                    pJS.canvas.ctx.strokeStyle = `rgba(${color_line.r},${color_line.g},${color_line.b},${opacity_line})`;
                }

                pJS.canvas.ctx.lineWidth = options.particles.line_linked.width;
                //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
                /* path */
                pJS.canvas.ctx.beginPath();
                pJS.canvas.ctx.moveTo(x1, y1);
                pJS.canvas.ctx.lineTo(x2, y2);
                pJS.canvas.ctx.stroke();
                pJS.canvas.ctx.closePath();
            }
        }
    }

    attractParticles(p1: pJSParticle, p2: pJSParticle) {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        /* condensed particles */
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= options.particles.line_linked.distance) {
            let ax = dx / (options.particles.move.attract.rotateX * 1000);
            let ay = dy / (options.particles.move.attract.rotateY * 1000);

            p1.vx -= ax;
            p1.vy -= ay;
            p2.vx += ax;
            p2.vy += ay;
        }
    }

    bounceParticles(p1: pJSParticle, p2: pJSParticle) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let dist_p = p1.radius + p2.radius;

        if (dist <= dist_p) {
            p1.vx = -p1.vx;
            p1.vy = -p1.vy;
            p2.vx = -p2.vx;
            p2.vy = -p2.vy;
        }
    }
}