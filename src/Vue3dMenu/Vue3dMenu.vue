<template>
<div class="vue-3d-menu">
    <div ref="menu" @mousemove="handleMove" @mouseout="handleOut" class="menu-wrap">
        <div class="vue-3d-menu-title">{{title}}</div>
        <menu-item :itemInfo="itemInfo"></menu-item>
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
        itemInfo() {
            let resultItem;
            for (let i = this.items.length - 1; i >= 0; i--) {
                let { title, click } = this.items[i];
                let item = new ItemInfo(title, click);
                item.next = resultItem;
                resultItem = item;
            }
            return resultItem;
        }
    },

    methods: {
        handleMove({ offsetX }) {
            let offset = (offsetX - 146 / 2) * 0.5;
            this.setOffsetY(offset);

        },
        handleOut() {
            // this.setOffsetY(0);
        },
        setOffsetY(offsetY) {
            let styleContent = ['-ms-', '-o-', '-moz-', '-webkit-', '']   // 浏览器前缀
                .map(prev => `${prev}transform:rotate3d(0,1,0,${offsetY}deg);`)
                .join('');
            this.$refs.menu.style.cssText = styleContent;
        }
    },

    created() {

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
        perspective: 800px;
        transform-style: preserve-3d;
        transition: 0.233s;
        background: url(./assets/topMenu.png) no-repeat;

        .vue-3d-menu-title {
            padding-top: 18px;
            line-height: 36px;
            text-indent: 50px;
            font-size: 16px;
            color: #fff;
            font-weight: bold;
        }
    }
}
</style>
