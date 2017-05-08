<template>
    <div id="oldContent">
        <div class="viewport">
            <div class="container">
                <!-- 主体 -->
                <div class="body">
                    <div class="item">
                        <!-- 日期分类 -->
                        <div class="mark" v-if="dates">{{nowdate}}</div>
                        <ul class="posts">
                            <!-- 文章 -->
                            <li v-for="(item,index) in todayData">
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
                dates : '',
                nowDates : 1
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
            this.getFaechData(this.nowDates);
        },
        methods : {
            getFaechData(nowDates){
                var _this = this;
                this.http.get('/today',{
                    params : {
                        date : _this.setData(nowDates)
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
            setData (nowDates) {
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate() -nowDates;
                if(m<9){
                    m = '0'+m;
                }
                if(d <9 && d > 0){
                    d = '0' + d;
                }else if(d == 0){
                    switch(m){
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12:
                            d = 31;
                            break;
                        case 2:
                            d = 28;
                            break;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            d = 30;
                            break;
                    }
                }
                /*console.log('年：'+y+',月：'+m+',日：'+d);
                console.log(y+'-'+m+'-'+d);*/
                return y+'-'+m+'-'+d;
            }
        }
    }
</script>
<style></style>
