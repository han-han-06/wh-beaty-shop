<template>
    <div>   
        
        <el-container>
            <el-header>
                <div class="man-header">
                    <!-- 查询 -->
                    <div class="man-header_search">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="">
                                <el-input v-model="formInline.cosmeticsName" placeholder="请输入产品名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="medium"  @click="onSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 新增 -->
                    <div>
                        <el-button size="medium" @click="addBooks">新增产品</el-button>
                    </div>
                </div>
                <!--  -->
            </el-header>
            <el-main>
                <div>
                    <!-- 表格 -->
                    <TablePage
                    :loading='tableLoading'
                    :tableData='tableData'
                    @on-modify='onModify'
                    @on-delete='onDelete'></TablePage>
                </div>
            </el-main>
            <el-footer>
                <!-- 这里放分页哦 -->
                <div class="table-foot">
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
            </el-footer>
        </el-container>
        <!-- 新增侧滑 -->
        <el-drawer
            title="我是标题"
            :show-close='false'
            :with-header="false"
            size='800px'
            :visible.sync="addDrawer">
            <AddDrawer
            v-if='addDrawer'
            @close-drawer ='closeDrawer'
            @close-add='closeAdd'></AddDrawer>
        </el-drawer>
        <!-- 修改侧滑 -->
        <el-drawer
            title="我是标题"
            :show-close='false'
            :with-header="false"
            :visible.sync="modifyDrawer"
            size='800px'
            >
            <ModifyDrawer
            v-if='modifyDrawer'
            :ruleForm='modifyFrom'
            @close-draw='closeDraw'
            @close-modify='closeModify'></ModifyDrawer>
        </el-drawer>
        <el-dialog
            title="提示"
            :visible.sync="deleteDialog"
            width="30%">
            <span>确定删除么</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureDelete" :loading='delLoading'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import request from '../../api/api'
export default {
    data() {
        return {
            // 新增策劃
            addDrawer:false,
            // 修改策劃
            modifyDrawer:false,
            // 
            formInline:{
                cosmeticsName:''
            },
            // 分页
            pageInfo:{
                size:20,
                page:1,
            },
            total:0,
            // 修改表單
            modifyFrom:{},
            tableData:[],
            id:1,
            // 删除弹唱显隐
            deleteDialog:false,
            // 删除按钮loading
            delLoading:false,
            // 商家id
            adminId:'',
            // 获取每本书的bookId
            cosmeticsId:'',
            // 表格loading
            tableLoading:false
        }
    },
    created() {
        this.adminId = sessionStorage.getItem("adminId");
        if(this.$store.state.adminId) {
            this.$store.state.adminId = sessionStorage.getItem("adminId");
        }
        // 获取到当前列表
        this.getList()
    },
    methods:{
        getList() {
            // 
            this.tableLoading = true
            let {page,size} = this.pageInfo
            let adminId = this.adminId
            // let data = {...this.pageInfo,adminId:this.adminId}
            // data里面还应该有人员id
            // 
            request.getListInfo(page,size,adminId).then(res =>{
                // console.log('res',res)
                this.tableData = res.cosmeticsVOList
                this.total = res.count
                setTimeout(()=>{
                    this.tableLoading = false
                },300)
            })
        },
        addBooks() {
            // 打开新增侧滑
            this.addDrawer = true
        },
        // 点击修改
        onModify(row) {
            // console.log('row',row)
            // 获取id
            this.cosmeticsId = row.cosmeticsId
            // console.log(222)
            // 进行数据的请求
            request.getModify(this.cosmeticsId).then(res =>{
                this.modifyFrom = res
               // 打开修改侧滑
                this.modifyDrawer = true
            })
            
        },
        // 点击删除
        onDelete(row) {
            // console.log('row',row)
            // 获取id
            this.cosmeticsId = row.cosmeticsId
            // 打开删除弹窗
            this.deleteDialog = true
        },
        closeModify() {
            // 关闭修改侧滑
            this.modifyDrawer = false
        },
        closeAdd() {
            // 关闭新增侧滑
            this.addDrawer = false
        },
        // 查询
        onSearch() {
            let {cosmeticsName} = this.formInline
            if(cosmeticsName) {
                request.searchBook(cosmeticsName).then(res =>{
                    console.log('res',res)
                    this.tableData = res
                    this.total = res.length
                })
            }else {
                this.getList()
            }
            
            
        },
         // 每页多少条
        handleSizeChange(val) {
            // console.log('每页多少条',val)，真的烦
            this.pageInfo.size = val
            // 刷新列表
            this.getList()
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            // console.log('当前页',val)
            this.pageInfo.page = val
            // 刷新列表
            this.getList()
        },
        // 确认删除事件
        sureDelete() {
            this.delLoading = true
            // 调取接口
            request.deleteBook(this.cosmeticsId).then(res =>{
                // 关闭按钮loading
                this.delLoading = false
                // 关闭弹窗
                this.deleteDialog = false
                this.$commonUtils.setMessage('success','删除成功')
                // 刷新列表
                this.getList()
            }).catch(err => {
                this.delLoading = false
                // this.deleteDialog = false
            })
        },
        closeDrawer() {
            // 关闭新增侧滑。
            this.addDrawer = false
            
            // 刷新列表
            this.getList()
        },
        // 关闭修改侧滑
        closeDraw() {
            this.modifyDrawer = false
            this.$commonUtils.setMessage('success','修改成功')
            // 刷新列表
            this.getList()
        },
        // 
    }
}
</script>
<style  lang='scss'>
    .el-header {
        line-height: 60px;
    }
    .el-main {
        color: #333;
        text-align: center;
        margin: 0 auto;
        box-sizing: border-box;
    }
    // 表格底部的分页
    .el-footer {
        width: 1200px;
        margin: auto;
        text-align: right;
    }
    .man-header {
        background-color: #fff;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        width: 1200px;
        margin: auto;
        margin-top: 10px;
        padding:0 20px;
        box-sizing: border-box;
        height: 100%;
        .man-header_search {
            height: 100%;
        }
        .demo-form-inline {
            height: 100%;
            .el-form-item__content {
                    // margin-top: 5px;
                    vertical-align:middle;
            }
        }
    }
    .table-foot  {
        // background-color: #;
        height: 100%;
        // position: fixed;
        // right: 0;
        // display: flex;
        // flex-direction: column;
        // align-items:center;
    }
    
</style>