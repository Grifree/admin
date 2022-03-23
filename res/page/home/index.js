import template from "./tpl.js"
export default {
    name: "page-home",
    template: template,
    props: [],
    data:function () {
        return {
            search:"",
            banner: [],
            list: [],
            loading: true,
        }
    },
    created() {
        const vm = this
        vm._req({
            $loading: false,
            method:"get",
            url: vm.url_mobile_home(),
        }, function (res) {
            vm.banner = res.data.banner
            vm.list = res.data.list
        }, null, function () {
            vm.loading = false
        })
    },
    methods: {
        // 不要漏掉 ...TA.m
        ...TA.m,
        clickSpu(item) {
            const vm = this
            vm.$router.push({ path: 'sku?id=' +item.id})
        }
    },
}