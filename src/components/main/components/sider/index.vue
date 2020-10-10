<template>
  <div>
    <div class="logo-c">
        <img :src="logo" alt="logo" class="logo">
        <span v-show="isShowAsideTitle">后台管理系统</span>
    </div>
    <!-- 菜单栏 -->
    <Menu ref="siderMenu" theme="dark" width="100%" @on-select="gotoPage"
    accordion :open-names="openMenus" :active-name="currentPage" @on-open-change="menuChange">
      <!-- 动态菜单 -->
      <div v-for="(item, index) in menuItems" :key="index">
          <Submenu v-if="item.children" :name="index">
            <template slot="title">
              <Icon :size="item.size" :type="item.type"/>
              <span v-show="isShowAsideTitle">{{item.text}}</span>
            </template>
            <div v-for="(subItem, i) in item.children" :key="index + i">
                <Submenu v-if="subItem.children" :name="index + '-' + i">
                    <template slot="title">
                        <Icon :size="subItem.size" :type="subItem.type"/>
                        <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                    </template>
                    <MenuItem class="menu-level-3" v-for="(threeItem, k) in subItem.children" :name="threeItem.name" :key="index + i + k">
                        <Icon :size="threeItem.size" :type="threeItem.type"/>
                        <span v-show="isShowAsideTitle">{{threeItem.text}}</span>
                    </MenuItem>
                </Submenu>
                <MenuItem v-else v-show="isShowAsideTitle" :name="subItem.name">
                    <Icon :size="subItem.size" :type="subItem.type"/>
                    <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                </MenuItem>
            </div>
        </Submenu>
        <MenuItem v-else :name="item.name">
            <Icon :size="item.size" :type="item.type" />
            <span v-show="isShowAsideTitle">{{item.text}}</span>
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>

<script>
import {GetMenu} from '@/api/request'
export default {
  name:'siderMenu',
  data(){
    return {
      openMenus:[],
      currentPage:'',
      menuItems:[],
      isShowAsideTitle:true,
      logo:require('../../../../assets/logo.png')
    }
  },
  methods:{
    gotoPage(){

    },
    menuChange(){

    }
  },
  created(){
    GetMenu().then(res=>{
      this.menuItems = res
    })
  },
  mounted(){
    console.log(this.$route.name)
  }
}

</script>
<style lang="stylus" scoped>
.logo-c
  height 212px
  display flex
  flex-direction column
  justify-content center
  align-items center
  .logo
    width 100px
  span
    font-size 20px
    color #fff
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover
  background #2d8cf0
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover
  background #0077FF
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu)
  color #fff
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title
  color #333
  background #0077FF
.ivu-menu-dark
  background #0077FF
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened
  background #006EEC
</style>