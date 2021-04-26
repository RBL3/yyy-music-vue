import Vue, { VueConstructor } from 'vue'

export const tools = {
}

export default {
    install(Vue: VueConstructor<Vue>) {
        Vue.prototype.$tools = tools;
    }
}