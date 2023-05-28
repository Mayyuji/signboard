import { createApp, h } from 'vue'
import MenuPage from './MenuPage.vue'
import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css"; // 组件内引入不生效
try {
    plugin.onConfig(function () {
        const root = document.createElement('div')
        root.style.width = "100%"
        root.style.height = "100%"
        createApp(h(MenuPage)).mount(root);
        return root;
    });
} catch (error) {
    const Element = document.getElementsByClassName("test")
    const tip = document.createElement('div')
    tip.style.width = "100%"
    tip.style.height = "100%"
    Element[0].appendChild(tip)
    // console.error('插件暂不支持外部运行!!!')
    createApp(MenuPage).mount(tip);
}

