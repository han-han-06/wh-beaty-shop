<template>
<!-- 管理收获地址页面 -->
    <div class="user-address" >
        <!-- 收货地址头部，新增收获地址 -->
        <div>
            <div class="address-head">
                <span>收货地址</span>
                <div @click="addAddress" class="add-address">
                    新增收货地址
                </div>
            </div>
        </div>
        <!--收货地址内容  -->
        <div class="address-content" v-if="!isAddress">
            <div v-for="(item,index) in addressList" :key="index" class="address">
                <div class="address-user">
                    <el-checkbox v-model="addressList[index].isCheck"  @change='changeAddress(addressList[index].isCheck,index)'></el-checkbox>
                    <span>{{item.receiver}}</span>
                    <span>{{item.phone}}</span>
                    <span class="del-btn" @click="delAddress(item)">删除</span>
                </div >
                <div class='address-ss'>
                    {{item.address}}
                </div>
            </div>
        </div>
        <div class="back-Purchase" style="text-align:right;margin-right:20px;color:red" @click="backPurchase">
            <span>确认修改</span>
        </div>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    data() {
        return {
            // 收获地址
            addressList:[],
            // 收货地址是否显示
            isAddress:false,
            // 订单信息
            dingdanInfo:[],
            flag:true
        }
    },
    created() {
        this.isAddress = false
        // 获取收获地址
        this.getAddressInfo()
    },
    methods:{
        getAddressInfo() {
            // 获取相应的用户id
            let userId = this.$store.state.userId
            request.getAddressId(userId).then(res =>{
                console.log('res',res)
                res.map(el =>{
                    el.isCheck = false
                })
                this.addressList = res
            })
        },
        addAddress() {
            console.log(2222)
            // 显示新增表单
            this.isAddress = true
            this.$router.push(
                {
                    name:'addAddress'
                }
            )
        },
        // 确认修改，跳转到结账页面
        backPurchase() {
            let addressInfo 
            this.addressList.map(el =>{
                if(el.isCheck) {
                    addressInfo = el
                }
            })
            // let addressInfo = 
            this.$router.push(
                {name:'purchaseInfo',
                params:{
                    addressInfo
                }}
            )
        },
        // 删除
        delAddress(item) {
            let delAddress  = item.addressId
            request.delAddress(delAddress).then(res =>{
                
                this.$commonUtils.setMessage('success','删除成功')
                // 刷新列表
                this.getAddressInfo()
            })
        },
        // 改变收货地址
        changeAddress(val,index) {
            let obj = this.addressList[index]
            obj.isCheck = val
            this.$set(this.addressList,index,obj)
        }
    }
}
</script>
<style scoped lang='scss'>
.user-address {
    width: 600px;
    margin: 0 auto;
    margin-top: 150px;
    .address-head {
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 10px;
        .add-address {
            // color: #3883ff;
            color:red;
            font-weight: 700;
            font-size: 14px
        }
        .add-address:hover {
            cursor: pointer;
        }
    }
    .address-content {
            .address {
                box-sizing: border-box ;
                padding: 10px 20px;
                height: 80px;
                background-color: #fff;
                // border: 1px solid #ccc;
                margin-bottom: 10px;
                .address-user {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 5px;
                    // border-bottom: 1px solid #ccc;
                }
            }
        }
        .back-Purchase {
            cursor: pointer;
            font-size: 14px;
        }
}
</style>