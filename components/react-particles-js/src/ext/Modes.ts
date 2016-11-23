import {isInArray, IParams, Particle} from '.';

type Pos = {
	pos_x: number;
	pos_y: number;
};

export default class Modes{

	params: IParams;

	constructor( params: IParams ){
		this.params = params;
	}

	pushParticles( nb: number, pos?: Pos ): void{
		this.params.tmp.pushing = true;

		if( !pos )
			pos = {
				pos_x: Math.random() * this.params.canvas.width,
				pos_y: Math.random() * this.params.canvas.height
			}

		for( let i = 0; i < nb; i++ ){
			this.params.particles.array.push(
				new Particle(
					this.params,
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
				this.params.tmp.pushing = false;
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

			if( this.params.tmp.bubble_clicking ){
				let dx_mouse: number = particle.x - this.params.interactivity.mouse.click_pos_x;
				let dy_mouse: number = particle.y - this.params.interactivity.mouse.click_pos_y;
				let dist_mouse: number = Math.sqrt( dx_mouse * dx_mouse + dy_mouse * dy_mouse );
				let time_spent: number = ( new Date().getTime() - this.params.interactivity.mouse.click_time ) / 1000;

				if( time_spent > this.params.interactivity.modes.bubble.duration ){
					this.params.tmp.bubble_duration_end = true;
				}

				if( time_spent > this.params.interactivity.modes.bubble.duration * 2 ){
					this.params.tmp.bubble_clicking = false;
					this.params.tmp.bubble_duration_end = false;
				}

				let process: any = ( bubble_param: any, particles_param: any, p_obj_bubble: any, p_obj: any, id: any ) => {
					 // TODO Check where dist_mouse is initiated ( Line 890 )
					if( bubble_param != particles_param ){
						if( !this.params.tmp.bubble_duration_end ){
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

				if( this.params.tmp.bubble_clicking ){
					process( this.params.interactivity.modes.bubble.size, this.params.particles.size.value, particle.radius_bubble, particle.radius, 'size' );
					process( this.params.interactivity.modes.bubble.opacity, this.params.particles.opacity.value, particle.opacity_bubble, particle.opacity, 'opacity' );
				}
			}
		}
	}

	

}