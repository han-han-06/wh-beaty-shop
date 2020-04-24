<template>
    <div>
        <el-button @click="backHome">返回首页</el-button>
        <el-button @click="backCar">返回购物车</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods:{
        backHome() {
            this.$router.push(
                {
                    name:"bookStoreHome"
                }
            )
        },
        backCar() {
            this.$router.push(
                {
                    name:"bookShopCart"
                }
            )
                
            
        }
    }
}
</script>
