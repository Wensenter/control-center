<template>
  <div class="b-header">
      <Icon type="md-menu" size="18" class="collapse-menu"/>
      <div class="user">
          <Icon type="md-person" size="18" />
          <span>用户名</span>
      </div>
  </div>
</template>

<script>
import {GetTest} from '@/api/request.js'
export default {
    name:'Bheader',
    data(){
        return {

        }
    },
    mounted(){
        GetTest().then(res=>{

        })
    }
}

</script>
<style lang="stylus">
.b-header
    display flex
    justify-content space-between
    align-items center
    padding 8px 10px
    border-bottom 1px solid #E3E8EE
.collapse-menu
    cursor pointer
</style>