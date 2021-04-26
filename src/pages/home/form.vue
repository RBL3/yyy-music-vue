<template>
  <mu-container>
    <mu-form ref="form" :model="loginForm" class="mu-demo-form">
        <mu-form-item label="手机号" prop="phone" :rules="phoneRules">
            <mu-text-field v-model="loginForm.phone" prop="phone"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="loginForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
        <mu-button color="primary" @click="onSubmit">提交</mu-button>
        <mu-button>重置</mu-button>
        </mu-form-item>
    </mu-form>
  </mu-container> 
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from '@vue/composition-api'

const mobileReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

export default defineComponent({
    setup(_, ctx) {
        const { proxy } = getCurrentInstance()!
        const phoneRules = [
            { validate: (val: string) => !!val, message: '必须填写手机号'},
            { validate: (val: string) => mobileReg.test(val), message: '请输入正确格式手机号'}
        ]
        const passwordRules = [
            { validate: (val: string) => !!val, message: '必须填写密码'},
        ]
        const loginForm = reactive({
            phone: '1449822833',
            password: 'wtnl'
        })

        function onSubmit() {
            proxy.$store.dispatch('users/onLogin', loginForm)
            ctx.emit('close')
        }
        return {
            phoneRules,
            passwordRules,
            loginForm,
            onSubmit
        }
    }
})
</script>
