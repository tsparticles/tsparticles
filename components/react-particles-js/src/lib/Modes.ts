import {clamp, isInArray, IParams, Particle, ParticlesLibrary, TPoint} from '.';
import { InteractivityMode } from './IParams';
import { MouseInteractivityStatus } from './Interactivity';

export default class Modes {

	bubble_clicking = false;
	bubble_duration_end = false;
	pushing = false;
	repulse_clicking = false;
	repulse_count = 0;
	repulse_finish = false;

	constructor(private library: ParticlesLibrary ){}

	pushParticles(nb: number, pos?: TPoint) {
		let {canvas, tmp, manager} = this.library;

		this.pushing = true;

		for( let i = 0; i < nb; i++ ){
			this.library.getParameter(p => p.particles.array).push(
				new Particle(
					this.library,
					{
						position: {
							x: pos ? pos.x : Math.random() * canvas.width,
							y: pos ? pos.y : Math.random() * canvas.height
						}
					}
				)
			);

			if( i == nb -1 ){
				if( !this.library.getParameter(p => p.particles.move.enable) ){
					manager.particlesDraw();
				}
				this.pushing = false;
			}
		}
	}

	removeParticles( nb: number ): void{

		let {manager} = this.library;

		this.library.getParameter(p => p.particles.array).splice( 0, nb );
		if( !this.library.getParameter(p => p.particles.move.enable) ){
			manager.particlesDraw();
		}
	}

	bubbleParticle( particle: Particle ){

		let {tmp} = this.library;

		const interactivity = this.library.getParameter(p => p.interactivity);

		if( interactivity.events.onhover.enable &&
			isInArray(InteractivityMode.BUBBLE, interactivity.events.onhover.mode) ){

			const mouseDistance = this.library.manager.getDistance(particle, this.library.interactivity.mouseMovePosition);
			const bubbleDistance = interactivity.modes.bubble.distance;
			const ratio = 1 - mouseDistance / bubbleDistance;

			if (mouseDistance <= bubbleDistance) {
				if( ratio >= 0 && this.library.interactivity.mouseStatus === MouseInteractivityStatus.MOUSEMOVE ){

					const bubbleSize = interactivity.modes.bubble.size;
					const particleSize = this.library.getParameter(p => p.particles.size.value);

					if (bubbleSize != particleSize) {
						if (bubbleSize > particleSize) {
							const size = particle.radius + (bubbleSize * ratio);
							if (size >= 0){
								particle.radius_bubble = size;
							}
						}else{
							const difference = particle.radius - bubbleSize;
							const size = particle.radius - (difference * ratio);
							if (size > 0) {
								particle.radius_bubble = size;
							}else{
								particle.radius_bubble = 0;
							}
						}
					}

					if( this.library.getParameter(p => p.interactivity.modes.bubble.opacity) != this.library.getParameter(p => p.particles.opacity.value) ){
						if( this.library.getParameter(p => p.interactivity.modes.bubble.opacity) > this.library.getParameter(p => p.particles.opacity.value) ){
							let opacity: number = this.library.getParameter(p => p.interactivity.modes.bubble.opacity) * ratio;
							if( opacity > particle.opacityValue && opacity <= this.library.getParameter(p => p.interactivity.modes.bubble.opacity) ){
								particle.bubbleOpacity = opacity;
							}
						}else{
							let opacity: number = particle.opacityValue - ( this.library.getParameter(p => p.particles.opacity.value) - this.library.getParameter(p => p.interactivity.modes.bubble.opacity) ) * ratio;
							if( opacity < particle.opacityValue && opacity >= this.library.getParameter(p => p.interactivity.modes.bubble.opacity) ){
								particle.bubbleOpacity = opacity;
							}
						}
					}

				}
			}else{
				particle.bubbleOpacity = particle.opacityValue;
				particle.radius_bubble = particle.radius;
			}

			if(this.library.interactivity.mouseStatus === MouseInteractivityStatus.MOUSELEAVE){
				particle.bubbleOpacity = particle.opacityValue;
				particle.radius_bubble = particle.radius;
			}

		}else if( this.library.getParameter(p => p.interactivity.events.onclick.enable) &&
			isInArray( 'bubble', this.library.getParameter(p => p.interactivity.events.onclick.mode) ) ){

			if( this.bubble_clicking ){
				const mouseDistance = this.library.manager.getDistance(particle, this.library.interactivity.mouseClickPosition);
				let time_spent: number = (new Date().getTime() - this.library.interactivity.mouseClickTime) / 1000;

				if( time_spent > this.library.getParameter(p => p.interactivity.modes.bubble.duration)){
					this.bubble_duration_end = true;
				}

				if( time_spent > this.library.getParameter(p => p.interactivity.modes.bubble.duration) * 2 ){
					this.bubble_clicking = false;
					this.bubble_duration_end = false;
				}

				let process: any = ( bubble_param: any, particles_param: any, p_obj_bubble: any, p_obj: any, id: any ) => {
					if( bubble_param != particles_param ){
						if( !this.bubble_duration_end ){
							if( mouseDistance <= this.library.getParameter(p => p.interactivity.modes.bubble.distance) ){
								let obj: any;
								if( p_obj_bubble != undefined ){
									obj = p_obj_bubble;
								}else{
									obj = p_obj;
								}
								if( obj != bubble_param ){
									let value: any = p_obj - ( time_spent * ( p_obj - bubble_param ) / this.library.getParameter(p => p.interactivity.modes.bubble.duration) );
									if( id == 'size' )
										particle.radius_bubble = value;
									if( id == 'opacity' )
										particle.bubbleOpacity = value;
								}
							}else{
								if( id == 'size' )
									particle.radius_bubble = undefined;
								if( id == 'opacity' )
									particle.bubbleOpacity = undefined;
							}
						}else{
							if( p_obj_bubble != undefined ){
								let value_tmp: any = p_obj - ( time_spent * ( p_obj - bubble_param ) / this.library.getParameter(p => p.interactivity.modes.bubble.duration) );
								let dif: any = bubble_param - value_tmp;
								let value: any = bubble_param + dif;
								if( id == 'size' )
									particle.radius_bubble = value;
								if( id == 'opacity' )
									particle.bubbleOpacity = value;
							}
						}
					}
				};

				if (this.bubble_clicking) {
					process( this.library.getParameter(p => p.interactivity.modes.bubble.size), this.library.getParameter(p => p.particles.size.value), particle.radius_bubble, particle.radius, 'size' );
					process( this.library.getParameter(p => p.interactivity.modes.bubble.opacity), this.library.getParameter(p => p.particles.opacity.value), particle.bubbleOpacity, particle.opacityValue, 'opacity' );
				}
			}
		}
	}

	repulseParticle( particle: Particle ){

		let {canvas, tmp} = this.library;

		if( this.library.getParameter(p => p.interactivity.events.onhover.enable) && 
			isInArray( 'repulse', this.library.getParameter(p => p.interactivity.events.onhover.mode) ) &&
			this.library.interactivity.mouseStatus === MouseInteractivityStatus.MOUSEMOVE) {

			const {distance, distanceX, distanceY} = this.library.manager.getDistances(particle, this.library.interactivity.mouseMovePosition);
			
			let normVec: any = { x: distanceX/distance, y: distanceY/distance };
			let repulseRadius: number = this.library.getParameter(p => p.interactivity.modes.repulse.distance);
			let velocity: number = 100;
			let repulseFactor: number = clamp( ( 1 / repulseRadius ) * ( -1 * Math.pow( distance / repulseRadius, 2 ) + 1 ) * repulseRadius * velocity, 0, 50 );
			
			let pos: {
				x: number;
				y: number;
			} = {
				x: particle.x + normVec.x * repulseFactor,
				y: particle.y + normVec.y * repulseFactor
			}

			if( this.library.getParameter(p => p.particles.move.out_mode) == 'bounce' ){
				if( pos.x - particle.radius > 0 && pos.x + particle.radius < canvas.width)
					particle.x = pos.x;
				if( pos.y - particle.radius > 0 && pos.y + particle.radius < canvas.height )
					particle.y = pos.y;
			}else{
				particle.x = pos.x;
				particle.y = pos.y;
			}
		
		}else if( this.library.getParameter(p => p.interactivity.events.onclick.enable) &&
			isInArray( 'repulse', this.library.getParameter(p => p.interactivity.events.onclick.mode) ) ){

			if( !this.repulse_finish ){
				this.repulse_count++;
				if( this.repulse_count == this.library.getParameter(p => p.particles.array).length )
					this.repulse_finish = true;
			}

			if( this.repulse_clicking ){

				let repulseRadius = Math.pow(this.library.getParameter(p => p.interactivity.modes.repulse.distance)/6, 3);
				let {distance, distanceX, distanceY} = this.library.manager.getDistances(this.library.interactivity.mouseClickPosition, particle);

				const force = repulseRadius / Math.pow(distance, 2);

				const repulsion = force * -1;

				if( distance <= repulseRadius ){
					let f = Math.atan2( distanceY, distanceX );
					particle.vx = repulsion * Math.cos( f );
					particle.vy = repulsion * Math.sin( f );
					if( this.library.getParameter(p => p.particles.move.out_mode) == 'bounce' ){
						let pos: TPoint = {
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
				}
			}else{
				if( this.repulse_clicking == false ){
					particle.vx = particle.vx_i;
					particle.vy = particle.vy_i;
				}
			}

		}
	}

	grabParticle( particle: Particle ): void{

		let {canvas} = this.library;

		let {interactivity, particles} = this.library.getParameter(p => p);

		if( interactivity.events.onhover.enable &&
			this.library.interactivity.mouseStatus === MouseInteractivityStatus.MOUSEMOVE){

			const distance = this.library.manager.getDistance(particle, this.library.interactivity.mouseMovePosition);

			if( distance <= interactivity.modes.grab.distance ){

				let {grab} = interactivity.modes;

				let opacity_line: number = grab.line_linked.opacity - ( distance / ( 1 / grab.line_linked.opacity ) ) / grab.distance;
				
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
					canvas.ctx.lineTo(this.library.interactivity.mouseMovePosition.x, this.library.interactivity.mouseMovePosition.y);
					canvas.ctx.stroke();
					canvas.ctx.closePath();
				}

			}

		}
	}

}