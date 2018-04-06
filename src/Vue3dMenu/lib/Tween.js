/**
 * Tween 缓动函数
 */
export default {
    /**
     * 无效果
     */
    Linear: function (t, b, c, d) { return c * t / d + b; },
    /**
     * 超过范围的三次方缓动（(s+1)*t^3 - s*t^2）
     * 
     * @param {any} t 当前步长
     * @param {any} b 初始值
     * @param {any} c 变化量
     * @param {any} d 总步长
     * @param {any} s 可选。这里不输入
     * @returns {number}
     */
    BackEaseOut: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
};
