import template from "./tpl.js"
export default {
    name: "page-order",
    template: template,
    props: [],
    data:function () {
        return {

        }
    },
    methods: {
        // 不要漏掉 ...TA.m
        ...TA.m,

    },
}