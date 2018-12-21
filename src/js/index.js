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
        // if (module.hot) {
        //     module.hot.accept('./init.js', function () {
        //         // 首页游标回到0
        //         init.headerAniLink(0)
        //     })
        // }
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

        // 首页游标回到0
        // init.headerAniLink(0)
        var swiper = module.default;
        // 实例轮播图
        var mySwiper = new Swiper('#Swiper1', {
            pagination: '.swiper-pagination',
        })
    } else if (0) {

    }

}());