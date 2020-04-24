<template>
<!-- 这是头部 -->
    <div class="book-head">
        <!-- 头部放logo和登录注册， -->
        <div class="head-top">
            <div class="head-top_t">
                <div class="logo">
                    <img src="../assets/images/logo.jpg">
                    <!-- <span> -->
                        <!-- <img src="../assets/images/e9b6388fa22b6f07ee307ae484982a4.png"> -->
                    <!-- </span> -->
                    <!-- <span class="shop-mall">美妆商城</span> -->
                </div>
                <div>
                    <span>欢迎光临，
                        <!-- 如果用户名存在的话显示当前用户名，不存在的话显示请登录，跳转到登录页面 -->
                        <i class="please-log" @click="onLogin" v-if="!customerName" >请登录</i>
                        <i v-else style="color:red">{{customerName}}</i>
                    </span>
                </div>
            </div>
        </div>
        <!-- 导航栏 -->
        <div class="head-middle">
            <!-- 分类 -->
            <div class="middle-con">
                <!--这一栏放分类和加入购物车以及我的订单这两个就好了  -->
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="首页" name="0"></el-tab-pane>
                    <el-tab-pane label="护肤精选" name="1"></el-tab-pane>
                    <el-tab-pane label="彩妆精选" name="2"></el-tab-pane>
                    <el-tab-pane label="日常护理" name="3"></el-tab-pane>
                </el-tabs>
            </div>
            <!-- 加入购物车，我的订单 -->
            <div class="middle-car">
                <div class="middle-ca_a">
                    <div class="car" @click="goToCar">
                        <span class="el-icon-shopping-cart-2"></span>
                        <span>购物车</span>
                        <!-- 加购数量 -->
                        <!-- <span>{{purchaseQuantity}}</span> -->
                    </div>
                    <div class="dingdang" @click="goToDing">
                        <span>我的订单</span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 当前焦点
            activeName:'0',
            // 加购数量
            purchaseQuantity:0,
            // 当前选中的value
            selectValue:''
        }
    },
    props:{
        customerName:{
            type:String,default:''
        }
    },
    mounted() {
    },
    methods: {
        handleClick(tab, event) {
            this.selectValue = tab.name
            // console.log('tab.name',tab.name)
            this.$emit('select-cate',tab.name)
            // console.log(tab, event)
        },
        // 登录
        onLogin() {
             this.$router.push({  //核心语句
                path:'/login',   //跳转的路径
            })
        },
        // 注册
        onRegistered() {
              this.$router.push({  //核心语句
                path:'/registered',   //跳转的路径
            })
        },
        // 跳转到购物车界面
        goToCar() {
            // 跳转到购物车页面，是不是要携带一下id，还是不携带了，跳转过程中，需要判断一下有没有人员id，没有请登录
            // 获取人员id
            let peopleId = this.$store.state.userId
            console.log('peopleId',peopleId)
            if(peopleId) {
                this.$router.push({  //核心语句
                    name:'bookShopCart',   //跳转的路径
                })
            }else {
                this.$commonUtils.setMessage('warning','请先登录')
                // 跳转到登录页面，请先登录，这里先不写登陆后跳转到购物车页面呢
                this.$router.push({  //核心语句
                    name:'login',   //跳转的路径
                })
            }
        },
        // 跳转到订单界面
        goToDing() {
            let peopleId = this.$store.state.userId
            console.log('peopleId',peopleId)
            if(peopleId) {
                this.$router.push({  //核心语句
                    name:'individualOrders',   //跳转的路径
                })
            }else {
                this.$commonUtils.setMessage('warning','请先登录')
                // 跳转到登录页面，请先登录，这里先不写登陆后跳转到购物车页面呢
                this.$router.push({  //核心语句
                    name:'login',   //跳转的路径
                })
            }
        }
    }
}
</script>
<style  lang='scss'>
.book-head {
    i {
        font-style:normal
    }
    /* display: flex; */
    width: 100%;
    // border: 1px solid pink;
    // height: 200px;
    box-sizing: border-box;
    /* background-color: pink; */
    .head-top {
        display: flex;
        height: 60px;
        padding-top: 0;
        padding-bottom: 2px;
        box-sizing: border-box;
        background-color: #fff;
        // border-bottom: 1px solid #ccc;
        box-shadow: 0px 5px 10px 0px #e5e7eb;
        // fafafa
        // background-color: rgba(199, 199, 199,1) ;
        .head-top_t {
            width: 1200px;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            line-height: 60px;
            .please-log {
                color: red;
            }
            .please-log:hover {
                cursor: pointer;
            }
        }
    }
}
.head-top_t .logo {
    display: flex;
    align-items: flex-end;
    img {
        height: 100%;
        vertical-align:baseline;
    }
    .shop-mall {
        color: #5C5C5C;
        line-height: 30px;
        // font-weight: 700;
    }
}
    
.head-middle {
    width: 1200px;
    // background-color: yellow;
    margin: auto;
    margin-top: 15px;
    display: flex;
    align-items: center;
    // height: 100%;
    justify-content: space-between;
    .middle-car {
        display: flex;
        margin-right: 15px;
        .middle-ca_a {
            display: flex;
            height: 40px;
            line-height: 40px;
            // background-color: pink;
            border-radius: 3px;
            border:1px solid #dcdcdc;
            .car {
                padding: 0 10px;
                border-right:2px solid #dcdcdc;
                background-color: #EB4C44;
                color: #fff;
                font-size: 14px;
                // font-weight: 700;
            }
            .el-icon-shopping-cart-2 {
                font-weight: 700;
            }
            .dingdang {
                background-color: rgba(246, 246, 246,1);
                padding: 0 8px;
            }
        }
        .middle-ca_a:hover {
            cursor: pointer;
        }
    }
    .el-tabs__item.is-active {
        color: red;
    }
    .el-tabs__item {
        font-size:18px;
        font-weight: 700;
        color: #777;
    }
    .el-tabs__item:hover {
        color: red;
    }
    .el-tabs__active-bar {
        background-color: red;
    }
}
</style>