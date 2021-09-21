import qs from "https://esm.nimo.run/query-string@7.0.0"
import axios from "https://esm.nimo.run/axios@0.21.1"
import dayjs from "https://esm.nimo.run/dayjs@1.8.21"
window.TA = {
    m: {},
}
// https://dayjs.gitee.io/docs/zh-CN/manipulate/manipulate
TA.dayjs = dayjs
// https://www.npmjs.com/package/query-string/v/7.0.0
TA.qs = qs
//  https://axios-http.com/zh/docs/api_intro
TA.axios = axios

document.onkeydown = function(event) {
    if (event.key === 91) {
        TA._data.commandKeyDown = true
    }
}
document.onkeyup = function(event) {
    if (event.key === 91) {
        TA._data.commandKeyDown = false
    }
}

TA.DATA = {
    commandKeyDown: false
}
/*
* 跳转页面
* @param {string} url
* */
TA.m._jump = function (url) {
    if (TA.DATA.commandKeyDown) {
        window.open(url)
    } else {
        location.href = url
    }
}
/*
* 打开新页面
* @param {string} url
* */
TA.m._open = function (url) {
    window.open(url)
}
/*
* 当前是否是演示环境
* @return {boolean}
* */
TA.m._isDemo = function() {
    return ['localhost', 'admin.2type.cn'].some(function (item){
        return item == location.hostname
    })
}
/*
* 返回页面 GET 参数
* @return {object}
* @example _query().id // 在 https://domain.com/path?id=abc 页面中返回 abc
* */
// /news?id=1&name=nimo 返回 {id:"1",name:"nimo"}
TA.m._query = function() {
    return qs.parse(location.search)
}
/*
* 返回 formKind 对应的中文
* @return {string}
* */
TA.m._formKindLabel = function() {
    let map = {
        'create': "创建",
        'update': "编辑",
    }
    let vm = this
    let query = qs.parse(location.search)
    let RenderData = __RENDER_DATA
    let key =  vm.formKind || query.formKind || RenderData.formKind
    return map[key] || '提交'
}

/*
* 读取页面搜索参数
* return {object}
* */
TA.m._readSearch = function() {
    if (!qs.parse(location.search).json) {
        return {}
    }
    return JSON.parse(qs.parse(location.search).json)
}

/*
    发起请求
    @param {config} axios 参数 - https://axios-http.com/zh/docs/api_intro
    @param {function} passCallback
    @param {function} failCallback
*/
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

/*
* 提交数据到当前页面
* @param {object} data - 数据
* @param {function} passCallback - 成功回调
* @param {function} failCallback - 失败回调
* */
TA.m._submit = function(data, passCallback, failCallback) {
    TA.m._submitURL(location.pathname, data, passCallback, failCallback)
}
/*
* 提交数据到 url
* @param {string} url - 请求地址
* @param {object} data - 数据
* @param {function} passCallback - 成功回调
* @param {function} failCallback - 失败回调
* */
TA.m._submitURL = function(url, data, passCallback, failCallback) {
    TA.m._req({
        method: "post",
        url: url,
        data:data,
    }, passCallback, failCallback)
}
TA.m._enum = function () {
    return TA.enum
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
TA.default = {
    hook: {
        req: {
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
    }
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