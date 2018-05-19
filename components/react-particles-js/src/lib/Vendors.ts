import {IParams, Particle, isInArray, hexToRgb, ParticlesLibrary} from '.';

export default class Vendors{

	params: IParams;
	library: ParticlesLibrary;

	constructor( params: IParams, library: ParticlesLibrary ){

		this.params = params;
		this.library = library;
		
		this.onMouseMove = this.onMouseMove.bind( this );
		this.onMouseLeave = this.onMouseLeave.bind( this );
		this.onClick = this.onClick.bind( this );
	}

	eventsListeners(): void{
		let {interactivity} = this.params;
		let {canvas} = this.library;

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

	detachListeners(): void{
		let {interactivity} = this.params;
		let {tmp} = this.library;

		if( interactivity.el ){

			if( interactivity.events.onhover.enable ||
				interactivity.events.onclick.enable ){
				interactivity.el.removeEventListener( 'mousemove', this.onMouseMove );
				interactivity.el.addEventListener( 'mouseleave', this.onMouseLeave );
			}

			if( interactivity.events.onclick.enable ){
				interactivity.el.addEventListener( 'click', this.onClick );
			}
		}

		window.cancelAnimationFrame( tmp.drawAnimFrame );
	}

	public onMouseMove( event: MouseEvent ): void{

		let {canvas, tmp} = this.library;

		let {interactivity} = this.params;

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
		let {modes, tmp} = this.library;
		let {interactivity, particles} = this.params;

		interactivity.mouse.click_pos_x = interactivity.mouse.pos_x;
		interactivity.mouse.click_pos_y = interactivity.mouse.pos_y;

		interactivity.mouse.click_time = new Date().getTime();

		if( interactivity.events.onclick.enable ){

			switch( interactivity.events.onclick.mode ){

				case 'push':
					if( particles.move.enable ){
						modes.pushParticles( interactivity.modes.push.particles_nb, interactivity.mouse );
					}else{
						if( interactivity.modes.push.particles_nb == 1 ){
							modes.pushParticles( interactivity.modes.push.particles_nb, interactivity.mouse );
						}else if( interactivity.modes.push.particles_nb > 1 ){
							modes.pushParticles( interactivity.modes.push.particles_nb );
						}
					}
					break;

				case 'remove':
					modes.removeParticles( interactivity.modes.remove.particles_nb );
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

		let {canvas, modes, tmp} = this.library;
		let {particles} = this.params;

		if( particles.number.density.enable ){
			let area: number = canvas.element.width * canvas.element.height / 1000;
			if( tmp.retina ){
				area = area / canvas.pxratio * 2;
			}

			let nb_particles: number = area * particles.number.value / particles.number.density.value_area;
			let missing_particles: number = particles.array.length - nb_particles;
			if( missing_particles < 0 ){
				modes.pushParticles( Math.abs( missing_particles ) );
			}else{
				modes.removeParticles( missing_particles );
			}
		}
	}

	checkOverlap( p1: Particle, position?: { x: number; y: number; } ): void{
		let {canvas, vendors} = this.library;
		let {particles} = this.params;

		particles.array.forEach( ( particle: Particle ) => {
			let p2: Particle = particle; 

			let dx: number = p1.x - p2.x;
			let dy: number = p1.y - p2.y;
			let dist: number = Math.sqrt( dx * dx + dy * dy );

			if( dist <= p1.radius + p2.radius ){
				p1.x = position ? position.x : Math.random() * canvas.width;
				p1.y = position ? position.y : Math.random() * canvas.height;
				vendors.checkOverlap( p1 );
			}
		});
	}

	createSvgImg( particle: Particle ): void{
		let {tmp} = this.library;

		let svgXml: string = this.params.particles.shape.image.data;
		let rgbHex: RegExp = /#([0-9A-F]{3,6})|rgb\([0-9,]+\)/gi;
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
		let {canvas, tmp} = this.library;
		cancelAnimationFrame( tmp.drawAnimFrame );
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
		let {canvas} = this.library;
		window.open( canvas.element.toDataURL( 'image/png' ), '_blank' );
	}

	loadImg( type: string, image: any ): void{
		let {tmp, vendors} = this.library;

		tmp.img_error = undefined;
		if( image.src != '' ){
			if( type == 'svg' ){
				if(image.data){
					// tmp.source_svg = image.data;
					vendors.checkBeforeDraw();
				}else{
					let xhr: XMLHttpRequest = new XMLHttpRequest();
					xhr.open( 'GET', image.src );
					xhr.onreadystatechange = ( data: any ) => {
						if( xhr.readyState == 4 ){
							if( xhr.status == 200 ){
								image.data = data.currentTarget.response;
								// tmp.source_svg = data.currentTarget.response;
								vendors.checkBeforeDraw();
							}else{
								console.log( 'Error react-particles-js - image not found' );
								tmp.img_error = true;
							}
						}
					};
					xhr.send();
				}
			}else{
				let img: HTMLImageElement = new Image();
				img.addEventListener( 'load', () => {
					tmp.img_obj = img;
					vendors.checkBeforeDraw();
				});
				img.src = image.src;
			}
		}else{
			console.log( 'Error react-particles-js - no image.src' );
			tmp.img_error = true;
		}
	}

	draw(): void{

		let {tmp, manager, vendors} = this.library;
		let {particles} = this.params;

		if( particles.shape.type == 'image' ){
			if( tmp.img_type == 'svg' ){
				if( tmp.count_svg >= particles.number.value ){
					manager.particlesDraw();
					if( !particles.move.enable ){
						cancelAnimationFrame( tmp.drawAnimFrame );
					}else{
						tmp.drawAnimFrame = requestAnimationFrame( vendors.draw.bind( vendors ) );
					}
				}else{
					if( !tmp.img_error ){
						tmp.drawAnimFrame = requestAnimationFrame( vendors.draw.bind( vendors ) );
					}
				}
			}else{
				if( tmp.img_obj != undefined ){
					manager.particlesDraw();
					if( !particles.move.enable ){
						cancelAnimationFrame( tmp.drawAnimFrame );
					}else{
						tmp.drawAnimFrame = requestAnimationFrame( vendors.draw.bind( vendors ) );
					}
				}else{
					if( !tmp.img_error ){
						tmp.drawAnimFrame = requestAnimationFrame( vendors.draw.bind( vendors ) );
					}
				}
			}
		}else{
			manager.particlesDraw();
			if( !particles.move.enable ){
				cancelAnimationFrame( tmp.drawAnimFrame );
			}else{
				tmp.drawAnimFrame = requestAnimationFrame( vendors.draw.bind( vendors ) );
			}
		}
	}

	checkBeforeDraw(): void{
		let {tmp, vendors} = this.library;
		let {particles} = this.params;

		if( particles.shape.type == 'image' ){
			if( tmp.img_type == 'svg' && this.params.particles.shape.image.data == undefined ){
				// Not clear what "= requestAnimationFrame( check )" means
				let check: any;
				tmp.checkAnimFrame = requestAnimationFrame( check );
			}else{
				cancelAnimationFrame( tmp.checkAnimFrame );
				if( !tmp.img_error ){
					vendors.init();
					vendors.draw();
				}
			}
		}else{
			vendors.init();
			vendors.draw();
		}
	}

	init(): void{
		let {library} = this;
		let {manager, vendors} = library;
		let {particles} = this.params;
		library.retinaInit();
		library.canvasInit();
		library.canvasSize();
		manager.particlesCreate();
		vendors.densityAutoParticles();
		particles.line_linked.color_rgb_line = hexToRgb( particles.line_linked.color );
	}

	start(): void{
		let {tmp, vendors} = this.library;
		let {particles} = this.params;
		if( isInArray( 'image', particles.shape.type ) ){
			
			let match: string[];
			if(match = /^data:image\/(\w{3})\+xml;base64,(.*)$/.exec(particles.shape.image.src)){
				tmp.img_type = match[1];
				particles.shape.image.data = atob(match[2]);
			}else if(match = /^.*(\w{3})$/.exec(particles.shape.image.src)){
				tmp.img_type = match[1];
			}
			vendors.loadImg(tmp.img_type, particles.shape.image);
		}else{
			vendors.checkBeforeDraw();
		}
	}

}
