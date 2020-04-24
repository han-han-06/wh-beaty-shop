<template>
<!-- 结账页面 -->
    <div>
        <!-- 头部 -->
        <div class="registered-head">
            <div class="registered-heade_content">
                <div class="heade_content">
                    <div class="boku-logo">
                    <img class="boku-logo_img" src="../assets/images/logo.jpg">
                </div>
                <!-- <div class="boku-zhuce">欢迎登录</div> -->
                </div>
            </div>
        </div>
            <router-view class="purchase"></router-view>
    </div>
</template>
<script>
// 引入百度地图
import request from '../api/api'
export default {
    data() {
        return {
            // bbb:true
        }
    },
    created() {
    },
    methods:{
        // 新增收获地址。跳转到收获地址页面
        addAddress() {
            // 跳转到收获地址页面
            this.bbb = false
            this.$router.push({
                name:"userAddress",
            })
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
.purchase {
    margin-top: 150px;

}
.purchase-page {
    width: 100%;
    margin-top: 140px;
    height: 800px;
    .purchase-page_head {
        width: 100%;
        height: 100px;
        background-color: pink;
    }
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
}
</style>