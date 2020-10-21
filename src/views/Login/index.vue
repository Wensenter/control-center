<template>
  <div class="login-vue" :style="bg">
      <div class="container">
        <p class="title">系统登录</p>
        <div class="input-c">
          <Input prefix="ios-contact" v-model="account" placeholder="用户名" clearable @on-blur="verifyAccount" />
          <p class="error">{{accountError}}</p>
        </div>
        <div class="input-c">
          <Input type="password"  v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"
          @keyup.enter.native="submit" />
          <p class="error">{{pwdError}}</p>
        </div>
        <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登录</Button>
        <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
      </div>
  </div>
</template>

<script>
import { GetUserInfo } from '@/api/request'
export default {
  name: 'login',
  data() {
    return {
      account: 'admin',
      pwd: 'admin',
      accountError: '',
      pwdError: '',
      isShowLoading: false,
      bg: {},
    }
  },
  created() {
    this.bg.backgroundImage = 'url(' + require('../../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    }
  },
  methods: {
    verifyAccount() {
      if(this.account !== 'admin') {
        this.accountError = '账号为admin'
      } else {
        this.accountError = ''
      }
    },
    verifyPwd() {
      if(this.pwd !== 'admin') {
        this.pwdError = '密码为admin'
      } else {
        this.pwdError = ''
      }
    },
    register() {

    },
    forgetPwd() {

    },
    submit() {
      if(this.account === 'admin' && this.pwd === 'admin') {
        this.isShowLoading = true
        // 登录成功
        GetUserInfo({account:this.account,pwd:this.pwd}).then(res=>{
          let {userImg,userName,token} = res
          localStorage.setItem('userImg', userImg)
          localStorage.setItem('userName', userName)
          // 登录成功 假设这里是后台返回的 token
          localStorage.setItem('token', token)
          this.$router.push({path: this.redirect || '/'})
        })
      } else {
        if(this.account !== 'admin') {
          this.accountError = '账号为admin'
        }
        if(this.pwd !== 'admin') {
          this.pwdError = '密码为admin'
        }
      }
    }
  }
}

</script>
<style lang="stylus">
.login-vue
  height 100%
  display flex
  justify-content center
  align-items center
  color #fff
  .container
    background rgba(255,255,255,.5)
    width 300px
    text-align center
    border-radius 10px
    padding 30px
  .ivu-input
    background-color transparent
    color #fff
    outline #fff
    border-color #fff
  .title
    font-size 16px
    margin-bottom 20px
  .input-c
    margin auto
    width 200px
  .error
    color red
    text-align left
    margin 5px auto
    font-size 12px
    padding-left 30px
    height 20px
  .submit
    width 200px
  .account
    margin-top 30px
    span
      cursor pointer
  .ivu-icon
    color #eee
  .ivu-icon-ios-close-circle
    color #777
</style>