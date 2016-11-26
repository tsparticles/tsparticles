import {IParams} from '.';

let defaultParams: IParams = {
	particles: {
		number: {
			value: 40,
			density: {
				enable: false,
				value_area: 1200
			}
		},
		color: {
			value: '#FFF'
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
			value: 2,
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
			color: '#FFF',
			opacity: 0.6,
			width: 1
		},
		move: {
			enable: true,
			speed: 1,
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
				mode: 'grab'
			},
			onclick: {
				enable: true,
				mode: 'repulse'
			},
			resize: true
		},
		modes: {
			grab:{
				distance: 180,
				line_linked:{
					opacity: 0.35
				}
			},
			bubble:{
				distance: 200,
				size: 80,
				duration: 0.4
			},
			repulse:{
				distance: 100,
				duration: 5
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
	retina_detect: true
};

export {
	defaultParams
};