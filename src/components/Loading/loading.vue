<template>
    <div id="loading">
        <div class="spinner"></div>
    </div>
</template>
<script></script>
<style scoped>
    #loading{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 99;
        background: rgba(0,0,0,.8);
    }
    .spinner {
        width: 60px;
        height: 60px;
        background-color: #fff;
        position: absolute;
        left: 45%;
        top: 45%;
        /*-webkit-transform: translate(-70%,-50%);
        transform:translate(-70%,-50%);*/
        -webkit-animation: rotateplane 1.2s infinite ease-in-out;
        animation: rotateplane 1.2s infinite ease-in-out;
    }

    @-webkit-keyframes rotateplane {
        0% { -webkit-transform: perspective(120px) }
        50% { -webkit-transform: perspective(120px) rotateY(180deg) }
        100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
    }

    @keyframes rotateplane {
        0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
        } 50% {
              transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
              -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
          } 100% {
                transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
                -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            }
    }
</style>
