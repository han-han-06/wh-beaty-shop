<template>
<!-- 登录页面 -->
    <div class="registered">
        <!-- 头部 放个注册的logo啥的-->
        <div class="registered-head">
            <div class="registered-heade_content">
                <div class="heade_content">
                    <div class="boku-logo">
                        <img class="boku-logo_img" src="../assets/images/logo.jpg">
                    </div>
                    <div class="boku-zhuce">欢迎登录</div>
                    
                </div>
                <div class="registered-heade_login">
                    <span class="heade_login" @click.stop="onGoRe">去注册</span>
                </div>
            </div>
        </div>
        <div class="registered-content">
            <div class="registered-content_form">
                <el-form :model="ruleForm" status-icon 
                :rules="rules" 
                ref="ruleForm" 
                label-width="100px" 
                class="demo-ruleForm"
                :hide-required-asterisk='true'>
                    <el-form-item label="" prop="userName">
                        <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="userPassword">
                        <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"  placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
    
</template>
<script>
import request from '../api/api'
    export default {
        data() {
        var checkCode = (rule, value, callback) => {
            if (value&&value.toLowerCase()!==this.ranNum.toLowerCase()) {
                callback(new Error('请输入正确验证码'));
            }else {
                callback()
            }
        };
        return {
            ruleForm: {
                // 密码
                userPassword: '',
                // 用户名
                userName: ''
            },
            ranNum:"",
            rules: {
            userName: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            userPassword:[
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            }
        };
        },
        methods: {
        submitForm(formName) {
            // console.log(22222)
            this.$refs[formName].validate().then(res =>{
                request.logIn(this.ruleForm).then((res) =>{
                    console.log('res',res)
                     // 将用户信息存储到本地
                    sessionStorage.setItem("uesrId", res.userId);
                    sessionStorage.setItem("userName", res.userName);
                    this.$store.state.userId = res.userId
                    this.$commonUtils.setMessage('success','登录成功')
                    // 跳转到首页
                    this.$router.push({
                        // console.log("this.$store.state.userId",this.$store.state.userId)
                        name:'bookStoreHome',   
                    })
                })
                
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
                // 获取随机数
        getRandom(n, m) { 
            n = Number(n);
            m = Number(m);
            // 确保 m 始终大于 n
            if (n > m) {
                let temp = n;
                n = m;
                m = temp;
            }
            // 下有详细说明
            return Math.floor(Math.random()*(m - n) + n);
        },
        // 生成随机验证码
        getCode() {
            // console.log(5555)
            let codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let str = '';
            // 验证码有几位就循环几次
            for (var i = 0;i < 4;i ++) { 
                str += codeStr.charAt(this.getRandom(0, 62));
            }
            this.ranNum = str
        },
        // 去注册
        onGoRe() {
            this.$router.push({
                name:'registered'
            })
        }
        }
    }
</script>
<style scoped lang='scss'>
.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    left: 0;
    background-color: #fff;
    top: 0;
    box-shadow:0px 5px 10px 0px #e5e7eb;
    display: flex;
    justify-content: space-between;
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
        .registered-heade_login {
            margin-top: 75px;
            color: #666;
            .heade_login {
                color: #EB4C44;
            }
            .heade_login:hover {
                cursor: pointer;
            }
        }
        
    }
}
.registered-content {
    width: 1200px;
    margin: 0 auto;
    margin-top: 200px;
    // background-color: #cccccc;
    .registered-content_form {
        width: 460px;
        margin: 0 auto;
        .verification {
            display: flex;
        }
    }
    .login-btn {
        width: 100%;
        // background-color: ;
    }
}
</style>