<template>
<div class="menu-item">
    <div class="menu-item-title">{{itemInfo.title}}</div>
    <menu-item s-if="itemInfo.next" itemInfo="itemInfo.next"></menu-item>
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

    }

};
</script>

<style scoped>

</style>
