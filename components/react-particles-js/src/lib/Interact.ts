import {Particle, IParams} from '.';

export default class Interact{

	params: IParams;

	constructor( params: IParams ){
		this.params = params;
		this.linkParticles = this.linkParticles.bind( this );
		this.attractParticles = this.attractParticles.bind( this );
		this.bounceParticles = this.bounceParticles.bind( this );
		this.params.fn.interact.linkParticles = this.linkParticles;
		this.params.fn.interact.attractParticles = this.attractParticles;
		this.params.fn.interact.bounceParticles = this.bounceParticles;
	}

	linkParticles( p1: Particle, p2: Particle ): void{
		let dx: number = p1.x - p2.x;
		let dy: number = p1.y - p2.y;
		let dist: number = Math.sqrt( dx * dx + dy * dy );

		if( dist <= this.params.particles.line_linked.distance ){
			let opacity_line: number = this.params.particles.line_linked.opacity - ( dist / ( 1 / this.params.particles.line_linked.opacity ) ) / this.params.particles.line_linked.distance;
			if( opacity_line > 0 ){
				let color_line: any = this.params.particles.line_linked.color_rgb_line;
				let {r, g, b} = color_line;
				this.params.canvas.ctx.strokeStyle = `rgba( ${r}, ${g}, ${b}, ${opacity_line} )`;
				this.params.canvas.ctx.lineWidth = this.params.particles.line_linked.width;

				this.params.canvas.ctx.beginPath();
				this.params.canvas.ctx.moveTo( p1.x, p1.y );
				this.params.canvas.ctx.lineTo( p2.x, p2.y );
				this.params.canvas.ctx.stroke();
				this.params.canvas.ctx.closePath();
			}
		}
	}

	attractParticles( p1: Particle, p2: Particle ): void{
		let dx: number = p1.x - p2.x;
		let dy: number = p1.y - p2.y;
		let dist: number = Math.sqrt( dx * dx + dy * dy );

		if( dist <= this.params.particles.line_linked.distance ){
			let ax = dx / ( this.params.particles.move.attract.rotateX * 1000 );
			let ay = dy / ( this.params.particles.move.attract.rotateY * 1000 );

			p1.vx -= ax;
			p1.vy -= ay;

			p2.vx += ax;
			p2.vy += ay;
		}
	}

	bounceParticles( p1: Particle, p2: Particle ): void{
		let dx: number = p1.x - p2.x;
		let dy: number = p1.y - p2.y;
		let dist: number = Math.sqrt( dx * dx + dy * dy );
		let dist_p: number = p1.radius + p2.radius;

		if( dist <= dist_p ){
			p1.vx = -p1.vx;
			p1.vy = -p1.vy;
			p2.vx = -p2.vx;
			p2.vy = -p2.vy;
		}
	}
}