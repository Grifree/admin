TA.hook = {}
TA.hook._req = TA.hook._req || {}
// 后端操作成功响应: {"error": {"code": 0, "message": ""}}
// 后盾操作失败响应: {"error": {"code": 1, "message": "标题重复"}}
TA.hook._req.handleError= function (res, passCallback, failCallback) {
    // 数据格式补全
    res.data.error = res.data.error || {}
    res.data.error.code = res.data.error.code || 0

    // 失败判断
    if (res.data.error.code) {
        failCallback(res)
        return true
    } else {
        passCallback(res)
        return false
    }
}
// 枚举
// _find("skuType", "value", 1).label // "虚拟"
TA.enum = {}
TA.enum.skuType = [
    {
        key: 'digit',
        value: 1,
        label: '虚拟',
    },
    {
        key: 'object',
        value: 2,
        label: '实物',
    },
]

// url
TA.m.url_sms_send = function () {
    return "/sms/send"
}
TA.m.url_captcha = function () {
    return "/captcha"
}
TA.m.url_home = function () {
    return "/admin/home"
}

TA.m.url_demo_list = function () {
    let json = JSON.stringify({
        daterange: [
            TA.dayjs().subtract(6, 'day').format("YYYY-MM-DD"),
            TA.dayjs().format("YYYY-MM-DD")
        ]
    })
    return "/admin/demo_list?json=" + encodeURIComponent(json)
}
TA.m.url_demo_update = function (id) {
    return "/admin/demo_update?id=" + id
}
TA.m.url_demo_create = function () {
    return "/admin/demo_create"
}


TA.nav = {
    top: {
        logo: 'https://2type.nimo.run/icon/logo.svg',
    },
    logoutURL: "/admin/logout",
    items: [
        {
            url: TA.m.url_home(),
            icon: 'display',
            title: "首页",
        },
        {
            icon: 'shopping',
            title: "演示",
            items: [
                {
                    fontawesome: 'list-alt',
                    url: TA.m.url_demo_list(),
                    title: '列表',
                },
                {
                    fontawesome: 'pencil-square-o',
                    url: TA.m.url_demo_create(),
                    title: '创建',
                },
            ]
        },
    ]
}

