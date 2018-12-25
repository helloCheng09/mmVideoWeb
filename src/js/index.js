import _ from 'lodash';

import '../index.html'
import '../center_lesson.html'
import '../center_tec.html'
import '../lesson_det.html'
import '../charge.html'

import '../css/common.css'
import '../css/index.css';
import 'expose-loader?$!jquery'
// import sendAjax from './sendAjax'

// import init from './init.js'
// 定义变量
// const root = window.mylib;

(function (root) {

    // 入口
    if (document.getElementById('indexWrp')) {
        console.log('首页');

        $('.header_list').hover(function () {
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 首页游标回到0
                init.headerAniLink(0)
            });
        })

        $('.login-reg').on('click', () => {
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 打开登陆
                delegate.showLogPage()
            });
        })

        // 实例轮播图1
        var mySwiper = new Swiper('#Swiper1', {
            // autoplay:true,
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
            // autoplay:true,
            loop: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            },
        });
    } else if (document.getElementById('lesWrp')) {
        console.log('课程中心');
        $('.header_list').hover(function () {
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 首页游标回到 102
                init.headerAniLink(102)
            });
        })

        $('.screen-b').hover(() => {
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 切换分类
                delegate.choiceFl()
            });
        })

        // 实例轮播图1
        var mySwiper = new Swiper('#Swiper1', {
            // autoplay:true,
            pagination: {
                el: '.swiper-pagination',
            },
        })
    } else if (document.getElementById('tecWrp')) {
        // 实例轮播图1
        var mySwiper = new Swiper('#Swiper1', {
            // autoplay:true,
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
        console.log('课程详情')
        // 页面初始化
        spaInit()

        function spaInit() {
            if (root.is_buy_lesson) {
                // 隐藏遮罩
                $('.pre_play_b').hide()
                // 显示播放按钮
                $('.main_play_btn').show()
            } else {
                $('.pre_play_b').show()
                $('.main_play_btn').eq(0).hide()
            }
        }

        // lazy load
        import( /* webpackChunkName: "sendAjax" */ './sendAjax.js').then(module => {
            var sendAjax = module.default;
        });
        $('.header_list').hover(function () {
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // 首页游标回到 102
                init.headerAniLink(102)
            });
        })

        $('.login-reg').on('click', () => {
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 打开登陆
                delegate.showLogPage()
            });
        })

        $('.det_tag_bx .tt-item').on('click', function () {
            var _this = $(this)
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 切换标签
                var pnIndex = _this.index()
                delegate.init({
                    pnIndex: pnIndex
                })
            });
        })

        $('#myPlayBtn').on('click', function (e) {
            var eventTarget = e.currentTarget
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // //实例化播放器
                init.detPlayer(root.videoSrc[0])
            });
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
            import( /* webpackChunkName: "init" */ './init.js').then(module => {
                var init = module.default;
                // //实例化播放器
                init.detPlayer(root.videoSrc[0])
            });
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
    }
    console.log(root);

}(window.mylib || (window.mylib = {})));