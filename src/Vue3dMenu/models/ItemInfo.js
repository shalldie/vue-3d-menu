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
        this.next = next;
    }

    /**
     * 显示的文字
     * 
     * @type {string}
     * @memberof ItemInfo
     */
    title

    /**
     * 点击执行的回调函数
     * 
     * @type {Function}
     * @memberof ItemInfo
     */
    click

    /**
     * 下一个节点
     * 
     * @type {ItemInfo}
     * @memberof ItemInfo
     */
    next = null

}
