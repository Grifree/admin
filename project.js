TA.custom = {
    _req: {
        handleError(res, passCallback, failCallback) {
            res.data.error = res.data.error || {}
            res.data.error.code = res.data.error.code || 0
            if (res.data.error.code) {
                failCallback(res)
                return true
            } else {
                passCallback(res)
                return false
            }
        }
    }
}

TA.m['url_sms_send'] = function () {
    return "/admin/mock/pass.json"
}
TA.m['url_captcha'] = function () {
    return "/admin/mock/captcha.png"
}


TA.nav = {
    top: {
        logo: '',
        title: '',
    },
    logoutURL: "/admin/logout",
    items: [
        {
            url: '/admin/home',
            taIcon: 'display',
            title: "首页",
        },
        // {
        //     taIcon: 'qrcode',
        //     title: "二维码",
        //     auth:"qrcode_view",
        //     items: [
        //         {
        //             faIcon: 'list-alt',
        //             url: TA.m.url_qrcode_batch_list(),
        //             title: '列表',
        //             auth:"qrcode_view",
        //         },
        //         {
        //             faIcon: 'pencil-square-o',
        //             url: TA.m.url_qrcode_batch_create(),
        //             title: '创建',
        //             auth:"qrcode_edit",
        //         },
        //     ]
        // },
    ]
}

TA.enum = {
    prizeType: [
        {
            key: 'Money',
            value: 1,
            label: '红包',
        },
        {
            key: 'Goods',
            value: 2,
            label: '商品',
        },
        {
            key: 'Integral',
            value: 3,
            label: '积分',
        },
    ],
}