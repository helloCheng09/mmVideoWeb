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
        renderCate: function (res, cateidArr) {
            // 循环插入分类
            var data = res.data
            var holyHtml = ''
            var listHtml = ''
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
            var eleText = ".fl_tag[data-id='" + cateidArr.cate_id + "']"
            // console.log(eleText)
            var clickCol = $(eleText).parents('.select_fl').index() + 1 // 确定哪一行分类被点击
            var catLen = $('.select_fl').length
            for (var i = clickCol; i < catLen; i++) {
                $('.select_fl').eq(clickCol).remove() // 清空被点击分类以下的子分类
            }

            $('.insert_cates').append(holyHtml)
            root.del.choiceFl()
            // console.log(root)
        },
        renderLesList: function (res, sourceDelegate) {
            var lesList = res.data
            var lesHtml = ''
            // console.log(788996555)
            if (res.sourceDelegate == 'ueserLes') {
                lesList = res.data[0]
            }
            $.each(lesList, function (index, item) {
                if (item != undefined) {
                    let id = item.id
                    let img = item.img
                    let name = item.teacher_name
                    let subtime = item.subtime
                    // if (sourceDelegate == 'ueserLes') {
                    //     subtime = "2018-12-23"
                    // }
                    let title = item.name

                    let froms = item.froms // 1 试听课程 2 付费课程
                    if (froms == '2') {
                        froms = ''
                    } else {
                        froms = `
                            <div class="video-isFree">
                                    试听课
                            </div>
                        `
                    }
                    let link = root.ajaxUrl + 'videos.html?lesson_id=' + id
                    let special = item.special // 特级教师 1特级 0 普通
                    let excellent = item.excellent // 优秀课件 1优秀 0 普通
                    let spacialImgUrl = root.url + 'img/gaoji.png'
                    let normalImgUrl = root.url + 'img/icon18.png'
                    let excelentImgUrl = root.url + 'img/youxiu.png'
                    let defaultAva = root.url + 'img/teacher-toux-default.png'
                    var htmlTj = ''
                    if (special == '1') {
                        htmlTj = `
                        <div class="icon-item" title="特级教师">
                            <img src="${spacialImgUrl}" >
                        </div>
                        `
                    } else {
                        htmlTj = `
                            <div class="icon-item" title="教师">
                                <img src="${normalImgUrl}" >
                            </div>
                        `
                    }
                    if (excellent == '1') {
                        htmlTj += `
                            <div class="icon-item" title="优秀课件">
                                <img src="${excelentImgUrl}">
                            </div>
                        `
                    }
                    lesHtml += `
                        <li class="video-item video-sec">
                            <a href="${link}" class="video-link">
                                    <div class="item-con">
                                        <div class="les-img">
                                            <div class="img-det" style="background-image:url(${img})"></div>
                                        </div>
                                    <div class="item-bot">
                                        <dt class="les-title">
                                            <div class="text-det one-ellipsis">
                                            ${title}
                                            </div>
                                        </dt>
                                        <dd class="les-text-one ">
                                            <div class="icon-list">
                                                <div class="teacher-det">
                                                    <div class="teacher-ava">
                                                        <img src="${defaultAva}" alt="">
                                                    </div>
                                                    <div class="teacher-text one-ellipsis">
                                                        ${name}
                                                    </div>
                                                </div>
                                                ${htmlTj}
                                                <div class="video-time">
                                                    <div class="time-text">${subtime} </div>
                                                </div>
                                            </div>
                                        </dd>
                                    </div>
                                </div>
                            </a>
                        </li>
                    `
                }
            })

            if (lesList.length == 0) {
                if (sourceDelegate != 'ueserLes') {
                    // 分类没有课程
                    lesHtml = `
                            <div class="loading-bx">
                                <div class="loading-text">
                                    课程上架中，敬请期待...
                                </div>
                            </div>
                        `
                }
            }

            setTimeout(() => {
                $('.insert_les_list').empty().append(lesHtml)
            }, 500);

        },
        // 实例化 分页组件
        initPageCom: function (res) {
            var _this = this
            // console.log(res)
            var count = res.total
            var limit = res.per_page
            if (count > 0) {
                if (res.sourceDelegate == 'ueserLes') {
                    console.log(res)
                    // 我的课程 渲染首页
                    // res.curPage = 1
                    _this.renderLesList(res)
                    // 个人中心 课程分页
                    layui.use('laypage', function () {
                        var laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'pageSlide',
                            count: count, //数据总数，从服务端得到
                            limit: limit,
                            jump: function (obj, first) {
                                //obj包含了当前分页的所有参数，比如：
                                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                //首次不执行
                                if (!first) {
                                    //do something
                                    res.curPage = obj.curr
                                    _this.renderPageCom(res)
                                }
                            }
                        });
                    });
                } else if (res.sourceDelegate == 'lesList' || res.sourceDelegate == 'searchList') {
                    // 课程中心 渲染首页
                    _this.renderLesList(res)
                    // 课程中心 分页
                    layui.use('laypage', function () {
                        var laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'pageSlide',
                            count: count, //数据总数，从服务端得到
                            limit: limit,
                            jump: function (obj, first) {
                                //obj包含了当前分页的所有参数，比如：
                                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                //首次不执行
                                if (!first) {
                                    //do something
                                    if (res.sourceDelegate == 'lesList') {
                                        var url = root.lesListUrl
                                        var sourceDelegate = 'lesList'
                                        var cate_id = res.cate_id
                                        var data = {
                                            page: obj.curr,
                                            cate_child: cate_id
                                        }
                                        root.sendAjax.getMd(sourceDelegate, url, data)
                                    } else if (res.sourceDelegate == 'searchList') {
                                        var url = root.searchUrl
                                        var sourceDelegate = 'searchList'
                                        var keywords = root.srcKeyWords
                                        var data = {
                                            page: obj.curr,
                                            keywords: keywords
                                        }
                                        // console.log(url, data)
                                        root.sendAjax.getMd(sourceDelegate, url, data)
                                    }
                                }
                            }
                        });
                    });
                } else {
                    // 系统消息 分页
                    layui.use('laypage', function () {
                        var laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'pageSlide',
                            count: count, //数据总数，从服务端得到
                            limit: limit,
                            jump: function (obj, first) {
                                //obj包含了当前分页的所有参数，比如：
                                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                //首次不执行
                                if (!first) {
                                    //do something
                                    var sourceDelegate = 'myMsg'
                                    var url = root.msgListUrl
                                    var data = {
                                        page: obj.curr
                                    }
                                    root.sendAjax.getMd(sourceDelegate, url, data)
                                }
                            }
                        });
                    });
                }
            } else {
                if (res.sourceDelegate == 'searchList') {
                    // 没搜索到课程
                    lesHtml = `
                        <div class="loading-bx">
                            <div class="loading-text">
                                未搜索到相关课程...
                            </div>
                        </div>
                    `
                } else {
                    // 没有课程
                    $('.layui-laypage').hide()
                    lesHtml = `
                        <div class="loading-bx">
                            <div class="loading-text">
                                课程上架中，敬请期待...
                            </div>
                        </div>
                    `
                }

                setTimeout(() => {
                    $('.insert_les_list').empty().append(lesHtml)
                }, 500);

            }
        },
        // 渲染二维码
        renderChargeCode: function (res) {
            var root = window.mylib
            if (res.sourceDelegate === 'chargeCode') {
                // console.log(res)
                var codeSrc = []
                codeSrc.push(res.data.qrcode)
                var orders_id = res.data.orders_id
                root.orders_id = orders_id
                var img = this.preloadImg(codeSrc, {
                    orders_id: orders_id
                })[0]
                // console.log(img)
                $('.insert_code').append(img)
                // 监控订扫码情况
                this.checkChargeStatus(orders_id)
            }
        },
        // 监控扫码充值流量币情况
        checkChargeStatus: function (orders_id) {
            var root = window.mylib
            clearInterval(root.chargeTimer)
            root.chargeTimer = setInterval(() => {
                // console.log('监控charge')
                // 如果没有在充值模块，清除定时器
                if (root.charging) {
                    // 监测购买情况
                    var data = {
                        orders_id: root.orders_id
                    }
                    var url = root.chargeSucUrl
                    var sourceDelegate = 'chargeSuc'
                    // console.log(url, data)
                    root.sendAjax.getMd(sourceDelegate, url, data)
                } else {
                    clearInterval(root.chargeTimer)
                }
            }, 500);
        },
        // 预加载
        preloadImg: function (arr, obj) {
            var imgWrap = [];
            for (var i = 0; i < arr.length; i++) {
                imgWrap[i] = new Image();
                imgWrap[i].src = arr[i];
                //    console.log(imgWrap[i]) 
            }
            return imgWrap
        },

        // 渲染分页
        renderPageCom: function (res) {
            var _this = this
            if (res.sourceDelegate == 'ueserLes') {
                // 个人中心 课程分页
                var curPage = res.curPage
                var resObj = {
                    data: res.data[curPage - 1]
                }

                var sourceDelegate = 'ueserLes'
                _this.renderLesList(resObj, sourceDelegate)
                // console.log(_this)

            } else if (res.sourceDelegate == 'lesList') {
                // 课程中心 渲染非首页
                _this.renderLesList(res)

            } else if (res.sourceDelegate == 'searchList') {
                // 搜索课程 渲染非首页
                _this.renderLesList(res)
            } else {

                // 系统消息 渲染非首页
                var msgHtml = ''
                var msgListArry = res.data
                $.each(msgListArry, function (index, item) {
                    var id = item.id
                    var type = item.type
                    var get_coin = item.get_coin
                    if (type == '1') {
                        get_coin = '+ ' + get_coin
                    } else {
                        get_coin = '- ' + get_coin
                    }
                    var orders_id = item.orders_id
                    var time = '时  间： ' + item.complete_time
                    var img = root.url + 'img/message-notice.png'
                    msgHtml += `
                            <li class="msg-item" data-id='${id}'>
                                <span class="msg-icon">
                                    <img src="${img}" alt="">
                                </span>
                                <span class="msg-con">
                                    <div class="msg-line">
                                        <span>订单号：${orders_id}</span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>流量币：<em><font color="red">${get_coin}</font></em></span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span>${time}</span>
                                    </div>
                                </span>
                            </li> 
                        `
                })
                $('.msg_insert_list').empty()
                $('.msg_insert_list').append(msgHtml)
            }
        }
    }

    // 实例化
    var renderData = new RenderData()
    // 挂载全局
    root.renderData = renderData

    // 输出
    module.exports = renderData
}(window.mylib || (window.mylib = {})));