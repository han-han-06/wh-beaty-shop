<template>
<!-- 每一栏图书，精选图书，特价图书 -->
    <div class="lanmu">
        <div class="jingxuan">{{title}}</div>
        <div class="lanmu-pic">
            
                <div v-for='(item,index) in arrList' :key='index' class="pic-info">
                    <div class="pic-aaa" @click="goDetail(item)">
                        <!-- 图片{{index}} -->
                        <span class="bok-pic">                               
                            <!-- 160*160 -->
                            <img :src="item.cosmeticsPicture">
                        </span>
                        <div class='price' style="font-size:14px;color:#6f6f6f">{{item.cosmeticsName}}</div>
                        <span class='price'>￥{{item.cosmeticsNewPrice}}</span>
                    </div>
                    <!--  -->
                </div>
                
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props:{
        // 获取图书详情，应该有图片，价格，作者就不用了，
        // 有标题，其他都可以没有，但是不能没有价格
    
        arrList:{
            typr:Array,
            default:function() {
                return []
            }
        },
        title:{
            type:String,
            default:""
        }
    },
    methods:{
        goDetail(item) {
            console.log('item',item)
            // this.$store.state.bookId = item.bookId
            sessionStorage.setItem("cosmeticsId",item.cosmeticsId);
            // 跳转到详情
            this.$router.push(
                {
                    name:'bookDetails'
                }
            )
        }
    }
}
</script>
<style scoped lang='scss'>
.lanmu {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .jingxuan {
        display: block;
        width: 100%;
        margin-left: 20px;
        padding: 10px 0;
        font-size: 16px;
        background-color: #fff;
        font-weight: 700;
        color: red;
        // border: 1px solid yellow;
        margin-bottom: 10px;
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
        padding-top:10px;
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
    .pic-aaa:hover {
        cursor: pointer;
    }
}
.pic-info {
    height: 100%;
    width: 250px;
    background-color: greenyellow;
    margin-right: 20px;
}
</style>