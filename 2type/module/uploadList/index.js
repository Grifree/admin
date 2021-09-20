import template from "./tpl.js"
import Upload from "../upload/index.js"
export default {
    name: "ta-upload-list",
    component: {
        Upload,
    },
    template: template,
    props: ['value','action', 'disabled'],
    data:function () {
        return {

        }
    },
    methods: {
        addItem() {
            const vm = this
            vm.$emit("input", vm.value.concat([{
                id: "",
                src: "",
                filename:"",
            }]))
        },
        inputItem(inputIndex, value) {
            const vm = this
            vm.$emit("input", vm.value.map(function (item, index){
                if (inputIndex === index) {
                    return value
                }
                return item
            }))
        }
    },
}