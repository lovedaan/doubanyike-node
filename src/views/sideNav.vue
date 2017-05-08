<template>
    <div id="sideNav">
        <div class="navs">
            <dl>
                <dt class="login">
                <div class="avatar">
                    <img src="../assets/images/avatar.png" alt="">
                </div>
                <span>登录</span>
                </dt>
                <dd v-for="(item,index) in navs">
                    <router-link :to="item.link" :class="item.icon">
                        <span>{{item.text}}</span>
                    </router-link>
                </dd>
            </dl>
            <div class="extra">
                <a href="javascript:;" class="icon-image">夜晚</a>
                <a href="javascript:;" class="icon-download">离线</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                navs : [
                    {
                        link:'/home',
                        text : '今日一刻',
                        icon : 'icon-home'
                    },
                    {
                        link:'/older',
                        text : '往期内容',
                        icon : 'icon-file-empty'
                    },
                    {
                        link:'/author',
                        text : '热门作者',
                        icon : 'icon-pencil'
                    },
                    {
                        link:'/category',
                        text : '栏目浏览',
                        icon : 'icon-menu'
                    },
                    {
                        link:'/favourite',
                        text : '我的喜欢',
                        icon : 'icon-heart'
                    },
                    {
                        link:'/settings',
                        text : '设置',
                        icon : 'icon-cog'
                    }
                ]
            }
        }
    }
</script>
