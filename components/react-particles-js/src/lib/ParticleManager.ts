import {IParams, Particle, Interactivity, isInArray, Modes,  ParticlesLibrary, Vendors, TPoint} from '.';
import { ImageManager } from './ImageManager';
import { PolygonType, PolygonMoveType, PolygonInlineArrangementType } from './IParams';

export default class ParticleManager{

	constructor(private library: ParticlesLibrary ){
		this.particlesCreate = this.particlesCreate.bind(this);
	}

	particlesCreate(): void{
		const particles = this.library.getParameter(p => p.particles);
		const polygon = this.library.getParameter(p => p.polygon);

		let particlesNumber = particles.number.value;
		if (polygon.enable &&
			polygon.type === PolygonType.INLINE &&
			polygon.inline.arrangement === PolygonInlineArrangementType.ONE_PER_POINT) {
			particlesNumber = this.library.polygonMask.getVerticesNumber();
		}
		for( let i = 0; i < particlesNumber; i++ ){
			particles.array.push(new Particle(this.library));
		}
	}

	particlesUpdate(): void{
		let {canvas, modes} = this.library;

		const interactivity = this.library.getParameter(p => p.interactivity);
		const particles = this.library.getParameter(p => p.particles);
		const polygon = this.library.getParameter(p => p.polygon);

		particles.array.forEach((particle, i) => {
			if( particles.move.enable ){
				let ms = particles.move.speed / 2;
				particle.x += particle.vx * ms;
				particle.y += particle.vy * ms;
			}

			if( particles.opacity.anim.enable ){
				if( particle.opacity_status == true ){
					if( particle.opacityValue >= particles.opacity.value )
						particle.opacity_status = false;
					particle.opacityValue += particle.vo;
				}else{
					if( particle.opacityValue <= particles.opacity.anim.opacity_min )
						particle.opacity_status = true;
					particle.opacityValue -= particle.vo;
				}
				if( particle.opacityValue < 0 )
					particle.opacityValue = 0;
			}

			if( particles.size.anim.enable ){
				if( particle.size_status == true ){
					if( particle.radius >= particles.size.value )
						particle.size_status = false;
					particle.radius += particle.vs;
				}else{
					if( particle.radius <= particles.size.anim.size_min )
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

			if( particles.move.out_mode == 'bounce' ){
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

			switch( particles.move.out_mode ){
				case 'bounce':
					{
						if (polygon.enable) {
							const moveRadius = polygon.move.radius;
							switch (polygon.type) {
								case PolygonType.INLINE:
									if (this.getDistance(particle.initialPosition, particle) > moveRadius) {
										particle.vx = -particle.vx + (particle.vy / 2);
										particle.vy = -particle.vy + (particle.vx / 2);
									}
									break;
								case PolygonType.INSIDE:
								case PolygonType.OUTSIDE:
									{
										const mode = polygon.move.type;
										if (mode === PolygonMoveType.RADIUS) {
											if (this.getDistance(particle.initialPosition, particle) > moveRadius) {
												particle.vx = -particle.vx + (particle.vy / 2);
												particle.vy = -particle.vy + (particle.vx / 2);
											}
										} else if (mode === PolygonMoveType.PATH) {
											const shouldBeInside = polygon.type === PolygonType.INSIDE;
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

			if( isInArray( 'grab', interactivity.events.onhover.mode ) ){
				modes.grabParticle( particle );
			}

			if( isInArray( 'bubble', interactivity.events.onhover.mode ) || 
				isInArray( 'bubble', interactivity.events.onclick.mode ) ){
				modes.bubbleParticle( particle );
			}

			if( isInArray( 'repulse', interactivity.events.onhover.mode ) || 
				isInArray( 'repulse', interactivity.events.onclick.mode ) ){
				modes.repulseParticle( particle );
			}

			//let {linkParticles, attractParticles, bounceParticles} = this.interact;

			if( particles.line_linked.enable || particles.move.attract.enable ){
				for( let j = i + 1; j < particles.array.length; j++ ){
					let link = particles.array[ j ];

					if( particles.line_linked.enable )
						this.library.interactivity.linkParticles( particle, link );

					if( particles.move.attract.enable )
						this.library.interactivity.attractParticles( particle, link );

					if( particles.move.bounce )
						this.library.interactivity.bounceParticles( particle, link );
				}
			}
		});
	}

	getDistances(p1: TPoint, p2: TPoint): { distance: number; distanceX: number; distanceY: number; } {
		const distanceX = p1.x - p2.x;
		const distanceY = p1.y - p2.y;
		const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		return { distance, distanceX, distanceY };
	}

	getDistance(p1: TPoint, p2: TPoint): number {
		return this.getDistances(p1, p2).distance;
	}

	particlesDraw(): void{

		let {canvas, manager} = this.library;

		const particles = this.library.getParameter(p => p.particles);
		const polygon = this.library.getParameter(p => p.polygon);

		canvas.ctx.clearRect( 0, 0, canvas.width, canvas.height );
		manager.particlesUpdate();

		particles.array.forEach( ( particle: Particle ) => {
			particle.draw();
		});

		if (polygon.enable && polygon.draw.enable)
			this.library.polygonMask.drawPolygon();
	}

	particlesEmpty(): void{
		const particles = this.library.getParameter(p => p.particles);
		particles.array = [];
	}

	particlesRefresh(): void{

		let {tmp} = this.library;
		cancelAnimationFrame( tmp.drawAnimFrame );
		this.particlesEmpty();
		this.library.canvasClear();
		this.library.start();
	}

}
