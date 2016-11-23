import {IParams, Particle, cancelRequestAnimFrame, requestAnimFrame, isInArray} from '.';

export default class Vendors{

	params: IParams;

	constructor( params: IParams ){
		this.params = params;
		this.eventsListeners = this.eventsListeners.bind( this );
		this.onMouseMove = this.onMouseMove.bind( this );
		this.onMouseLeave = this.onMouseLeave.bind( this );
		this.onClick = this.onClick.bind( this );
		this.densityAutoParticles = this.densityAutoParticles.bind( this );
		this.checkOverlap = this.checkOverlap.bind( this );
		this.createSvgImg = this.createSvgImg.bind( this );
		this.destroy = this.destroy.bind( this );
		this.drawShape = this.drawShape.bind( this );
		this.exportImg = this.exportImg.bind( this );
		this.loadImg = this.loadImg.bind( this );
		this.draw = this.draw.bind( this );
		this.checkBeforeDraw = this.checkBeforeDraw.bind( this );
		this.init = this.init.bind( this );
		this.params.fn.vendors.eventsListeners = this.eventsListeners
		this.params.fn.vendors.densityAutoParticles = this.densityAutoParticles
		this.params.fn.vendors.checkOverlap = this.checkOverlap
		this.params.fn.vendors.createSvgImg = this.createSvgImg
		this.params.fn.vendors.destroy = this.destroy
		this.params.fn.vendors.drawShape = this.drawShape
		this.params.fn.vendors.exportImg = this.exportImg
		this.params.fn.vendors.loadImg = this.loadImg
		this.params.fn.vendors.draw = this.draw
		this.params.fn.vendors.checkBeforeDraw = this.checkBeforeDraw
		this.params.fn.vendors.init = this.init
	}

	eventsListeners(): void{
		let {canvas, interactivity} = this.params;

		if( interactivity.detect_on == 'window' ){
			interactivity.el = window;
		}else{
			interactivity.el = canvas.element;
		}

		if( interactivity.events.onhover.enable ||
			interactivity.events.onclick.enable ){

			interactivity.el.addEventListener( 'mousemove', this.onMouseMove );
			interactivity.el.addEventListener( 'mouseleave', this.onMouseLeave );

		}

		if( interactivity.events.onclick.enable ){
			interactivity.el.addEventListener( 'click', this.onClick );
		}

	}

	public onMouseMove( event: MouseEvent ): void{
		let {canvas, interactivity, tmp} = this.params;

		let pos: {
			x: number;
			y: number;
		};

		if( interactivity.el == window ){
			pos = {
				x: event.clientX,
				y: event.clientY
			};
		}else{
			pos = {
				x: event.offsetX || event.clientX,
				y: event.offsetY || event.clientY
			};
		}

		interactivity.mouse.pos_x = pos.x;
		interactivity.mouse.pos_y = pos.y;

		if( tmp.retina ){
			interactivity.mouse.pos_x *= canvas.pxratio;
			interactivity.mouse.pos_y *= canvas.pxratio;
		}

		interactivity.status = 'mousemove';
	}

	public onMouseLeave( event: MouseEvent ): void{
		let {interactivity} = this.params;

		interactivity.mouse.pos_x = null;
		interactivity.mouse.pos_y = null;
		interactivity.status = 'mouseleave';
	}

	public onClick(): void{
		let {fn, interactivity, particles, tmp} = this.params;

		interactivity.mouse.click_pos_x = interactivity.mouse.pos_x;
		interactivity.mouse.click_pos_y = interactivity.mouse.pos_y;

		interactivity.mouse.click_time = new Date().getTime();

		if( interactivity.events.onclick.enable ){

			switch( interactivity.events.onclick.mode ){

				case 'push':
					if( particles.move.enable ){
						fn.modes.pushParticles( interactivity.modes.push.particles_nb, interactivity.mouse );
					}else{
						if( interactivity.modes.push.particles_nb == 1 ){
							fn.modes.pushParticles( interactivity.modes.push.particles_nb, interactivity.mouse );
						}else if( interactivity.modes.push.particles_nb > 1 ){
							fn.modes.pushParticles( interactivity.modes.push.particles_nb );
						}
					}
					break;

				case 'remove':
					fn.modes.removeParticles( interactivity.modes.remove.particles_nb );
					break;

				case 'bubble':
					tmp.bubble_clicking = true;
					break;

				case 'repulse':
					tmp.repulse_clicking = true;
					tmp.repulse_count = 0;
					tmp.repulse_finish = false;
					setTimeout(() => {
						tmp.repulse_clicking = false;
					}, interactivity.modes.repulse.duration * 1000 );
					break;

			}

		}
	}

	densityAutoParticles(): void{
		let {canvas, fn, particles, tmp} = this.params;

		if( particles.number.density.enable ){
			let area: number = canvas.element.width * canvas.element.height / 1000;
			if( tmp.retina ){
				area = area / canvas.pxratio * 2;
			}

			let nb_particles: number = area * particles.number.value / particles.number.density.value_area;
			let missing_particles: number = particles.array.length - nb_particles;
			if( missing_particles < 0 ){
				fn.modes.pushParticles( Math.abs( missing_particles ) );
			}else{
				fn.modes.removeParticles( missing_particles );
			}
		}
	}

	checkOverlap( p1: Particle, position?: { x: number; y: number; } ): void{
		let {canvas, fn, particles} = this.params;

		particles.array.forEach( ( particle: Particle ) => {
			let p2: Particle = particle; 

			let dx: number = p1.x - p2.x;
			let dy: number = p1.y - p2.y;
			let dist: number = Math.sqrt( dx * dx + dy * dy );

			if( dist <= p1.radius + p2.radius ){
				p1.x = position ? position.x : Math.random() * canvas.width;
				p1.y = position ? position.y : Math.random() * canvas.height;
				fn.vendors.checkOverlap( p1 );
			}
		});
	}

	createSvgImg( particle: Particle ): void{
		let {tmp} = this.params;

		let svgXml: string = tmp.source_svg;
		let rgbHex: RegExp = /#([0-9A-F]{3,6})/gi;
		let coloredSvgXml: string = svgXml.replace( rgbHex, ( m, r, g, b ) => {
			let color_value: string;
			if( particle.color.rgb ){
				let {r, g, b} = particle.color.rgb;
				color_value = `rgba( ${r}, ${g}, ${b}, ${particle.opacity} )`;
			}else{
				let {h, s, l} = particle.color.hsl;
				color_value = `rgba( ${h}, ${s}, ${l}, ${particle.opacity} )`;
			}
			return color_value;
		});

		let svg: Blob = new Blob( [coloredSvgXml], {
			type: 'image/svg+xml;charset=utf-8'
		});
		let DOMURL: any = window.URL || window;
		let url: any = DOMURL.createObjectURL( svg );

		let img = new Image();
		img.addEventListener( 'load', () => {
			particle.img.obj = img;
			particle.img.loaded = true;
			DOMURL.revokeObjectURL( url );
			tmp.count_svg++;
		});
		img.src = url;
	}

	destroy(): void{
		let {canvas, fn} = this.params;
		cancelAnimationFrame( fn.drawAnimFrame );
		canvas.element.remove();
	}

	drawShape( c: CanvasRenderingContext2D, startX: number, startY: number, sideLength: number, sideCountNumerator: number, sideCountDenominator: number ): void{
		let sideCount: number = sideCountNumerator * sideCountDenominator;
		let decimalSides: number = sideCountNumerator / sideCountDenominator;
		let interiorAngleDegrees: number = ( 180 * ( decimalSides - 2 ) ) / decimalSides;
		let interiorAngle: number = Math.PI - Math.PI * interiorAngleDegrees / 180;
		c.save();
		c.beginPath();
		c.translate( startX, startY );
		c.moveTo( 0, 0 );
		for( let i = 0; i < sideCount; i++ ){
			c.lineTo( sideLength, 0 );
			c.translate( sideLength, 0 );
			c.rotate( interiorAngle );
		}
		c.fill();
		c.restore();
	}

	exportImg(): void{
		let {canvas} = this.params;
		window.open( canvas.element.toDataURL( 'image/png' ), '_blank' );
	}

	loadImg( type: string ): void{
		let {fn, particles, tmp} = this.params;

		tmp.img_error = undefined;
		if( particles.shape.image.src != '' ){
			if( type == 'svg' ){
				let xhr: XMLHttpRequest = new XMLHttpRequest();
				xhr.open( 'GET', particles.shape.image.src );
				xhr.onreadystatechange = ( data: any ) => {
					if( xhr.readyState == 4 ){
						if( xhr.status == 200 ){
							tmp.source_svg = data.currentTarget.response;
							fn.vendors.checkBeforeDraw();
						}else{
							console.log( 'Error react-particles-js - image not found' );
							tmp.img_error = true;
						}
					}
				};
				xhr.send();
			}else{
				let img: HTMLImageElement = new Image();
				img.addEventListener( 'load', () => {
					tmp.img_obj = img;
					fn.vendors.checkBeforeDraw();
				});
				img.src = particles.shape.image.src;
			}
		}else{
			console.log( 'Error react-particles-js - no image.src' );
			tmp.img_error = true;
		}
	}

	draw(): void{
		let {fn, particles, tmp} = this.params;

		if( particles.shape.type == 'image' ){
			if( tmp.img_type == 'svg' ){
				if( tmp.count_svg >= particles.number.value ){
					fn.particlesDraw();
					if( !particles.move.enable ){
						cancelRequestAnimFrame( fn.drawAnimFrame );
					}else{
						fn.drawAnimFrame = requestAnimFrame( fn.vendors.draw );
					}
				}else{
					if( !tmp.img_error ){
						fn.drawAnimFrame = requestAnimFrame( fn.vendors.draw );
					}
				}
			}else{
				if( tmp.img_obj != undefined ){
					fn.particlesDraw();
					if( !particles.move.enable ){
						cancelRequestAnimFrame( fn.drawAnimFrame );
					}else{
						fn.drawAnimFrame = requestAnimFrame( fn.vendors.draw );
					}
				}else{
					if( !tmp.img_error ){
						fn.drawAnimFrame = requestAnimFrame( fn.vendors.draw );
					}
				}
			}
		}else{
			fn.particlesDraw();
			if( !particles.move.enable ){
				cancelRequestAnimFrame( fn.drawAnimFrame );
			}else{
				fn.drawAnimFrame = requestAnimFrame( fn.vendors.draw );
			}
		}
	}

	checkBeforeDraw(): void{
		let {fn, particles, tmp} = this.params;

		if( particles.shape.type == 'image' ){
			if( tmp.img_type == 'svg' && tmp.source_svg == undefined ){
				// Not clear what "= requestAnimFrame( check )" means
				tmp.checkAnimFrame = requestAnimFrame();
			}else{
				cancelRequestAnimFrame( tmp.checkAnimFrame );
				if( !tmp.img_error ){
					fn.vendors.init();
					fn.vendors.draw();
				}
			}
		}else{
			fn.vendors.init();
			fn.vendors.draw();
		}
	}

	init(): void{
		let {fn, particles, tmp} = this.params;
		if( isInArray( 'image', particles.shape.type ) ){
			tmp.img_type = particles.shape.image.src.substr( particles.shape.image.src.length - 3 );
			fn.vendors.loadImg( tmp.img_type );
		}else{
			fn.vendors.checkBeforeDraw();
		}
	}

}