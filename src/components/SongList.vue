<template>
    <mu-list textline="two-line">
      <mu-sub-header v-if="title">{{title}}</mu-sub-header>
      <mu-divider />
      <mu-list-item
        v-for="(song, index) in list"
        :key="song.id"
        ripple
        avatar
        button
        @click="listClick(song)"
      >
        <mu-list-item-action>
            <mu-avatar>
                <img :src="song.cover">
            </mu-avatar>
        </mu-list-item-action>
        <!-- 信息 -->
        <mu-list-item-content>
          <mu-list-item-title>{{song.name}}</mu-list-item-title>
          <mu-list-item-sub-title>
             {{song.artist}}
          </mu-list-item-sub-title>
        </mu-list-item-content>
        <!-- 更多 -->
        <mu-list-item-action>
            <slot name="right" :row="song" :$index="index" />
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { ListProps } from '@/types/index.ts'

export default defineComponent({
    props: {
        title: {
            type: String,
            defalut: ''
        },
        list: {
            type: Array as unknown as PropType<ListProps>,
            defalut: () => []
        }
    },
    setup(_, ctx) { // prop, ctx
        function listClick(val: any) {
            ctx.emit('optSong', val)
        }
        return {
            listClick
        }
    }
})
</script>

<style>

</style>