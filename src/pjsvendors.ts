import { pJSLoader } from './pjsloader';
import { pJSCoordinates } from './pjsinterfaces';
import { pJSParticle } from './pjsparticle';
import { pJSContainer } from './pjscontainer';

'use strict';

export class pJSVendors {
    pJSContainer: pJSContainer;

    constructor(pJSContainer: pJSContainer) {
        this.pJSContainer = pJSContainer;
    }

    /* ---------- pJS functions - vendors ------------ */
    eventsListeners() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        /* events target element */
        if (options.interactivity.detect_on == 'window') {
            pJS.interactivity.el = window;
        }
        else {
            pJS.interactivity.el = pJS.canvas.el;
        }
        /* detect mouse pos - on hover / click event */
        if (options.interactivity.events.onhover.enable || options.interactivity.events.onclick.enable) {
            /* el on mousemove */
            pJS.interactivity.el.addEventListener('mousemove', (e: Event) => {
                let pos_x;
                let pos_y;

                let mouseEvent = e as MouseEvent;

                if (pJS.interactivity.el == window) {
                    pos_x = mouseEvent.clientX;
                    pos_y = mouseEvent.clientY;
                } else {
                    pos_x = mouseEvent.offsetX || mouseEvent.clientX;
                    pos_y = mouseEvent.offsetY || mouseEvent.clientY;
                }

                pJS.interactivity.mouse.pos_x = pos_x * (pJS.retina.isRetina ? pJS.canvas.pxratio || 1 : 1);
                pJS.interactivity.mouse.pos_y = pos_y * (pJS.retina.isRetina ? pJS.canvas.pxratio || 1 : 1);

                pJS.interactivity.status = 'mousemove';
            });
            /* el on onmouseleave */
            pJS.interactivity.el.addEventListener('mouseleave', () => {
                pJS.interactivity.mouse.pos_x = null;
                pJS.interactivity.mouse.pos_y = null;
                pJS.interactivity.status = 'mouseleave';
            });
        }
        /* on click event */
        if (options.interactivity.events.onclick.enable) {
            pJS.interactivity.el.addEventListener('click', () => {
                pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
                pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
                pJS.interactivity.mouse.click_time = new Date().getTime();
                if (options.interactivity.events.onclick.enable) {
                    switch (options.interactivity.events.onclick.mode) {
                        case 'push':
                            if (options.particles.move.enable) {
                                pJS.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                            }
                            else {
                                if (options.interactivity.modes.push.particles_nb == 1) {
                                    pJS.modes.pushParticles(options.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                                }
                                else if (options.interactivity.modes.push.particles_nb > 1) {
                                    pJS.modes.pushParticles(options.interactivity.modes.push.particles_nb);
                                }
                            }
                            break;
                        case 'remove':
                            pJS.modes.removeParticles(options.interactivity.modes.remove.particles_nb);
                            break;
                        case 'bubble':
                            pJS.bubble_clicking = true;
                            break;
                        case 'repulse':
                            pJS.repulse_clicking = true;
                            pJS.repulse_count = 0;
                            pJS.repulse_finish = false;
                            setTimeout(() => {
                                pJS.repulse_clicking = false;
                            }, options.interactivity.modes.repulse.duration * 1000);
                            break;
                    }
                }
            });
        }
    }

    densityAutoParticles() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        if (options.particles.number.density.enable) {
            /* calc area */
            let area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;

            if (pJS.retina.isRetina) {
                area = area / ((pJS.canvas.pxratio || 1) * 2);
            }
            /* calc number of particles based on density area */
            let nb_particles = area * options.particles.number.value / options.particles.number.density.value_area;

            /* add or remove X particles */
            let missing_particles = pJS.particles.array.length - nb_particles;

            if (missing_particles < 0)
                pJS.modes.pushParticles(Math.abs(missing_particles));
            else
                pJS.modes.removeParticles(missing_particles);
        }
    }

    checkOverlap(p1: pJSParticle, position?: pJSCoordinates) {
        let pJS = this.pJSContainer;

        for (let i = 0; i < pJS.particles.array.length; i++) {
            let p2 = pJS.particles.array[i];
            let dx = p1.x - p2.x;
            let dy = p1.y - p2.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= p1.radius + p2.radius) {
                p1.x = position ? position.x : Math.random() * pJS.canvas.w;
                p1.y = position ? position.y : Math.random() * pJS.canvas.h;

                this.checkOverlap(p1);
            }
        }
    }

    createSvgImg(p: pJSParticle) {
        let pJS = this.pJSContainer;

        /* set color to svg element */
        let svgXml = pJS.source_svg;

        if (!svgXml) return;

        let rgbHex = /#([0-9A-F]{3,6})/gi;
        let coloredSvgXml = svgXml.replace(rgbHex, (substring: string) => {
            let color_value;

            if (p.color.rgb) {
                color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + p.opacity + ')';
            } else if (p.color.hsl) {
                color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + p.opacity + ')';
            }

            return color_value || substring;
        });
        /* prepare to create img with colored svg */
        let svg = new Blob([coloredSvgXml], { type: 'image/svg+xml;charset=utf-8' }), url = URL.createObjectURL(svg);
        /* create particle img obj */
        let img = new Image();
        img.addEventListener('load', () => {
            if (p.img) {
                p.img.obj = img;
                p.img.loaded = true;
            }

            URL.revokeObjectURL(url);

            if (!pJS.count_svg)
                pJS.count_svg = 0;

            pJS.count_svg++;
        });
        img.src = url;
    }

    destroypJS() {
        let pJS = this.pJSContainer;

        if (pJS.drawAnimFrame !== undefined)
            cancelAnimationFrame(pJS.drawAnimFrame);
        pJS.canvas.el.remove();
        pJSLoader.pJSDomSet([]);
    }

    drawShape(ctx: CanvasRenderingContext2D, startX: number, startY: number, sideLength: number, sideCountNumerator: number, sideCountDenominator: number) {

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        let sideCount = sideCountNumerator * sideCountDenominator;
        let decimalSides = sideCountNumerator / sideCountDenominator;
        let interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        let interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

        ctx.save();
        ctx.beginPath();
        ctx.translate(startX, startY);
        ctx.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            ctx.lineTo(sideLength, 0);
            ctx.translate(sideLength, 0);
            ctx.rotate(interiorAngle);
        }

        //c.stroke();
        ctx.fill();
        ctx.restore();
    }

    exportImg() {
        let pJS = this.pJSContainer;

        window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
    }

    async loadImg(type: string) {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        pJS.img_error = undefined;
        if (options.particles.shape.image.src != '') {
            if (type == 'svg') {
                let response = await fetch(options.particles.shape.image.src);

                if (response.ok) {
                    pJS.source_svg = await response.text();

                    this.checkBeforeDraw();
                } else {
                    console.error('Error pJS - Image not found');
                    pJS.img_error = true;
                }
            }
            else {
                let img = new Image();

                img.addEventListener('load', () => {
                    pJS.img_obj = img;

                    this.checkBeforeDraw();
                });

                img.src = options.particles.shape.image.src;
            }
        }
        else {
            console.error('Error pJS - No image.src');
            pJS.img_error = true;
        }
    }

    draw() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        if (options.particles.shape.type == 'image') {
            if (pJS.img_type == 'svg') {
                if (pJS.drawAnimFrame && (pJS.count_svg || 0) >= options.particles.number.value) {
                    pJS.particles.draw();
                    if (!options.particles.move.enable)
                        window.cancelRequestAnimFrame(pJS.drawAnimFrame);
                    else
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
                else {
                    if (!pJS.img_error)
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
            }
            else {
                if (pJS.img_obj != undefined) {
                    pJS.particles.draw();

                    if (pJS.drawAnimFrame !== undefined && !options.particles.move.enable)
                        window.cancelRequestAnimFrame(pJS.drawAnimFrame);
                    else
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
                else {
                    if (!pJS.img_error)
                        pJS.drawAnimFrame = window.requestAnimFrame(() => {
                            this.draw();
                        });
                }
            }
        }
        else {
            pJS.particles.draw();
            if (!options.particles.move.enable) {
                if (pJS.drawAnimFrame !== undefined)
                    window.cancelRequestAnimFrame(pJS.drawAnimFrame);
            }
            else
                pJS.drawAnimFrame = window.requestAnimFrame(() => {
                    this.draw();
                });
        }
    }

    checkBeforeDraw() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        // if shape is image
        if (options.particles.shape.type == 'image') {
            if (pJS.img_type == 'svg' && pJS.source_svg == undefined) {
                pJS.checkAnimFrame = window.requestAnimFrame(() => {
                    //TODO: Questo check non è da nessuna parte
                    //check();
                });
            }
            else {
                if (pJS.checkAnimFrame)
                    window.cancelRequestAnimFrame(pJS.checkAnimFrame);

                if (!pJS.img_error) {
                    this.init();
                    this.draw();
                }
            }
        }
        else {
            this.init();
            this.draw();
        }
    }

    init() {
        let pJS = this.pJSContainer;

        /* init canvas + particles */
        pJS.retina.init();
        pJS.canvas.init();
        pJS.canvas.size();
        pJS.canvas.paint();
        pJS.particles.create();
        this.densityAutoParticles();
    }

    async start() {
        let pJS = this.pJSContainer;
        let options = pJS.options;

        if (options.particles.shape.type == 'image') {
            pJS.img_type = options.particles.shape.image.src.substr(options.particles.shape.image.src.length - 3);
            await this.loadImg(pJS.img_type);
        }
        else {
            this.checkBeforeDraw();
        }
    }
}