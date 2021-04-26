<template>
  <mu-load-more @load="loadSong(5)" :loaded-all="isLoadedAll" :loading="isLoading" loading-text="loading">
    <v-song-list :list="songList" title="我喜欢的音乐" />
  </mu-load-more>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted } from '@vue/composition-api'
import vSongList from '@/components/SongList.vue';
import { getSongInfo } from '@/api/search'
import { getUserFondListApi } from '@/api/users'
import { useState, formatSongInfoList } from '@/utils'
import { ListProps } from '@/types/index.ts'

export default defineComponent({
    components: {
        vSongList
    },
    setup() {
        const { proxy } = getCurrentInstance()!
        const [fondList, setFondList] = useState<number[]>([])
        const [isLoadedAll, setIsLoadedAll] = useState(false)
        const [isLoading, setIsLoading] = useState(false)
        const songList = ref<ListProps[]>([])
        
        async function getUserFondList() {
            // 获取用户喜欢列表
            const id = proxy.$route.params.id
            if(!id) return;
            const { ids } = await getUserFondListApi(id)
            setFondList(ids)
        }

        async function loadSong(num: number) {
            setIsLoading(true)
            // 加载歌曲 每次加载 5首歌曲
            let i = 0
            let arr = []
            for(i; i < num; i++) {
                if (fondList.value?.length) {
                    arr.push(getSongInfo(fondList.value[i]))
                } else {
                    setIsLoadedAll(true)
                    return
                }
            }
            if (arr.length) {
                setFondList(fondList.value?.splice(num) || [])
                const result = (await Promise.all(arr)).map(({songs}) => formatSongInfoList(songs[0]))
                songList.value.push(...result)
                setIsLoading(false)
            }
        }

        onMounted(async () => {
            await getUserFondList()
            loadSong(20)
        })
        
        return {
            fondList,
            songList,
            loadSong,
            isLoadedAll,
            isLoading
        }
    }
})
</script>

<style>

</style>