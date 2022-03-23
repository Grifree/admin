import template from "./tpl.js"
export default {
    name: "page-sku",
    template: template,
    props: [],
    data:function () {
        return {
            banner: [
                {
                    "photo": "https://cdn1.lianlianlvyou.com/lianlian/design/a2dfd9808a72418092f938c9ee3e0fb1.gif",
                    "link":  "",
                },
                {
                    "photo": "https://cdn1.lianlianlvyou.com/lianlian/design/a2dfd9808a72418092f938c9ee3e0fb1.gif",
                    "link":  "",
                },
            ]
        }
    },
    methods: {
        // 不要漏掉 ...TA.m
        ...TA.m,
        onSubmit () {

        },
        onClickLeft() {
            const vm = this
            vm.$router.back()
        }
    },
}