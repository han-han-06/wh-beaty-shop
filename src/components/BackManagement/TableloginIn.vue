<template>
<!-- 登录页面 -->
    <div class="registered">
        <div class="registered-content">
            <div class="registered-content_form">
                <el-form :model="ruleForm" status-icon 
                :rules="rules" 
                ref="ruleForm" 
                label-width="100px" 
                class="demo-ruleForm"
                :hide-required-asterisk='true'>
                    <el-form-item label="" prop="adminName">
                        <el-input v-model="ruleForm.adminName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="verificationCode">
                            <div class="verification">
                                <!-- -->
                                <el-input v-model="ruleForm.verificationCode" class="bbb"  placeholder="请输入验证码"></el-input>
                                <el-button @click.stop="getCode" class="aaa">
                                    <span v-if="!ranNum">验证码</span>
                                    <span>{{ranNum}}</span>
                                </el-button>
                            </div>
                    </el-form-item>   
                    <el-form-item label="" prop="adminPassword">
                        <el-input type="password" v-model="ruleForm.adminPassword" autocomplete="off"  placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <!-- 登录 -->
                        <el-button type="primary" @click="submitForm('ruleForm')" class="deng-btn">登录</el-button>
                        <!--  -->
                        还没有账号？<span type="primary" @click="cancle()" style="color:red;cursor: pointer;">去注册</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import request from '../../api/api'
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
                adminPassword: '',
                // 用户名
                adminName: ''
            },
            ranNum:"",
            rules: {
                adminName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                verificationCode:[
                    { validator: checkCode, trigger: 'blur' }
                ],
            }
        };
        },
        methods: {
        submitForm(formName) {
            // console.log(22222)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 带着用户名跳转到商家页面，用于管理么
                    request.adminLogin(this.ruleForm).then(res =>{
                        this.$commonUtils.setMessage('success','登录成功')
                        // id
                          // 将用户信息存储到本地
                        sessionStorage.setItem("adminId", res.adminId);
                        sessionStorage.setItem("adminName", res.adminName);
                        this.$store.state.adminId = res.adminId
                        // 获取登录名
                        this.$store.state.adminName = res.adminName
                        // 跳转到登录页面
                        this.$router.push({
                            name:'homeTab'
                        })
                    })
                    
                }
            });
            // 
        },
        // 跳转到注册页面
        cancle() {
            this.$router.push(
                {
                    name:'tableRegister'
                }
            )
        },
        // 重置
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
        }
    }
</script>
<style scoped lang='scss'>
.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    left: 0;
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
        
    }
}
.registered-content {
    width: 100%;
    margin: 0 auto;
    padding-top: 100px;
    // margin-top: 150px;
    // background-color: #cccccc;
    .registered-content_form {
        width: 460px;
        margin: 0 auto;
        .verification {
            display: flex;
            .bbb {
                
            }
        }
    }
    .deng-btn {
        margin-right: 150px;
    }
}
// .aaa {
//     display: flex;
//     justify-content: space-between;
// }
</style>