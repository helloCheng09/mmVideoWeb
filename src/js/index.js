import _ from 'lodash';

import '../index.html'
import '../center_lesson.html'
import '../center_tec.html'

import '../css/common.css'
import '../css/index.css';
import 'expose-loader?$!jquery'
// import init from './init.js'

// import init from './init.js'

(function () {
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

        // 首页游标回到0
        // init.headerAniLink(0)

        $('.login-reg').on('click', () => {
            import( /* webpackChunkName: "delegate" */ './delegate').then(module => {
                var delegate = module.default;
                // 首页游标回到0
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

    }

}());