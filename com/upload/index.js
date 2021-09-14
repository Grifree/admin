import template from "./tpl.js"
export default {
    name: "ta-upload",
    template: template,
    props: ['value','action', 'disabled'],
    data:function () {
        return {

        }
    },
    methods: {
        onSuccess(res) {
            if (TA.custom._req.handleError(res) == false) {
                this.$emit('input', {
                    id: res.data.id,
                    src: res.data.src,
                    filename: res.data.filename,
                })
            }
        },
        onRemove() {
            this.$emit('input', {
                id: '',
                src: '',
                filename: '',
            })
        }
    },
}