<template>
    <div class="home-tab">
        <el-tabs type="border-card">
            <!-- 用户管理 -->
            <el-tab-pane  label="用户管理">
                <UserTable></UserTable>
            </el-tab-pane>
            <!-- 商品管理 -->
            <el-tab-pane label="商品管理">
                <manage-home></manage-home>
            </el-tab-pane>
            <!-- 订单管理 -->
            <el-tab-pane label="订单管理">
                <OrderTable></OrderTable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    methods:{

    }
}
</script>
<style scoped lang='scss'>
.home-tab {
    margin: auto;
    // margin-top: 120px;
    width: 1300px;
}
</style>