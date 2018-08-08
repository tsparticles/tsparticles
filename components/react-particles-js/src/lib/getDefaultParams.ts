import { IParams } from '.';
import { ShapeType, MoveDirection } from './IParams';

export const getDefaultParams: () => IParams =
	() => ({
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
				type: ShapeType.CIRCLE,
				stroke: {
					width: 0,
					color: '#000000'
				},
				polygon: {
					nb_sides: 5
				},
				image: {
					src: '',
					data: null,
					width: 100,
					height: 100
				},
				images: []
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
				color: '#FFF',
				opacity: 0.6,
				width: 1,
				shadow: {
					enable: false,
					blur: 5,
					color: 'lime'
				}
			},
			move: {
				enable: true,
				speed: 3,
				direction: MoveDirection.NONE,
				random: false,
				straight: false,
				out_mode: 'bounce',
				bounce: true,
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
					enable: false,
					mode: 'grab'
				},
				onclick: {
					enable: false,
					mode: 'repulse'
				},
				resize: true
			},
			modes: {
				grab: {
					distance: 180,
					line_linked: {
						opacity: 0.35
					}
				},
				bubble: {
					distance: 200,
					size: 80,
					duration: 0.4
				},
				repulse: {
					distance: 100,
					duration: 5
				},
				push: {
					particles_nb: 4
				},
				remove: {
					particles_nb: 2
				}
			},
			mouse: {}
		},
		retina_detect: true,
		fps_limit: 999
	});
