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
            } else if (eventTarget == $('#myPlayBtn2')[0] || eventTarget == $('#myPlayBtn')[0]) {
                console.log(2134)
                _this.showVideo()

            } else if (eventTarget == $('.join_btn')[0]) {
                _this.jionStudy()

            } else if (obj) {
                if (obj.pnIndex) {
                    console.log(898797979)
                    _this.switchLesDetTag(obj.pnIndex)
                }
            }
            _this.isFirst = false
        }
        _this.clickEvent()
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
        var _this = this
        if (root.is_buy_lesson != 1) {
            layer.open({
                title: '提示',
                content: '请先购买课程~'
            })
            return false
        } else {
            var url = window.mylib.url
            var pingfenHtml =
            "\n                        <div class=\"star-tc\">\n                        <div class=\"stars-b stars_btn\">\n                            <div class=\"stars-top \">\n                                <div class=\"stars\" style=\"background-image:url(" + url +"img/starsShi.png)\"></div>\n                            </div>\n                            <div class=\"stars-bot\">\n                                <div class=\"stars\" style=\"background-image:url(" + url +"img/starsKong.png)\"></div>\n                            </div>\n                        </div>\n                        <div class=\"stars-text\">\n                            <div class=\"text-con\">\u8D85\u8D5E</div>\n                        </div>\n                    </div>\n                    <div class='pj-btn-b pj_btn_b'>\n                        <input class='pj-btn' type='button' value = '\u63D0\u4EA4'>\n                    </div>\n                    \n                        ";
            layui.use('layer', function () {
                var layer = layui.layer;
                var index = layer.open({
                    type: 1,
                    shadeClose: true,
                    content: pingfenHtml //这里content是一个普通的String
                });
                _this.clickStart()
                layer.title('课程评分', index)
            });
        }
    },
    clickStart: function () {
        var _this = this
        var fansid = lessonData.fansid
        var videos_id = lessonData.videos_id
        var dataObj = {
            fansid: fansid,
            videos_id: videos_id,
            scores: 10,
            content: "超赞",
        }
        console.log(dataObj)
        _this.subPf(dataObj)
        $('.stars_btn').on("click", function (e) {
            var holyWidth = Number($(this).css('width').split('p')[0])
            var clickWidth = e.offsetX
            var percent = Math.ceil(clickWidth / holyWidth * 100)
            var yushu = percent % 10

            if (0 <= percent && percent < 10) {
                percent = 0
            } else if (90 < percent && percent <= 100) {
                percent = 100
            } else {
                percent = percent - yushu + 10
            }

            var pfText = ''
            // 一般 还行 不错 满意 超赞
            switch (percent) {
                case 0:
                    pfText = "一般"
                    break;
                case 10:
                    pfText = "一般"
                    break;
                case 20:
                    pfText = "还行"
                    break;
                case 30:
                    pfText = "还行"
                    break;
                case 40:
                    pfText = "不错"
                    break;
                case 10:
                    pfText = "不错"
                    break;
                case 50:
                    pfText = "不错"
                    break;
                case 60:
                    pfText = "满意"
                    break;
                case 70:
                    pfText = "满意"
                    break;
                case 80:
                    pfText = "满意"
                    break;
                case 90:
                    pfText = "满意"
                    break;
                case 100:
                    pfText = "超赞"
                    break;

            }
            // 讲0 -100转为 0 -10
            var scores = percent / 10
            $(".star-tc .text-con").text(pfText)
            var eleWidth = holyWidth * percent / 100 + 'px'
            // console.log( holyWidth * percent / 100 + 'px')
            $(".stars_btn .stars-top .stars").css("width", eleWidth)
            // 获取评分数据传后台
            dataObj.scores = scores
            dataObj.content = pfText
            console.log(dataObj)
            _this.subPf(dataObj)
            return false
        })
    },

    subPf: function (dataObj) {
        // 提交评分
        $(".pj-btn-b .pj-btn").off()
        $(".pj-btn-b .pj-btn").on("click", function () {
            // pfUrl定义在html
            var sendAjax = root.sendAjax
            sendAjax.init()
            return false;
            // root.modeAjaxPostSec(pfUrl, data)
        })
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
        $('#videoWrap').slideUp('250')
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
            $('#videoWrap').slideDown('250')
        }
    },
    // 课程详情菜单切换
    switchLesDetTag: function (pnIndex) {
        console.log(pnIndex)
        $('.det_tag_bx .tt-item').find('.select').removeClass('select')
        $('.det_tag_bx .tt-item').eq(pnIndex).find('.item-text').addClass('select')
        $('.bot-wrap .bot-pn').hide()
        $('.bot-wrap .bot-pn').eq(pnIndex).slideDown('fast')

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