import {IParams, Particle, Interact, isInArray, Modes,  ParticlesLibrary, Vendors, TPoint} from '.';
import { ImageManager } from './ImageManager';
import { PolygonType, PolygonMoveType, PolygonInlineArrangementType } from './IParams';

export default class ParticleManager{

	params: IParams;
	interact: Interact;
	library: ParticlesLibrary;
	modes: Modes;
	vendors: Vendors;

	constructor(private imageManager: ImageManager, params: IParams, interact: Interact, modes: Modes, vendors: Vendors, library: ParticlesLibrary ){
		this.params = params;
		this.interact = interact;
		this.modes = modes;
		this.vendors = vendors;
		this.library = library;
	}

	particlesCreate(): void{
		let {color, opacity} = this.params.particles;

		let particlesNumber = this.params.particles.number.value;
		if (this.params.polygon.enable &&
			this.params.polygon.type === PolygonType.INLINE &&
			this.params.polygon.inline.arrangement === PolygonInlineArrangementType.PER_POINT) {
			particlesNumber = this.library.polygonMask.getVerticesNumber();
		}
		for( let i = 0; i < particlesNumber; i++ ){
			this.params.particles.array.push( new Particle(this.imageManager, this.params, this.library, color, opacity.value ) );
		}
	}

	particlesUpdate(): void{
		let {canvas, interact, modes} = this.library;

		this.params.particles.array.forEach( ( particle: Particle, i: number ) => {
			if( this.params.particles.move.enable ){
				let ms = this.params.particles.move.speed / 2;
				particle.x += particle.vx * ms;
				particle.y += particle.vy * ms;
			}

			if( this.params.particles.opacity.anim.enable ){
				if( particle.opacity_status == true ){
					if( particle.opacity >= this.params.particles.opacity.value )
						particle.opacity_status = false;
					particle.opacity += particle.vo;
				}else{
					if( particle.opacity <= this.params.particles.opacity.anim.opacity_min )
						particle.opacity_status = true;
					particle.opacity -= particle.vo;
				}
				if( particle.opacity < 0 )
					particle.opacity = 0;
			}

			if( this.params.particles.size.anim.enable ){
				if( particle.size_status == true ){
					if( particle.radius >= this.params.particles.size.value )
						particle.size_status = false;
					particle.radius += particle.vs;
				}else{
					if( particle.radius <= this.params.particles.size.anim.size_min )
						particle.size_status = true;
					particle.radius -= particle.vs;
				}
				if( particle.radius < 0 )
					particle.radius = 0;
			}

			type Pos = {
				x_left: number;
				x_right: number;
				y_top: number;
				y_bottom: number;
			};
			let new_pos: Pos;

			if( this.params.particles.move.out_mode == 'bounce' ){
				new_pos = {
					x_left: particle.radius,
					x_right: canvas.width,
					y_top: particle.radius,
					y_bottom: canvas.height
				};
			}else{
				new_pos = {
					x_left: -particle.radius,
					x_right: canvas.width + particle.radius,
					y_top: -particle.radius,
					y_bottom: canvas.height + particle.radius
				};
			}

			if( particle.x - particle.radius > canvas.width ){
				particle.x = new_pos.x_left;
				particle.y = Math.random() * canvas.height;
			}else if( particle.x + particle.radius < 0 ){
				particle.x = new_pos.x_right;
				particle.y = Math.random() * canvas.height;
			}

			if( particle.y - particle.radius > canvas.height ){
				particle.y = new_pos.y_top;
				particle.x = Math.random() * canvas.width;
			}else if( particle.y + particle.radius < 0 ){
				particle.y = new_pos.y_bottom;
				particle.x = Math.random() * canvas.width;
			}

			switch( this.params.particles.move.out_mode ){
				case 'bounce':
					{
						if (this.params.polygon.enable) {
							const moveRadius = this.params.polygon.move.radius;
							switch (this.params.polygon.type) {
								case PolygonType.INLINE:
									if (this.getDistance(particle.initialPosition, particle) > moveRadius) {
										particle.vx = -particle.vx + (particle.vy / 2);
										particle.vy = -particle.vy + (particle.vx / 2);
									}
									break;
								case PolygonType.INSIDE:
								case PolygonType.OUTSIDE:
									{
										const mode = this.params.polygon.move.type;
										if (mode === PolygonMoveType.RADIUS) {
											if (this.getDistance(particle.initialPosition, particle) > moveRadius) {
												particle.vx = -particle.vx + (particle.vy / 2);
												particle.vy = -particle.vy + (particle.vx / 2);
											}
										} else if (mode === PolygonMoveType.PATH) {
											const shouldBeInside = this.params.polygon.type === PolygonType.INSIDE;
											const isInside = this.library.polygonMask.isPointInsidePolygon({ x: particle.x, y: particle.y });
											if ((shouldBeInside && !isInside) || (!shouldBeInside && isInside)) {
												particle.vx = -particle.vx + (particle.vy / 2);
												particle.vy = -particle.vy + (particle.vx / 2);
											}
										}
									}
									break;
							}
						} else {
							if( particle.x + particle.radius > canvas.width )
								particle.vx = -particle.vx;
							else if( particle.x - particle.radius < 0 )
								particle.vx = -particle.vx;
							if( particle.y + particle.radius > canvas.height )
								particle.vy = -particle.vy;
							else if( particle.y - particle.radius < 0 )
								particle.vy = -particle.vy;
						}
					}
					break;
			}

			if( isInArray( 'grab', this.params.interactivity.events.onhover.mode ) ){
				modes.grabParticle( particle );
			}

			if( isInArray( 'bubble', this.params.interactivity.events.onhover.mode ) || 
				isInArray( 'bubble', this.params.interactivity.events.onclick.mode ) ){
				modes.bubbleParticle( particle );
			}

			if( isInArray( 'repulse', this.params.interactivity.events.onhover.mode ) || 
				isInArray( 'repulse', this.params.interactivity.events.onclick.mode ) ){
				modes.repulseParticle( particle );
			}

			//let {linkParticles, attractParticles, bounceParticles} = this.interact;

			if( this.params.particles.line_linked.enable || this.params.particles.move.attract.enable ){
				for( let j = i + 1; j < this.params.particles.array.length; j++ ){
					let link = this.params.particles.array[ j ];

					if( this.params.particles.line_linked.enable )
						interact.linkParticles( particle, link );

					if( this.params.particles.move.attract.enable )
						interact.attractParticles( particle, link );

					if( this.params.particles.move.bounce )
						interact.bounceParticles( particle, link );
				}
			}
		});
	}

	private getDistance(p1: TPoint, p2: TPoint): number {
		return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
	}

	particlesDraw(): void{

		let {canvas, manager} = this.library;

		canvas.ctx.clearRect( 0, 0, canvas.width, canvas.height );
		manager.particlesUpdate();

		this.params.particles.array.forEach( ( particle: Particle ) => {
			particle.draw();
		});

		if (this.params.polygon.enable && this.params.polygon.draw.enable)
			this.library.polygonMask.drawPolygon();
	}

	particlesEmpty(): void{
		this.params.particles.array = [];
	}

	particlesRefresh(): void{

		let {tmp, vendors} = this.library;
		cancelAnimationFrame( tmp.drawAnimFrame );
		tmp.count_svg = 0;
		this.particlesEmpty();
		this.library.canvasClear();
		this.library.start();
	}

}
