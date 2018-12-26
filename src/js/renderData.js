(function (root) {
    // 构造函数
    function RenderData() {
        // 变量
        this.isFirst = true
    }

    // 原型方法

    RenderData.prototype = {

        // 初始化
        init: function () {
            console.log('我是sendinit')
        },
    }

    // 实例化
    var renderData = new RenderData()
    // 挂载全局
    root.renderData = renderData

    // 输出
    module.exports = renderData
    // console.log(root.renderData);
}(window.mylib || (window.mylib = {})));