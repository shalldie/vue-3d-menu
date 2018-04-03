<template>
<div class="menu-item">
    <div class="menu-item-title">{{itemInfo.title}}</div>
    <menu-item v-if="itemInfo.next" :itemInfo="itemInfo.next"></menu-item>
</div>
</template>

<script>

export default {

    name: 'menu-item',

    props: {
        itemInfo: {
            type: Object
        }
    },

    data() {
        return {};
    }

};
</script>

<style lang="scss" scoped>
.menu-item {
    width: 100%;
    height: 31px;
    font-size: 0;
    transform-origin: center top;

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
    }
}
</style>

