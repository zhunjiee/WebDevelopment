// 获取任意一个元素的任意一个属性的当前值
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}


// 动画函数
function animate(element, styleJSON, fn) {
    clearInterval(element.timeId);

    element.timeId = setInterval(function() {
        // 判断是否到达目标
        var flag = true;
        for (var attr in styleJSON) {
            if (attr === 'opacity') { // 设置透明度
                var current = getStyle(element, attr) * 100;
                var target = styleJSON[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;
            } else if (attr === 'zIndex') { // 设置层级
                element.style[attr] = styleJSON[attr];
            } else { // 设置位置
                var current = parseInt(getStyle(element, attr));
                var target = styleJSON[attr];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + 'px';
            }

            // 循环完成flag变成true,再进行下面的操作
            if (current != target) {
                flag = false;
            }
        }
        // 循环完成了,flag=true,清除定时器,执行回调函数
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }

        // console.log('目标：' + target + ',当前：' + current + ',每次移动步数：' + step);
    }, 20);
}