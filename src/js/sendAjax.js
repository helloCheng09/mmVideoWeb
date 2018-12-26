(function (root) {
    // 构造函数
    function SendAjax() {
        // 变量
        this.isFirst = true
        this.sourceDelegate = '12314'
    }

    // 原型方法

    SendAjax.prototype = {

        // 初始化
        init: function () {
            // console.log('我是sendinit')
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
        getMd: function (sourceDelegate, url, data) {
            var _this = this
            _this.sourceDelegate = sourceDelegate
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'JSON',
                beforeSend: _this.beforeFn,
                success: _this.successFn,
                error: _this.errorFn
            })
        },

        // beforeSend
        beforeFn: function () {

        },

        // success
        successFn: function (res) {
            var _this = this
            // console.log(res)
            console.log(_this)
            if (this.sourceDelegate == 'centerLes') {
                console.log('课程分类渲染')
            } else if (0) {

            }
        },

        // error
        errorFn: function () {
            layer.msg('网络链接失败~')
        }
    }

    // 实例化
    var sendAjax = new SendAjax()
    // 挂载全局
    root.sendAjax = sendAjax

    // 输出
    module.exports = sendAjax
    console.log(root.sendAjax);
}(window.mylib || (window.mylib = {})));