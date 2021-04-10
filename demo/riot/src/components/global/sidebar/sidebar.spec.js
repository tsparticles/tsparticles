import Sidebar from './sidebar.riot'
import { expect } from 'chai'
import { component } from 'riot'

describe('Sidebar Unit Test', () => {
  const mountSidebar = component(Sidebar)

  it('The component is properly rendered', () => {
    const div = document.createElement('div')

    const component = mountSidebar(div)

    expect(component.$('h1').innerHTML).to.be.equal('Sidebar')
  })
})