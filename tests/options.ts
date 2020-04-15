import { Options } from '../src/Classes/Options/Options';
import { expect } from 'chai';

describe('Options tests', () => {
	it('checking particles number', () => {
		const options = new Options();
		expect(options.particles.number.value).to.equal(100);
	});
});
