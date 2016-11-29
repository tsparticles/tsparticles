/// <reference path="../../typings/index.d.ts" />

import {
	ICanvasParam,
	ITmpParam,
	IParams,
	deepExtend,
	getDefaultParams,
	Interact,
	Modes,
	Particle,
	ParticleManager,
	Vendors} from '.';

export default class ParticlesLibrary{

	canvas: ICanvasParam;
	tmp: ITmpParam = {};
	params: IParams;
	
	manager: ParticleManager;
	interact: Interact;
	modes: Modes;
	vendors: Vendors;

	constructor( params?: any ){
		this.tmp = {};
		this.loadParameters( params );
		this.extendParams();
		this.interact = new Interact( this.params, this );
		this.modes = new Modes( this.params, this );
		this.vendors = new Vendors( this.params, this );
		this.manager = new ParticleManager( this.params, this.interact, this.modes, this.vendors, this );
	}

	loadParameters( params?: any ): void{
		let defaultParams: IParams = getDefaultParams();
		let mergedParams: IParams = deepExtend( defaultParams, params );
		this.params = mergedParams;
	}

	loadCanvas( canvasElement: HTMLCanvasElement ){
		this.canvas = {
			element: canvasElement,
			width: canvasElement.offsetWidth,
			height: canvasElement.offsetHeight
		}
	}

	start(): void{
		let {vendors} = this;
		vendors.eventsListeners();
		vendors.start();
	}

	destroy(): void{
		let {tmp} = this;
		this.detachListeners();
		this.vendors.detachListeners();
		cancelAnimationFrame( tmp.drawAnimFrame );
		this.canvasClear();
	}

	detachListeners(): void{
		window.removeEventListener( 'resize', this.onWindowResize );
	}

	extendParams(): void{
		this.extendTmpDefinition();
		this.onWindowResize = this.onWindowResize.bind( this );
	}

	extendTmpDefinition(): void{

		let {tmp} = this;

		tmp.obj = {
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


	retinaInit(): void{

		let {canvas, tmp} = this;

		if( this.params.retina_detect && window.devicePixelRatio > 1 ){
			canvas.pxratio = window.devicePixelRatio;
			tmp.retina = true;

			canvas.width = canvas.element.offsetWidth * canvas.pxratio;
			canvas.height = canvas.element.offsetHeight * canvas.pxratio;

			this.params.particles.size.value = tmp.obj.size_value * canvas.pxratio;
			this.params.particles.size.anim.speed = tmp.obj.size_anim_speed * canvas.pxratio;
			this.params.particles.move.speed = tmp.obj.move_speed * canvas.pxratio;
			this.params.particles.line_linked.distance = tmp.obj.line_linked_distance * canvas.pxratio;
			this.params.interactivity.modes.grab.distance = tmp.obj.mode_grab_distance * canvas.pxratio;
			this.params.interactivity.modes.bubble.distance = tmp.obj.mode_bubble_distance * canvas.pxratio;
			this.params.particles.line_linked.width = tmp.obj.line_linked_width * canvas.pxratio;
			this.params.interactivity.modes.bubble.size = tmp.obj.mode_bubble_size * canvas.pxratio;
			this.params.interactivity.modes.repulse.distance = tmp.obj.mode_repulse_distance * canvas.pxratio;

		}else{
			canvas.pxratio = 1;
			tmp.retina = false;
		}
	}

	canvasInit(): void{

		let {canvas} = this;

		canvas.ctx = canvas.element.getContext( '2d' );
	}

	canvasSize(): void{

		let {canvas} = this;

		canvas.element.width = canvas.width;
		canvas.element.height = canvas.height;

		if( this.params && this.params.interactivity.events.resize ){
			window.addEventListener( 'resize', this.onWindowResize );
		}
	}

	canvasPaint(): void{

		let {canvas} = this;

		canvas.ctx.fillRect( 0, 0, canvas.width, canvas.height );
	}

	canvasClear(): void{

		let {canvas} = this;

		canvas.ctx.clearRect( 0, 0, canvas.width, canvas.height );
	}

	public onWindowResize(): void{

		let {canvas, manager, tmp, vendors} = this;

		canvas.width = canvas.element.offsetWidth;
		canvas.height = canvas.element.offsetHeight;

		if( tmp.retina ){
			canvas.width *= canvas.pxratio;
			canvas.height *= canvas.pxratio;
		}

		canvas.element.width = canvas.width;
		canvas.element.height = canvas.height;

		if( !this.params.particles.move.enable ){
			manager.particlesEmpty();
			manager.particlesCreate();
			manager.particlesDraw();
			vendors.densityAutoParticles();
		}

		vendors.densityAutoParticles();
	}

}
