<template>
    <div id="postDetail">
        <h2>文章的详情</h2>
    </div>
</template>
<script>
    export default{
        mounted (){
            var id = this.$route.params.postid;
            this.fetchData(id);
        },
        methods :{
            fetchData(id){
                var _this = this;
                this.http('/postcontent',{
                    params :{
                        id : id
                    }
                }).then(function (res) {
                    var strHtml = res.data;
                    strHtml = strHtml.substring(strHtml.indexOf('<div class="container bs-docs-container">',strHtml.indexOf('<script')));
                    console.log(strHtml);
                });
            }
        }
    }
</script>
<style></style>
