import { instance as request } from '@/plugin/request';

/**
 * 搜索列表
 */

export interface Artist {
    id: number;
    name: string;
    picUrl: null;
    alias: any[];
    albumSize: number;
    picId: number;
    img1v1Url: string;
    img1v1: number;
    trans: null;
}

export interface Album {
    id: number;
    name: string;
    artist: Artist;
    publishTime: number;
    size: number;
    copyrightId: number;
    status: number;
    picId: number;
    mark: number;
}

export interface Song {
    id: number;
    name: string;
    artists: Artist[];
    album: Album;
    duration: number;
    copyrightId: number;
    status: number;
    alias: any[];
    rtype: number;
    ftype: number;
    mvid: number;
    fee: number;
    rUrl: null;
    mark: number;
}

export interface SearchRec {
    songs: Song[];
    hasMore: boolean;
    songCount: number;
}

export function getSearchRec(keywords: string): Promise<SearchRec> {
    return request.get('/api/search', { params: { keywords } });
}

/**
 * 根据id搜索
 */

export interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
}

export interface FreeTimeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
}

export interface FreeTrialInfo {
    start: number;
    end: number;
}

export interface ExactSong {
    id: number;
    url: string;
    br: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    type: string;
    gain: number;
    fee: number;
    uf: null;
    payed: number;
    flag: number;
    canExtend: boolean;
    freeTrialInfo: FreeTrialInfo;
    level: string;
    encodeType: string;
    freeTrialPrivilege: FreeTrialPrivilege;
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
    urlSource: number;
}

export function getExactSong(id: string | number): Promise<ExactSong[]> {
    return request.get('/api/song/url', { params: { id } });
}

/**
 * 根据id获取歌词
 */

export interface Lrc {
    version: number;
    lyric: string;
}

// export interface SongLrc {
//     lrc: Lrc;
// }

export function getSongLrc(id: string | number): Promise<Lrc> {
    return request.get('/api/lyric', { params: { id } });
}

export interface SongInfo {
    songs: Songs[];
    privileges: {
        [key: string]: any;
    };
    code: number
}

export interface Songs {
    id: number;
    name: string;
    [key: string]: any;
    ar: {
        name: string;
        [key: string]: any;
    }
    al: {
        name: string;
        picUrl: string;
        [key: string] : any
    }
}

export function getSongInfo(ids: number | string): Promise<SongInfo> {
    return request.get('/api/song/detail', { params: { ids } })
}