export default {
    /**
     * 无效果
     */
    Linear: function (t, b, c, d) { return c * t / d + b; },
    /**
     * 指数衰减的正弦曲线缓动
     * 
     * @param {number} t 当前步长
     * @param {number} b 初始值
     * @param {number} c 变化量
     * @param {number} d 总步长
     * @param {any} a 可选。这里不输入
     * @param {any} p 可选。这里不输入
     * @returns {number}
     */
    ElasticEaseOut: function (t, b, c, d, a, p) {
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    }
};
