<template>
<div id="app">
    <vue-3d-menu title="试听&咨询" :items="items"></vue-3d-menu>
</div>
</template>

<script>
export default {
    data() {
        let items = Array.apply(null, Array(10)).map((item, index) => ({ title: `第${index}项` }));
        return {
            items
        };
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    text-indent: 200px;
    color: #2c3e50;
    margin-top: 60px;
    box-shadow: 2px 2px 6px #999;
    width: 600px;
    height: 400px;
    margin: 50px auto;
    background: #e8d0ca;
}
</style>
