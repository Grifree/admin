TA.hook = {
    _req: {},
    editor: {},
}
TA.hook._req = TA.hook._req || {}
// 后端操作成功响应: {"error": {"code": 0, "message": ""}}
// 后端操作失败响应: {"error": {"code": 1, "message": "标题重复"}}
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
// 配置富文本编辑器的上传图片插入
TA.hook.editor.insertImage = function (res, insert) {
    console.log("TA.hook.editor.insertImage:res:", res)
    insert(res.data.src)
}
TA.hook.req = {
    // 错误消息弹窗 {"code":1, "message":"标题重复"}
    failCallback: function (res) {
        ELEMENT.Message({
            type: 'error',
            message: res.data.error.message,
        })
    },
    // 控制跳转到任意地址 {"jump":"https://github.com/2type/admin", "code":0, "message":""}
    // 控制跳转到 TA.m {"jump":"url_home()", "code":0, "message":""}
    // 控制跳转到 TA.m 带参数 {"jump":"url_demo_update()", "jumpArgs": [1], "code":0, "message":""}
    // 成功提示 {"successMessage": "创建成功","code":0, "message":""}
    passCallback: function (res) {
        res.data = res.data || {}
        if (res.data.jump) {
            if (/^url_/.test(res.data.jump) && /\(\)$/.test(res.data.jump)) {
                const urlKey = res.data.jump.replace("()")
                console.log("跳转至 TA.m." + urlKey)
                const urlfn = TA.m[urlKey]
                if (typeof urlfn == "undefined") {
                    ELEMENT.Message({
                        type: 'error',
                        message: '跳转地址' + res.data.jump + "格式错误,未在 TA.m 中找到" + urlKey + "函数",
                    })
                    return
                }
                urlfn.apply(TA.m, res.data.jumpArgs)
            }
            let page = res.data.jumpPageName || res.data.jump
            ELEMENT.Message({
                type: 'info',
                message: '即将跳转至: ' + page,
            })
            setTimeout(function () {
                TA.m._jump(res.data.jump)
            }, 1000)
        }
        ELEMENT.Message({
            type: 'success',
            message: res.data.successMessage || '操作成功',
        })
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
TA.m.url_logout = function () {
    return "/admin/logout"
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
    // 头部
    top: {
        logo: 'https://2type.nimo.run/icon/logo.svg',
    },
    user: {
        avatar: "https://2type.github.io/icon/user-male.svg",
        name: "admin",
    },
    // 退出登录
    logoutURL: TA.m.url_logout(),
    // 导航
    items: [
        {
            url: TA.m.url_home(),
            // 可在 https://2type.github.io/icon/ 中寻找 icon
            icon: 'display',
            title: "首页",
        },
        {
            icon: 'shopping',
            title: "演示",
            items: [
                {
                    // 可在 http://www.fontawesome.com.cn/faicons/ 中寻找fontawesome
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

