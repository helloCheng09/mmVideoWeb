// 构造函数
function Delegate() {
    // 加属性
    this.isFirst = true
}
// 原型加方法
Delegate.prototype = {
    /***初始化入口 */
    init: function (eventTarget, obj) {
        var _this = this
        if (_this.isFirst) {
            if (eventTarget == $('.pf_btn')[0]) {
                _this.showStars()
            } else if (eventTarget == $('#myPlayBtn2')[0]) {
                console.log(2134)
                if (root.is_buy_lesson) {
                    _this.showVideo()
                } else {
                    _this.jionStudy()
                }
            }
            _this.isFirst = false
        }
        _this.clickEvent()

        // if (_this.isFirst) {
        //     _this.showFn()
        //     console.log(obj)
        //     if (obj) {
        //         if (obj.pnIndex) {
        //             _this.switchLesDetTag(obj.pnIndex)
        //         }
        //     } else {
        //         if (root.is_buy_lesson) {
        //             _this.showVideo()
        //         } else {
        //             _this.jionStudy()
        //         }
        //     }
        //     console.log(_this.isFirst)
        // }
       
    },
    /***展示登陆二维码 */
    clickEvent: function () {
        var _this = this
        // 展示注册登录二维码弹窗
        $('.btn-b .btn_lr').off()
        $('.btn-b .btn_lr').on('click', function () {
            _this.showFn()
        })
        // 切换header tag
        $('.det_tag_bx .tt-item').off()
        $('.det_tag_bx .tt-item').on('click', function () {
            var pnIndex = $(this).index()
            _this.switchLesDetTag(pnIndex)
        })
        // 播放器
        $('#myPlayBtn').off()
        $('#myPlayBtn').on('click', function () {
            _this.showVideo()
        })
        $('#myPlayBtn2').off()
        $('#myPlayBtn2').on('click', function () {
            _this.showVideo()
        })
        // 退出播放器
        $('#exitBtn').off()
        $('#exitBtn').on('click', function () {
            _this.closeVideo()

        })
        //加入学习 提示
        $('.join_btn').off()
        $('.join_btn').on('click', function () {
            _this.jionStudy()
            return false
        })
        // 参与评分
        $('.pf_btn').off()
        $('.pf_btn').on('click', function () {
            _this.showStars()
            return false
        })



    },
    showStars: function () {
        if (root.is_buy_lesson != 1) {
            layer.open({
                title: '提示',
                content: '请先购买课程~'
            })
            return false
        } else {
            layui.use('layer', function () {
                var layer = layui.layer;
                var index = layer.open({
                    type: 1,
                    shadeClose: true,
                    content: pingfenHtml //这里content是一个普通的String
                });
                root.clickStart()
                layer.title('课程评分', index)
            });
        }
    },
    jionStudy: function () {
        var layer = layui.layer;
        var cfmText = '本课程123400流量币，是否确认购买？'
        var index = layer.confirm(cfmText, {
            title: "提示",
            btn: ['确定', '取消'] //可以无限个按钮
                ,
            yes: function () {
                layer.close(index);
            },
            btn1: function (index, layero) {
                return false
            }
        });
    },
    // 关闭播放
    closeVideo: function () {
        console.log(root)
        root.player.pause()
        $('#videoWrap').slideUp('fast')
    },
    // 播放视频
    showVideo: function () {
        if (!root.is_buy_lesson) {
            // 未购买 不弹出视频
            layer.open({
                title: '提示',
                content: '请先购买课程~'
            })
            return false
        } else {
            $('#videoWrap').slideDown('fast')
        }
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