import template from "./tpl.js"
export default {
    name: "a-nav",
    template: template,
    data:function () {
        return {
            navActive: location.pathname + location.search,
        }
    },
    methods: {
        ...TA.methods,
        handleSelect(index) {
            location.href = index
        }
    },
}