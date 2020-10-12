<template>
    <div class="app-wrapper">
        <aside :class="asideClassName">
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
                            <Submenu :class="isShowAsideTitle? '' : 'shrink'" v-if="subItem.children" :name="index + '-' + i">
                                <template slot="title">
                                    <Icon :size="subItem.size" :type="subItem.type"/>
                                    <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                                </template>
                                <template v-for="(threeItem, k) in subItem.children">
                                    <a href="https://www.baidu.com" target="_blank" :key="index + i + k" v-if="threeItem.isExternal">
                                        <MenuItem :class="isShowAsideTitle? '' : 'shrink'" class="menu-level-3"
                                        :name="'external-link-' + index + i + k">
                                            <template v-if="!threeItem.hidden">
                                                <a :href="threeItem.url" target="_blank" class="external">
                                                    <Icon :size="threeItem.size" :type="threeItem.type"/>
                                                    <span v-show="isShowAsideTitle">{{threeItem.text}}</span>
                                                </a>
                                            </template>
                                        </MenuItem>
                                    </a>
                                    <MenuItem v-else :class="isShowAsideTitle? '' : 'shrink'" class="menu-level-3"
                                    :name="threeItem.name" :key="index + i + k">
                                        <template v-if="!threeItem.hidden">
                                            <Icon :size="threeItem.size" :type="threeItem.type"/>
                                            <span v-show="isShowAsideTitle">{{threeItem.text}}</span>
                                        </template>
                                    </MenuItem>
                                </template>
                            </Submenu>
                            <template v-else-if="!subItem.hidden">
                                <a :href="subItem.url" v-if="subItem.isExternal" target="_blank" class="external">
                                    <MenuItem :class="isShowAsideTitle? '' : 'shrink'"
                                    :name="'external-link-' + index + '-' + i">
                                        <Icon :size="subItem.size" :type="subItem.type"/>
                                        <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                                    </MenuItem>
                                </a>
                                <MenuItem v-else :class="isShowAsideTitle? '' : 'shrink'" :name="subItem.name">
                                    <Icon :size="subItem.size" :type="subItem.type"/>
                                    <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                                </MenuItem>
                            </template>
                        </div>
                    </Submenu>
                    <template v-else-if="!item.hidden">
                        <a :href="item.url" v-if="item.isExternal" target="_blank" class="external">
                            <MenuItem :class="isShowAsideTitle? '' : 'shrink'" :name="'external-link-' + index">
                                <Icon :size="item.size" :type="item.type" />
                                <span v-show="isShowAsideTitle">{{item.text}}</span>
                            </MenuItem>
                        </a>
                        <MenuItem v-else :class="isShowAsideTitle? '' : 'shrink'" :name="item.name">
                            <Icon :size="item.size" :type="item.type" />
                            <span v-show="isShowAsideTitle">{{item.text}}</span>
                        </MenuItem>
                    </template>
                </div>
            </Menu>
        </aside>
        <section class="right">
            <!-- 头部 -->
            <div class="top-c">
                <header>
                    <div class="h-left">
                        <div class="pointer" @click="isShrinkAside" title="收缩/展开">
                            <Icon type="ios-apps" />
                        </div>
                        <!-- 面包屑功能 -->
                        <p class="crumbs">{{crumbs}}</p>
                    </div>
                    <div class="h-right">
                        <!-- 消息 -->
                        <div class="notice-c" @click="info" title="查看新消息">
                            <div :class="{newMsg: hasNewMsg}"></div>
                            <Icon type="ios-notifications-outline" />
                        </div>
                        <!-- 用户头像 -->
                        <div class="user-img-c">
                            <img :src="userImg">
                        </div>
                        <!-- 下拉菜单 -->
                        <Dropdown trigger="click" @on-click="userOperate" @on-visible-change="showArrow">
                            <div class="pointer">
                                <span>{{userName}}</span>
                                <Icon v-show="arrowDown" type="md-arrow-dropdown"/>
                                <Icon v-show="arrowUp" type="md-arrow-dropup"/>
                            </div>
                            <DropdownMenu slot="list">
                                <!-- name标识符 -->
                                <DropdownItem name="1">修改密码</DropdownItem>
                                <DropdownItem name="2">基本资料</DropdownItem>
                                <DropdownItem divided  name="3">退出登陆</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </header>

                <!-- 标签栏 -->
                <div class="div-tags">
                    <ul class="ul-c">
                        <li v-for="(item, index) in tagsArry" :key="index" :class="{active: isActive(item.name)}" @click="activeTag(index)">
                            <a class="li-a">
                                {{item.text}}
                            </a>
                            <Icon size="16" @click="closeTag(index)" type="md-close" />
                        </li>
                    </ul>
                    <!-- 标签栏相关功能 -->
                    <div class="div-icons">
                        <div class="refresh-c" @click="reloadPage" title="刷新当前标签页">
                            <Icon type="md-refresh" />
                        </div>
                        <div class="tag-options" title="关闭标签">
                            <Dropdown trigger="click" @on-click="closeTags">
                                <Icon type="ios-options" />
                                <DropdownMenu slot="list">
                                    <DropdownItem name="1">关闭其他标签</DropdownItem>
                                    <DropdownItem name="2">关闭所有标签</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 页面主体 -->
            <div class="main-content">
                <div class="view-c">
                    <keep-alive :include="keepAliveData">
                        <!-- 子页面 -->
                        <router-view v-if="isShowRouter"/>
                    </keep-alive>
                </div>
            </div>     
        </section>
    </div>
</template>

<script>

export default {
    name:'layout',
    data(){
        return {
            logo: require('../../assets/logo.png'), //logo路径
            paths: {},// 用于储存页面路径
            isShowAsideTitle:true,// 是否展示侧边栏内容
            currentPage:'',//当前显示页面
            openMenus:[],// 要打开的菜单名字 name属性
            isShowRouter: true,
            asideClassName: 'aside-big', // 控制侧边栏宽度变化
            msgNum: '10', // 新消息条数
            // 标签栏         标签标题     路由名称
            // 数据格式 {text: '首页', name: 'home'}
            // 用于缓存打开的路由 在标签栏上展示
            tagsArry: [],
             arrowUp: false, // 用户详情向上箭头
            arrowDown: true, // 用户详情向下箭头
            main: null, // 页面主要内容区域
            asideClassName: 'aside-big', // 控制侧边栏宽度变化
            asideArrowIcons: [], // 缓存侧边栏箭头图标 收缩时用
            // 面包屑
            crumbs: '主页',
            userName: '',
            userImg: '',
            // 主页路由名称
            home: 'home',
        }
    },
    mounted() {
         // 第一个标签
        const name = this.$route.name
        this.currentPage = name
    },
    computed:{
        //菜单栏
        menuItems() {
            return this.$store.state.routes.menuItems
        },

        // 由于iView的导航菜单比较坑 只能设定一个name参数
        // 所以需要在这定义组件名称和标签栏标题的映射表 有多少个页面就有多少个映射条数
        nameToTitle() {
            const obj = {}
            this.menuItems.forEach(e => {
                this.processNameToTitle(obj, e)
            })

            return obj
        },
    },
    methods:{
        gotoPage(){},
        menuChange(){},
        processNameToTitle(obj, data, text) {
            if (data.name) {
                obj[data.name] = data.text
                this.paths[data.name] = text ? `${text} / ${data.text}` : data.text
            }
            if (data.children) {
                data.children.forEach(e => {
                    this.processNameToTitle(obj, e, text ? `${text} / ${data.text}` : data.text)
                })
            }
        },
    }
}

</script>
<style lang="stylus">
.app-wrapper
    position relative
    width 100%
    height 100%
// 侧边栏
aside
    position fixed
    height 100%
    width 90px
    z-index 1001
    overflow auto
    transition width .3s
    background #20222A
    padding 0
.aside-big
    width 220px
.logo-c
    display: flex;
    align-items: center;
    color: rgba(255,255,255,.8);
    font-size: 16px;
    margin: 20px 0;
    justify-content: center;
    .logo
        width: 40px;
        margin-right: 10px;
// 主体页面
.right
    min-height 100%
    background #fff
    position relative
    margin-left 220px
    transition margin-left .3s
    background: #f3f7fd;
// 主体页面头部
header 
    height 50px
    border-bottom none
    background #fff
    display flex
    align-items center
    justify-content space-between
    padding-right 40px
    padding-left 10px
    font-size 14px
    .ivu-icon
        font-size 24px
.refresh-c
    margin 0 30px
    cursor pointer
.h-left
    display flex
    align-items center
.h-right
    display flex
    align-items center
.user-img-c 
    width 34px
    height 34px
    background #ddd
    border-radius 50%
    margin 0 40px
    overflow hidden
    img
        width 100%
.notice-c
    cursor pointer
    position relative
.newMsg
    position absolute
    width 8px
    height 8px
    border-radius 50%
    background-color #FF5722
    right 0
    top 0
.tag-options
    cursor pointer
    position relative
.div-tags
    display flex
    align-items center
    justify-content space-between
    margin 4px 0
.div-icons
    display flex
    justify-content flex-start
    align-items center
    background #fff
    height 34px
    width 160px
    font-size 18px
// 标签栏
.ul-c
    height 34px
    background #fff
    display flex
    justify-content flex-start
    align-items center
    padding 0 10px
    overflow hidden
    width calc(100% - 160px)
    li
        border-radius: 3px
        cursor pointer
        font-size 12px
        height 24px
        padding 0 10px
        display flex
        align-items center
        justify-content center
        margin 3px 5px 2px 3px
        border 1px solid #e6e6e6
    .ivu-icon
        margin-left 6px
a
    color #666
    transition none
.li-a
    max-width 80px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
.active
    background #409eff
    border 1px solid #409eff
    a
        color #fff
    .ivu-icon
        color #fff
// 主要内容区域
.main-content
    height calc(100% - 88px)
    overflow auto
.view-c
    position relative
    height 100%
    overflow hidden
.pointer
    cursor pointer
.crumbs
    margin-left 10px
    color #97a8be
    cursor default
.menu-level-3 .ivu-icon 
    font-size 18px
.shrink
    text-align center
.external
    color rgba(255,255,255,.7)
    > i 
        margin-right 6px
</style>