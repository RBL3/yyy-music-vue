import Vue from 'vue'
import SvgIcon from '@/components/YyIcon.vue'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
requireAll(req)
