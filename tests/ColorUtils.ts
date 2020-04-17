import { ColorUtils } from '../src/Classes/Utils/ColorUtils';
import { IColor } from "../src/Interfaces/IColor";
import { expect } from "chai";
import { IRgb } from "../src/Interfaces/IRgb";

describe('ColorUtils', () => {
	describe('colorToRgb', () => {
		const red: IRgb = {
			b: 0,
			g: 0,
			r: 255,
		};

		it('string value', function () {
			const color: IColor = {
				value: "#ff0000",
			};

			expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
		});

		it('string value', function () {
			const color: IColor = {
				value: [ "#ff0000", "#00ff00", "#0000ff" ],
			};

			expect(ColorUtils.colorToRgb(color)).to.satisfy((rgb: IRgb) => {
				return rgb.r === 255 || rgb.g === 255 || rgb.b === 255;
			}).and.not.be.undefined.and.not.be.null;
		});

		it('IValueColor w/ rgb value', function () {
			const color: IColor = {
				value: {
					rgb: {
						b: 0,
						g: 0,
						r: 255,
					}
				},
			};

			expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
		});

		it('IValueColor w/ hsl value', function () {
			const color: IColor = {
				value: {
					hsl: {
						h: 0,
						l: 50,
						s: 100,
					}
				},
			};

			expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
		});

		it('rgb value', function () {
			const color: IColor = {
				value: {
					b: 0,
					g: 0,
					r: 255,
				},
			};

			expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
		});

		it('hsl value', function () {
			const color: IColor = {
				value: {
					h: 0,
					l: 50,
					s: 100,
				},
			};

			expect(ColorUtils.colorToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
		});
	});
});