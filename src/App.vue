<template>
<div id="app">
    <vue-3d-menu title="3D & 菜单" :items="items"></vue-3d-menu>
</div>
</template>

<script>
export default {
    data() {
        let items = [
            '>_<#@!',
            '(^(OO)^) ≡',
            '^_^;',
            '→_→',
            '(＝^ω^＝)',
            '…(⊙_⊙;)… ',
            'O__O" ',
            'O_o',
            '（⊙o⊙）',
            '（*>.<*）~'
        ].map(item => ({ title: item, click: () => alert(item) }));

        return {
            items
        };
    }
};
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
}
body {
    background: #e8d0ca url(https://i.loli.net/2018/04/07/5ac8505922be2.jpg)
        no-repeat;
    background-position: center top;
}
#app {
    float: right;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-right: 50px;
}
</style>
