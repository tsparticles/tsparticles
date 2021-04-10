import MyComponent from './my-component.riot'
import { expect } from 'chai'
import { component } from 'riot'

describe('My Component Unit Test', () => {
  const mountMyComponent = component(MyComponent)

  it('The component properties are properly rendered', () => {
    const div = document.createElement('div')

    const component = mountMyComponent(div, {
      message: 'hello'
    })

    expect(component.$('p').innerHTML).to.be.equal('hello')
  })
})