# vue-3d-menu

> Vue 的3d菜单组件。

## Examples
![vue-3d-menu](https://user-images.githubusercontent.com/9987486/38456467-918f76d2-3ab7-11e8-841e-04c2a51c765e.gif)

[To see a demo.](https://shalldie.github.io/demos/vue-3d-menu/)

## Installation
    npm install vue-3d-menu

## Usage

```js
import Vue from 'vue';
import Vue3dMenu from 'vue-3d-menu';
// let Vue3dMenu = window.Vue3dMenu.default;  // window
// let Vue3dMenu = require('vue-3d-menu').default;  // commonjs
```

```js
// regist 注册组件

Vue.use(Vue3dMenu);  // global

// or

new Vue({
    el: 'body',
    components: { Vue3dMenu }  // local
});
```

```js
// template:
<vue-3d-menu 
    :title="'3D & 菜单'"
    :items="items"
></vue-3d-menu>

// data:
data() {
    return {
        items: [{ title: '>_<#@!', click: ()=> alert('hello~') }]
    };
}
```

## Support
    Chrome and Firefox

# Api

## Properties

An array of ItemInfo: `Array<ItemInfo>`

ItemInfo:

| Name  |    Type    | Default |                            Description                             |
| :---- | :--------: | :-----: | :----------------------------------------------------------------- |
| title |  `String`  |  `''`   | The label of an item. <br> 某一项显示的文字                        |
| click | `Function` | `null`  | The callback when you click this item. <br> 点某一项时候进行的回调 |

# Enjoy it! :D
