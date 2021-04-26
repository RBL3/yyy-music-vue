import { instance as request } from '@/plugin/request';

export interface User {
    loginType: number;
    code: number;
    account: Account;
    token: string;
    profile: Profile;
    bindings: Binding[];
    cookie: string;
}

export interface Account {
    id: number;
    userName: string;
    type: number;
    status: number;
    whitelistAuthority: number;
    createTime: number;
    salt: string;
    tokenVersion: number;
    ban: number;
    baoyueVersion: number;
    donateVersion: number;
    vipType: number;
    viptypeVersion: number;
    anonimousUser: boolean;
}

export interface Binding {
    bindingTime: number;
    tokenJsonStr: string;
    expiresIn: number;
    userId: number;
    url: string;
    refreshTime: number;
    expired: boolean;
    id: number;
    type: number;
}

export interface Profile {
    description: string;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    vipType: number;
    gender: number;
    accountStatus: number;
    avatarImgId: number;
    birthday: number;
    nickname: string;
    city: number;
    backgroundImgId: number;
    avatarUrl: string;
    defaultAvatar: boolean;
    province: number;
    djStatus: number;
    experts: any;
    mutual: boolean;
    remarkName: null;
    expertTags: null;
    authStatus: number;
    userId: number;
    userType: number;
    followed: boolean;
    backgroundUrl: string;
    detailDescription: string;
    signature: string;
    authority: number;
    avatarImgId_str: string;
    followeds: number;
    follows: number;
    eventCount: number;
    avatarDetail: null;
    playlistCount: number;
    playlistBeSubscribedCount: number;
}

export interface loginParams {
    phone: string;
    password: string
}

export function login({phone, password}: loginParams): Promise<User> {
    return request.get('/api/login/cellphone', { params: {
        phone,
        password
    }})
}

interface UserFondList {
    ids: number[]
    checkPoint: number,
    code: number
}

export function getUserFondListApi(uid: number | string): Promise<UserFondList> {
    return request.get('/api/likelist', { params: {
        uid
    }})
}