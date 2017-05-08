<template>
    <div id="author">
        <div class="viewport">
            <div class="container">
                <!-- 主体 -->
                <div class="body">
                    <dl class="author">
                        <dt>本周推荐</dt>
                        <dd v-for="(item,index) in authors">
                            <router-link :to="'/authorhome/'+item.id">
                                <div class="avatar">
                                    <img :src="item.avatar" alt="">
                                </div>
                                <div class="info">
                                    <h5>{{item.name}}</h5>
                                    <p>{{item.editor_notes}}</p>
                                </div>
                            </router-link>
                        </dd>
                        <dt>热门作者</dt>
                        <dd v-for="(item,index) in allAuthors">
                            <router-link :to="'/authorhome/'+item.id">
                                <div class="avatar">
                                    <img :src="item.avatar" alt="">
                                </div>
                                <div class="info">
                                    <h5>{{item.name}}</h5>
                                    <p>{{item.editor_notes}}</p>
                                </div>
                            </router-link>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                count : 20,
                type : '',
                authors : [],
                allAuthors : []
            }
        },
        mounted (){
           this.setHotWriter('rec',20);
           this.setHotWriter('all',20);
        },
        methods : {
            setHotWriter(type,count){

                var _this = this;
                this.http('/author',{
                    params :{
                        count : count,
                        type : type
                    }
                }).then(function(res){
                    //console.log(res);
                    if(type == 'rec'){
                        _this.authors = res.data.authors;
                    }else{
                        _this.allAuthors = res.data.authors;
                    }
                },function (err) {
                    // body...
                });
            }
        }
    }
</script>
<style></style>
