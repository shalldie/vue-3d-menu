<template>
<div class="vue-3d-menu">
    <div ref="menu" @mousemove="handleMove" @mouseenter="handleEnter" @mouseleave="handleLeave" class="menu-wrap">
        <div class="vue-3d-menu-title">{{title}}</div>
        <menu-item :itemInfo="itemList[0]"></menu-item>
    </div>
</div>
</template>

<script>
import MenuItem from "./MenuItem";
import ItemInfo from './models/ItemInfo';

export default {

    props: {
        title: {
            type: String,
            default: 'hello menu'
        },
        items: {
            type: Array,
            required: true
        }
    },

    data() {
        return {

        };
    },

    computed: {
        itemList() {
            let list = this.items.map(({ title, click }) => new ItemInfo(title, click));
            list.reduce((prev, current) => {
                prev && (prev.next = current);
                current && (current.prev = prev);
                return current;
            });
            return list;
        }
    },

    methods: {
        handleMove({ offsetX }) {
            let offset = (offsetX - 146 / 2) * 0.5;
            this.setOffsetY(offset);

        },
        handleEnter() {
            // this.itemList[0].vm.goDown();
        },
        handleLeave() {
            this.itemList[this.itemList.length - 1].vm.goUp();
        },
        setOffsetY(offsetY) {
            let styleContent = ['-ms-', '-o-', '-moz-', '-webkit-', '']   // 浏览器前缀
                .map(prev => `${prev}transform:rotate3d(0,1,0,${offsetY}deg);`)
                .join('');
            this.$refs.menu.style.cssText = styleContent;
        }
    },

    created() {
        console.log(this.itemList);
        // let i = 0;
        // let itemInfo = this.itemInfo;
        // // console.log(itemInfo);

        // while (itemInfo) {
        //     console.log('while');
        //     let temp = itemInfo;
        //     setTimeout(() => {
        //         console.log(temp.vm);
        //         temp.vm.goUp();
        //     }, 1000 * 12 - 1000 * i++);

        //     itemInfo = itemInfo.next;
        // }
        // console.log('created');
        this.$nextTick(async () => {
            // console.log('nexttick');
            // for (let i = this.itemList.length - 1; i >= 0; i--) {
            //     let item = this.itemList[i];
            //     await item.vm.goUp();
            // }
            this.itemList[this.itemList.length - 1].vm.goUp();
        });
        window.list = this.itemList;
    },

    components: {
        MenuItem
    }
}
</script>

<style lang="scss" scoped>
.vue-3d-menu {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 146px;
    height: 54px;
    perspective: 800px;
    transform-style: preserve-3d;

    .menu-wrap {
        transform-style: preserve-3d;
        // transition: 0.1s;
        z-index: 999;

        .vue-3d-menu-title {
            background: url(./assets/topMenu.png) no-repeat;
            transform: translateZ(1px);
            padding-top: 18px;
            line-height: 36px;
            text-indent: 50px;
            font-size: 16px;
            color: #fff;
            font-weight: bold;
            z-index: 999;
        }
    }
}
</style>
