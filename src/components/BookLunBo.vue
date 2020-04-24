<template>
    <div>
        <div class="block">
            <el-carousel height="480px">
                <el-carousel-item v-for="(item,index) in carouselData" :key="index" >
                    <div class="lb-pic" :class="index==3?'lunbo4':''">
                        <!-- {{index}} -->
                        <img :src="item.url">
                    </div>
                    <!-- <h3 class="small">{{ item }}</!--> 
                </el-carousel-item>
                </el-carousel>
        </div>
    </div>
</template>
<script>
// import a from ''
export default {
    data() {
        return {
            // 轮播图片carouselData
            carouselData:[
                {url:require('../assets/images/lunbo1.jpg'),title:'你看我叼吗1',id:1},
                {url:require('../assets/images/lunbo2.jpg'),title:'你看我叼吗2',id:2},
                {url:require('../assets/images/lunbo3.jpg'),title:'你看我叼吗3',id:3},
                {url:require('../assets/images/lunbo4.png'),title:'你看我叼吗3',id:4},
                // {url:require('../assets/images/lunbo5.jpg'),title:'你看我叼吗3',id:5}
            ]
            // carouselData:[
            //     {url:require('../assets/images/lunbo1.jpg'),title:'你看我叼吗1',id:1},
            //     {url:require('../assets/images/lunbo2.jpg'),title:'你看我叼吗2',id:2},
            //     {url:require('../assets/images/lunbo3.jpg'),title:'你看我叼吗3',id:3},
            //     {url:require('../assets/images/lunbo4.jpg'),title:'你看我叼吗3',id:4},
            //     {url:require('../assets/images/lunbo5.jpg'),title:'你看我叼吗3',id:5}
            // ]
        }
    },
    methods:{
        
    }
}
</script>

<style lang='scss'>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .lb-pic img {
        width: 100%;
         height: 100%; 
    }
    .block {
        padding: 15px;
        height: 510px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .lunbo4 {
        img {
            height: 100%;
            z-index: 6;
        }
    }
</style>