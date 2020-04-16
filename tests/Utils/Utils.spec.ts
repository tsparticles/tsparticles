import { expect } from 'chai';
import 'mocha';

import {Utils} from '../../src/Classes/Utils/Utils';
 
describe('Utils', () => {
    it('generate a random number in the specified range', () => {
         const min = 1;
         const max = 10;
         const randomNumber = Utils.randomInRange(min, max);

         expect(randomNumber).to.be.within(min, max);
    });
});