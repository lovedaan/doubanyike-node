<template>
    <div id="category">
        <div class="viewport">
            <div class="container">
                <!-- 主体 -->
                <div class="body">
                    <ul class="category">
                        <li v-for="(item,index) in columnsArr">
                            <router-link :to="'/articlelist/'+item.id">
                                <img :src="item.icon" alt="">
                                <h5>{{item.name}}</h5>
                                <p>{{item.description}}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                columnsArr : []
            }
        },
        mounted(){
            this.fetchData();
        },
        methods : {
            fetchData (){
                var _this = this;
                this.http.get('/columns').then(function (res) {
                    //console.log(res);
                    _this.columnsArr = res.data.columns;
                },function (err) {

                });
            }
        }
    }
</script>
<style></style>
