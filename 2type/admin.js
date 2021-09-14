import qs from "https://cdn.skypack.dev/query-string@7.0.0"
import axios from "https://cdn.skypack.dev/axios@0.21.1"
import dayjs from "https://cdn.skypack.dev/dayjs@1.8.21"

window.TA = {
    m: {},
}
TA.dayjs = dayjs
TA.qs = qs
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
    return map[qs.parse(location.search).formKind || this.formKind] || ''
}
// 读取页面搜索参数
TA.m._readSearch = function() {
    if (!qs.parse(location.search).json) {
        return {}
    }
    return JSON.parse(qs.parse(location.search).json)
}
// 跳转至 url
TA.m._jump = function (url) {
    location.href = url
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
TA.m._find = function (data,searchValue, searchKey) {
    searchKey = searchKey || "id"
    let out = ""
    data.some(function (item) {
        if (item[searchKey] == searchValue) {
            out = item
            return true
        }
    })
    return out
}
/*
    发起请求
    config 参数 参考 http://www.axios-js.com/zh-cn/docs/
    cb 参数是一个函数:
    TA.m._req({...}, function(res) {
      console.log(res)
    })
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
            failCallback = function (res) {
                ELEMENT.Message({
                    type: 'error',
                    message: res.data.error.message,
                })
            }
        }
        if (!passCallback) {
            passCallback = function (res) {
                res.data = res.data || {}
                if (res.data.jump) {
                    let page = res.data.jumpPageName || res.data.jump
                    ELEMENT.Message({
                        type: 'info',
                        message: '即将跳转至: ' + page,
                    })
                    setTimeout(function () {
                        location.href = res.data.jump
                    }, 1000)
                }
            }
        }
        TA.custom._req.handleError(res, passCallback, failCallback)
    }).catch(function (err) {
        loading.close()
        alert(err)
    })
}
// 列表页跳转专用
TA.m._list = function(data, page) {
    if (page) {
        data['page'] = page
    } else {
        data['page'] = 1
    }
    location.href = location.pathname + "?" + TA.qs.stringify({
        json: JSON.stringify(data)
    })
}
import Upload from "../com/upload/index.js"
Vue.component(Upload.name, Upload)
import Page from "../com/page/index.js"
Vue.component(Page.name, Page)

setTimeout(function () {
    document.getElementById('ta-app').style.display = 'block'
}, 0)

