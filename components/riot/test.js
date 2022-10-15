import RiotParticles from './'
import { expect } from 'chai'
import { component } from 'riot'

describe('My Component Unit Test', () => {
    const mountMyComponent = component(RiotParticles)

    it('The component properties are properly rendered', () => {
        const div = document.createElement('div')

        const component = mountMyComponent(div, {
            id: "tsparticles",
            options: {}
        })

        expect(component.$('div').id).to.be.equal('tsparticles');
    })
})
