import { createApp, h } from 'vue'
import SignBoard from './SignBoard.vue'
try {
    plugin.onConfig(function () {
        const root = document.createElement('div')
        createApp(h(SignBoard)).mount(root);
        return root;
    });
} catch (error) {
    const Element = document.getElementsByTagName('body')
    const tip = document.createElement('h2')
    tip.innerHTML = '插件暂不支持外部运行!!!'
    Element[0].appendChild(tip)
    console.error('插件暂不支持外部运行!!!')
}

