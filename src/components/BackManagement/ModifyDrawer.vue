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
            <el-form-item label="化妆品类别" prop="cosmeticsCategory">
                <el-select v-model="ruleForm.cosmeticsCategory" placeholder="请选择">
                    <el-option v-for="(item,index) in bookClassify" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="妆品详情介绍" prop="cosmeticsDetail">
                <el-input v-model="ruleForm.cosmeticsDetail"></el-input>
            </el-form-item>
            <el-form-item label="化妆品价格" prop="cosmeticsNewPrice">
                <el-input v-model="ruleForm.cosmeticsNewPrice"></el-input>
            </el-form-item>
            <el-form-item label="化妆品原价" prop="cosmeticsOldPrice">
                <el-input v-model="ruleForm.cosmeticsOldPrice"></el-input>
            </el-form-item>
            <!-- 上传封面 -->
            <!-- 图书封面 -->
            <el-form-item label="图书封面">
            <div>
                <el-upload
                    class="upload-demo"
                    action="http://192.168.10.83:8888/cosmeticsmall/Cosmetics/upload"
                    name='picture'
                    :on-preview="handlePictureCardPreview2"
                    :on-remove="handleRemove2"
                    :on-success='successFile2'
                    :file-list="picArr"
                    list-type="picture"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2">
                    <img width="100%" :src="dialogImageUrl2" alt="">
                </el-dialog>
            </div>
            </el-form-item>
            <!-- 上传大图-->
            <!-- 这有点问题，就是不能展示后端给的图片 -->
            <el-form-item label="图片详情">
                <!-- 这里放一个div，用于放置图片 -->
                <el-upload
                    class="upload-demo"
                    action="http://192.168.10.83:8888/cosmeticsmall/Cosmetics/upload"
                    name='picture'
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success='successFile'
                    :file-list="bookPictures"
                    list-type="picture"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
                <!-- -->
            </el-form-item>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-form-item>
                
                <el-button type="primary" @click="onSave('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <!--  -->
    </el-form>
    </div>
</template>
<script>
import request from '../../api/api'
export default {
    data() {
        return {
            adminId:'',
            // 图片路径
            dialogImageUrl: '',
            // 是否显示
            dialogVisible: false,
            // 图书类型字典表
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
                bookPicture:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookPublish:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookPublishTime:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            },
            // 图书详情列表
            bookPictures:[],
            cosmeticsId:"",
            // 是否显示主图图片
            dialogVisible2:false,
            // 封面list，实际上封面只能有一个
            picArr:[
                {
                    name:'',url:""
                }
            ],
            // 封面路径 
            dialogImageUrl2:'',
            // 图片是否能显示
            flagPic:false
        }
    },
    props:{
        // 修改表单
        ruleForm:{
            type:Object,
            default:()=> {}
        }
        // 
    },
    watch:{
    },
    created() {
        this.cosmeticsId = this.ruleForm.cosmeticsId
        // bookPictures
        let arr = this.ruleForm.cosmeticsPictures
        for(let item of arr) {
            if(item.mainPic) {
                let url = item.pictureUrl
                this.picArr =  [{url}]
            }else if(item.mainPic === false) {
                this.bookPictures.push({url:item.pictureUrl})
            }
        }
    },
    methods:{
        // 修改的保存
        onSave(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let {cosmeticsId} = this
                let adminId = this.$store.state.adminId
                let cosmeticsPictures = []
                this.bookPictures.map(el =>{
                    let obj = {}
                    obj.mainPic = false
                    obj.pictureUrl = el.url
                    cosmeticsPictures.push(obj)
                })
                let obj2 = {}
                obj2.pictureUrl = this.picArr[0].url
                obj2.mainPic = true
                cosmeticsPictures.push(obj2)
                let data = {...this.ruleForm,adminId,cosmeticsPictures}
                request.saveModifyFrom(cosmeticsId,data).then(res =>{
                    // console.log('res')
                    // 关闭侧滑
                    this.$emit('close-draw')
                })
            } 
            });
        },
        // 关闭弹窗
        resetForm() {
            this.$emit('close-modify')
            // l柳林施主
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
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 图片上传成功
        successFile(response,file,fileList) {
            let obj = {}
            obj.MainPic = false
            obj.url = response.result
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
            obj.MainPic = true
            obj.url = response.result
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
                obj.MainPic = truedou
                obj.url = el.response.result
                return obj
            })
            // console.log('bookPictures,移除',this.bookPictures
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