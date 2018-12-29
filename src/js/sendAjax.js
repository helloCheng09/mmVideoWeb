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

            if (sourceDelegate == 'centerLes' || sourceDelegate == 'lesList') {
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
                console.log(2222, res)
                // 实例化分页组件
                // if (res.pages != 1) {
                //     res.sourceDelegate = 'lesList'
                //     root.renderData.initPageCom(res)
                // } 
                var cate_child = $('.select_fl:last-child').find('.select').parent('.fl_tag').attr('data-id')
                res.sourceDelegate = 'lesList'
                res.cate_id = cate_child
                if (!root.pageInit) {
                    root.renderData.renderPageCom(res)
                } else {
                    root.renderData.initPageCom(res)
                    root.pageInit = false
                }
                console.log(root.pageInit)
                // root.renderData.renderLesList(res)
                // root.renderData.renderLesList(res) //渲染对应分类课程
            } else if (sourceDelegate == 'myMsg') {
                if (!root.pageInit) {
                    root.renderData.renderPageCom(res) // 非首页渲染
                } else {
                    root.renderData.initPageCom(res) //首页初始化
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

            } else if (sourceDelegate == 'searchList') {
                console.log(res)
                import( /* webpackChunkName: "renderData" */ './renderData').then(module => {
                    var renderData = module.default;
                    res.sourceDelegate = 'searchList'
                    if (!root.pageInit) {
                        root.renderData.renderPageCom(res)
                    } else {
                        root.renderData.initPageCom(res)
                        root.pageInit = false
                    }

                });

            } else if (sourceDelegate == 'chargeCode') {
                import( /* webpackChunkName: "renderData" */ './renderData').then(module => {
                    var renderData = module.default;
                    res.sourceDelegate = 'chargeCode'
                    $('.insert_code').empty()
                    renderData.renderChargeCode(res)
                });
            } else if (sourceDelegate == 'chargeSuc') {
                console.log(res)
                // 1 购买成功（刷新） 2还未扫码 3支付失败（刷面）
                var codeRes = res.data.code
                if(codeRes == 1) {
                    clearInterval(root.chargeTimer)
                    var index = layer.open({
                        title: '提示',
                        content: '购买成功!~', //刷新页面， 重新请求二维码
                        yes: function () {
                            var sourceDelegate = 'userChargeSuc'
                            // 页面跳转
                            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                                var init = module.default;
                                init.jumpTo(sourceDelegate)
                            });
                            layer.close(index);
                        }
                    })
                   
                }
                // switch (codeRes) {
                //     case 1:
                //         var index = layer.open({
                //             title: '提示',
                //             content: '充值成功!', //刷新页面， 重新请求二维码
                //             yes: function () {
                //                 var sourceDelegate = 'userChargeSuc'
                //                 // 页面跳转
                //                 import( /* webpackChunkName: "init" */ './init.js').then(module => {
                //                     var init = module.default;
                //                     init.jumpTo(sourceDelegate)
                //                 });
                //                 layer.close(index);
                //             }
                //         })

                //         clearInterval(root.chargeTimer)
                //         break;
                //     case 2:
                //         // layer.open({
                //         //     title: '提示',
                //         //     content: '购买成功'
                //         // })
                //         break;
                //     case 3:
                //     var index = layer.open({
                //         title: '提示',
                //         content: '哎呀~购买失败了~请重试', //刷新页面， 重新请求二维码
                //         yes: function () {
                //             var sourceDelegate = 'userChargeFail'
                //             // 页面跳转
                //             import( /* webpackChunkName: "init" */ './init.js').then(module => {
                //                 var init = module.default;
                //                 init.jumpTo(sourceDelegate)
                //             });
                //             layer.close(index);
                //         }
                //     })

                //     clearInterval(root.chargeTimer)
                //         break;
                // }
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