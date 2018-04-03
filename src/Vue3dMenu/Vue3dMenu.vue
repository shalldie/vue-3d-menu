<template>
<div class="vue-3d-menu">

</div>
</template>

<script>
import ItemInfo from './models/ItemInfo';

export default {

    props: {
        items: {
            type: Array
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

    }
}
</script>

<style scoped>
.vue-3d-menu {
    display: inline-block;
}
</style>
