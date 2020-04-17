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
	});
});