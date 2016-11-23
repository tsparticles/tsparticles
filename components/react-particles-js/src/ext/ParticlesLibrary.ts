/// <reference path="../../typings/index.d.ts" />

import deepExtend = require( 'deep-extend' );
import {defaultParams, Interact, Modes, IParams, Particle, ParticleManager} from '.';

export default class ParticlesLibrary{

	params: IParams;
	particleManager: ParticleManager;
	interact: Interact;
	modes: Modes;

	constructor( canvasElement: HTMLCanvasElement, params?: any ){
		deepExtend( defaultParams, params );
		this.params = defaultParams;
		this.extendParams( canvasElement );
		this.interact = new Interact( this.params );
		this.modes = new Modes( this.params );
		this.particleManager = new ParticleManager( this.params, this.interact, this.modes, this );

	}

	extendParams( canvasElement: HTMLCanvasElement ): void{
		this.extendCanvasDefinition( canvasElement );
		this.extendTmpDefinition();
		this.retinaInit = this.retinaInit.bind( this );
		this.canvasInit = this.canvasInit.bind( this );
		this.canvasSize = this.canvasSize.bind( this );
		this.canvasPaint = this.canvasPaint.bind( this );
		this.canvasClear = this.canvasClear.bind( this );
		this.extendRetinaFunctionDefinition();
		this.extendCanvasFunctionDefinition();
		this.extendParticleFunctionDefinition();
	}

	extendCanvasDefinition( canvasElement: HTMLCanvasElement ): void{
		this.params.canvas = {
			element: canvasElement,
			width: canvasElement.offsetWidth,
			height: canvasElement.offsetHeight
		};
	}

	extendTmpDefinition(): void{
		this.params.tmp.obj = {
			size_value: this.params.particles.size.value,
			size_anim_speed: this.params.particles.size.anim.speed,
			move_speed: this.params.particles.move.speed,
			line_linked_distance: this.params.particles.line_linked.distance,
			line_linked_width: this.params.particles.line_linked.width,
			mode_grab_distance: this.params.interactivity.modes.grab.distance,
			mode_bubble_distance: this.params.interactivity.modes.bubble.distance,
			mode_bubble_size: this.params.interactivity.modes.bubble.size,
			mode_repulse_distance: this.params.interactivity.modes.repulse.distance
		};
	}

	extendRetinaFunctionDefinition(): void{
		this.params.fn.retinaInit = this.retinaInit;
	}

	retinaInit(): void{
		if( this.params.retina_detect && window.devicePixelRatio > 1 ){
			this.params.canvas.pxratio = window.devicePixelRatio;
			this.params.tmp.retina = true;

			this.params.canvas.width = this.params.canvas.element.offsetWidth * this.params.canvas.pxratio;
			this.params.canvas.height = this.params.canvas.element.offsetHeight * this.params.canvas.pxratio;

			this.params.particles.size.value = this.params.tmp.obj.size_value * this.params.canvas.pxratio;
			this.params.particles.size.anim.speed = this.params.tmp.obj.size_anim_speed * this.params.canvas.pxratio;
			this.params.particles.move.speed = this.params.tmp.obj.move_speed * this.params.canvas.pxratio;
			this.params.particles.line_linked.distance = this.params.tmp.obj.line_linked_distance * this.params.canvas.pxratio;
			this.params.interactivity.modes.grab.distance = this.params.tmp.obj.mode_grab_distance * this.params.canvas.pxratio;
			this.params.interactivity.modes.bubble.distance = this.params.tmp.obj.mode_bubble_distance * this.params.canvas.pxratio;
			this.params.particles.line_linked.width = this.params.tmp.obj.line_linked_width * this.params.canvas.pxratio;
			this.params.interactivity.modes.bubble.size = this.params.tmp.obj.mode_bubble_size * this.params.canvas.pxratio;
			this.params.interactivity.modes.repulse.distance = this.params.tmp.obj.mode_repulse_distance * this.params.canvas.pxratio;

		}else{
			this.params.canvas.pxratio = 1;
			this.params.tmp.retina = false;
		}
	}

	extendCanvasFunctionDefinition(): void{
		this.params.fn.canvasInit = this.canvasInit;
		this.params.fn.canvasSize = this.canvasSize;
		this.params.fn.canvasPaint = this.canvasPaint;
		this.params.fn.canvasClear = this.canvasClear;
	}

	canvasInit(): void{
		this.params.canvas.ctx = this.params.canvas.element.getContext( '2d' );
	}

	canvasSize(): void{
		this.params.canvas.element.width = this.params.canvas.width;
		this.params.canvas.element.height = this.params.canvas.height;

		if( this.params && this.params.interactivity.events.resize ){
			window.addEventListener( 'resize', this.onWindowResize );
		}
	}

	canvasPaint(): void{
		this.params.canvas.ctx.fillRect( 0, 0, this.params.canvas.width, this.params.canvas.height );
	}

	canvasClear(): void{
		this.params.canvas.ctx.clearRect( 0, 0, this.params.canvas.width, this.params.canvas.height );
	}

	extendParticleFunctionDefinition(): void{
		this.params.fn.particle = Particle;
	}

	public onWindowResize(): void{
		this.params.canvas.width = this.params.canvas.element.offsetWidth;
		this.params.canvas.height = this.params.canvas.element.offsetHeight;

		if( this.params.tmp.retina ){
			this.params.canvas.width *= this.params.canvas.pxratio;
			this.params.canvas.height *= this.params.canvas.pxratio;
		}

		this.params.canvas.element.width = this.params.canvas.width;
		this.params.canvas.element.height = this.params.canvas.height;

		if( !this.params.particles.move.enable ){
			this.params.fn.particlesEmpty();
			this.params.fn.particlesCreate();
			this.params.fn.particlesDraw();
			this.params.fn.vendors.densityAutoParticles();
		}

		this.params.fn.vendors.densityAutoParticles();
	}

}
