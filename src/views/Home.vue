<template>
    <div id="home">
      <div class="viewport">
        <div class="container">
          <!-- 主体 -->
          <div class="body">
            <div class="item">
              <!-- 日期分类 -->
              <div class="mark" v-if="dates">{{nowdate}}</div>
              <ul class="posts large">
                <!-- 文章 -->
                  <!--文章类型有三种，
                    display_style ：10001 纯文字，
                    display_style ：10002 图文混合，
                    display_style ：10003 纯图片，
                  -->
                <li v-for="(item,index) in todayData">
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
        data (){
            return {
                todayData : [],
                dates : ''
            }
        },
        computed : {
            nowdate (){
                var m=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec");
                var str = this.dates;
                var d = str.substring(8);
                var d1 = d.substring(0,1);

                if(d1 == '0'){
                    var d2 = d.substring(1);
                }else{
                    var d2 = d;
                }

                //2017-04-06
                str = str.substring(5,7);
                var a = str.substring(0,1);
                if(a == '0'){
                    var b = parseInt(str.substring(1));
                }else{
                    var b = parseInt(str);
                }

                return d2+''+m[b-1];
            }
        },
        mounted (){
            //console.log(123);
            this.getFaechData();
        },
        methods : {
            getFaechData(){
                var _this = this;
                this.http.get('/today',{
                    params : {
                        date : _this.setData()
                    }
                }).then(function (res) {
                    //console.log(JSON.stringify(res.data.posts));
                    _this.todayData = res.data.posts;
                    _this.dates = res.data.date;
                   // console.log(res.data);
                },function(err){
                    //console.log(err);
                });
            },
            setData () {
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth()+1;
                var d = date.getDate();
                if(m<9){
                    m = '0'+m;
                }
                if(d <9){
                    d = '0' + d;
                }
                /*console.log('年：'+y+',月：'+m+',日：'+d);
                console.log(y+'-'+m+'-'+d);*/
                return y+'-'+m+'-'+d;
            }
        }
    }
</script>
<style lang="less">
    @import "../assets/css/main.css";
</style>
