module.exports = {
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
        // var leftValue = 0
        var backTimer = ''
        document.getElementsByClassName("list-b")[0].onmouseout = function () {
            clearTimeout(backTimer)
            backTimer = setTimeout(() => {
                goBack(leftValue)
            }, 800);
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
    }
}