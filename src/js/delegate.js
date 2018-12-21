// 构造函数
function Delegate() {
    // 加属性
    this.isFirst = true
}
// 原型加方法
Delegate.prototype = {
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
    }
}

// 实例化
var del = new Delegate()

// 输出
module.exports = del