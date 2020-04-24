<template>
    <div class="modify-drawer">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" 
        label-width="150px" class="demo-ruleForm" label-position='left'>
            <el-form-item label="美妆产品" prop="cosmeticsName">
                <el-input v-model="ruleForm.cosmeticsName"></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="cosmeticsFactory">
                <el-input v-model="ruleForm.cosmeticsFactory"></el-input>
            </el-form-item>
            <el-form-item label="化妆品类别" prop="cosmeticsCategory ">
                <el-select v-model="ruleForm.cosmeticsCategory " placeholder="请选择">
                    <el-option v-for="(item,index) in bookClassify" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="妆品详情介绍" prop="cosmeticsDetail">
                <el-input v-model="ruleForm.cosmeticsDetail"></el-input>
            </el-form-item>
            <!-- bookDetail 图书详情 -->

            <!-- 上传封面 -->
            <el-form-item label="化妆品封面">
            <div>
                <el-upload
                    action="http://192.168.10.83:8888/cosmeticsmall/Cosmetics/upload"
                    name='picture'
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview2"
                    :on-success='successFile2'
                    :on-remove="handleRemove2">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2">
                    <img width="100%" :src="dialogImageUrl2" alt="">
                </el-dialog>
            </div>
            </el-form-item>
            <!-- 上传一些大图片 -->
            <el-form-item label="详情图片" prop="cosmeticsPictures">
            <div>
                <el-upload
                    action="http://192.168.10.83:8888/cosmeticsmall/Cosmetics/upload"
                    name='picture'
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success='successFile'
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            </el-form-item>
            <el-form-item label="化妆品价格" prop="cosmeticsNewPrice ">
                <el-input v-model="ruleForm.cosmeticsNewPrice "></el-input>
            </el-form-item>
            <el-form-item label="化妆品原价" prop="cosmeticsOldPrice">
                <el-input v-model="ruleForm.cosmeticsOldPrice"></el-input>
            </el-form-item>
            <!-- 上传图片。 -->
            <el-form-item>
                <el-button type="primary" @click="onSave('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
    </el-form>
    </div>
</template>
<script>
import request from '../../api/api'
export default {
    data() {
        return {
            // 管理人员id，管理人员id放到store层是不是好点
            adminId:'',
            // 添加图片的表单
            ruleForm:{
                cosmeticsCategory:'',
                cosmeticsDetail:"",
                cosmeticsFactory:'',
                cosmeticsName:'',
                cosmeticsNewPrice:"",
                cosmeticsOldPrice:"",
                bookPublish:'',
                bookPublishTime:'',
                bookDetail:''
            },
            // 图书字典表
            bookClassify:[
                    {
                        label: "护肤",
                        value: 1
                    },
                    {
                        label: "彩妆",
                        value: 2
                    },
                    {
                        label: "日常护理",
                        value: 3
                    }
                ],
            rules:{
                bookName:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookDetail:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookAuthor:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookCategory:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookIsbn:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookNewPrice:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookOldPrice:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookPublish:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookPublishTime:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            },
              // 图片路径
            dialogImageUrl: '',
            // 封面路径 
            dialogImageUrl2:'',
            // 是否显示
            dialogVisible: false,
            // 图片路径
            bookPictures:[],
            // 是否显示主图图片
            dialogVisible2:false,
            // 封面list，实际上封面只能有一个
            picArr:[]
        }
    },
    created() {
        let a = this.$store.state.adminId
        // console.log('a',a)
    },
    methods:{
        // mainPic 是否是封面（也就是主图片）
        onSave(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let adminId = this.$store.state.adminId
                    let {ruleForm,bookPictures,picArr} = this
                    // 把封面和其他详情图片都盒到一块
                    bookPictures.push(...picArr)
                    let cosmeticsPictures = bookPictures
                    // 参数整合
                    let data = {...ruleForm,adminId,cosmeticsPictures}
                    // 新增成功，关闭侧滑
                    request.addBook(data).then(res =>{
                        this.$commonUtils.setMessage('success','添加成功')
                        this.$emit('close-drawer')
                    })
                    // 调取jiekou
                    console.log(this.ruleForm)
                } 
                // 
            });
        },
        // 关闭弹窗
        resetForm() {
            this.$emit('close-add')
        },
         // 移除文件
        handleRemove(file, fileList) {
            // 移除文件的时候获取当前的list，进行赋值
            let arr = [...fileList]
            // 获取当前存在的url
            this.bookPictures = arr.map(el=>{
                return el.response.result
            })
            
        },
        // 放大当前文件
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.pictureUrl;
            this.dialogVisible = true;
        },
        // 图片上传成功
        successFile(response,file,fileList) {
            let obj = {}
            obj.mainPic = false
            obj.pictureUrl = response.result
            this.bookPictures.push(obj)
            // console.log('this.imgUrlList',this.imgUrlList)
        },
        // 封面的展示方法
        handlePictureCardPreview2(file) {
            // 获取图片地址
            this.dialogImageUrl2 = file.url;
            // 展示相应的图片
            this.dialogVisible2 = true;
        },
        // 封面上传的文件
        successFile2(response,file,fileList) {
            // 这个是路径
            // console.log('response.result',response.result)
            let obj  = {}
            obj.mainPic = true
            obj.pictureUrl = response.result
            // 上传的是主图片，需要把它的标识变成true，是不是其他地方都不需要动吧
            this.picArr.push(obj)
        },
        // 移除文件
        handleRemove2(file, fileList) {
            // 移除文件的时候获取当前的list，进行赋值
            let arr = [...fileList]
            // 获取当前存在的url3
            this.picArr = arr.map(el => {
                let obj = {}
                obj.mainPic = true
                obj.pictureUrl = el.response.result
                return obj
            })
            // console.log('bookPictures,移除',this.bookPictures)
        },
}
}
</script>
<style lang="scss" scoped>
.modify-drawer {
    max-height: calc(100% - 73px);
    overflow-y: auto;
    padding: 40px;
    box-sizing: border-box;
}
</style>