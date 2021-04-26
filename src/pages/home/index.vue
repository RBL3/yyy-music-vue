<template>
  <div>
    <div class="header">
        <svg-icon iconClass="menu" color="#fff" @click="setShowUserInfo(true)" />
        <input v-model="keywords" />
        <mu-bottom-sheet :open.sync="isShowUserInfo" @close="setShowUserInfo(false)">
          <user-info />
        </mu-bottom-sheet>
    </div>
    <v-song-list v-if="songList" title="搜索结果" :list="formatList(songList.songs)" @optSong="handlePlaySong">
        <template slot="right" slot-scope="{row}">
            <mu-button icon @click.stop="handleMore(row)">
              <svg-icon iconClass="more" size="md" color="#AEAEAE" />
            </mu-button>
        </template>
    </v-song-list>
    <a-player
      style="width: 100%; height: 66px" ref="audioRef"
      fixed
      :audio="audio"
      :lrc-type="1"
      @listSwitch="listSwitch"
    />
    <!-- dialog -->
    <mu-bottom-sheet
      :open.sync="isOpenDialog"
      @close="setIsOpenDialog(false)"
    >
      <mu-list class="list">
        <mu-list-item dense ripple button @click="handleAddSong">
            <mu-list-item-content>
                <mu-list-item-title>
                    <svg-icon iconClass="play" size="md" color="#AEAEAE" />
                    下一首播放
                </mu-list-item-title>
            </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <!-- songList dialog -->
    <mu-bottom-sheet
      :open.sync="isShowSongList"
      @close="setIsShowSongList(false)"
    >
      <v-song-list title="歌单" :list="audio || []" @optSong="switchMusic">
        <div class="btn-wrap" slot="right" slot-scope="{row, $index}">
          <!-- 播放中标识 -->
          <svg-icon v-if="currentMusicMark === (row.name + row.artist)" iconClass="listen" size="md" color="red" style="margin-right: 10px" />
          <!-- delect -->
          <mu-button icon @click.stop="delectSong((row.name + row.artist), $index)">
              <svg-icon iconClass="remove" size="md" color="#AEAEAE" />
          </mu-button>
        </div>
      </v-song-list>
    </mu-bottom-sheet>
  </div>
</template>

<script lang="ts">
import vSongList from '@/components/SongList.vue';
import userInfo from './userInfo.vue';
import { APlayer } from '@moefe/vue-aplayer'
import {
    defineComponent, ref, computed, nextTick, onMounted
} from '@vue/composition-api';
import useQuery from '@/utils/useQuery';
import {
    getSearchRec, getExactSong, SearchRec, getSongLrc,
} from '@/api/search';
import { useState, formatList } from '@/utils';
import { ListProps } from '@/types/index.ts'

const defaultAudioInfo = {
    name: '',
    artist: '',
    url: '',
    cover: '',
    lrc: ''
}

type AudioInfo = typeof defaultAudioInfo

export default defineComponent({
    components: {
      vSongList,
      userInfo
    },
    setup() {
      // const { proxy } = getCurrentInstance()!;
      // console.log('proxy', proxy.$store.getters);
      const audioRef = ref<APlayer | null>(null)
      const keywords = ref('');
      const [currentSong, setCurrentSong] = useState<ListProps>()
      const audio= ref<AudioInfo[]>([defaultAudioInfo]);
      const [isOpenDialog, setIsOpenDialog] = useState(false)
      const [isShowSongList, setIsShowSongList] = useState(false)
      const [isShowUserInfo, setShowUserInfo] = useState(false)
      const [currentMusicMark, setCurrentMusicMark] = useState<string>()
      // computed
      const isEnabled = computed(() => !!keywords.value);
      // query
      const { data: songList } = useQuery<SearchRec>(keywords, () => getSearchRec(keywords.value), {
          enabled: isEnabled,
      });

      onMounted(() => {
        nextTick(() => {
          document.querySelector('.aplayer-icon-menu')?.addEventListener('click', () => setIsShowSongList(true))
        })
      })
      function listSwitch() {
        const { name, artist } = (audioRef.value?.currentMusic) as AudioInfo & { id: number }
        setCurrentMusicMark(name + artist)
      }
      // 播放
      async function handlePlaySong(item: ListProps) {
          const { name, cover, id, artist } = item;
          const song = await getExactSong(id);
          const songLrc = await getSongLrc(id);
          if(audio.value.length === 1 && Object.values(audio.value[0]).every(i => !i)) {
            audio.value = []
          }
          // 重复点击同一歌曲 不添加
          if (song[0] && audio.value.some(({ url }) => song[0].url === url)) {
            audioRef.value?.switch(name)
            return
          }
          audio.value.push({
              name,
              artist: artist,
              url: song[0]?.url || '',
              cover,
              lrc: songLrc.lyric || '',
          })
          await nextTick()
          audio.value.length === 1 ? audioRef.value?.play() : audioRef.value?.switch(name)
      }
      // 点击更多
      function handleMore(item: ListProps) {
          setCurrentSong(item)
          setIsOpenDialog(true)
      }
      // 下一首播放
      async function handleAddSong () {
        if (audio.value.length && currentSong.value) {
          const { id } = currentSong.value
          const song = await getExactSong(id);
          const songLrc = await getSongLrc(id);
          audio.value.push({
            ...currentSong.value,
            url: song[0] ? song[0].url : '',
            lrc: songLrc.lyric || '',
          })
        }
        setIsOpenDialog(false)
      }
      function switchMusic(item: ListProps) {
        const { name } = item;
        audioRef.value?.switch(name)
      }
      // 删除播放歌单中的歌曲
      function delectSong(tag: string, idx: number) {
        if (tag === currentMusicMark.value) {
          const nextIdx = (audio.value.length - 1) === idx ? idx - 1 : idx + 1
          let readySongName = audio.value[nextIdx]?.name
          // console.log('nextIdx', nextIdx);
          readySongName ? audioRef.value?.switch(readySongName) : audioRef.value?.pause()
        }
        // console.log(audio.value.map(item => item.name));
        audio.value.splice(idx, 1)
        // console.log(idx);
      }
      return {
          audioRef,
          keywords,
          songList,
          audio,
          handlePlaySong,
          formatList,
          isOpenDialog,
          setIsOpenDialog,
          handleMore,
          handleAddSong,
          isShowSongList,
          setIsShowSongList,
          listSwitch,
          currentMusicMark,
          switchMusic,
          isShowUserInfo,
          setShowUserInfo,
          delectSong,
      };
    },
});
</script>

<style lang="less" scoped>
.header {
    position: sticky;
    top: 0px;
    height: 40px;
    background-color: rgb(196, 0, 0);
    display: flex;
    align-items: center;
    z-index: 100;
    input {
      border: none;
      border-radius: 15px;
      width: 70%;
      height: 60%;
      outline: none;
      padding: 0 8px;
    }
    /deep/ .yy-icon-menu {
      margin: 0 20px;
    }
}
.mu_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn-wrap {
  display: flex;
  align-items: center;
}
</style>
