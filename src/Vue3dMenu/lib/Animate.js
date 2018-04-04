import Tween from './Tween';
import Deferred from "./Deferred";

/**
 * 缓动动画类
 * 
 * @export
 * @class Animate
 */
export default class Animate {
    //#region private fields 私有字段

    /**
     * 是否可用
     * 
     * @memberof Animate
     */
    _enable = true;

    /**
     * 起始时间
     * 
     * @memberof Animate
     */
    _timeBase = +new Date;

    /**
     * 起始值
     * 
     * @memberof Animate
     */
    _from;

    /**
     * 目标值
     * 
     * @memberof Animate
     */
    _to;

    /**
     * 持续时间
     * 
     * @memberof Animate
     */
    _duration;

    //#endregion

    /**
     * Creates an instance of Animate.
     * @param {number} from 起始值
     * @param {number} to 目标值
     * @param {number} duration 持续时间
     * @param {(num:number)=>void} stepFn 每一步的回调
     * @param {(num:number)=>void} endFn 结束的回调
     * @memberof Animate
     */
    constructor(from, to, duration, stepFn = function () { }, endFn = function () { }) {
        this._from = from;
        this._to = to;
        this._duration = duration;
        this._stepFn = stepFn;
        this._endFn = endFn;
    }

    //#region private methods 私有方法

    /**
     * 每一步的回调
     * 
     * @memberof Animate
     */
    _stepFn;

    /**
     * 结束的回调
     * 
     * @memberof Animate
     */
    _endFn;

    /**
     * 每一步的动作
     * 
     * @returns 
     * @memberof Animate
     */
    _step() {
        // 如果被禁用，返回
        if (!this._enable) {
            return;
        }

        let t = +new Date - this._timeBase; // 当前步长
        let ifEnd = false;  // 是否到最后一步

        //如果最后一步
        if (t > this._duration) {
            t = this._duration;
            ifEnd = true;
        }

        // 该步的结果
        let result = this.tween(t, this._from, this._to - this._from, this._duration);

        this._stepFn(result);

        if (ifEnd) {  //  结束则额外回调
            this._endFn(result);
            this.state = 2;
            this.deferred.resolve(result);
        }
        else {  // 否则递归
            setTimeout(this._step.bind(this), 17);
        }
    }

    //#endregion

    /**
     * 动画状态 0-waiting 1-pending 2-done/disabled
     * 
     * @memberof Animate
     */
    state = 0;

    /**
     * 缓动公式 {Tween.Linear|Tween.ElasticEaseOut}
     * 
     * @memberof Animate
     */
    tween = Tween.Linear;

    /**
     * 当前动画进度的 Deferred 对象
     * 
     * @memberof Animate
     */
    deferred = new Deferred();

    //#region public methods 公共方法

    /**
     * 开始动画
     * 
     * @returns 
     * @memberof Animate
     */
    start() {
        this.state = 1;
        this._step();
        return this;
    }

    /**
     * 禁用动画
     * 
     * @returns 
     * @memberof Animate
     */
    stop() {
        this.state = 2;
        this._enable = false;
        return this;
    }

    //#endregion
}
