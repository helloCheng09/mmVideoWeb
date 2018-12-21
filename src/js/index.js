import '../index.html'
import '../css/common.css'
import '../css/index.css';
import '../css/StyleDepend/swiper.min.css';
import 'expose-loader?$!jquery'
import _ from 'lodash';
// import './init.js'

// import init from './init.js'
(function () {
    // 入口
    if (document.getElementById('indexWrp')) {
        console.log('首页');
        // 热替换
        import( /* webpackChunkName: "init" */ './init').then(module => {
            var init = module.default;
            // 首页游标回到0
            init.headerAniLink(0)
        });
        $('.login-reg').one('click', () => {
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
    } else if (0) {

    }

}());