module.exports = {
    // 定义全局
    root: window.wangjiao,
    // 固定导航游标
    headerAniLink: function (leftValue) {
        var oLiArray = Array.prototype.slice.call(document.getElementsByClassName("header_nav_tag"), 0)
        var oBg = document.getElementsByClassName("link-b-bar")[0]
        oLiArray.forEach(item => {
            item.onmouseenter = function () {
                startMove(oBg, this.offsetLeft)
                return false
            }
        });
        var oList = document.getElementsByClassName("list-b")[0]
        document.getElementsByClassName("list-b")[0].onmouseout = function () {
            clearTimeout(oList.backTimer)
            this.backTimer = setTimeout(() => {
                goBack(leftValue)
            }, 1000);
            return false
        }

        function goBack(leftValue) {
            clearInterval(oBg.timer)
            startMove(oBg, leftValue)
        }
        // 加速运动
        function startMove(dom, mid) {
            clearInterval(dom.timer)
            var iSpeed = 0
            var a = 0
            // 摩擦力
            var u = 0.9
            dom.timer = setInterval(function () {
                a = (mid - dom.offsetLeft) / 15
                iSpeed = iSpeed + a
                iSpeed = iSpeed * u
                if (Math.abs(dom.offsetLeft - mid) < 1 && iSpeed < 1) {
                    clearInterval(dom.timer)
                } else {
                    dom.style.left = dom.offsetLeft + iSpeed + "px"
                }
            }, 20)
        }
    },
    // 实例化播放器
    detPlayer: function () {
        var root = window.mylib
        if (!root.is_buy_lesson) {
            return false;
        } else {
            // console.log(root);
            var videoSrc = root.videoSrc[0]
            var timer = setTimeout(() => {
                root.player = new Aliplayer({
                    "id": "player-con",
                    "source": videoSrc,
                    "width": "100%",
                    "height": "100%",
                    "autoplay": false,
                    "isLive": false,
                    "rePlay": false,
                    "playsinline": true,
                    "preload": true,
                    "controlBarVisibility": "hover",
                    "useH5Prism": true,
                    "extraInfo": {
                        "crossOrigin": "anonymous"
                    },
                    components: [{
                        name: 'MemoryPlayComponent',
                        type: AliPlayerComponent.MemoryPlayComponent,
                    }],
                    "skinLayout": [{
                            "name": "bigPlayButton",
                            "align": "blabs",
                            "x": 30,
                            "y": 80
                        },
                        {
                            "name": "H5Loading",
                            "align": "cc"
                        },
                        {
                            "name": "errorDisplay",
                            "align": "tlabs",
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "infoDisplay"
                        },
                        {
                            "name": "tooltip",
                            "align": "blabs",
                            "x": 0,
                            "y": 56
                        },
                        {
                            "name": "thumbnail"
                        },
                        {
                            "name": "controlBar",
                            "align": "blabs",
                            "x": 0,
                            "y": 0,
                            "children": [{
                                    "name": "progress",
                                    "align": "blabs",
                                    "x": 0,
                                    "y": 44
                                },
                                {
                                    "name": "playButton",
                                    "align": "tl",
                                    "x": 15,
                                    "y": 12
                                },
                                {
                                    "name": "timeDisplay",
                                    "align": "tl",
                                    "x": 10,
                                    "y": 7
                                },
                                {
                                    "name": "fullScreenButton",
                                    "align": "tr",
                                    "x": 10,
                                    "y": 12
                                },
                                {
                                    "name": "setting",
                                    "align": "tr",
                                    "x": 15,
                                    "y": 12
                                },
                                {
                                    "name": "volume",
                                    "align": "tr",
                                    "x": 5,
                                    "y": 10
                                },
                                {
                                    "name": "snapshot",
                                    "align": "tr",
                                    "x": 10,
                                    "y": 12
                                }
                            ]
                        }
                    ]
                }, function (player) {
                    // console.log("播放器创建了。");
                });
            }, 250);
        }
        // clearTimeout(timer)
    },
    // 初始化 课程中心 课程分类 课程列表
    initLesCenter: function (cateId) {
        var root = window.mylib
        // console.log('初始化课程分类')
        if (cateId == ''){
            // console.log('无选择')
            // 发GET请求 后台 获取所有分类
            // console.log(root.sendAjax)
            var cate_id = $('.select_fl:first').find('.fl_tag:first').attr('data-id')

            var url = root.lesCateUrl
            var sourceDelegate = 'centerLes'
            var data = {
                cate_id:cate_id
            }
            console.log(data, url)
            root.sendAjax.getMd(sourceDelegate , url, data)
        }
    }
}