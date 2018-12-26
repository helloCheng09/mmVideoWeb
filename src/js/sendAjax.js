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
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'JSON',
                beforeSend: _this.beforeFn,
                success: function (res) {
                    var _arg = [sourceDelegate, res, data]
                    _this.successFn.apply(_this, _arg)
                },
                error: _this.errorFn
            })
        },

        // beforeSend
        beforeFn: function () {

        },

        // success
        /**
         * 
         * @param {事件源判断} sourceDelegate 
         * @param {获取的数据} res 
         * @param {被点击的分类id} cateidArr 
         */
        successFn: function (sourceDelegate, res, cateidArr) {
            if (sourceDelegate == 'centerLes') {
                console.log('课程分类渲染')
                // console.log(res)
                var eleText = ".fl_tag[data-id='" + cateidArr.cate_id + "']"
                // console.log(eleText)
                var clickCol = $(eleText).parents('.select_fl').index() // 确定哪一行分类被点击
                // console.log('哪一行', clickCol+1)
                var catLen = $('.select_fl').length
                for (var i = clickCol; i < catLen; i++) {
                    $('.select_fl').eq(i + 1).remove() // 清空被点击分类以下的子分类
                }
                root.renderData.renderCate(res) //渲染分类
                var cateArr = res.data
                var cate_child = cateArr[cateArr.length - 1][0] // 获取最后一个分类的第一个 获取数据
                let sourceDelegate = 'lesList'
                let data = {
                    cate_child : cate_child
                }
                // console.log(root)
                let url = root.lesListUrl
                this.getMd(sourceDelegate, url, data)    // 发送后台获取课程列表

            } else if (sourceDelegate = 'lesList') {
                console.log(res)
                root.renderData.renderLesList(res) //渲染分类

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
}(window.mylib || (window.mylib = {})));