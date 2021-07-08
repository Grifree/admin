import template from "./tpl.js"
export default {
    name: "ta-upload-photo",
    template: template,
     model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: String,
        title: String,
    },
    data:function () {
        return {
            imageUrl: "",
        }
    },
    methods: {
        ...TA.methods,
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    },
}