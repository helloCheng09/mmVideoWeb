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
        postMd: function (sourceDelegate, url, data) {
            var _this = this
            $.ajax({
                url: url,
                type: 'POST',
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

        /**
         * GET Module
         * @param {事件源} sourceDelegate 
         * @param {地址} url 
         * @param {数据} data 
         */
        getMd: function (sourceDelegate, url, data) {
            var _this = this
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'JSON',
                beforeSend: _this.beforeFn(sourceDelegate),
                success: function (res) {
                    var _arg = [sourceDelegate, res, data]
                    _this.successFn.apply(_this, _arg)
                },
                error: _this.errorFn
            })
        },
        // beforeSend
        beforeFn: function (sourceDelegate) {

            if (sourceDelegate === 'centerLes') {
                var loadingText = `
                    <div class="loading-bx">
                        <div class="loading-text">
                            努力加载中...
                        </div>
                    </div>
                `
                $('.insert_les_list').empty().append(loadingText)
            }
        },

        // success
        /**
         * 
         * @param {事件源判断} sourceDelegate 
         * @param {获取的数据} res 
         * @param {被点击的分类id} cateidArr 
         */
        successFn: function (sourceDelegate, res, cateidArr) {
            var _this = this
            if (sourceDelegate == 'centerLes') {
                console.log('课程分类渲染')
                console.log(res)
                root.renderData.renderCate(res, cateidArr) //渲染分类
                var cateArr = res.data
                if (cateArr.length) {
                    var cate_child = cateArr[cateArr.length - 1][0]['id'] // 获取最后一个分类的第一个 获取数据
                } else {
                    var cate_child = $('.select_fl:last-child').find('.select').parent('.fl_tag').attr('data-id')
                }
                let sourceDelegate = 'lesList'
                let data = {
                    cate_child: cate_child
                }
                // console.log(root)
                let url = root.lesListUrl
                this.getMd(sourceDelegate, url, data) // 发送后台获取课程列表

            } else if (sourceDelegate == 'lesList') {
                console.log(res)
                root.renderData.renderLesList(res) //对应分类课程
            } else if (sourceDelegate == 'myMsg') {
                if (!root.pageInit) {
                    root.renderData.renderPageCom(res)
                } else {
                    root.renderData.initPageCom(res)
                    root.pageInit = false
                }
            } else if (sourceDelegate == 'videoSrc') {
                root.videoSrc[0] = res.data.links
                import( /* webpackChunkName: "init" */ './init.js').then(module => {
                    var init = module.default;
                    init.detPlayer()
                });
            } else if (sourceDelegate == 'buyLes') {
                if (res.data.code == '1') {
                    var sourceDelegate = 'videoSrc'
                    var url = root.videoUrl
                    var data = {
                        videos_id: root.lessonData.videos_id
                    }
                    _this.getMd(sourceDelegate, url, data)
                    root.is_buy_lesson = "1";
                    layer.open({
                        title: '提示',
                        content: '购买成功！~'
                    })
                    $('.pre_play_b').hide() // 隐藏遮罩
                    $('#myPlayBtn').show() // 显示播放按钮

                } else {
                    layer.open({
                        title: '提示',
                        content: '购买失败~~'
                    })
                }
            } else if (sourceDelegate == 'lesPingfen') {
                // 评分课程
                if (res.data.code == '1') {
                    var index = layer.confirm('评分提交成功~~', {
                        title: "提示",
                        btn: ['确定'],
                        yes: function () {
                            // 重新加载页面
                            location.reload()
                            layer.close(index);
                        }
                    });
                } else {
                    layer.open({
                        title: '提示',
                        content: '评分提交失败~~'
                    })
                }
            } else if (sourceDelegate == 'myLesList') {
                // myLesList
                root.myLesList = {
                    data: []
                }
                // var cacheMyLes = [] //我的课程缓存全局
                var emptyObj = []
                $.each(res.data, function (index, item) {
                    var lesItem = { ...item
                    }; //单个课程
                    emptyObj.push(lesItem)
                })
                console.log(emptyObj)
                root.myLesList.data = emptyObj
                var myListLen = res.data.length
                var obj = {
                    total: myListLen,
                    per_page: 6,
                    sourceDelegate: 'ueserLes'
                }
                import( /* webpackChunkName: "renderData" */ './renderData').then(module => {
                    var renderData = module.default;
                    root.renderData.initPageCom(obj)
                });

            }
        },

        // error
        errorFn: function () {
            layer.msg('网络链接失败~~')
        }
    }

    // 实例化
    var sendAjax = new SendAjax()
    // 挂载全局
    root.sendAjax = sendAjax

    // 输出
    module.exports = sendAjax
}(window.mylib || (window.mylib = {})));