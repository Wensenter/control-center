<template>
  <div class="home-container">
    <div class="home-content">
      <Button @click="getUserData">ajax 测试</Button>
      <Input :rows="30" style="margin-top: 20px" v-model="userInfo" type="textarea" />
    </div>
  </div>
</template>

<script>
import { fetchUserData } from '@/api/request'
import { mapState } from 'vuex'
export default {
    name: 'home',
    data() {
        return {
            userInfo: '',
        }
    },
    computed:{
       ...mapState('routes',[
            'isShowLoading',
        ]),
    },
    methods: {
        getUserData() {
            fetchUserData().then(res => {
                this.userInfo = JSON.stringify(res, null, 4)
            })
        },
    },
}
</script>
<style lang="stylus" scoped>
.home-container 
    padding 10px
    padding-top 5px
.home-content
    padding 10px
    border-radius 5px
    background #fff
</style>