<template>
<!-- 这是买家评论页面 -->
    <div>
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
            <!-- 评论区 -->
        <div class="book-comment">
            <!--分为头部和内容  -->
            <div class="comment">
                <div class="comment-con">
                    <!-- 内容部分，有个头部，剩下就是个评论框了，然后下面有个评论按钮就好咧 -->
                    <div class="comment-con_fir">商品评论区</div>
                    <!-- 评分 -->
                    <div class="blocks">
                        <span class="demonstration">请给人家打个分吧</span>
                        <el-rate
                            v-model="value2"
                            :colors="colors">
                        </el-rate>
                    </div>
                    <!-- 评论 -->
                    <div class="comment-con_sec">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="分享体验心得，给万千想买的人一个参考~"
                            v-model="commentText">
                        </el-input>
                    </div>
                    <div class="comment-con_third">
                        <!-- 评论按钮 -->
                        <div class="comment-con_btn">
                            <el-button type="text" @click="onComment" class="comment-btn">发表评论</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 尾部 -->
        <div class="weibu">
            <BookStoreFooter></BookStoreFooter>
        </div>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    data() {
        return {
            // 评论区
            commentText:"",
            value2:0,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'] ,
            commentInfo:[]
        }
    },
    created() {
        this.commentInfo = this.$route.params.item
    },
    methods:{
        onComment() {
            let comment = this.commentText
            let commentStar = this.value2
            let cosmeticsId = this.commentInfo.cosmeticsId
            let customId = sessionStorage.getItem("uesrId");
            let data = {customId,cosmeticsId,commentStar,comment}
            request.addComments(data).then(res =>{
                this.$commonUtils.setMessage('success','评论成功')
                this.$router.push({
                    name:'bookStoreHome'
                })
            })
            // let 
            // 获取到商品id，评论内容，
            // 调取接口
            // request.
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
.back-top {
    line-height: 180px;
}
.back-top:hover {
    cursor: pointer;
    color: red;
}
// 评论区
.book-comment {
    // height: 1200px;
    // border: 1px solid pink;
    width: 1200px;
    margin: 0 auto;
    margin-top: 150px;
    // background-color: pink;
    .comment-head {
        width: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 15px 0;
        display: flex;
        // justify-content: space-between;
        .comment-head_he {
            padding-left: 5px;
            img {
                width: 100%;
            }
        }
        // 书名
        .comment-head_name {
            margin: 0 5px;
            color: #666;
            font-weight: 700;
            // 
        }
        // 作者
        .comment-head_auth {
            margin: 5px 5px;
        }
        // 简介
        .comment-head_brief {
            color: #666;
            margin:5px 5px;
        }
        .comment-head_price {
            color: #666;
            margin: 5px;
        }
    }
    .comment-con {
        width: 100%;
        background-color: #fff;
        margin-top: 20px;
        border: 1px solid #ccc;
        // 商品评论区
        .comment-con_fir {
            width: 100%;
            box-sizing: border-box;
            background-color: #ccc;
            padding: 10px 0;
            padding-left: 15px;
        }
        .comment-con_sec {
            margin-top: 20px;
            padding-left: 15px;
            padding-right: 15px;
        }
        .comment-con_third {
            // margin-top: 20px;
            width: 100%;
            // 评论按钮
            .comment-con_btn {
                box-sizing: border-box;
                width: 100%;
                text-align: right;
                padding: 15px 0;
                padding-right: 15px;
                // line-height: 47px;
                .comment-btn {
                    padding: 15px 130px;
                    background-color: #EB4C44;
                    color: white;
                    box-sizing: border-box;
                    font-size: 16px;
                }
            }
        }
    }
    .blocks {
        margin-top: 10px;
        display: flex;
        margin-left: 16px;
        .demonstration {
            font-size: 14px;
            color: #666;
            margin-right: 20px;
        }
    }
}
.weibu {
    position: fixed;
    width: 100%;
    bottom: 0;
}
</style>