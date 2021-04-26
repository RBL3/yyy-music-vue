import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex'

// modules
import users, { UsersInfo } from './modules/users'

// getters
import getters from './getters'

Vue.use(Vuex)

type CurrentMoudles = {
    users: typeof users
}

export type RootState = {
    users: UsersInfo
}

export type StoreInfo = typeof storeInfo

// modules
const modules: CurrentMoudles = {
    users: users
}

const storeInfo: StoreOptions<RootState> = {
    modules,
    getters
}


export default new Vuex.Store<RootState>(storeInfo)

