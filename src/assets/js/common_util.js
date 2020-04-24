import Vue from 'vue'
export default {
    setMessage: function (type, message) {
        Vue.prototype.$message({
            message: message,
            type: type,
            duration: 2000,
            showClose: true,
        })
    },
}