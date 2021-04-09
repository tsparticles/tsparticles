import { register } from 'riot'
import { basename } from 'path'

const globalComponentsContext = require.context('./components/global/', true, /[a-zA-Z0-9-]+\.riot/)

export default () => {
  globalComponentsContext.keys().map(path => {
    const name = basename(path, '.riot')
    const component = globalComponentsContext(path)

    register(name, component.default)

    return {
      name,
      component
    }
  })
}

