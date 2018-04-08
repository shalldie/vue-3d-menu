<template>
<div class="menu-item">
    <div :class="{'menu-item-title':true,shadow:shadow}" @click="itemInfo.click">{{itemInfo.title}}</div>
    <menu-item v-if="itemInfo.next" :itemInfo="itemInfo.next"></menu-item>
</div>
</template>

<script>
import Animate from './lib/Animate';
import Deferred from './lib/Deferred';
import Tween from './lib/Tween';

export default {

    name: 'menu-item',

    props: {
        itemInfo: {
            type: Object
        }
    },

    data() {
        return {
            shadow: false
        };
    },

    methods: {
        setRotateStyle(rotate) {
            let styleContent = ['-ms-', '-o-', '-moz-', '-webkit-', '']   // 浏览器前缀
                .map(prev => `${prev}transform:rotate3d(1,0,0,${rotate}deg);`)
                .join('');
            this.$el.style.cssText = styleContent;
        }
    },

    created() {
        this.itemInfo.onUpdate = num => {
            this.setRotateStyle(num);
            if (num < -60) {
                this.shadow = true;
            }
            else {
                this.shadow = false;
            }
        }
    }

};
</script>

<style lang="scss" scoped>
.menu-item {
    width: 100%;
    height: 31px;
    font-size: 0;
    transform-origin: center top;
    transform-style: preserve-3d;
    transform: rotateX(-180deg);

    .menu-item-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        text-indent: 20px;
        background: #fff;
        color: #d16c6c;
        font-size: 14px;
        font-weight: normal;
        margin-top: 1px;
        cursor: pointer;
        z-index: 9;
        transition: 0.1s;

        &.shadow {
            background-color: rgb(223, 223, 223);
        }

        &.hidden {
            backface-visibility: hidden;
        }

        &:hover {
            color: #fff;
            background: #f06262;
        }
    }
}
</style>

