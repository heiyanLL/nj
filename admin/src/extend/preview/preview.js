import Vue from "vue";
import preview from './preview.vue'

const previewConstructor = Vue.extend(preview)
let instance

const Preview = function (optinos = {}) {
    instance = new previewConstructor({
        data: optinos
    }).$mount()
    document.body.appendChild(instance.$el); // 挂载到 body 下
}

export default Preview