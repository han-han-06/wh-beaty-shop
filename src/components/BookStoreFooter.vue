<template>
    <div class="footer">
        <!-- 首页底部 -->
        <!-- 分为三部分，第一部门为图片，第二部分为文字，包括商家服务的一个跳转，还有一个是底部的logo -->
        <div class="book-store_footer">
            <div class="store_footer">
                <div class="foot-fir">
                    <img src="../assets/images/foot_img.png">
                </div>
            <!-- 先不放东西呢，不知道放啥呢 -->
            <div class="foot-sec">
            </div>
            <div class="foot-third">
                <ul class="foot-third_ul">
                    <li>公司简介</li>
                    <li class="shuxian">|</li>
                    <li>成品英才</li>
                    <li  class="shuxian">|</li>
                    <li>网站联盟</li>
                    <li  class="shuxian">|</li>
                    <li>官方Blog</li>
                    <li class="shuxian">|</li>
                    <li>关注我们</li>
                    <li class="shuxian">|</li>
                    <li>售后服务</li>
                    <li class="shuxian">|</li>
                    <li class="business-center" @click="goToHouTai">商家中心</li>
                </ul>
            </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    created() {

    },
    methods:{
        // 跳转到后台登录页面
        goToHouTai() {  
            this.$router.push({
                name:"tableloginIn"
            })
        }
    },
}
</script>
<style scoped lang='scss'>
.book-store_footer {
    height: 200px;
    width: 100%;
    // padding: 5px 0 5px 30px;
    margin: auto;
    background-color: #fff;
    .store_footer {
        // width: 940px;
        margin: auto;
    }
    li {
        list-style: none;
    }
    .foot-fir {
        height: 79px;
        background-color: #fafafa;
        border: 1px solid #ebebeb;
        
        img {
            height: 100%;
        }
        .foot-imh {
            display: flex;
            height: 50px;
            justify-content: space-between;
            padding-top: 20px;
        }
        .fir-img_one {
            width: 187px;
            height: 52px;
            padding: 7px 0 7px 48px;
            box-sizing: border-box;
            background: url('../assets/images/footer_bg.png') no-repeat;
            background-position: 47px 0px ;
        }
        .fir-img_sec {
            width: 187px;
            height: 53px;
            padding: 7px 0 7px 48px;
            box-sizing: border-box;
            background: url('../assets/images/footer_bg.png') no-repeat;
            background-position: 47px -51px ;
        }
        .fir-img_third {
            width: 187px;
            height: 52px;
            padding: 7px 0 7px 48px;
            box-sizing: border-box;
            background: url('../assets/images/footer_bg.png') no-repeat;
            background-position: 47px -103px ;
        }
        .fir-img_forth {
            width: 187px;
            height: 52px;
            padding: 7px 0 7px 48px;
            box-sizing: border-box;
            background: url('../assets/images/footer_bg.png') no-repeat;
            background-position: 47px -155px ;
        }
    }
    .foot-third_ul {
        padding-left: 0;
        width: 940px;
        height: 100px;
        margin: auto;
        padding: 0 100px;
        box-sizing: border-box;
        text-align: center;
        margin-top: 10px;
        color: #7d7d7d;
        // background-color: yellow;
        // border: 1px solid #cccccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // 
        // li {
        //     float: left;
        // }
        .shuxian {
            margin: 0 10px;
        }
        .business-center {
        }
        .business-center:hover {
            cursor: pointer;
            color: red;
        }
    }
}
.footer {
        height: 200px;
        width: 100%;
        background-color: #fff;
        // border: 1px solid pink;
        // background-color: yellow;
}
</style>