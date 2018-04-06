/**
 * 回调队列类
 * 
 * @export
 * @class Queue
 */
export default class Queue {

    /**
     * 回调队列
     * 
     * @type {Array<Function>}
     * @memberof Callback
     */
    list = [];

    /**
     * 添加回调
     * 
     * @param {Function} fn 
     * @memberof Callback
     */
    add(fn) {
        this.list.push(fn);
    }

    /**
     * 清空队列
     * 
     * @memberof Callback
     */
    clear() {
        this.list = [];
    }

    /**
     * 依次出列
     * 
     * @memberof Callback
     */
    dequeue() {
        while (this.list.length) {
            let item = this.list.shift();
            item();
        }
    }

}
