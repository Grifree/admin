import qs from "https://esm.nimo.run/query-string@7.0.0"
import axios from "https://esm.nimo.run/axios@0.21.1"
import dayjs from "https://esm.nimo.run/dayjs@1.8.21"
window.TA = {
    m: {},
}
TA.dayjs = dayjs
TA.qs = qs
TA.m._isDemo = function() {
    return ['localhost', 'admin.2type.cn'].some(function (item){
        return item == location.hostname
    })
}
// 返回页面 GET 参数,
// /news?id=1&name=nimo 返回 {id:"1",name:"nimo"}
TA.m._query = function() {
    return qs.parse(location.search)
}
// 返回 formKind 对应的中文
// 当页面url 包含 ?formKind=create 时返回 "创建"
// 当页面url 包含 ?formKind=update 时返回 "编辑"
TA.m._formKindLabel = function() {
    let map = {
        'create': "创建",
        'update': "编辑",
    }
    return map[qs.parse(location.search).formKind || this.formKind || __RENDER_DATA.formKind] || ''
}
// 读取页面搜索参数
TA.m._readSearch = function() {
    if (!qs.parse(location.search).json) {
        return {}
    }
    return JSON.parse(qs.parse(location.search).json)
}
document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 91:
            TA._data.commandKeyDown = true
    }
};
document.onkeyup = function(event) {
    switch (event.keyCode) {
        case 91:
            TA._data.commandKeyDown = false
    }
};
TA._data = {
    commandKeyDown: false
}
// 跳转至 url
TA.m._jump = function (url) {
    if (TA._data.commandKeyDown) {
        window.open(url)
    } else {
         location.href = url
    }
}
TA.m._open = function (url) {
    window.open(url)
}
// 提交数据到当前页面
TA.m._submit = function(data, passCallback, failCallback) {
    TA.m._submitURL(location.pathname, data, passCallback, failCallback)
}
// 提交数据到指定页面
TA.m._submitURL = function(url, data, passCallback, failCallback) {
    TA.m._req({
        method: "post",
        url: url,
        data:data,
    }, passCallback, failCallback)
}
TA.m._find = function (searchEnum, searchKey, searchValue) {
    const data = TA.enum[searchEnum]
    if (!data) {
        console.log(`_find(${searchEnum}, ${searchKey}, ${searchValue}) TA.m.${searchEnum} can not found`)
        return
    }
    searchKey = searchKey || "key"
    let out = ""
    data.some(function (item) {
        if (item[searchKey] == searchValue) {
            out = item
            return true
        }
    })
    return out
}
TA.m._enum = function () {
    return TA.enum
}
/*
    发起请求
    config 参数 参考 http://www.axios-js.com/zh-cn/docs/
    cb 参数是一个函数:
    TA.m._req({...}, function(res) {
      console.log(res)
    })
*/
TA.default = {
    hook: {
        req: {
            failCallback: function (res) {
                ELEMENT.Message({
                    type: 'error',
                    message: res.data.error.message,
                })
            },
            passCallback: function (res) {
                res.data = res.data || {}
                if (res.data.jump) {
                    if (/\(\)$/.test(res.data.jump) && /^url_/.test(res.data.jump)) {
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
                        res.data.jump = urlfn()
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
            }
        }
    }
}
TA.m._req = function (config, passCallback, failCallback) {
    let settings = config
    settings.responseType = settings.responseType || "json"
    const loading = ELEMENT.Loading.service({
              lock: true,
              text: settings.$LoadingText || 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
    axios(settings).then(function (res) {
        loading.close()
        if (!failCallback) {
            failCallback = TA.default.hook.req.failCallback
        }
        if (!passCallback) {
            passCallback = TA.default.hook.req.passCallback
        }
        TA.hook._req.handleError(res, passCallback, failCallback)
    }).catch(function (err) {
        loading.close()
        alert(err)
    })
}
// 列表页跳转专用
TA.m._list = function (data, page) {
    TA.m._listURL(location.pathname, data, page)
}
TA.m._export = function (data) {
    TA.m._exportURL(location.pathname, data)
}
TA.m._exportURL = function (path, data) {
    data.export = true
    TA.m._open(path + "?" + TA.qs.stringify({
        json: JSON.stringify(data)
    }))
}
// 列表页跳转专用
TA.m._listURL = function(path, data, page) {
    if (page) {
        data['page'] = page
    } else {
        data['page'] = 1
    }
    TA.m._jump(path + "?" + TA.qs.stringify({
        json: JSON.stringify(data)
    }))
}
import Upload from "./module/upload/index.js"
Vue.component(Upload.name, Upload)

import UploadList from "./module/uploadList/index.js"
Vue.component(UploadList.name, UploadList)

import Page from "./module/page/index.js"
Vue.component(Page.name, Page)

import Box from "./module/box/index.js"
Vue.component(Box.name, Box)

import Editor from "./module/editor/index.js"
Vue.component(Editor.name, Editor)

window.onload = function (){
    document.getElementById('ta-app').style.display="block"
}