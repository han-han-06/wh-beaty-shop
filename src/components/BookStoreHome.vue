<template>
<!-- 首页 -->
    <div v-if="flag">
        <!-- 头部 -->
        <div class="head">
                    <BookHeader
                    :customerName='customerName'
                    @select-cate='selectCate'></BookHeader>
                </div>
        <div class="home-book">
        <el-container>
            <el-main>
                <!-- 轮播 -->
                <div class="lunbo">
                    <BookLunBo>轮播</BookLunBo>
                </div>
                <!-- 这个盒子是三个书的分类 -->
                <div v-if="hiddenFenLei">
                    <!-- 精选图书 -->
                    <div class="jingxuan">
                        <BookJingXuan
                        :title="'精品推荐'"
                        :arrList='jingPinList'
                        ></BookJingXuan>
                    </div>
                    <!-- 特价图书 -->
                    <div class="tejia">
                        <BookJingXuan
                        :title="'精品美妆'"
                        :arrList='huFuList'
                        ></BookJingXuan>
                    </div>
                    <div class="tejia">
                        <BookJingXuan
                        :title="'日常护肤'"
                        :arrList='meiZhuangList'
                        ></BookJingXuan>
                    </div>
                </div>
                <!-- 选中某一个盒子的时候展示某一个分类 -->
                <div v-if="!hiddenFenLei">
                    <!-- 图片怎么显示呢，就多显示几排么 -->
                    <BookJingXuan
                    :title="titleTab"
                    :arrList='categoryList'
                    ></BookJingXuan>
                </div>
                <div class="liu-img">
                    <DongTu></DongTu>
                </div>
            </el-main>
        </el-container>
        
    </div>
    <div class="">
            <BookStoreFooter></BookStoreFooter>
    </div>
    </div>
</template>

<script>
import request from '../api/api'
export default {
    // name: 'bookStoreHome',
    data () {
        return {
            // 轮播的图片
            arrList:[
                {title:1,id:1},
                {title:1,id:1},
                {title:1,id:1},
                {title:1,id:1},
                {title:1,id:1},
            ],
            jingPinList:[],
            huFuList:[],
            meiZhuangList:[],
            // 用户名
            userName:'',
            // 图书类别查询相应的图书
            classifyBooks:[],
            // 是否显示分类盒子
            hiddenFenLei:true,
            // 分类id
            categoryId:'',
            categoryList:[],
            pageInfo:{
                page:1,
                size:20
            },
            userId:'',
            fenLeiPageInfo:{
                page:1,
                size:20
            },
            flag:false,
            titleTab:''
        }
    },
    created() {
        this.flag = true
        let localId = sessionStorage.getItem("uesrId");
        let localName = sessionStorage.getItem("userName");
        this.customerName = localName ? localName : ''
        if(!this.$store.state.userId) {
            this.$store.state.userId = localId;
        }
        // 获取id
        this.userId = sessionStorage.getItem("uesrId")
        // 一开始初始化的时候我得获取到他们的分类
        this.hiddenFenLei = true
        // 获取首页信息
        this.getHomeList()
        // 我需要请求一下所有的数据么
        // 根据图书类别查询相应的图书
        this.getClassifyBooks();

        // 
    },
    methods:{
        getHomeList() {
            let {page,size} = this.pageInfo
            request.getHomeInfo(page,size).then(res =>{
                console.log('res',res)
                this.jingPinList = res.selectedCosmetics.cosmeticsVOList
                this.huFuList = res.recommendedCosmetics.cosmeticsVOList
                this.meiZhuangList = res.hotsellCosmetics.cosmeticsVOList
            })
        },
        getClassifyBooks() {
            
            // 图书类别
            // let category = 1
            let userId = this.userId
            // request.getDiffBook({userId}).then(res =>{
            //     console.log('图书信息',res)
            //     this.classifyBooks = res
            // })
        },
        // 选中某一分类的时候
        selectCate(value) {
            console.log('value',value)
            // if (value==='0') {
            //     console.log(222)
            //     this.flag = false
            //     setTimeout(()=>{
            //         this.flag = true
            //     },100)
            //     return
            // }
            if(value ==='0') {
                // 显示某一具体分类
            this.hiddenFenLei = true
            }else {
                if(value==1) {
                    this.titleTab = '护肤精选'
                }else if(value==2) {
                    this.titleTab = '彩妆精选'
                }else {
                    this.titleTab = '精品推荐'
                }
            this.categoryId = value
            // 显示某一具体分类
            this.hiddenFenLei = false
            // let data = {...this.fenLeiPageInfo,categoryId:value}
            let {page,size} = this.fenLeiPageInfo
            let categoryId = value
            // 进行数据的请求
            request.getDiffBook(page,size,categoryId).then(res =>{
                console.log('res',res)
                // 获取改分类下的图书
                this.categoryList = res.cosmeticsVOList
            })
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.el-main{
    padding: 0;
};
    .home-book {
        height: 100%;
        width: 1200px;
        margin: 0 auto;
    }
    .jingxuan {
        /* height: 400px; */
        margin-bottom: 20px;
        /* background: pink; */
    }
    .lunbo {
        margin-bottom: 20px;
    }
    .tejia {
        margin-bottom: 20px;
    }
    .liu-img {
        position: fixed;
        bottom: 20px;
        left: 1670px;
    }
</style>
