<template>
    <div>
        <div class="order-center ">
        <!-- 头部 -->
        <div class="registered-head">
            <div class="registered-heade_content">
                <div class="heade_content">
                    <div class="boku-logo">
                    <img class="boku-logo_img" src="../assets/images/logo.jpg">
                </div>
                <div class="boku-zhuce"></div>
                </div>
                <div @click="backHome" class="back-top">首页</div>
            </div>
        </div>
        <!-- 订单中心哦 -->
        <div class="my-order">我的订单</div>
        <!--下面是订单，每个订单分为头部和内容，内容还   得反图片  -->
        <div class="order-hea">
            <span>订单详情</span>
            <span style="margin-left:53px">数量</span>
            <span>金额</span>
            <span>收货人</span>
            <!-- <span style="margin-right:53px">状态</span> -->
            <!-- 操作变成已完成的那种就好 -->
            <span style="margin-right:40px">操作</span>
        </div>
        <div v-if="orderVOList.length">
            <div v-for="(item,index) in orderVOList" :key="index" class="order-book_content">
                <!-- 头部 -->
                <div class="order-head">
                    <!-- 日期 -->
                    <!-- <span>2020-04-11 20:20</span> -->
                    <span>
                        {{item.orderTime}}
                    </span>
                    <span style="margin-left:20px">订单号：162489499</span>
                </div>
                <!-- 下面的内容 -->
                <div class="order-con">
                    <!-- 书的图片和内容 -->
                    <div class="shu-cont">
                        <div class="shu-cont_img">
                            <img :src="item.cosmeticsPicture">
                            <!-- <img src="../assets/images/order.jpg"> -->
                        </div>
                        <div class="shu-cont_info">
                            {{item.cosmeticsName}}
                            <!-- 这个是书的内容,这个是书的内容呢 -->
                        </div>
                    </div>
                    <!-- 图书数量 -->
                    <div style="margin-left:63px">
                        <span>x {{item.cosmeticsCount}}</span>
                    </div>
                    <!-- 图书价格 -->
                    <div style="margin-left:195px;color:red;flex-shink:0">
                        <!-- <span>总额 ￥22.22</span> -->
                        <span>
                            {{item.orderTotalPrice}}
                        </span>
                    </div>
                    <!-- 收货人 -->
                    <div style="margin-left:200px;flex-warp:nowarp">
                        <!-- <span>王涵</span> -->
                        <span>{{item.customName}}</span>
                    </div>
                    <!-- 状态 -->
                    <div style="margin-left:229px;color:red">
                        <el-button type="text" @click="confirmReceipt(item)" style="color:red">去评价</el-button>
                        <!-- <el-button type="text">确认收货</el-button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="order-empt" v-else>
            <span>暂无订单信息</span>
        </div>
        <div class="order-page">
                <!-- 分页 -->
                <!-- 哈哈哈 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.page"
                    :page-sizes="[20, 30, 40, 50]"
                    :page-size="pageInfo.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalOrder">
                </el-pagination>
            </div>
    </div>
    <div class="store-footer">
        <BookStoreFooter></BookStoreFooter>
    </div>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    data() {
        return {
            arr:[],
            pageInfo:{
                page:1,
                size:20
            },
            totalOrder:30,
            // 
            orderVOList:[]
        }
    },
    created() {
        this.getDingDan()
    },
    methods:{
        getDingDan() {
            let {page,size} = this.pageInfo
            let userId =  sessionStorage.getItem("uesrId")
            request.getOrderUser(page,size,userId).then(res =>{
                let count =  res.count
                this.totalOrder = count
                this.orderVOList = res.orderVOList.reverse()
            })
        },
        // 去评论
        confirmReceipt(item) {
            console.log('item',item)
            // 确认收货后跳转到评论页面
            setTimeout(()=>{
                this.$router.push(
                {name:'bookComment',
                params:{
                    item:item
                }}) 
            },300)
        },
         // 每页多少条
        handleSizeChange(val) {
            console.log('每页多少条',val)
            this.pageInfo.size = val
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            console.log('当前页',val)
            this.pageInfo.page = val
        },
        // 返回首页
        backHome () {
            this.$router.push(
                {
                    name:"bookStoreHome",
                  
                }
            )
        } 
    }
}
</script>
<style scoped lang='scss'>
.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    background-color: #fff;
    left: 0;
    top: 0;
    box-shadow:0px 5px 10px 0px #e5e7eb;
    display: flex;
    justify-content: space-between;
    // 
    .registered-heade_content {
        height: 100%;
        width: 1200px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        .heade_content {
            display: flex;
            .boku-logo { 
            margin-right: 20px;
            height: 100%;
            font: 20px Arial,Verdana;
            color: #EB4C44;
            line-height: 150px;
            .boku-logo_img {
                margin-top: 43px;
            }
        } 
        .boku-zhuce {
            font: 20px Arial,Verdana;
            color: #666;
            margin-top: 70px;
        }
        }
        
    }
}
.back-top {
    line-height: 180px;
}
.back-top:hover {
    cursor: pointer;
    color: red;
}
.order-empt {
    width: 100%;
    padding: 20px 0;
    text-align: center;
}

.order-hea {
    margin-top: 20px;
    padding: 10px 0 10px 20px;
    border:1px solid #e5e5e5 ;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}
.order-book_content {
    margin-top: 20px;
    border: 1px solid #e5e5e5;
    padding-left: 1px;
    box-sizing: border-box;
}
.order-center {
    width: 1200px;
    margin: auto;
    .my-order {
        margin-top: 140px;
        padding-left: 20px;
        box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        font-size: 14px;
        font-weight: 700;
    }
    .order-head {
        padding: 10px 20px;
        height: 20px;
        background-color: #f5f5f5;
        border-radius: 3px;
    }
    .order-con {
        padding:10px 20px;
        display: flex;
        // height: 150px;
        background-color: #fff;
        .shu-cont {
            display: flex;
            .shu-cont_img {
                width: 80px;
                img {
                    width: 100%;
                }
            }
            .shu-cont_info {
                margin-left: 10px;
                width: 180px;
                font-size: 15px;
            }
        }
        
        
    }
}
.order-page {
    margin-top: 20px;
    text-align: right;
}
.store-footer {
    margin-top: 20px;
}
</style>