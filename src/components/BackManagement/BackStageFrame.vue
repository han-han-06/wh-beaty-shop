<template>
    <!-- 这是后台框 -->
    <div class="stage-frame">
        <div class="stage-head">
        <!-- 分为左右两个盒子。左边的放图片，右边的放个人登录信息， -->
            <div class="frame-con">
                <div class="stage-head_info">
                    <img class="boku-logo_img" src="../../assets/images/logo.jpg">
                    <span>后台管理</span>
                </div>
                <div class="stage-head_merchant">
                    <span>欢迎登录</span>
                    <span>{{adminName}}</span>
                    <span style="color:#409eff">|</span>
                    <span @click="onExit" class="exit">退出</span>
                    <div>
                </div>
                </div>
            </div>
            
        </div>
        <div class="stage-content">
            <!-- 放表格 -->
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 商家用户名
            adminName:'涵涵'
        }
    },
    methods:{
        // 退出，跳到登录页面
        onExit() {
            this.$router.push({
                name:'tableloginIn'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.stage-frame {
    height: 100%;
    // width: 100%;
    .stage-head {
        height: 100px;
        // width: 100%;
        background-color: #fff;
        // padding: 0 40px;
        box-shadow: 0px 2px 10px rgba(153, 153, 153, 0.349019607843137);
        box-sizing: border-box;
       
        .stage-head_info {
            height: 100%;
            line-height: 100px;
            .boku-logo_img {
                // height: 80%;
                margin-top: 10px;
            }
        }
        .stage-head_merchant {
            line-height: 150px;
        }
    }
    .frame-con {
        width: 1300px;
        display: flex;
        margin: 0 auto;
        // width: 1500px;
        height: 100%;
        box-sizing: border-box;
        justify-content: space-between;
    }
    // 首页
    .stage-content {
        background-color: #f7f7f7;
        height: 800px;
        margin-top: 5px;
    }
    .exit {
        padding-left: 10px;
        padding-right: 10px;
    }
    .exit:hover {
        cursor: pointer;
    }
}
</style>