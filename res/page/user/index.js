import template from "./tpl.js"
export default {
    name: "page-user",
    template: template,
    props: [],
    data:function () {
        return {

        }
    },
    methods: {
        // 不要漏掉 ...TA.m
        ...TA.m,
        clickLoginBtn() {
            const vm = this
            vm.$store.dispatch("fetchUser")
        }
    },
}