import Vue from 'vue';
import App from './App.vue';

declare module 'particles.vue';

/*import Particles from "particles.vue";

Vue.use(Particles);*/

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
