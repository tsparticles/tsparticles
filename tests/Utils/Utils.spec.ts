import { expect } from 'chai';
import 'mocha';

import {Utils} from '../../src/Classes/Utils/Utils';
 
describe('Utils', () => {

    describe('clamp', () => {

        const min = 1;
        const max = 10;

        it('should return minimum when number is less than minimum', () => {
            const num = -5;
            const clampedNumber = Utils.clamp(num, min, max);
    
            expect(clampedNumber).to.equal(min);
        });

        it('should return minimum when number equals minimum', () => {
            const num = min;
            const clampedNumber = Utils.clamp(num, min, max);
    
            expect(clampedNumber).to.equal(min);
        });

        it('should return number when number is between minimum and maximum', () => {
            const num = 5;
            const clampedNumber = Utils.clamp(num, min, max);

            expect(clampedNumber).to.equal(num);
        });

        it('should return maximum when number equals maximum', () => {
            const num = max;
            const clampedNumber = Utils.clamp(num, min, max);
    
            expect(clampedNumber).to.equal(max);
        });

        it('should return maximum when number is greater than maximum', () => {
            const num = 15;
            const clampedNumber = Utils.clamp(num, min, max);
    
            expect(clampedNumber).to.equal(max);
        });

    });

    describe('isInArray', () => {

        const numericArray: number[] = [ 1, 2, 3, Math.PI, Math.E ];
        const stringArray: string[] = [ 'lorem', 'ipsum', 'dolor' ];

        // Numeric

        it('should return true when value is number contained in numeric array', () => {
            const value = numericArray[4];
            expect(Utils.isInArray(value, numericArray)).to.be.true;
        });

        it('should return false when value is number not contained in numeric array', () => {
            const value = Math.SQRT2;
            expect(Utils.isInArray(value, numericArray)).to.be.false;
        });

        it('should return true when array is non-array number matching value', () => {
            expect(Utils.isInArray(Math.LN2, Math.LN2)).to.be.true;
        });

        xit('should return false when array is non-array number not matching value', () => {
            expect(Utils.isInArray(Math.LN2, Math.LN10)).to.be.false;
        });

        // String

        it('should return true when value is string contained in numeric array', () => {
            const value = stringArray[0];
            expect(Utils.isInArray(value, stringArray)).to.be.true;
        });

        it('should return false when value is string not contained in numeric array', () => {
            const value = 'sit';
            expect(Utils.isInArray(value, stringArray)).to.be.false;
        });

        it('should return true when array is non-array string matching value', () => {
            expect(Utils.isInArray(stringArray[0], stringArray[0])).to.be.true;
        });

        it('should return false when array is non-array string not matching value', () => {
            expect(Utils.isInArray(stringArray[0], stringArray[1])).to.be.false;
        });

    });

    describe('randomInRange', () => {

        it('should generate a random number in the specified range', () => {
             const min = 1;
             const max = 10;
             const randomNumber = Utils.randomInRange(min, max);
    
             expect(randomNumber).to.be.within(min, max);
        });

    });

});