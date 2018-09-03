import Animate from "./Animate";
import Tween from './Tween';
import Deferred from './Deferred';
import ItemInfo from './ItemInfo';
import Queue from './Queue';

/**
 * 翻转逻辑类
 *
 * @export
 * @class Rotate
 */
export default class Rotate {

    /**
     * 节点集合
     * @type {Array<ItemInfo>}
     * @memberof Rotate
     */
    itemList = [];


    /**
     * 下一步操作的队列
     *
     * @memberof Rotate
     */
    queue = new Queue();

    /**
     * Creates an instance of Rotate.
     * @param {Array<ItemList>} itemList
     * @memberof Rotate
     */
    constructor(itemList) {
        this.itemList = itemList;
    }

    /**
     * 上卷
     *
     * @memberof Rotate
     */
    goUp() {
        this.attach(() => this.itemList[this.itemList.length - 1].goUp());
    }

    /**
     * 下卷
     *
     * @memberof Rotate
     */
    goDown() {
        this.attach(() => this.itemList[0].goDown());
    }

    /**
     * 向队列添加某个操作，覆盖之前的行为
     *
     * @param {Function} fn
     * @memberof Rotate
     */
    attach(fn) {
        this.queue.clear();
        this.queue.add(fn);
        Promise.all(this.itemList.map(item => item.stop()))
            .then(() => this.queue.dequeue());
    }

}
