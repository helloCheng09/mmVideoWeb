// 构造函数
function Delegate() {
    // 加属性
    this.isFirst = true
}
// 原型加方法
Delegate.prototype = {
    // 展示登陆二维码
    showLogPage: function () {
        if (this.isFirst) {
            this.showFn()
            this.isFirst = false
        }
        var that = this
        $('.btn-b .btn_lr').off()
        $('.btn-b .btn_lr').on('click', function () {
            that.showFn()
        })
    },
    showFn: function () {
        console.log('展示登陆二维码')
    },
    // 选择分类
    choiceFl: function () {
        var __this = this
        $('.select_fl').each(function () {
            var _that = $(this)
            _that.find('.fl_tag').off()
            _that.find('.fl_tag').on('click', function () {
                var _this = $(this)
                __this.showChoicFl.apply(_this)
                // 切换选中项
                var _arg = ['.fenlei-list', '.fenlei-text']
                __this.toggleSelect.apply(_this, _arg)
            })
        })
    },
    // 切换 select 
    toggleSelect: function (btnPanel, styleEle) {
        console.log(btnPanel, styleEle)
        $(this).parent(btnPanel).find('.select').toggleClass('select')
        $(this).find(styleEle).toggleClass('select')
    },
    showChoicFl: function () {
        var _this = $(this)
        var dataId = _this.data('id')
        var flText = _this.children('.fenlei-text').text().replace(/^\s+|\s+$/g, "")
        console.log(dataId, flText)
    }
}

// 实例化
var del = new Delegate()

// 输出
module.exports = del