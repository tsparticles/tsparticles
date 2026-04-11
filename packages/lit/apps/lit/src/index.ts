import 'lit-tsparticles';
import {loadFull} from 'tsparticles';
import {tsParticles} from 'tsparticles-engine';

(async () => {
  await loadFull(tsParticles);
})();
