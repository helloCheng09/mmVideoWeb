(function (root) {
    // 构造函数
    function SendAjax() {
        // 变量
        this.isFirst = true
    }

    // 原型方法

    SendAjax.prototype = {

        // 初始化
        init: function () {
            console.log('我是sendinit')
        },
        // POST Module
        postMd: function (url, data) {
            var _this = this
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'JSON',
                beforeSend: _this.beforeFn,
                success: function (res) {
                    console.log(res)
                },
                error: _this.errorFn

            })
        },

        // GET Module
        postMd: function (url, data) {
            var _this = this
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'JSON',
                beforeSend: _this.beforeFn,
                success: function (res) {
                    console.log(res)
                },
                error: _this.errorFn

            })
        },

        // beforeSend
        beforeFn: function () {

        },

        // error
        errorFn: function () {

        }
    }

    // 实例化
    var sendAjax = new SendAjax()
    // 挂载全局
    root.sendAjax = sendAjax
    // 输出
    module.exports = sendAjax
}(window.mylib || (window.mylib = {})));