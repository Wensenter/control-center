<template>
    <div class="app-wrapper">
        <div class="left">
            <sider />
        </div>
        <div class="right">
            <b-header />
            <b-content/>        
        </div>
    </div>
</template>

<script>
import sider from './components/sider'
import bHeader from './components/bHeader'
import bContent from './components/bContent'
export default {
    components:{
        bHeader,
        bContent,
        sider
    },
    data(){
        return {

        }
    }
}

</script>
<style lang="stylus">
.app-wrapper
    position relative
    width 100%
    height 100%
.left
    position fixed
    width 200px
    height 100%
    z-index 1001
    overflow hidden
    background #0077FF
.right
    min-height 100%
    background #fff
    position relative
    margin-left 200px
</style>