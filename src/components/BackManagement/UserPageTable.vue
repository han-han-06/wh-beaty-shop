<template>
<!-- 后台表格 -->
    <div class="manage-table">
        <!--表格怎么设计呢，我也不知道，表格需要进行增删改查，添加图书，添加图书类别，都添加啥类别  -->
        <el-table
            :data="tableData"
            border
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.4)"
            :show-overflow-tooltip='true'
            height="700px"
            style="width: 100%">
             <el-table-column
                prop="cosmeticsName"
                label="序号"
                width="220">
            </el-table-column>
            <el-table-column
                prop="cosmeticsName"
                label="用户名"
                width="220">
            </el-table-column>
            <el-table-column
                prop="cosmeticsNewPrice"
                label="id"
                width="220">
            </el-table-column>
            <el-table-column
                prop=""
                label="联系电话"
                width="220">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="onModify(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="onDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:{
        // 表格数据
        tableData:{
            type:Array,
            default:() => []
        },
        // 表格loading
        loading:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        // 點擊修改按鈕
        onModify(row) {
            this.$emit('on-modify',row)
        },
        // 點擊刪除功能
        onDelete(row) {
            this.$emit('on-delete',row)
        },
        // 
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