<template>
    <div id="hearer">
        <div class="header">
            <a href="javascript:;" v-if="isShowMenu" class="menu icon-menu" @click="clickToggle($event)"></a>
            <a href="javascript:;" v-if="!isShowMenu" class="back_btn" @click.stop="back($event)"></a>
            <h2>{{headertitle}}</h2>
            <a href="javascript:;" v-if="isShowMenu" class="search icon-search"></a>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                nowEv : '',
                headertitle : '今日一刻',
                isShowMenu : true
            }
        },
        mounted (){
            //console.log(123);
        },
        props :{

        },
        methods : {
            clickToggle (ev){
                //console.log(ev);
                /* return;*/
                if(!this.nowEv){
                    this.nowEv = ev;
                    var el = ev.target;
                }else{
                    //console.log(this.nowEv);
                    var el = this.nowEv.target;
                }

                //console.log(el);
                var header = document.querySelector('.header');
                var body = document.querySelector('.body');
                var navs = document.querySelector('.navs');
                var dd = navs.querySelectorAll('dd');

                header.classList.toggle('collapse');
                navs.classList.toggle('collapse');

                if(!el.classList.contains('collapsed')) {
                    for(var i=0; i<dd.length; i++) {
                        dd[i].style.transitionDuration = (i + 1) * 0.15 + 's';
                        dd[i].style.transitionProperty = 'all';
                        dd[i].style.transitionDelay = '0.2s';
                        dd[i].style.transitionTimingFunction = 'ease-out';
                        dd[i].style.transform = 'translate(0)';
                    }
                } else {
                    //alert(123);
                    for(var i=dd.length - 1; i>=0; i--) {
                        dd[i].style.transitionDuration = (dd.length - i + 1) * 0.05 + 's';
                        dd[i].style.transitionProperty = 'all';
                        dd[i].style.transitionDelay = '';
                        dd[i].style.transitionTimingFunction = 'ease-out';
                        dd[i].style.transform = 'translate(-100%)';
                    }
                }

                el.classList.toggle('collapsed');
            },
            back(ev){
                ev.stopPropagation();
                window.history.go(-1);
            }
        },
        watch : {
            $route (to,from){
                var path = to.path;
                var id = to.params.articleid || to.params.authorid || to.params.postid;
                if(id){
                    this.isShowMenu = false;
                }else{
                    this.isShowMenu = true;
                }
                if(to.params.postid){
                    this.headertitle = '文章内容';
                }
                if(to.params.articleid){
                    this.headertitle = '文章列表';
                }
                if(to.params.authorid){
                    this.headertitle = '个人主页';
                }
                //console.log(from.path);
                var fromPath = from.path;
                var isAuthorhome = fromPath.indexOf('/authorhome/');
                var isArticlelist = fromPath.indexOf('/articlelist/');
                var isPostdetail = fromPath.indexOf('/postdetail/');
                switch(path){
                    case '/home':
                        this.headertitle = '今日一刻';
                        if(isPostdetail == -1){
                            this.clickToggle(this.nowEv);
                        }
                        break;
                    case '/older':
                        this.headertitle = '往期内容';
                        if(isPostdetail == -1){
                            this.clickToggle(this.nowEv);
                        }
                        break;
                    case '/author':
                        this.headertitle = '热门作者';
                        if(isAuthorhome == -1){
                            this.clickToggle(this.nowEv);
                        }
                        break;
                    case '/category':
                        this.headertitle = '栏目浏览';
                        if(isArticlelist == -1){
                            this.clickToggle(this.nowEv);
                        }
                        break;
                    case '/favourite':
                        this.headertitle = '我的喜欢';
                        this.clickToggle(this.nowEv);
                        break;
                    case '/settings':
                        this.headertitle = '设置';
                        this.clickToggle(this.nowEv);
                        break;
                }

            }
        }
    }
</script>
<style scoped>
    .back_btn{
        position: absolute;
        left: 0;
        top: 0;
        background: url(../assets/images/arrow_back.png) no-repeat center center;
        width:2.75rem;
        height:2.75rem;
        background-size: 0.85rem 1.3rem;
    }
</style>
