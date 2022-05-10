import template from "./tpl.js"
export default {
    name: "ta-input-fen",
    template: template,
    props:['value', 'min', 'max', 'step', 'step-strictly', 'precision', 'size', 'disabled', 'controls', 'controls-position', 'name', 'label', 'placeholder'],

    computed: {

    },
    methods: {
        changeValue(value) {
            const vm = this
            vm.$emit('input', value)
        }
    }
}
