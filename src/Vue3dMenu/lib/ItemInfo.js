import Deferred from "./Deferred";
import Animate from "./Animate";
import Tween from './Tween';

const upDuration = 300;
const upInvokeNum = -90;
const downDuration = 700;
const downInvokeNum = -90;

/**
 * 节点信息
 * 
 * @export
 * @class ItemInfo
 */
export default class ItemInfo {

    /**
     * Creates an instance of ItemInfo.
     * @param {any} title 显示的文字
     * @param {any} [click=function () { }] 点击执行到回调函数
     * @memberof ItemInfo
     */
    constructor(title, click = function () { }) {
        this.title = title;
        this.click = click;
    }

    /**
     * 显示的文字
     * 
     * @type {string}
     * @memberof ItemInfo
     */
    title;

    /**
     * 点击执行的回调函数
     * 
     * @type {Function}
     * @memberof ItemInfo
     */
    click;

    /**
     * 上一个节点
     * 
     * @type {ItemInfo}
     * @memberof ItemInfo
     */
    prev = null;

    /**
     * 下一个节点
     * 
     * @type {ItemInfo}
     * @memberof ItemInfo
     */
    next = null;

    /**
     * 数值更新的回调
     * 
     * @memberof ItemInfo
     */
    onUpdate = function (num) { };

    /**
     * 是否打开
     * 
     * @type {number}
     * @memberof ItemInfo
     */
    open = false;

    /**
     * 动画对象
     * 
     * @type {Animate}
     * @memberof ItemInfo
     */
    animate = null;

    /**
     * 是否禁用
     * 
     * @memberof ItemInfo
     */
    disabled = false;

    /**
     * 已完成状态
     * 
     * @memberof ItemInfo
     */
    done = Promise.resolve();

    /**
     * 向上翻滚
     * 
     * @memberof ItemInfo
     */
    goUp() {
        this.disabled = false;
        if (!this.open) {
            this.done = Promise.resolve();
            this.prev && this.prev.goUp();
            return;
        }
        let dfd = new Deferred();
        this.done = dfd.promise;
        let hasInvoked = false;
        this.animate = new Animate(0, -180, upDuration,
            num => {
                this.onUpdate(num);
                if (num < upInvokeNum && !hasInvoked && !this.disabled) {
                    hasInvoked = true;
                    this.prev && this.prev.goUp();
                }
            },
            () => {
                this.open = false;
                dfd.resolve();
            });
        this.animate.start();
    }

    goDown() {
        this.disabled = false;
        if (this.open) {
            this.done = Promise.resolve();
            this.next && this.next.goDown();
            return;
        }
        let dfd = new Deferred();
        this.done = dfd.promise;
        let hasInvoked = false;
        this.animate = new Animate(-180, 0, downDuration,
            num => {
                this.onUpdate(num);
                if (num > downInvokeNum && !hasInvoked && !this.disabled) {
                    hasInvoked = true;
                    this.next && this.next.goDown();
                }
            },
            () => {
                this.open = true;
                dfd.resolve();
            });
        this.animate.tween = Tween.BackEaseOut;
        this.animate.start();
    }

    stop() {
        this.disabled = true;
        return this.done;
    }

}
