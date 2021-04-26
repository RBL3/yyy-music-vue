// import { Module } from 'vuex'
// import { RootState } from '../index'
import { login, loginParams } from '@/api/users'
import { batchCommit } from '@/utils'

export type UsersInfo = {
    photo: string,
    userName: string,
    userId: number | string,
    isLogin: boolean,
    token: string,
    bgImg: string,
    cookie: string
}

type CommitFunc = typeof users.mutations
type Commit = {
    <T extends keyof CommitFunc>(type: T, payload?: Parameters<CommitFunc[T]>[1]): any
}

const users = {
    namespaced: true,
    state: {
        photo: '',
        userName: '',
        userId: '',
        isLogin: false,
        token: '',
        bgImg: '',
        cookie: ''
    },
    mutations: {
        setUserPhoto(state: UsersInfo, payload: string) {
            state.photo = payload
        },
        setUserName(state: UsersInfo, payload: string) {
            state.userName = payload
        },
        setUserStatus(state: UsersInfo, payload: boolean) {
            state.isLogin = payload
        },
        setUserId(state: UsersInfo, payload: number | string) {
            state.userId = payload
        },
        setUserToken(state: UsersInfo, payload: string) {
            state.token = payload
        },
        setBjImg(state: UsersInfo, payload: string) {
            state.bgImg = payload
        },
        setCookie(state: UsersInfo, payload: string) {
            state.cookie = payload
        }
    },
    actions: {
        async onLogin({ commit }: { commit: Commit }, data: loginParams) {
            const { account: { id }, token, profile: { nickname, avatarUrl, backgroundUrl }, cookie } = await login(data)
            batchCommit<[keyof CommitFunc, Parameters<CommitFunc[keyof CommitFunc]>[1]], Commit>(
                [
                    ['setUserId', id],
                    ['setUserName', nickname],
                    ['setUserPhoto', avatarUrl],
                    ['setUserToken', token],
                    ['setUserStatus', true],
                    ['setBjImg', backgroundUrl],
                    ['setCookie', cookie]
                ],
                commit
            )
        }
    }
}


export default users
