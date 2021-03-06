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
                // console.log(2134)
                _this.showVideo()

            } else if (eventTarget == $('.join_btn')[0]) {
                _this.jionStudy()

            } else if (obj) {
                if (obj.pnIndex) {
                    _this.switchLesDetTag(obj.pnIndex)
                } else if (obj.userCenterIndex) {
                    _this.userCenterComponent(obj.userCenterIndex)
                }
            }
            // else if (eventTarget == $('.btn_lr')[0]) {
            //     _this.showSearchPage()
            // }
            _this.isFirst = false
        }
        _this.clickEvent()
    },

    // 点击事件
    clickEvent: function () {
        var _this = this

        // 个人中心 模块切换
        $('.uc_com_tag').off()
        $('.uc_com_tag').on('click', function () {
            var pnIndex = $(this).index()
            _this.userCenterComponent(pnIndex)
            // init.initUserChargeCode()

            // import( /* webpackChunkName: "init" */ './init.js').then(module => {
            //     var init = module.default;
            //     init.initUserChargeCode()
            // });
            return false
        })
        // 如果切换到充值流量币，初始化一次二维码
        $('.my_coin_btn').on('click', function () {
            import( /* webpackChunkName: "renderData" */ './renderData.js').then(module => {
                var renderData = module.default;
                renderData.checkChargeStatus()
            });
        })
        // 个人中心 切换学生
        $('.centre_child').off()
        $('.centre_child').on('click', function () {
            var pnIndex = $(this).index()
            var _arg = [pnIndex]
            _this.childSwitch.apply($(this), _arg)
        })

        // 个人中心 流量币模块
        $('.charge_com').off()
        $('.charge_com').on('click', function () {
            var pnIndex = $(this).index()
            var _arg = [pnIndex]
            _this.chargeSwith.apply($(this), _arg)
        })

        // 个人中心 选择充值数量
        $('.charge_item').off()
        $('.charge_item').on('click', function () {
            var pnIndex = $(this).index()
            var _arg = [pnIndex]
            _this.chargeItemChoice.apply($(this), _arg)
        })
        // 展示注册登录二维码弹窗
        // $('.btn_lr').off()
        // $('.btn_lr').on('click', function () {
        //     _this.showSearchPage()
        // })

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
        // 搜索课程
        $('.search-img').off()
        $('.search-img').on('click', function () {
            // _this.showStars()
            return false
        })
        // 搜索页搜索课程
        $('.search-icon .search-img').off()
        $('.search-icon .search-img').on('click', function () {
            _this.clickSearch()
        })
        $('.search-item input').off()
        $('.search-item input').focus(function () {
            $('html, body').keyup(function (event) {
                if (event.keyCode == 13) {
                    _this.clickSearch()
                }
            });
        })
    },
    clickSearch: function () {
        var root = window.mylib
        var keyWords = $('.search-item input').val()
        root.srcKeyWords = keyWords
        var data = {
            keywords: root.srcKeyWords,
            page: 1,
        }
        if (data.keywords == '') {
            layer.open({
                title: '提示',
                content: '请输入搜索内容~'
            })
        } else {
            root.pageInit = true
            var sourceDelegate = 'searchList'
            var url = root.searchUrl
            // root.sendAjax.postMd(sourceDelegate, url, data)
            root.sendAjax.getMd(sourceDelegate, url, data)
            // this.searchCon(root.srcKeyWords)
        }
    },
    searchLes: function () {
        var root = window.mylib
        var data = this.getQueryString()
        if (data.keywords == '') {
            // layer.open({
            //     title: '提示',
            //     content: '请输入搜索内容~'
            // })
            // $('.video-list-b').css('minHeight', 'auto')
        } else {
            var sourceDelegate = 'searchList'
            var url = root.searchUrl
            // console.log(url, data)
            // root.sendAjax.postMd(sourceDelegate, url, data)
            root.sendAjax.getMd(sourceDelegate, url, data)
            // this.searchCon(root.srcKeyWords)
        }

    },
    showSearchPage: function () {
        var root = window.mylib
        // console.log('搜索~！！！')
        var keyWords = $('.search-item input').val()
        // console.log(keyWords)
        console.log(keyWords)
        if (keyWords != '') {
            root.srcKeyWords = keyWords
            window.location.href = root.searchAdr + "?keywords=" + root.srcKeyWords
        } else {
            window.location.href = root.searchAdr
        }

    },
    // 搜索内容提示
    searchCon: function (keywords) {
        var keywords = (this.decode(keywords))
        var htmlCon = `
            搜索<em>"${keywords}"</em>结果
        `
        $('.search-tt .tt-txt').empty().append(htmlCon)
    },

    // 获取地址中的参数Id
    getQueryString: function () {
        var root = window.mylib
        root.srcKeyWords = getKeyword('keywords') // 挂载到当前页面全局
        // var page = getKeyword('page')
        var data = {
            keywords: root.srcKeyWords,
            page: 1,
        }

        function getKeyword(keyword) {
            var reg = new RegExp("(^|&)" + keyword + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return r[2];
            return '';
        }
        return data
    },
    chargeItemChoice: function (indexId) {
        var root = window.mylib
        $('.charge_item_list').find('.select input').removeAttr('checked')
        $('.charge_item_list').find('.select').removeClass('select')
        this.children('.card-item-b').addClass('select')
        this.find('input').attr('checked', 'checked')
        var data_id = $('.charge_item').eq(indexId).data('id')

        import( /* webpackChunkName: "sendAjax" */ './sendAjax.js').then(module => {
            var sendAjax = module.default;
            // 发送二维码请求
            var data = {
                data_id: data_id,
                is_discount: root.is_discount
            }
            var url = root.chargeCodeSrc
            var sourceDelegate = 'chargeCode'

            root.sendAjax.getMd(sourceDelegate, url, data)
        });
    },
    chargeSwith: function (indexId) {
        $('.charge_tag_list').find('.select').removeClass('select')
        this.addClass('select')
        $('.llb-toggle .rt_bt').hide()
        $('.llb-toggle .rt_bt').eq(indexId).show()

    },
    childSwitch: function (indexId) {
        $('.s_child_tags').find('.select input').removeAttr('checked')
        $('.s_child_tags').find('.select').removeClass('select')
        this.addClass('select')
        this.find("input[type='radio']").attr('checked', 'checked')
    },
    userCenterComponent: function (indexId) {
        var root = window.mylib
        $('.uc_com_tag').find('.select').removeClass('select')
        $('.uc_com_tag').eq(indexId).find('.text').addClass('select')
        $('.rt_con').hide()
        $('.rt_con').eq(indexId).show()
        // 如果切换到
        if (!$('.uc_com_tag').eq(indexId).hasClass('my_coin_btn')) {
            root.charging = false
        } else {
            root.charging = true
            // 如果切换到充值流量币，初始化一次二维码
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                init.initUserChargeCode()
            });
        }
    },
    showStars: function () {
        var _this = this
        if (root.is_buy_lesson != "1") {
            layer.open({
                title: '提示',
                content: '请先购买课程~'
            })
            return false
        } else {
            var url = window.mylib.url
            var pingfenHtml =
                "\n                        <div class=\"star-tc\">\n                        <div class=\"stars-b stars_btn\">\n                            <div class=\"stars-top \">\n                                <div class=\"stars\" style=\"background-image:url(" + url + "img/starsShi.png)\"></div>\n                            </div>\n                            <div class=\"stars-bot\">\n                                <div class=\"stars\" style=\"background-image:url(" + url + "img/starsKong.png)\"></div>\n                            </div>\n                        </div>\n                        <div class=\"stars-text\">\n                            <div class=\"text-con\">\u8D85\u8D5E</div>\n                        </div>\n                    </div>\n                    <div class='pj-btn-b pj_btn_b'>\n                        <input class='pj-btn' type='button' value = '\u63D0\u4EA4'>\n                    </div>\n                    \n                        ";
            layui.use('layer', function () {
                var layer = layui.layer;
                var index = layer.open({
                    type: 1,
                    shadeClose: true,
                    content: pingfenHtml //这里content是一个普通的String
                });
                _this.clickStart(index)
                layer.title('课程评分', index)
            });
        }
    },

    clickStart: function (index) {
        var _this = this
        var fansid = root.lessonData.fansid
        var videos_id = root.lessonData.videos_id
        var dataObj = {
            fansid: fansid,
            videos_id: videos_id,
            scores: 10,
            content: "超赞",
        }
        // console.log(dataObj)
        _this.subPf(dataObj, index)
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
            // console.log(dataObj)
            _this.subPf(dataObj, index)
            return false
        })
    },
    /**
     * 
     * @param {评价数据} dataObj 
     * @param {layer 弹窗} index 
     */
    subPf: function (dataObj, index) {
        var root = window.mylib
        // 提交评分
        $(".pj-btn-b .pj-btn").off()
        $(".pj-btn-b .pj-btn").on("click", function () {
            // pfUrl定义在html
            // console.log(dataObj, root.sendAjax)
            var sourceDelegate = 'lesPingfen'
            var url = root.pingLesUrl
            var data = dataObj
            // console.log(url, data)
            root.sendAjax.postMd(sourceDelegate, url, data)
            // root.sendAjax.getMd(sourceDelegate, url, data)
            layer.close(index);
        })
    },
    jionStudy: function () {
        var root = window.mylib
        var layer = layui.layer;
        var payNum = $('.pay-text span:last-child').text()
        var cfmText = `本课程${payNum}流量币，是否确认购买？`
        var index = layer.confirm(cfmText, {
            title: "提示",
            btn: ['确定', '取消'] //可以无限个按钮
                ,
            yes: function () {
                // getMd: function (sourceDelegate, url, data) {
                var sourceDelegate = 'buyLes'
                var url = root.buyLesUrl
                var data = root.lessonData
                // console.log(url, data)
                root.sendAjax.postMd(sourceDelegate, url, data)
                layer.close(index);
            },
            btn1: function (index, layero) {
                return false
            }
        });
    },
    // 关闭播放
    closeVideo: function () {
        root.player.pause()
        $('#videoWrap').slideUp('250')
    },
    // 播放视频
    showVideo: function () {
        if (root.is_buy_lesson != '1') {
            // 未购买 不弹出视频
            layer.open({
                title: '提示',
                content: '请先购买课程~'
            })
            return false
        } else {
            $('#videoWrap').slideDown('500')
            root.player.play()
        }
    },
    // 课程详情菜单切换
    switchLesDetTag: function (pnIndex) {
        // console.log(pnIndex)
        $('.det_tag_bx .tt-item').find('.select').removeClass('select')
        $('.det_tag_bx .tt-item').eq(pnIndex).find('.item-text').addClass('select')
        $('.bot-wrap .bot-pn').hide()
        $('.bot-wrap .bot-pn').eq(pnIndex).slideDown('fast')
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
        // console.log(btnPanel, styleEle)
        $(this).parent(btnPanel).find('.select').toggleClass('select')
        $(this).find(styleEle).toggleClass('select')
    },
    showChoicFl: function () {
        var _this = $(this)
        var root = window.mylib
        var dataId = _this.data('id')
        var flText = _this.children('.fenlei-text').text().replace(/^\s+|\s+$/g, "")
        // console.log(dataId, flText)
        // 获取新的分类是 重新实例化分页组件
        root.pageInit = true
        var url = root.lesCateUrl
        var sourceDelegate = 'centerLes'
        var data = {
            cate_id: dataId
        }
        root.sendAjax.getMd(sourceDelegate, url, data)
    }
}

// 实例化
var del = new Delegate()
window.mylib.del = del
// 输出
module.exports = del