import {clamp, isInArray, IParams, Particle, ParticlesLibrary} from '.';

type Pos = {
	pos_x: number;
	pos_y: number;
};

export default class Modes{

	params: IParams;
	library: ParticlesLibrary;

	constructor( params: IParams, library: ParticlesLibrary ){
		this.params = params;
		this.library = library;
		this.pushParticles = this.pushParticles.bind( this );
		this.removeParticles = this.removeParticles.bind( this );
		this.bubbleParticle = this.bubbleParticle.bind( this );
		this.repulseParticle = this.repulseParticle.bind( this );
		this.grabParticle = this.grabParticle.bind( this );
		this.params.fn.modes.pushParticles = this.pushParticles;
		this.params.fn.modes.removeParticles = this.removeParticles;
		this.params.fn.modes.bubbleParticle = this.bubbleParticle;
		this.params.fn.modes.repulseParticle = this.repulseParticle;
		this.params.fn.modes.grabParticle = this.grabParticle;
	}

	pushParticles( nb: number, pos?: Pos ): void{
		let {canvas, tmp} = this.library;

		tmp.pushing = true;

		if( !pos )
			pos = {
				pos_x: Math.random() * canvas.width,
				pos_y: Math.random() * canvas.height
			}

		for( let i = 0; i < nb; i++ ){
			this.params.particles.array.push(
				new Particle(
					this.params,
					this.library,
					this.params.particles.color,
					this.params.particles.opacity.value,
					{
						x: pos.pos_x,
						y: pos.pos_y
					})
			);

			if( i == nb -1 ){
				if( !this.params.particles.move.enable ){
					this.params.fn.particlesDraw();
				}
				tmp.pushing = false;
			}
		}
	}

	removeParticles( nb: number ): void{
		this.params.particles.array.splice( 0, nb );
		if( !this.params.particles.move.enable ){
			this.params.fn.particlesDraw();
		}
	}

	bubbleParticle( particle: Particle ){

		let {tmp} = this.library;

		if( this.params.interactivity.events.onhover.enable &&
			isInArray( 'bubble', this.params.interactivity.events.onhover.mode ) ){

			let dx_mouse: number = particle.x - this.params.interactivity.mouse.pos_x;
			let dy_mouse: number = particle.y - this.params.interactivity.mouse.pos_y;
			let dist_mouse: number = Math.sqrt( dx_mouse * dx_mouse + dy_mouse * dy_mouse );
			let ratio: number = 1 - dist_mouse / this.params.interactivity.modes.bubble.distance;

			let init: () => void = 
				() => {
					particle.opacity_bubble = particle.opacity;
					particle.radius_bubble = particle.radius;
				};

			if( dist_mouse <= this.params.interactivity.modes.bubble.distance ){
				if( ratio >= 0 && this.params.interactivity.status == 'mousemove' ){

					if( this.params.interactivity.modes.bubble.size != this.params.particles.size.value ){
						if( this.params.interactivity.modes.bubble.size > this.params.particles.size.value ){
							let size: number = particle.radius + ( this.params.interactivity.modes.bubble.size * ratio );
							if( size >= 0 ){
								particle.radius_bubble = size;
							}
						}else{
							let dif: number = particle.radius - this.params.interactivity.modes.bubble.size;
							let size: number = particle.radius - ( dif * ratio );
							if( size > 0 ){
								particle.radius_bubble = size;
							}else{
								particle.radius_bubble = 0;
							}
						}
					}

					if( this.params.interactivity.modes.bubble.opacity != this.params.particles.opacity.value ){
						if( this.params.interactivity.modes.bubble.opacity > this.params.particles.opacity.value ){
							let opacity: number = this.params.interactivity.modes.bubble.opacity * ratio;
							if( opacity > particle.opacity && opacity <= this.params.interactivity.modes.bubble.opacity ){
								particle.opacity_bubble = opacity;
							}
						}else{
							let opacity: number = particle.opacity - ( this.params.particles.opacity.value - this.params.interactivity.modes.bubble.opacity ) * ratio;
							if( opacity < particle.opacity && opacity >= this.params.interactivity.modes.bubble.opacity ){
								particle.opacity_bubble = opacity;
							}
						}
					}

				}
			}else{
				init();
			}

			if( this.params.interactivity.status == 'mouseleave' ){
				init();
			}

		}else if( this.params.interactivity.events.onclick.enable &&
			isInArray( 'bubble', this.params.interactivity.events.onclick.mode ) ){

			if( tmp.bubble_clicking ){
				let dx_mouse: number = particle.x - this.params.interactivity.mouse.click_pos_x;
				let dy_mouse: number = particle.y - this.params.interactivity.mouse.click_pos_y;
				let dist_mouse: number = Math.sqrt( dx_mouse * dx_mouse + dy_mouse * dy_mouse );
				let time_spent: number = ( new Date().getTime() - this.params.interactivity.mouse.click_time ) / 1000;

				if( time_spent > this.params.interactivity.modes.bubble.duration ){
					tmp.bubble_duration_end = true;
				}

				if( time_spent > this.params.interactivity.modes.bubble.duration * 2 ){
					tmp.bubble_clicking = false;
					tmp.bubble_duration_end = false;
				}

				let process: any = ( bubble_param: any, particles_param: any, p_obj_bubble: any, p_obj: any, id: any ) => {
					 // TODO Check where dist_mouse is initiated ( Line 890 )
					if( bubble_param != particles_param ){
						if( !tmp.bubble_duration_end ){
							if( dist_mouse <= this.params.interactivity.modes.bubble.distance ){
								let obj: any;
								if( p_obj_bubble != undefined ){
									obj = p_obj_bubble;
								}else{
									obj = p_obj;
								}
								if( obj != bubble_param ){
									let value: any = p_obj - ( time_spent * ( p_obj - bubble_param ) / this.params.interactivity.modes.bubble.duration );
									if( id == 'size' )
										particle.radius_bubble = value;
									if( id == 'opacity' )
										particle.opacity_bubble = value;
								}
							}else{
								if( id == 'size' )
									particle.radius_bubble = undefined;
								if( id == 'opacity' )
									particle.opacity_bubble = undefined;
							}
						}else{
							if( p_obj_bubble != undefined ){
								let value_tmp: any = p_obj - ( time_spent * ( p_obj - bubble_param ) / this.params.interactivity.modes.bubble.duration );
								let dif: any = bubble_param - value_tmp;
								let value: any = bubble_param + dif;
								if( id == 'size' )
									particle.radius_bubble = value;
								if( id == 'opacity' )
									particle.opacity_bubble = value;
							}
						}
					}
				};

				if( tmp.bubble_clicking ){
					process( this.params.interactivity.modes.bubble.size, this.params.particles.size.value, particle.radius_bubble, particle.radius, 'size' );
					process( this.params.interactivity.modes.bubble.opacity, this.params.particles.opacity.value, particle.opacity_bubble, particle.opacity, 'opacity' );
				}
			}
		}
	}

	repulseParticle( particle: Particle ){

		let {canvas, tmp} = this.library;

		if( this.params.interactivity.events.onhover.enable && 
			isInArray( 'repulse', this.params.interactivity.events.onhover.mode ) &&
			this.params.interactivity.status == 'mousemove' ) {

			let dx_mouse: number = particle.x - this.params.interactivity.mouse.pos_x;
			let dy_mouse: number = particle.y - this.params.interactivity.mouse.pos_y;
			let dist_mouse: number = Math.sqrt( dx_mouse*dx_mouse + dy_mouse * dy_mouse );

			let normVec: any = { x: dx_mouse/dist_mouse, y: dy_mouse/dist_mouse };
			let repulseRadius: number = this.params.interactivity.modes.repulse.distance;
			let velocity: number = 100;
			let repulseFactor: number = clamp( ( 1 / repulseRadius ) * ( -1 * Math.pow( dist_mouse / repulseRadius, 2 ) + 1 ) * repulseRadius * velocity, 0, 50 );
			
			let pos: {
				x: number;
				y: number;
			} = {
				x: particle.x + normVec.x * repulseFactor,
				y: particle.y + normVec.y * repulseFactor
			}

			if( this.params.particles.move.out_mode == 'bounce' ){
				if( pos.x - particle.radius > 0 && pos.x + particle.radius < canvas.width)
					particle.x = pos.x;
				if( pos.y - particle.radius > 0 && pos.y + particle.radius < canvas.height )
					particle.y = pos.y;
			}else{
				particle.x = pos.x;
				particle.y = pos.y;
			}
		
		}else if( this.params.interactivity.events.onclick.enable &&
			isInArray( 'repulse', this.params.interactivity.events.onclick.mode ) ){

			if( !tmp.repulse_finish ){
				tmp.repulse_count++;
				if( tmp.repulse_count == this.params.particles.array.length )
					tmp.repulse_finish = true;
			}

			if( tmp.repulse_clicking ){

				let repulseRadius: number = Math.pow(this.params.interactivity.modes.repulse.distance/6, 3);

				let dx: number = this.params.interactivity.mouse.click_pos_x - particle.x;
				let dy: number = this.params.interactivity.mouse.click_pos_y - particle.y;
				let d: number = dx * dx + dy * dy;

				let force: number = -repulseRadius / d * 1;

				let process: () => void =
					() => {
						let f: number = Math.atan2( dy, dx );
						particle.vx = force * Math.cos( f );
						particle.vy = force * Math.sin( f );
						if( this.params.particles.move.out_mode == 'bounce' ){
							let pos: {
								x: number;
								y: number;
							} = {
								x: particle.x + particle.vx,
								y: particle.y + particle.vy
							}
							if ( pos.x + particle.radius > canvas.width )
								particle.vx = -particle.vx;
							else if ( pos.x - particle.radius < 0 )
								particle.vx = -particle.vx;
							if ( pos.y + particle.radius > canvas.height )
								particle.vy = -particle.vy;
							else if ( pos.y - particle.radius < 0 )
								particle.vy = -particle.vy;
						}
					};

				if( d <= repulseRadius ){
					process();
				}
			}else{
				if( tmp.repulse_clicking == false ){
					particle.vx = particle.vx_i;
					particle.vy = particle.vy_i;
				}
			}

		}
	}

	grabParticle( particle: Particle ): void{

		let {canvas} = this.library;

		let {interactivity, particles} = this.params;

		if( interactivity.events.onhover.enable &&
			interactivity.status == 'mousemove' ){

			let dx_mouse: number = particle.x - interactivity.mouse.pos_x;
			let dy_mouse: number = particle.y - interactivity.mouse.pos_y;
			let dist_mouse: number = Math.sqrt( dx_mouse * dx_mouse + dy_mouse * dy_mouse );

			if( dist_mouse <= interactivity.modes.grab.distance ){

				let {grab} = interactivity.modes;

				let opacity_line: number = grab.line_linked.opacity - ( dist_mouse / ( 1 / grab.line_linked.opacity ) ) / grab.distance;
				
				if( opacity_line > 0 ){
					let color_line: {
						r: number;
						g: number;
						b: number;
					} = particles.line_linked.color_rgb_line;
					let {r, g, b} = color_line;
					canvas.ctx.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${opacity_line} )`;
					canvas.ctx.lineWidth = particles.line_linked.width;

					canvas.ctx.beginPath();
					canvas.ctx.moveTo( particle.x, particle.y );
					canvas.ctx.lineTo( interactivity.mouse.pos_x, interactivity.mouse.pos_y );
					canvas.ctx.stroke();
					canvas.ctx.closePath();
				}

			}

		}
	}

}