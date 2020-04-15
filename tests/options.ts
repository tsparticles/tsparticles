import { Options } from '../src/Classes/Options/Options';
import { expect } from 'chai';
import { InteractivityDetect } from "../src/Enums/InteractivityDetect";
import { MoveDirection } from "../src/Enums/MoveDirection";
import { OutMode } from "../src/Enums/OutMode";
import { HoverMode } from "../src/Enums/Modes/HoverMode";
import { ClickMode } from "../src/Enums/Modes/ClickMode";

describe('Options tests', () => {
	it('checking default options', () => {
		const options = new Options();

		expect(options.background.color).to.be.undefined;
		expect(options.backgroundMask.enable).to.be.false;
		expect(options.detectRetina).to.be.false;
		expect(options.fpsLimit).to.equal(30);
		expect(options.interactivity.detectsOn).to.equal(InteractivityDetect.canvas);
		expect(options.particles.number.value).to.equal(100);
		expect(options.pauseOnBlur).to.be.true;
		expect(options.polygon.enable).to.be.false;
	});

	it('check default preset options', function () {
		const options = new Options();

		options.load({
			"particles": {
				"number": {
					"value": 80,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": "#ffffff"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#000000"
					},
					"polygon": {
						"nb_sides": 5
					},
					"image": {
						"src": "https://cdn.matteobruni.it/images/particles/github.svg",
						"width": 100,
						"height": 100
					}
				},
				"opacity": {
					"value": 0.5,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 3,
						"opacity_min": 0.1,
						"sync": false
					}
				},
				"size": {
					"value": 5,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 20,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": true,
					"distance": 150,
					"color": "#ffffff",
					"opacity": 0.4,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 2,
					"direction": MoveDirection.none,
					"random": false,
					"straight": false,
					"out_mode": OutMode.out,
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": InteractivityDetect.canvas,
				"events": {
					"onhover": {
						"enable": true,
						"mode": HoverMode.repulse,
						"parallax": {
							"enable": false,
							"force": 60,
							"smooth": 10
						}
					},
					"onclick": {
						"enable": true,
						"mode": ClickMode.push
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 400,
						"line_linked": {
							"opacity": 1
						}
					},
					"bubble": {
						"distance": 400,
						"size": 40,
						"duration": 2,
						"opacity": 0.8
					},
					"repulse": {
						"distance": 200
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true,
			"background": {
				"color": "#0d47a1",
				"image": "",
				"position": "50% 50%",
				"repeat": "no-repeat",
				"size": "cover"
			}
		});

		expect(options.particles.number.value).to.equal(80);
	});
});
