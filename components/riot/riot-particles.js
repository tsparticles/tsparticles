import { tsParticles } from 'tsparticles-engine';

let oldId;
var riotParticles = {
  'css': null,
  'exports': {
    onMounted(props) {
      tsParticles.init();

      if (props.particlesInit) {
        props.particlesInit(tsParticles);
      }

      if (oldId) {
        const oldContainer = tsParticles.dom().find(c => c.id === oldId);

        if (oldContainer) {
          oldContainer.destroy();
        }
      }

      if (props.id) {
        const cb = container => {
          if (props.particlesLoaded) {
            props.particlesLoaded(container);
          }

          oldId = props.id;
        };

        if (props.url) {
          tsParticles.loadJSON(props.id, props.url).then(cb);
        } else if (props.options) {
          tsParticles.load(props.id, props.options).then(cb);
        }
      } else {
        if (props.particlesLoaded) {
          props.particlesLoaded(undefined);
        }
      }
    }

  },
  'template': function (template, expressionTypes, bindingTypes, getComponent) {
    return template('<div expr0="expr0"></div>', [{
      'redundantAttribute': 'expr0',
      'selector': '[expr0]',
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'id',
        'evaluate': function (_scope) {
          return _scope.props.id;
        }
      }]
    }]);
  },
  'name': 'riot-particles'
};

export default riotParticles;
