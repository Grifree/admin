import template from "./tpl.js"
export default {
    name: "ta-page",
    template: template,
    props: ['header', 'logo'],
    data:function () {
        return {
            nav: TA.nav,
            footer: TA.footer,
            isCollapse: false,
            navActive: location.pathname + location.search,
        }
    },
    methods: {
        icon(path) {
            if (!/^(http)/.test(path)) {
                return 'https://icon.2type.cn/'+ path +'.svg'
            } else {
                return path
            }
        },
        handleSelect(url) {
            if (url) {
                TA.m._jump(url)
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