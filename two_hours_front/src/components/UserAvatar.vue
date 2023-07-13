<template>
    <!-- 用户头像 -->
    <span>
         <img :src="src"
              :width="myWidth"
              :height="myHeight"
              id="DhUserAvatar"
         />
    </span>
</template>

<script>
    export default {
        name: "UserAvatar",
        props:['src', 'width', 'height'],
        data(){
            return{
                myWidth:45,
                myHeight:45,
            }
        },
        created() {
            if(this.width !== undefined)this.myWidth = this.width;
            if(this.height !== undefined)this.myHeight = this.height;
        }
    }
</script>

<style scoped>
    /* 导航栏用户头像 */
    #DhUserAvatar{
        margin-right: 4px;
        /* 设置成圆形-圆角 */
        border-radius:50%;
        /* 图像缩放算法 */
        image-rendering: high-quality;
      /*  image-rendering:-moz-crisp-edges;
        image-rendering:-o-crisp-edges;
        image-rendering:-webkit-optimize-contrast;
        image-rendering: crisp-edges;*/
        -ms-interpolation-mode:nearest-neighbor;
        /* 图片适应 */
        object-fit: cover;
        /* 图片适应位置 */
        /*object-position: left 100px bottom 100px;*/
    }
</style>