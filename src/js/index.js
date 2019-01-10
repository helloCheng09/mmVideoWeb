import _ from 'lodash';

import '../index.html'
import '../center_lesson.html'
import '../center_tec.html'
import '../lesson_det.html'
import '../center_user.html'
import '../det_msg.html'
import '../search.html'

import '../css/common.css'
import '../css/index.css';
import 'expose-loader?$!jquery'

// import init from './init.js'
// 定义变量
// const root = window.mylib;


(function (root) {
    // 配置
    /**************
     * production
     * 注释 development
     * cnpm run build
     * ************ */
    root.ajaxUrl = 'http://www.mamawozaizhe.com/videos/videosweb/' // 根目录
    root.url = '/public/yz/videos/web/' // 资源目录 
    root.pageInit = true // 首次加载分页
    root.lesCateUrl = root.ajaxUrl + 'lessonCate' //获取课程分类地址 GET
    root.lesListUrl = root.ajaxUrl + 'lessonList' // 获取分类课程地址 GET
    root.msgListUrl = root.ajaxUrl + 'msglist.html' //获取消息分页 GET 
    root.videoUrl = root.ajaxUrl + 'videos_link.html' //获取课程播放地址 GET
    root.buyLesUrl = root.ajaxUrl + 'buy_videos.html' //购买课程地址 POST
    root.pingLesUrl = root.ajaxUrl + 'replyAjax.html' //课程评分地址 POST
    root.myLesUrl = root.ajaxUrl + 'videos_mines.html' //获取课程播放地址 GET
    root.searchUrl = root.ajaxUrl + 'search_list.html' //搜索内容地址 POST
    root.searchAdr = root.ajaxUrl + 'search.html' // 跳转到搜索页面路由
    root.chargeCodeSrc = 'http://www.mamawozaizhe.com/mobile/WxpayService/pay.html' //获取充值二维码和单号地址 GET
    root.chargeSucUrl = root.ajaxUrl + 'is_pay.html' // 跳转到搜索页面路由
    root.charging = false
    /**************
     * development
     * cnmp start
     * ************ */
    //  NEV = 1 测试环境   NEV = 0 生产环境 切换
    var NEV = 0
    if (NEV) {
        root.url = './'
        root.lesCateUrl = 'https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/lessonCate'
        root.lesListUrl = '../api/lesList.json'
        root.msgListUrl = '../api/msgList.json'
        root.videoUrl = '../api/videoLink.json'
        root.buyLesUrl = '../api/buyLes.json'
        root.pingLesUrl = '../api/respond.json'
        root.myLesUrl = '../api/myLes.json'
        root.searchUrl = '../api/searchList.json'
        root.searchAdr = './search.html'
        root.chargeCodeSrc = '../api/chargeCode.json'
        root.chargeSucUrl = '../api/chargeSuc.json'
    }

    // 入口
    if (document.getElementById('indexWrp')) {
        $('.header_list').hover(function () {
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 首页游标回到0
                init.headerAniLink(0)
            });
        })

        // 实例轮播图1
        var mySwiper = new Swiper('#Swiper1', {
            // autoplay:true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        })
        // 实例轮播2
        var swiper = new Swiper('#swiper2', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            loop: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            },
        })
        $(".code_hover").eq(0).hover(function () {
            $('.m-code-left').show()
        }, function () {
            $('.m-code-left').hide()
        })
        $(".code_hover").eq(1).hover(function () {
            $('.m-code-right').show()
        }, function () {
            $('.m-code-right').hide()
        })
        // console.log('首页');
        if (root.yuketang === "0") {
            $('html body').on('click', function () {
                var index = layer.confirm('请先登录后继续浏览~~', {
                    title: '登录提示',
                    btn: ['立刻登录'],
                    yes() {
                        $('html body').off()
                        window.location.href = root.loginUrl
                        return false
                    }
                })
                return false
            })
        }
    } else if (document.getElementById('lesWrp')) {
        // console.log('课程中心');
        // 实例轮播图1
        var mySwiper = new Swiper('#Swiper1', {
            // autoplay:true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        })

        // lazy load
        import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
            var delegate = module.default;
            // 切换分类
            delegate.choiceFl()
        });

        import( /* webpackChunkName: "renderData" */ './renderData.js').then(module => {
            var renderData = module.default;
        });
        import( /* webpackChunkName: "sendAjax" */ './sendAjax.js').then(module => {
            var sendAjax = module.default;
            // 引入初始化
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 首页游标回到 102
                init.headerAniLink(102)
                // 初始化课程中心
                var cateId = ''
                init.initLesCenter(cateId)
            });
        });

    } else if (document.getElementById('tecWrp')) {
        // 实例轮播图1
        var mySwiper = new Swiper('#Swiper1', {
            // autoplay:true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        })
        $('.header_list').hover(function () {
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 游标回到 204
                init.headerAniLink(204)
            });
        })
        $('.screen-b').hover(() => {
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 切换分类
                delegate.choiceFl()
            });
        })

    } else if (document.getElementById('detLesWrap')) {
        // console.log('课程详情');

        // lazy load
        import( /* webpackChunkName: "sendAjax" */ './sendAjax.js').then(module => {
            var sendAjax = module.default;

            // 页面初始化
            spaInit();

            function spaInit() {
                // console.log(root.is_buy_lesson)
                if (root.is_buy_lesson == "1") {
                    $('.pre_play_b').hide() // 隐藏遮罩
                    $('#myPlayBtn').show() // 显示播放按钮
                    var sourceDelegate = 'videoSrc'
                    var url = root.videoUrl
                    var data = {
                        videos_id: root.lessonData.videos_id
                    }
                    root.sendAjax.getMd(sourceDelegate, url, data)
                } else {
                    $('.pre_play_b').show()
                    $('#myPlayBtn').hide()
                }
            }
        });

        // import( /* webpackChunkName: "init" */ './init.js').then(module => {
        //     var init = module.default;
        //     // //实例化播放器
        //     init.detPlayer()
        // });

        $('.header_list').hover(function () {
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 首页游标回到 102
                init.headerAniLink(102)
            });
        })

        // $('.btn_lr').on('click', (e) => {
        //     var eventTarget = e.currentTarget
        //     import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
        //         var delegate = module.default;
        //         // 打开登陆
        //         delegate.showLogPage(eventTarget)
        //     });
        // })

        $('.det_tag_bx .tt-item').on('click', function (e) {
            var _this = $(this)
            // console.log(e)
            var eventTarget = e.currentTarget
            // console.log(eventTarget)
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 切换标签
                var pnIndex = _this.index()
                // console.log(pnIndex)
                delegate.init(eventTarget, {
                    pnIndex: pnIndex
                })
            });
        })

        $('#myPlayBtn').on('click', function (e) {
            var eventTarget = e.currentTarget
            setTimeout(() => {
                import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                    var delegate = module.default;
                    // 打开登陆
                    delegate.init(eventTarget)
                });
            }, 0);
        })

        $('#myPlayBtn2').on('click', function (e) {
            var eventTarget = e.currentTarget

            setTimeout(() => {
                import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                    var delegate = module.default;
                    // 打开登陆
                    delegate.init(eventTarget)
                });
            }, 0);
        })

        $('.join_btn').on('click', function (e) {
            var eventTarget = e.currentTarget
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 打开登陆
                delegate.init(eventTarget)
            });
        })

        $('.pf_btn').on('click', function (e) {
            var eventTarget = e.currentTarget
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 打开登陆
                delegate.init(eventTarget)
            });
        })

    } else if (document.getElementById('userWrap')) {
        // console.log('个人中心')
        // 页面初始化
        spaInit()

        function spaInit() {}
        import( /* webpackChunkName: "sendAjax" */ './sendAjax').then(module => {
            var sendAjax = module.default;
            // 我的课程
            var sourceDelegate = 'myLesList'
            var url = root.myLesUrl
            var data = {
                page: 1
            }
            // console.log(url, data)
            sendAjax.getMd(sourceDelegate, url, data)

        });

        $('.header_list').hover(function () {
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 首页游标回到 229
                init.headerAniLink(204)
            });
        })

        $('.uc_com_tag').on('click', function (e) {
            var eventTarget = e.currentTarget
            var _this = $(this)
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 切换个人中心模块
                var pnIndex = _this.index()
                // console.log(pnIndex)
                delegate.init(eventTarget, {
                    userCenterIndex: pnIndex
                })
            });
        })



    } else if (document.getElementById('msgWrap')) {
        // console.log('系统消息页面')

        import( /* webpackChunkName: "renderData" */ './renderData').then(module => {
            var renderData = module.default;
        });
        import( /* webpackChunkName: "sendAjax" */ './sendAjax').then(module => {
            var sendAjax = module.default;
            var sourceDelegate = 'myMsg'
            var url = root.msgListUrl
            var data = {
                page: 1
            }
            sendAjax.getMd(sourceDelegate, url, data)
        });
    }


    // 全局事件 搜索

    import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
        var delegate = module.default;

        if (!document.getElementById('searchWrap')) {

            $('.search-icon').on('click', function () {
                delegate.showSearchPage()
            })
            // // 回车
            $('.search-item input').off()
            $('.search-item input').focus(function () {
                $(document).off()
                $(document).keyup(function (event) {
                    if (event.keyCode == 13) {
                        delegate.showSearchPage()
                        return false
                    }
                });
            })
        } else {
            import( /* webpackChunkName: "sendAjax" */ './sendAjax').then(module => {
                var sendAjax = module.default;
                delegate.searchLes()
                delegate.clickEvent()
            });
        }

    });




}(window.mylib || (window.mylib = {})));