<template>
    <div id="articleList">
        <div class="viewport">
            <div class="container">
                <!-- 主体 -->
                <div class="body">
                    <div class="posts-title">
                        <img :src="articleObj.icon" alt="">
                        <h5>{{articleObj.name}}</h5>
                        <p>{{articleObj.description}}</p>
                    </div>
                    <div class="item">
                        <ul class="posts">
                            <!-- 文章 -->
                            <li v-for="(item,index) in articleList">
                                <router-link :to="'/postdetail/'+item.id">
                                    <span href="javascript:;" class="tag">{{item.column.name || '去远方' }}</span>
                                    <div class="cont">
                                        <h3>{{item.title}}</h3>
                                        <div class="brief">
                                            <!--只 10001 10002 显示-->
                                            <p :class="{only:item.display_style == 10001}" v-if="item.display_style != 10003">{{item.abstract}}</p>
                                            <!--只 10002 显示-->
                                            <div class="thumb" v-if="item.display_style == 10002">
                                                <img :src="item.thumbs[0].small.url" alt="">
                                            </div>
                                            <!--只 10003 显示-->
                                            <div class="gallery" v-if="item.display_style == 10003">
                                                <img :src="item.thumbs[0].small.url" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                articleObj :{},
                articleList :[]
            }
        },
        mounted(){
            //console.log(this.$route.params.articleid);
            var id = this.$route.params.articleid;
            this.fetchData(id);
        },
        methods :{
            fetchData(id){
                var _this = this;
                this.http('/columns',{
                    params:{
                        articleid : id
                    }
                }).then(function (res) {
                    // console.log(res);
                    _this.articleObj = res.data.column;
                    _this.articleList = res.data.posts;
                },function (err) {
                    console.log(err);
                });
            }
        }
    }
</script>
<style></style>
