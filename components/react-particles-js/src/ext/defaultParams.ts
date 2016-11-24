import {IParams} from '.';

let defaultParams: IParams = {
    canvas: {
        element: null,
        width: null,
        height: null
    },
	particles: {
		number: {
			value: 120,
			density: {
				enable: true,
				value_area: 800
			}
		},
		color: {
			value: '#BB0000'
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#000000'
			},
			polygon: {
				nb_sides: 5
			},
			image: {
				src: '',
				width: 100,
				height: 100
			}
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0.1,
				sync: false
			}
		},
		size: {
			value: 1,
			random: false,
			anim: {
				enable: false,
				speed: 40,
				size_min: 0,
				sync: false
			}
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: '#BB0000',
			opacity: 0.4,
			width: 1
		},
		move: {
			enable: true,
			speed: 4,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 3000,
				rotateY: 3000
			}
		},
		array: []
	},
	interactivity: {
		detect_on: 'canvas',
		events: {
			onhover: {
				enable: true,
				mode: 'repulse'
			},
			onclick: {
				enable: true,
				mode: 'push'
			},
			resize: true
		},
		modes: {
			grab:{
				distance: 400,
				line_linked:{
					opacity: 1
				}
			},
			bubble:{
				distance: 200,
				size: 80,
				duration: 0.4
			},
			repulse:{
				distance: 100,
				duration: 0.4
			},
			push:{
				particles_nb: 4
			},
			remove:{
				particles_nb: 2
			}
		},
		mouse:{}
	},
	retina_detect: true,
	fn: {
		interact: {},
		modes: {},
		vendors: {}
	},
	tmp: {
		obj: null,
		retina: null
	}
};

export {
	defaultParams
};