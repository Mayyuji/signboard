import { createApp, h } from 'vue'
import SignBoard from './SignBoard.vue'
import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css";
import "./assets/tailwind.css"
try {
    plugin.onConfig(function () {
        const root = document.createElement('div')
        createApp(h(SignBoard)).mount(root);
        return root;
    });
} catch (error) {
    const Element = document.getElementsByClassName("test")
    const tip = document.createElement('div')
    tip.innerHTML = '插件暂不支持外部运行!!!'
    Element[0].appendChild(tip)
    // console.error('插件暂不支持外部运行!!!')
    createApp(SignBoard).mount(tip);
}

