import {
	ICanvasParam,
	ITmpParam,
	IParams,
	deepAssign,
	getDefaultParams,
	Interactivity,
	Modes,
	Particle,
	ParticleManager,
	Vendors,
	PolygonMask,
	RecursivePartial} from '.';
import { ImageManager } from './ImageManager';

export default class ParticlesLibrary{

	canvas: ICanvasParam;
	tmp: ITmpParam = {};
	params: IParams;
	
	manager: ParticleManager;
	interactivity: Interactivity;
	modes: Modes;
	vendors: Vendors;
	polygonMask: PolygonMask;

	imageManager = new ImageManager();

	retina = false;

	constructor( params?: any ){
		this.onWindowResize = this.onWindowResize.bind( this );
		this.tmp = {};
		this.loadParameters( params );
		this.interactivity = new Interactivity(this);
		this.modes = new Modes(this);
		this.vendors = new Vendors(this.imageManager, this.params, this );
		this.manager = new ParticleManager(this);
		this.polygonMask = new PolygonMask(this);
	}

	getParameter<T>(selector: (params: IParams) => T): T {
		return selector(this.params);
	}

	setParameters(params: RecursivePartial<IParams>) {
		this.params = deepAssign({...this.params}, params);
	}

	loadParameters( params?: any ): void{
		let mergedParams: IParams = deepAssign({}, getDefaultParams(), params);
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
		this.interactivity.attachEventHandlers();
		this.vendors.start();
	}

	destroy(): void{
		let {tmp} = this;
		this.detachListeners();
		this.interactivity.detachEventHandlers();
		cancelAnimationFrame( tmp.drawAnimFrame );
		this.canvasClear();
	}

	detachListeners(): void{
		window.removeEventListener( 'resize', this.onWindowResize );
	}

	retinaInit(): void{

		const pixelRatio = window.devicePixelRatio;

		if( this.params.retina_detect && pixelRatio > 1 ){
			this.canvas.pxratio = pixelRatio;
			
			this.canvas.width = this.canvas.element.offsetWidth * this.canvas.pxratio;
			this.canvas.height = this.canvas.element.offsetHeight * this.canvas.pxratio;
			
			this.retina = true;

			const params = this.getParameter(p => p);

			this.setParameters({
				interactivity: {
					modes: {
						bubble: {
							distance: params.interactivity.modes.bubble.distance * pixelRatio,
							size: params.interactivity.modes.bubble.size * pixelRatio
						},
						grab: {
							distance: params.interactivity.modes.grab.distance * pixelRatio
						},
						repulse: {
							distance: params.interactivity.modes.repulse.distance * pixelRatio
						}
					},
				},
				particles: {
					line_linked: {
						distance: params.particles.line_linked.distance * pixelRatio,
						width: params.particles.line_linked.width * pixelRatio
					},
					move: {
						speed: params.particles.move.speed * pixelRatio
					},
					size: {
						value: params.particles.size.value * pixelRatio,
						anim: {
							speed: params.particles.size.anim.speed * pixelRatio
						}
					}
				}
			});

			// this.params.particles.size.value = tmp.obj.size_value * canvas.pxratio;
			// this.params.particles.size.anim.speed = tmp.obj.size_anim_speed * canvas.pxratio;
			// this.params.particles.move.speed = tmp.obj.move_speed * canvas.pxratio;
			// this.params.particles.line_linked.distance = tmp.obj.line_linked_distance * canvas.pxratio;
			// this.params.interactivity.modes.grab.distance = tmp.obj.mode_grab_distance * canvas.pxratio;
			// this.params.interactivity.modes.bubble.distance = tmp.obj.mode_bubble_distance * canvas.pxratio;
			// this.params.particles.line_linked.width = tmp.obj.line_linked_width * canvas.pxratio;
			// this.params.interactivity.modes.bubble.size = tmp.obj.mode_bubble_size * canvas.pxratio;
			// this.params.interactivity.modes.repulse.distance = tmp.obj.mode_repulse_distance * canvas.pxratio;

		}else{
			this.canvas.pxratio = 1;
			this.retina = false;
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
		if (canvas && canvas.ctx) {
			try{
				canvas.ctx.fillRect( 0, 0, canvas.width, canvas.height );
			} catch (e) {
				console.warn(e);
			}
		}
	}

	canvasClear(): void{

		let {canvas} = this;
		if (canvas && canvas.ctx) {
			try{
				canvas.ctx.clearRect( 0, 0, canvas.width, canvas.height );
			}catch (e) {
				console.warn(e);
			}	
		}
	}

	public onWindowResize(): void{

		let {canvas, manager, vendors} = this;

		canvas.width = canvas.element.offsetWidth;
		canvas.height = canvas.element.offsetHeight;

		if( this.retina ){
			canvas.width *= canvas.pxratio;
			canvas.height *= canvas.pxratio;
		}

		canvas.element.width = canvas.width;
		canvas.element.height = canvas.height;

		if( !this.params.particles.move.enable || this.params.polygon.enable ){
			manager.particlesEmpty();
			this.polygonMask.initialize(this.getParameter(p => p.polygon))
				.then(() => {
					manager.particlesCreate();
					manager.particlesDraw();
					vendors.densityAutoParticles();
				});
			
		}

		vendors.densityAutoParticles();
	}

}
