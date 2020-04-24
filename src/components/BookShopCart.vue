<template>
    <div>
        <div class="shopping-cart">
        <!-- 购物车页面,分为头部，下面做成卡片的形式 -->
        <div class="cart-header">
            <!-- 头部 -->
            <div class="registered-head">
                <div class="registered-heade_content">
                    <div class="heade_content">
                        <div class="boku-logo">
                        <img class="boku-logo_img" src="../assets/images/logo.jpg">
                    </div>
                    <!-- <div class="boku-zhuce">欢迎登录</div> -->
                    </div>
                    <div @click="backHome" class="back-top">首页</div>
                </div>
            </div>
        </div>
        <!-- 这里放每个购物车的内容 -->
        <div class="cart-content">
            <!-- 我的购物车 -->
            <div class="my-car">
                <span style="margin-left:20px">我的购物车</span>
            </div>
            <!-- 全选，商品 -->
            <div class="cart-content_head">
                <el-checkbox v-model="checkAll" class="check-all" @change="onCheckAll">全选</el-checkbox>
                <span style="margin-right:20px">商品</span>
                <span style="margin-left:445px">单价</span>
                <span style="margin-left:130px">数量</span>
                <span style="margin-left:245px">小计</span>
            </div>
            <!-- 内容 -->
            <div class="cart-content_center">
                <div class="cart-all_list">
                    <div v-for="(item,index) in carInfo" :key="index" class="cart_list">
                    <!-- 选中 -->
                    <div class="car-check">
                        <el-checkbox v-model="carInfo[index].isCheck" @change='changeCheck(carInfo[index].isCheck,index)'></el-checkbox>
                    </div>
                    <!-- 图片和信息 -->
                    <div class="car-img_info">
                        <!-- 购买商品图片 -->
                        <div class="car-img">
                            <img :src="item.mainPicture">
                            <!-- <img src="../assets/images/ahc.jpg"> -->
                        </div>
                        <!-- 图书信息 -->
                        <div class="img-info_car">
                            {{item.bookDetail}}
                        </div>
                    </div>
                    <!-- 单价 -->
                    <div style="margin-left:114px">
                        <span>￥ {{item.cosmeticsNewPrice}}</span>
                    </div>
                    <!-- 数量 -->
                    <div class="car_num" style="margin-left:114px" >
                        <!-- ++ -->
                        <span class="el-icon-circle-plus-outline" @click="tianJia(item.cosmeticsCount,index)"></span>
                        <!-- 购买数量 -->
                        <span class="num-inp">{{item.cosmeticsCount}}</span>
                        <!-- 减减 -->
                        <span class="el-icon-remove-outline" @click="subNum(item.cosmeticsCount,index)"></span>
                    </div>
                    <!-- 总价,小计 -->
                    <div style="margin-left:171px">
                        ￥ {{item.totalPrice}}
                    </div>
                    <div class="shanchu">
                        <el-button class="shanchu-btn" type="primary" icon="el-icon-delete" @click="deleteCarInfo(item,index)"></el-button>
                    </div>
                </div>
                </div>
                <!-- 这是分页 -->
                <div class="cart-foot">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageInfo.page"
                            :page-sizes="[20, 30, 40, 50]"
                            :page-size="pageInfo.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                </div>
            </div>
            <!-- 全选按钮，选中结算那块 -->
            <div class="cart-content_foot">
                <div style="">
                    共选择 <span style="color:red">{{selectedNum}}</span> 件商品
                </div>
                <!-- 总价和结算那块 -->
                <div  style="margin-right:0;display:flex">
                    <div style="margin-right:20px">总价 ￥<span style="color:red"> {{totalPrice}} </span></div>
                    <div @click='onSettlement'  class="jiesuan-btn" >
                        <span>去结算</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- <div class="liu-img">
                    <DongTu></DongTu>
        </div> -->
        <BookStoreFooter></BookStoreFooter>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    data() {
        return {
            pageInfo:{
                page:1,size:20
            },
            total:0,
            // 是否全选
            checkAll:false,
            carInfo:[{'name':1},{'name':2},{'name':3},{'name':4},{'name':5},{'name':5},{'name':5},{'name':5}],
            // 选中某一个
            checkOne:false,
            // 购物车数量
            purchaseQuantity:0,
        }
    },
    computed:{
        // 总共选中的商品数
        // 
        selectedNum:function() {
            let a = 0
            this.carInfo.map(el =>{
                if(el.isCheck) {
                    a++
                }
            })
            return a
        },
        // 总价监听器
        totalPrice:function() {
            let total = 0
            // 存取选中的数组
            let checkArr = []
            // 选中得获取选中的数据，怎么获取呢，通过ischeck这个属性去获取，
            this.carInfo.map((el,index) => {
                // 获取选中的值
                if(el.isCheck) {
                    checkArr.push(el)
                }
            })
            // 把每个产品的总价加起来，就好
            checkArr.map(el => {
                total = total + el.cosmeticsNewPrice*el.cosmeticsCount
            })
            return total
        }
    },
    created() {
        // 获取购物车里面的内容
        this.getCarInfo()
    },
    methods:{
        getCarInfo() {
            let customId = sessionStorage.getItem("uesrId");
            request.getCarMess(customId).then(res =>{
                // console.log('购物车内容',res)
                this.carInfo = res
                this.total = res.length
                this.carInfo.map(el =>{
                    // 是否选中
                    el.isCheck = false
                    // 图书总价
                    el.totalPrice = el.cosmeticsNewPrice*el.cosmeticsCount
                })
            })
        },
         // 每页多少条
        handleSizeChange(val) {
            // console.log('每页多少条',val)，真的烦
            this.pageInfo.size = val
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            // console.log('当前页',val)
            this.pageInfo.page = val
        },
        // 减减
        subNum(val,index) {
            if(val > 1) {
                let con =  this.carInfo[index]
                con.cosmeticsCount = con.cosmeticsCount-1
                this.$set(this.carInfo,index,con)
                this.getTotalPrice(index)
                let cosmeticsCount = con.cosmeticsCount
                let customId = sessionStorage.getItem("uesrId")
                let cosmeticsId = con.cosmeticsId
                let data = {cosmeticsCount,customId,cosmeticsId}
                request.modifyCarInfo(data).then(res =>{
                    console.log('修改车工')
                })
            }
        },
        // 结算按钮
        onSettlement() {
            // 校验一下是否选中商品，如果没有选中，则提示
            let flag =  this.carInfo.some(el =>{
                if(el.isCheck) {
                    return true
                }
            })
            if(flag) {
                // 跳转到结账页面，
                // 所选图书id
                let cosmeticsIds = []
                this.carInfo.map(el =>{
                    if(el.isCheck) {
                        cosmeticsIds.push(el.cosmeticsId)
                    }
                })
                // console.log('bookIds',bookIds)
                // 用户id
                let userId  = sessionStorage.getItem("uesrId")
                let data = {  cosmeticsIds,
                        userId}
                this.$store.state.pramas = data
                this.$router.push(
                    {name:'purchaseInfo'}
                )
            }else {
                this.$commonUtils.setMessage('warning','请选择结账商品')
            }
            
        },
        // 选中状态的切换
        changeCheck(val,index) {
            let con =  this.carInfo[index]
            con.isCheck = val
            this.$set(this.carInfo,index,con)
        },
        // 数量加加
        tianJia(val,index) {
            let con =  this.carInfo[index]
            con.cosmeticsCount = con.cosmeticsCount+1
            this.$set(this.carInfo,index,con)
            this.getTotalPrice(index)
            let cosmeticsCount = con.cosmeticsCount
            let customId = sessionStorage.getItem("uesrId")
            let cosmeticsId = con.cosmeticsId
            let data = {cosmeticsCount,customId,cosmeticsId}
            request.modifyCarInfo(data).then(res =>{
                console.log('修改车工')
            })
        },
        // 全选
        onCheckAll(val) {
            let arr =  [...this.carInfo ]
            arr.map(el =>{
                el.isCheck = val
            })
            this.carInfo =[]
            this.carInfo.push(...arr)
        },
        // 获取总价
        getTotalPrice(index) {
            let con = this.carInfo[index]
            // 获取相应的总价
            con.totalPrice = con.cosmeticsNewPrice*con.cosmeticsCount
            this.$set(this.carInfo,index,con)
        },
        // 购物车删除事件
        deleteCarInfo(item,index) {
            // 获取图书id
            let cosmeticsId = item.cosmeticsId
            // 获取顾客id
            let customId = this.$store.state.userId
            // let data = {}
            // 删除事件
            request.deleteCarInfo(customId,cosmeticsId).then(res =>{
                this.$commonUtils.setMessage('success','删除成功')
            })
            this.getCarInfo()
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
* {
    margin: 0;
    padding: 0;
}
.back-top {
    line-height: 180px;
}
.back-top:hover {
    cursor: pointer;
    color: red;
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
.shopping-cart {
    margin: 0 auto;
    padding: 20px 0;
    width: 1200px;
    .my-car {
        margin-top: 40px;
        margin-left: 20px;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        font-size: 14px;
        font-weight: 700;
    }
    .cart-header {
        height: 80px;
        // border: 1px solid pink;
        padding: 15px;
        box-sizing: border-box;
    }
    .cart-content {
        margin-top: 20px;
        // height: 800px;
        // border: 1px solid gold;
        .cart-content_head {
            margin-left: 20px;
            margin-top: 20px;
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            background-color: #fff;
            box-sizing: border-box;
            // border: 1px solid #ccc;
            .check-all {
                margin-right: 20px;
            }
        }
        // 购物车内容
        .cart-content_center {
            padding-left: 20px;
            box-sizing: border-box;
            
            // border: 1px solid chartreuse;
            .cart-all_list {
                // height: 500px;
                // background-color: pink;
                // overflow-y:auto;
            }
            .cart_list {
                display: flex;
                border: 1px solid #ccc;
                margin-top: 20px;
                padding: 20px 0;
                background-color: #fff;
                box-sizing: border-box;
                // height: 150px;
                .car-check {
                    margin-right: 45px;
                    margin-left: 10px;
                }
                .car-img_info {
                    display: flex;
                    .car-img {
                        width: 80px;
                        height: 80px;
                        // border:2px solid yellow;
                        img {
                            width: 100%;
                        }
                    }
                    .img-info_car {
                        width: 300px;
                        // height:150px;
                        // border: 1px solid #ccc;
                        font-size: 14px;
                        box-sizing: border-box;
                    }
                    
                }
            }
            .car_num {
                // 输入框
                .num-inp {
                    border: 1px solid #ccc;
                    width: 50px;
                    display: inline-block;
                }
            }
            .shanchu {
                margin-left: 60px;
                .shanchu-btn {
                    background-color: #fff;
                    border: #fff;
                    color: red;
                }
            }
        }
        .cart-content_foot {
            margin-left: 20px;
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            border: 1px solid #ccc;
            height: 60px;
            padding-left: 10px;
            line-height: 60px;
        }
        .cart-foot {
            margin: 20px 0;
            text-align: right;
            padding-right: 20px;
            // float: right;
            // display: block;
            // right: 0;
            // background-color: pink;
        }
    }   
    
    .jiesuan-btn {
        height: 100%;
        width: 110px;
        line-height: 60px;
        text-align: center;
        background-color: red;
        color: #fff;
    }
    .jiesuan-btn:hover {
        cursor: pointer;
    }
}
// .liu-img {
//     position: fixed;
//     left: ;
// }
</style>