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

export default {

    name: 'menu-item',

    props: {
        itemInfo: {
            type: Object
        }
    },

    data() {
        return {
            duration: 300,
            animate: null
        };
    },

    methods: {
        async waitStop() {
            if (this.animate) {
                await this.animate.deferred.promise;
            }
        },
        async goUp() {
            await this.waitStop();
            console.log('go up');
            await this.startAnimate(0, -180);
        },
        async goDown() {
            await this.waitStop();
            this.startAnimate(-180, 0);
        },
        startAnimate(from, to) {
            if (this.animate) {
                this.animate.stop();
            }

            let dfd = new Deferred();
            this.animate = new Animate(from, to, this.duration, num => {
                let styleContent = ['-ms-', '-o-', '-moz-', '-webkit-', '']   // 浏览器前缀
                    .map(prev => `${prev}transform:rotate3d(1,0,0,${num}deg);`)
                    .join('');
                this.$el.style.cssText = styleContent;
            }, () => dfd.resolve());
            this.animate.tween = Tween.Linear;
            this.animate.start();
            return dfd.promise;
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

        &:hover {
            color: #fff;
            background: #f06262;
        }
    }
}
</style>

