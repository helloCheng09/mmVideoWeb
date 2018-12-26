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
            // console.log('我是sendinit')
        },
        renderCate: function (res) {
            // 循环插入分类
            var data = res.data
            var holyHtml = ''
            var listHtml =''
            var itemHtml = ''
            data.forEach(item => {
                $.each(item, function (index, item2) {
                    var cateId = item2.id
                    var cateName = item2.name
                    // 第一个分类被选中
                    if (index != 0) {
                        itemHtml += `
                        <li class="fenlei-item fl_tag" data-id="${cateId}">
                            <div class="fenlei-text">
                                ${cateName}
                            </div>
                        </li>
                    `
                    } else {
                        itemHtml += `
                        <li class="fenlei-item fl_tag" data-id="${cateId}">
                            <div class="fenlei-text select">
                                ${cateName}
                            </div>
                        </li>
                    `
                    }
                })
                listHtml = `
                <div class="fenlei-list-b select_fl">
                    <ul class="fenlei-list">
                       ${itemHtml}
                    </ul>
                </div>
            
            `
                holyHtml += listHtml
                itemHtml = ''
                listHtml = ''
            });
            $('.insert_cates').append(holyHtml)
            root.del.choiceFl()
            // console.log(root)
        },
        renderLesList: function (res) {
            
        }
    }

    // 实例化
    var renderData = new RenderData()
    // 挂载全局
    root.renderData = renderData

    // 输出
    module.exports = renderData
}(window.mylib || (window.mylib = {})));