import { Getter } from 'vuex'
import { RootState } from './index'

export type GettersKey = 'userPhoto' | 'userName' | 'isLogin' | 'userId' | 'userBjImg' | 'cookie' | 'token'
type CurrentGettersTree = Record<GettersKey, Getter<RootState, RootState>>

const getters: CurrentGettersTree = {
    userPhoto: state => state.users.photo,
    userName: state => state.users.userName,
    isLogin: state => state.users.isLogin,
    userId: state => state.users.userId,
    userBjImg: state => state.users.bgImg,
    cookie: state => state.users.bgImg,
    token: state => state.users.bgImg,
}

export default getters