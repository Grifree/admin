import template from "./tpl.js"
export default {
    name: "page-game",
    template: template,
    props: [],
    data:function () {
        return {
        }
    },
    created() {

    },
    methods: {
        // 不要漏掉 ...TA.m
        ...TA.m
    },
}