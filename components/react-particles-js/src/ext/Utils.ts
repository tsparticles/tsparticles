type RGB = {
	r: number;
	g: number;
	b: number;
};

export const hexToRgb: ( hex: string ) => RGB =
	( hex ) => {
		let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace( shorthandRegex, ( m, r, g, b ) => {
			return r + r + g + g + b + b;
		});
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
		return result ? {
			r: parseInt( result[1], 16 ),
			g: parseInt( result[2], 16 ),
			b: parseInt( result[3], 16 )
		} : null;
	};

export const clamp: ( number: number, min: number, max: number ) => number = 
	( number, min, max ) => {
		return Math.min( Math.max( number, min ), max );
	};

export const isInArray: ( value: any, array: any ) => boolean =
	( value, array ) => {
		return array.indexOf( value ) > -1;
	};

let requestAnimFrameProp: () => any =
	() => {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			(( callback: any ) => {
				window.setTimeout( callback, 1000 / 60 );
			});
	};

let cancelRequestAnimFrameProp: () => any = 
	() => {
		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			clearTimeout
	};

export const requestAnimFrame = requestAnimFrameProp();

export const cancelRequestAnimFrame = cancelRequestAnimFrameProp();