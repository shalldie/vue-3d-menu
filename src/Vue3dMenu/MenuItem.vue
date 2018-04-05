<template>
<div class="menu-item">
    <div class="menu-item-title">{{itemInfo.title}}</div>
    <menu-item v-if="itemInfo.next" :itemInfo="itemInfo.next"></menu-item>
</div>
</template>

<script>
import Animate from './lib/Animate';
import Deferred from './lib/Deferred';
import Tween from './lib/Tween';

const upDuration = 300;
const upInvokeNum = -90;
const downDuration = 800;
const downInvokeNum = 120;

export default {

    name: 'menu-item',

    props: {
        itemInfo: {
            type: Object
        }
    },

    data() {
        return {
            animate: null,
            disabled: false
        };
    },

    methods: {
        async stop() {
            if (this.animate) {
                await this.animate.deferred.promise;
            }
            this.disabled = false;
        },
        goUp() {
            let dfd = new Deferred();
            let hasInvoked = false;
            this.animate = new Animate(0, -180, upDuration, num => {
                if (num < upInvokeNum && !hasInvoked) {
                    hasInvoked = true;
                    this.itemInfo.prev && this.itemInfo.prev.vm.goUp();
                }
                this.setRotateStyle(num);
            }, () => dfd.resolve());
            this.animate.start();
            return dfd.promise;
        },
        goDown() {
            let dfd = new Deferred();
            let hasInvoked = false;
            this.animate = new Animate(-180, 0, downDuration, num => {
                if (num > downInvokeNum && !hasInvoked) {
                    hasInvoked = true;
                    this.itemInfo.next && this.itemInfo.next.vm.goDown();
                }
            }, () => dfd.resolve());
            this.animate.start();
            return dfd.promise;
        },
        setRotateStyle(rotate) {
            let styleContent = ['-ms-', '-o-', '-moz-', '-webkit-', '']   // 浏览器前缀
                .map(prev => `${prev}transform:rotate3d(1,0,0,${rotate}deg);`)
                .join('');
            this.$el.style.cssText = styleContent;
        }
    },

    created() {
        this.itemInfo.vm = this;
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

        &:hover {
            color: #fff;
            background: #f06262;
        }
    }
}
</style>

