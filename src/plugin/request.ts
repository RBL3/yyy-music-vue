import Vue, { VueConstructor } from 'vue'
import axios, { AxiosResponse } from 'axios';
import store from '@/store'

type Result<T = any> = AxiosResponse<{
    code: number;
    result?: T
    data?: T
    lrc?: T
}>


export const instance = axios.create({
    // baseURL: 'http://huangjiangjun.top:9000',
    timeout: 5000,
});
instance.interceptors.request.use(config => {
    const token = store.getters?.token
    // const cookie = store.getters?.cookie
    // if (cookie) {
    //     config.headers['Cookie'] = cookie
    // }
    if (token) {
        config.headers.Authorization = token
    }
    return config
})
// 响应拦截器
instance.interceptors.response.use((data: Result) => {
    const { data: innerData } = data;
    if (innerData.code === 200) {
        if (innerData.result) {
            return innerData.result;
        }
        if (innerData.data) {
            return innerData.data;
        }
        if (innerData.lrc) {
            return innerData.lrc;
        }
        return innerData
    }
    return Promise.reject(data);
});

export default {
    install(Vue: VueConstructor<Vue>): void {
        Vue.prototype.$request = axios;
    },
};
