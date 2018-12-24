// 构造函数
function Delegate() {
    // 加属性
    this.isFirst = true
}
// 原型加方法
Delegate.prototype = {
    /***初始化入口 */
    init: function (obj) {
        if (this.isFirst) {
            this.showFn()
            console.log(obj)
            if (obj) {
                if (obj.pnIndex) {
                    this.switchLesDetTag(obj.pnIndex)
                }
            }
            // this.showVideo()
            this.isFirst = false
        }
        this.clickEvent()
    },
    /***展示登陆二维码 */
    clickEvent: function () {
        var _this = this
        $('.btn-b .btn_lr').off()
        $('.btn-b .btn_lr').on('click', function () {
            _this.showFn()
        })
        $('.det_tag_bx .tt-item').off()
        $('.det_tag_bx .tt-item').on('click', function () {
            var pnIndex = $(this).index()
            _this.switchLesDetTag(pnIndex)
        })
        $('#myPlayBtn').off()
        $('#myPlayBtn').on('click', function () {
            _this.showVideo()
        })

    },
    // 播放视频
    showVideo: function () {
        $('#videoWrap').slideDown()
    },
    // 课程详情菜单切换
    switchLesDetTag: function (pnIndex) {
        console.log(pnIndex)
        $('.det_tag_bx .tt-item').find('.select').removeClass('select')
        $('.det_tag_bx .tt-item').eq(pnIndex).find('.item-text').addClass('select')
        $('.bot-wrap .bot-pn').hide()
        $('.bot-wrap .bot-pn').eq(pnIndex).slideDown()

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