import { ref, UnwrapRef, Ref } from '@vue/composition-api';
import {
    Song, Songs
} from '@/api/search';

export function useState<T extends any>(defaultVal?: T): [Ref<UnwrapRef<T> | undefined>, (newVal: UnwrapRef<T>) => void] {
    const state = ref(defaultVal);
    const setState = (newVal: UnwrapRef<T>) => {
        state.value = newVal;
    };
    return [state, setState];
}
// export function useState<T = any>(defaultVal?: T): [Ref<UnwrapRef<T> | undefined>, (newVal: UnwrapRef<T>) => void] {
//     const state = ref(defaultVal);
//     const setState = (newVal: UnwrapRef<T>) => {
//         state.value = newVal;
//     };
//     return [state, setState];
// }

export function batchCommit<T extends Array<any>, P extends Function>(paramsArr: T[], callback: P): void {
    paramsArr.forEach(params => {
        callback.apply(null, params)
    })
}

// 格式化歌曲列表
export function formatList (list: Song[] = []) {
    return list.map(song => {
      return {
        id: song.id,
        name: song.name,
        artist: song.artists[0].name,
        cover: song.artists[0] ? song.artists[0].img1v1Url : ''
      }
    })
}

// 
export function formatSongInfoList(song: Songs) {
    return {
        id: song.id,
        name: song.name,
        artist: song.ar.name,
        cover: song.al.picUrl
    }
}