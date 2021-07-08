import qs from "https://cdn.skypack.dev/query-string@7.0.0"

TA.URL = qs
TA.methods = {}
TA.QUERY = function() {
    return qs.parse(location.search)
}
TA.methods.QUERY = TA.QUERY
TA.JUMP = function (href) {
    location.href = href
}
TA.methods.JUMP = TA.JUMP
TA.custom = {
    REQ: {
        handleError(res) {
            res.error = res.error || {}
            res.error.code = res.error.code || 0
            if (res.error.code) {
                alert(res.error.message)
                return true
            }
            return false
        }
    }
}
TA.SUBMIT = function(data) {
    TA.REQ({
        method: "post",
        url: location.pathname,
        data:data,
    }, function (res) {
        console.log(res)
    })
}
TA.methods.SUBMIT = TA.SUBMIT
TA.REQ = function (settings, cb) {
    settings.responseType = settings.responseType || "json"
    settings.responseType = settings.responseType || "json"
    const loading = ELEMENT.Loading.service({
              lock: true,
              text: settings.$LoadingText || 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
    axios(settings).then(function (res) {
        loading.close()
        if (TA.custom.REQ.handleError(res)) {
            return
        }
        if (cb) {
            cb(res)
        }
    }).catch(function (err) {
        loading.close()
        alert(err)
    })
}
TA.methods.REQ = TA.REQ
TA.LIST = function(data, page) {
    if (page) {
        data['page'] = page
    } else {
        data['page'] = 1
    }
    location.href = location.pathname + "?" + TA.URL.stringify(data)
}
TA.methods.LIST = TA.LIST
document.getElementById('app').style.display = 'block'