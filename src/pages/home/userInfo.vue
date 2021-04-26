<template>
    <mu-row justify-content="center">
      <mu-col span="12" class="center">
        <mu-avatar :size="100">
          <img :src="userPhoto || defaultPhoto">
        </mu-avatar>
      </mu-col>
      <mu-col span="12"  class="center">
        <mu-chip v-if="!isLogin" class="demo-chip" @click="setIsShowDialog(true)">
          未登录
        </mu-chip>
        <mu-chip v-else class="demo-chip" color="green">
          {{userName}}
        </mu-chip>
      </mu-col>
      <mu-col span="12"  class="center">
        <mu-list class="list">
          <mu-list-item dense ripple button @click="linkToFind">
              <mu-list-item-content>
                  <mu-list-item-title>
                      <svg-icon iconClass="like" size="md" color="red" />
                      我喜欢的音乐
                  </mu-list-item-title>
              </mu-list-item-content>
          </mu-list-item>
           <mu-list-item dense ripple button>
              <mu-list-item-content>
                  <mu-list-item-title>
                      <svg-icon iconClass="like" size="md" color="#AEAEAE" />
                      我的歌单
                  </mu-list-item-title>
              </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-col>
      <mu-dialog title="登录" width="360" :open.sync="isShowDialog" @close="setIsShowDialog(false)">
        <v-form @close="setIsShowDialog(false)" />
      </mu-dialog>
    </mu-row>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from '@vue/composition-api'
import { useGetters } from 'vuex-composition-helpers'
import { GettersKey } from '@/store/getters'
import { useState } from '@/utils'
import vForm from './form.vue'

export default defineComponent({
    components: {
      vForm
    },
    setup() {
      const defaultPhoto = 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
      const [isShowDialog, setIsShowDialog] = useState(false)
      const { proxy }  = getCurrentInstance()!
      const { userId, userName, isLogin, userPhoto } = useGetters(['userPhoto', 'userName', 'isLogin', 'userId'] as GettersKey[])
      function linkToFind() {
        if (!isLogin.value) {
          proxy.$toast.warning('请先登录')
          return
        }
        proxy.$router.push(`/fond/${userId.value}`)
      }
      
      return {
        defaultPhoto,
        isShowDialog,
        setIsShowDialog,
        linkToFind,
        userId,
        userName,
        isLogin,
        userPhoto
      }
    }
})
</script>

<style lang="less" scoped>
/deep/ .mu-avatar {
  margin: 20px 0;
}
/deep/ .center {
  display: flex;
  justify-content: center;
}
</style>