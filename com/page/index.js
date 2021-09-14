import template from "./tpl.js"
export default {
    name: "ta-page",
    template: template,
    props: ['header', 'logo'],
    data:function () {
        return {
            nav: TA.nav,
            isCollapse: false,
            navActive: location.pathname + location.search,
        }
    },
    methods: {
        handleSelect(index) {
            if (index) {
                location.href = index
            }
        },
        isEmptyArray(arr) {
            if (Array.isArray(arr)) {
                return arr.length == 0
            }
           return !arr
        }
    },
}