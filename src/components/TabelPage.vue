<template>
<!-- 后台表格 -->
    <div class="manage-table">
        <!--表格怎么设计呢，我也不知道，表格需要进行增删改查，添加图书，添加图书类别，都添加啥类别  -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="bookName"
                label="产品名"
                width="150">
            </el-table-column>
            <el-table-column
                prop="bookAuthor"
                label="作者"
                width="120">
            </el-table-column>
            <el-table-column
                prop="bookIsbn"
                label="产品编号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="bookCategory"
                label="产品类别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="bookPublish"
                label="生产日期"
                width="120">
            </el-table-column>
            <el-table-column
                prop="bookPublishTime"
                label="产品原价"
                width="120">
            </el-table-column>
            <el-table-column
                prop="bookOldPrice"
                label="图书原价"
                width="120">
            </el-table-column>
            <el-table-column
                prop="bookNewPrice"
                label="产品价格"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="onModify(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
        // 表格
        tableData: []
            // 
        }
    },
    methods:{
        onModify(row) {
            this.$emit('on-modify',row)
        }
        
    }
}
</script>
<style scoped lang='scss'>
.manage-table {
    width: 1200px;
    height: 700px;
    margin: 0 auto;
}
</style>