<template>
<div>
    <div class="registered-head">
                <div class="registered-heade_content">
                    <div class="heade_content">
                        <div class="boku-logo">
                        <img class="boku-logo_img" src="../assets/images/logo.jpg">
                    </div>
                    <div class="boku-zhuce">欢迎登录</div>
                    </div>
                </div>
            </div>
    <div class="pay-suc">
        <span>
            <img src="../assets/images/unnamed.png">
        </span>
        <div class="suc-text">
            <span>
            支付成功
        </span>
        <span @click="goDingDan" class="look-ding">
            可查看订单
        </span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        goDingDan() {
            this.$router.push(
                {
                    name:'individualOrders'
                }
            )
        }
    }
}
</script>
<style scoped lang='scss'>
.look-ding {
    color: red;
    cursor: pointer;
}
.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    background-color: #fff;
    z-index: 6;
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
.pay-suc {
    background-color: #f6f6f6;
    display: flex;
    width: 500px;
    height: 500px;
    margin: 0 auto;
    margin-top: 180px;
    .suc-text {
        padding-top: 120px;
        box-sizing: border-box;
        text-align: center;
        // line-height: 500px;
        font-size: 20px;
        
    }
}
</style>