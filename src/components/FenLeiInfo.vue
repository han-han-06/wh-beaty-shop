<template>
    <!-- 某一分类的页面 -->
    <div class="lanmu">
        <!-- <p class="jingxuan">精选图书</p> -->
        <div class="lanmu-pic">
                <div v-for='(item,index) in arrList' :key='index' class="pic-info">
                    <div class="pic-aaa">
                        <!-- 图片{{index}} -->
                        <span class="bok-pic">                               
                            <!-- 160*160 ,我就试试dev分支-->
                            <img src="../assets/images/book.png">
                        </span>
                        <div class='price' style="font-size:14px;color:#6f6f6f">计算机科学与技术</div>
                        <span class='price'>￥22.22</span>
                    </div>
                    <!--  -->
                </div>
                
        </div>
    </div>
</template>
<script>
export default {
    data() {}
}
</script>
<style scoped lang='scss'>
.lanmu {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .jingxuan {
        margin-left: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #666;
    }
    // 
}
.lanmu-pic {
    padding: 0 20px;
    // background-color: #ccc;
    display: flex;
    
    .pic-aaa {
        // width: 160px;
        background-color: #f8f8f8;
        border: 1px solid #ccc;
        text-align: center;
        .price {
            color: #EB4C44;
            
        }
        .bok-pic {
            
            height: 205px;
            // width: 160px;
            display: inline-block;
            img {
                height:100%;
            }
        }
    }
}
.pic-info {
    height: 100%;
    width: 250px;
    background-color: greenyellow;
    margin-right: 20px;
}
</style>