<template>
    <div>
<!-- 结账信息显示的第一个路由 -->
    <div class="Purchase-Info">
        <div class="fill-order" ><span>填写并核对相应的订单信息</span></div>
            <div class="purchase-page_content" >
                <!-- 收货人信息 -->
                <div class="purchase-consignee">
                    <div class="consignee-per">
                        <span style="font-weight:700">收货人信息</span>
                        <span @click="addAddress" class="xinzeng-address">修改收货地址</span>
                    </div>
                    <div class="consignee-content">
                        <div v-if="billingInfo[0].address.receiver">
                            <!-- 放用户名和手机号 -->
                            <div>
                                <span class="buy-name">{{billingInfo[0].address.receiver}}</span>
                                <span style="color:#999">{{billingInfo[0].address.phone}}</span>
                            </div>
                            <!-- 放具体的地址 -->
                            <div class="juti-address">
                                <span>{{billingInfo[0].address.address}}</span>
                            </div>
                        </div>
                        <div v-else>
                            <span>
                                请选择收货地址
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 支付方式 -->
                <div class="purchase-payment">
                    <p class="mode-pay">
                        支付方式
                    </p>
                    <div>
                        <el-button>微信支付</el-button>
                    <el-button>支付宝支付</el-button>
                    </div>
                </div>
                <!-- 这里放送货清单 -->
                <div class="consignment-inventory">
                    <div class="consignment-inventory_head">
                        <div>送货清单</div>
                        <div>价格说明</div>
                        <div class="back-shop" @click="backShopCar">返回购物车</div>
                    </div>
                    <div class="consignment-inventory_content" >
                        <div v-for="(item,index) in billingInfo" :key="index">
                            <!-- 商家说明 -->
                            <!-- <p>商家：涵啊涵的店</p> -->
                            <!-- 图片和相应的书的书名 -->
                            <div class="inventory_content">
                                <div class="inventory">
                                    <!-- 这个左边房图片 -->
                                    <div class="inventory-img">
                                        <img :src="item.mainPicture">
                                    </div>
                                    <!-- 这个右边放这个书的名称和作者 -->
                                    <div class="inventory-book">
                                        <span>{{item.cosmeticsName}}</span>
                                        <!-- <span>{{item.bookAuthor}}</span> -->
                                    </div>
                                </div>
                                <!-- 下面这块放价格 -->
                                <div class="jiage">
                                    <span>￥{{item.cosmeticsNewPrice}}</span>
                                </div>
                                <!-- 放数量 -->
                                <!--  -->
                                <div class="shulaing">
                                    <span>x{{item.cosmeticsCount}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <!-- 每个详情页是不是也得显示商家信息啊，对，还得显示商家信息，麻烦， -->
                </div>
                <!-- 结算按钮 -->
                <div class="purchase-confirm_btn">
                    <el-button @click="onPurchaseConfirm" class="confirm_btn">立即结算</el-button>
                </div>
                <!-- 收货人信息这块还有新增收获地址，新增收货地址这块咋处理呢，我也不知道 -->
            </div>
    </div>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    data() {
        return {
            // 结算信息
            billingInfo:[],
            // pramas:{}
            // 修改信息后的地址
            addressInfo:{}
        }
    },
    created() {
        // this.$store.state.pramas  = this.$route.params
        // console.log('pramas',pramas)
        // console.log(11111)
        console.log('this.$store.state.pramas',this.$store.state.pramas)
        this.getInfoList(this.$store.state.pramas)
         // console.log('返回的地址信息',this.$route.params.addressInfo)
        this.addressInfo = this.$route.params.addressInfo
    },
    methods:{
        getInfoList(pramas) {
            request.getOrderInfo(pramas).then(res =>{
                // console.log('res',res)
                if(this.addressInfo) {
                    res[0].address = this.addressInfo
                }
                this.billingInfo = res
            })
        },
        // 立即结算，跳转到我的订单页面
        onPurchaseConfirm() {
            let addressId = this.billingInfo[0].address.addressId
            // 获取订单信息
            let settleAccountDTOS = []
            this.billingInfo.map(el =>{
                let obj = {}
                obj.address = el.address.address
                obj.cosmeticsCount = el.cosmeticsCount
                obj.cosmeticsId = el.cosmeticsId
                obj.orderPrice = el.cosmeticsCount*el.cosmeticsNewPrice
                obj.userName = el.address.receiver
                obj.phone = el.address.phone
                settleAccountDTOS.push(obj)
            })
            let userId = this.$store.state.userId
            let data = {userId,settleAccountDTOS,addressId}
            // console.log(222)
            request.savaOrder(data).then(res =>{
                // 结算成功，跳转到订单页面
            this.$commonUtils.setMessage('success','结算成功')
            this.$router.push({
                name:'successPayment'
            })
            })
            
        },
        // 新增收获地址。跳转到收获地址页面
        addAddress() {
            // 跳转到收获地址页面
            this.$router.push({
                name:"userAddress",
            })
        },
        // 返回购物车
        backShopCar() {
            this.$router.push({
                name:"bookShopCart",
            })
        }
    }
}
</script>
<style scoped lang='scss'>
// .Purchase-Info {
//     margin-top: 150px;
// }
    .fill-order {
        width: 800px;
        margin: auto;
        height: 50px;
        background: #fff;
        line-height: 50px;
        padding-left: 15px;
        box-sizing: border-box;
    }
    .purchase-page_content {
        // height: 800px;
        width: 800px;
        margin: 0 auto;
        border: 1px solid #f1f3f4;
        padding: 20px;
        // background-color: #ccc;
        .purchase-consignee {
            background-color: #fff;
            padding-left: 15px;
            .consignee-per {
                padding: 10px 20px 10px 0;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                .xinzeng-address {
                    color: #666;
                }
                .xinzeng-address:hover {
                    color: red;
                    cursor: pointer;
                }
            }
            .consignee-content {
                height: 80px;
                margin-top: 10px;
                // background-color: yellow;
                // border-bottom: 1px solid green;
                .buy-name {
                    // width: 100px;
                    display: inline-block;
                    // border: 2px solid red;
                    letter-spacing:5px;
                    height: 30px;
                    font-size: 15px;
                    color:red;
                    font-weight: 700;
                    text-align: center;
                    line-height: 30px;
                }
                .juti-address {
                    font-size: 14px;
                    color: #999;
                    margin-top: 5px;
                }
            }
        }
        // 
        .purchase-payment {
            background-color: #fff;
            padding-bottom: 20px;
            padding-left: 15px;
            margin-top: 15px;
            // border-bottom: 1px solid green;
            // height: 200px;
            .mode-pay {
                padding-top: 10px;
            }
        }
        .purchase-payment p {
            font-weight: 700;
            margin-left: 10px;
            
        }
        .purchase-confirm_btn {
            width: 100%;
            text-align: right;
            margin-top: 10px;
            .confirm_btn {
                background-color: red;
                color: #fff;
                font-weight: 700;
            }
        }
        .consignment-inventory {
            // border-bottom: 1px solid green;
            .consignment-inventory_head {
                display: flex;
                background-color: #fff;
                padding: 10px 0;
                margin-top: 20px;
                padding-left: 15px;
                padding-right: 15px;
                // border-bottom: 1px solid #ccc;
                justify-content: space-between;
                margin-bottom: 20px;
                .back-shop:hover {
                    cursor: pointer;
                    color:red;
                }
            }
            .consignment-inventory_content {
                background-color: #fff;
                // background-color: pink;
                padding-left: 15px;
                padding-top: 15px;
                .inventory_content {
                    height: 200px;
                    display: flex;
                    justify-content: space-between;
                    .inventory {
                        display: flex;
                        .inventory-img {
                            width: 180px;
                            img {
                                width: 100%;
                            }
                        }
                        .inventory-book {
                            margin-left: 20px;
                            display: flex;
                            flex-direction: column;
                        }
                    }
                }
                .jiage {
                    color: red;
                    height: 100%;
                    line-height: 125px;
                }
                
            }
            .shulaing {
                height: 100%;
                line-height: 125px;
                    margin-right: 120px;
                    color: #ccc;
                }
        }
    }
</style>