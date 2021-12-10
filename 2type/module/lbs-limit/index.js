import template from "./tpl.js"
import area from "./area.js"
import copy from "https://cdn.skypack.dev/copy-to-clipboard@3.3.1"
export default {
    name: "ta-lbs-limit",
    template: template,

    data: function() {
        let data = []
        area[0].forEach(function (item) {
            let city = []
            if (item.cidx && item.cidx.length === 2) {
                let cityArea = area[1].slice(item.cidx[0], item.cidx[1])
                cityArea.forEach(function (item) {
                    let district = []
                    if (item.cidx && item.cidx.length === 2) {
                        let districtArea = area[2].slice(item.cidx[0], item.cidx[1])
                        districtArea.forEach(function (item) {
                            district.push({
                                label: item.fullname,
                                value: item.id,
                            })
                        })
                    }
                    city.push({
                        label: item.fullname,
                        value: item.id,
                        children: district,
                    })
                })
            }
            data.push({
                label: item.fullname,
                value: item.id,
                children: city,
            })
        })
        return {
            selected: [],
            inverse: [],
            type: 'unlimited',
            data:  data
        }
    },
    props:{
        value: {
            type: Object,
            default: function () {
                return {
                    type: "unlimited",
                    inverse: [],
                    selected: [],
                }
            }
        }
    },
    created: function() {
        const vm = this
        // 让调用方只需要配置 value={}
        if (vm.value.type === "unlimited") {
            vm.$emit('input', vm.value)
        }
    },
    methods: {
        changeType: function(v) {
            const vm = this
            let value = vm.value
            value.type = v
            switch (value.type) {
                case "unlimited":
                    value.selected = []
                    value.inverse = []
                case "selected":
                    value.inverse = []
                case "inverse":
                    value.selected = []
                case "selectedAndInverse":
                    // 啥也不干
            }
            vm.$emit('input', value)
        },
        changeSelected: function(v) {
            const vm = this
            let value = vm.value
            value.selected = v
            vm.$emit('input', value)
        },
        changeInverse: function(v) {
            const vm = this
            let value = vm.value
            value.inverse = v
            vm.$emit('input', value)
        },
        copyInverse: function () {
            copy(JSON.stringify(this.value.inverse))
        },
        setInverse: function () {
            let newValue = prompt("粘贴内容")
            this.changeInverse(JSON.parse(newValue))
        },
        copySelected: function () {
            copy(JSON.stringify(this.value.selected))
        },
        setSelected: function () {
            let newValue = prompt("粘贴内容")
            this.changeSelected(JSON.parse(newValue))
        }
    },
}