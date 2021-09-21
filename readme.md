# 2type/admin

# 第三方库

```js
// 时间处理
// https://dayjs.gitee.io/docs/zh-CN/manipulate/manipulate
TA.dayjs = dayjs

// URL query 解析
// https://www.npmjs.com/package/query-string/v/7.0.0
TA.qs = qs

// http 请求(建议使用)
//  https://axios-http.com/zh/docs/api_intro
TA.axios = axios
```

# TA.m

TA.m 会挂载在 vm 中的 methods, 这样在模板中就可以直接使用

```js
new Vue({
    // ...
    methods: {
        ...TA.m,
    }
})
```
例如 TA.m 中定义了 `_jump` 方法 

```html
<el-button @click="_jump('https://github.com/2type/admin')" >创建</el-button>
```

在页面点击创建按钮后即可跳转至 `https://github.com/2type/admin`

### TA.m._jump(url:string)

**在模板中使用**

```html
<el-button @click="_jump('https://github.com/2type/admin')" >创建</el-button>
```

**在 methods 中使用**
```js
new Vue({
    methods: {
        ...TA.m,
        clickBtn() {
            const vm = this
            vm._jump('https://github.com/2type/admin')
        }
    }
})
```

### TA.m.open(url:string)

与 `TA.m._jump()` 方法类似,不同处在于 `TA.m.open()` 会**打开新页面**

### TA.m.url_home()

在 [./project.js](./project.js) 中以 `TA.m.url_` 作为前缀配置项目路由,用于同一管理跳转路径

```js
TA.m.url_home = function () {
    return "/admin/home"
}
TA.m.url_demo_update = function (id) {
    return "/admin/demo_update?id=" + id
}
```
这样在模板中可以直接使用

**无参数**

```html
<el-button @click="_jump(url_demo_create())" >创建</el-button>
```

**有参数**

```html
<el-table-column label="操作">
    <template slot-scope="scope">
        <el-button size="mini" @click="_jump(url_demo_update(scope.row.id))" >编辑</el-button>
    </template>
</el-table-column>
```

**页面初始参数**

例如有些列表页面需要时间范围默认选中最近7天,则可以通过如下代码实现.

```js
TA.m.url_demo_list = function () {
    let json = JSON.stringify({
    daterange: [
        TA.dayjs().subtract(6, 'day').format("YYYY-MM-DD"),
        TA.dayjs().format("YYYY-MM-DD")
    ]
    })
    return "/admin/demo_list?json=" + encodeURIComponent(json)
}
```


### TA.m._query()

返回页面 GET 参数

**模板中使用**

在 `https://domain.com/path?id=abc` 页面中

```html
<div>
    ID: {{_query().id}}
</div>
```

**在 methods 中使用**

```js
new Vue({
    methods: {
        ...TA.m,
        some() {
            const vm = this
            console.log("id:", vm._query().id)
        }
    }
})
```

### TA.m._formKindLabel()

返回 formKind 对应的中文

直接看源码吧

```js
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
```

### TA.m._readSearch()

由前端从 url query 的 json 中获取搜索参数

```js
let url = "http://domain.com/admin/demo_list?json=%7B%22title%22%3A%22%E6%A0%87%E9%A2%981%22%7D"
encodeURIComponent('{"title": "标题1"}')) == "%7B%22title%22%3A%22%E6%A0%87%E9%A2%981%22%7D"
```
```js
new Vue({
    // ...
    data: function () {
        const out = {
            ...__RENDER_DATA,
            search:TA.m._readSearch(),
            header: header,
        }
        return out
    },    
})
```

```html
<el-form :inline="true"  >
    <el-form-item label="标题">
        <el-input v-model="search.title"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="_list(search)">查询</el-button>
    </el-form-item>
</el-form>
```

源码也比较简单

```js
TA.m._readSearch = function() {
    if (!qs.parse(location.search).json) {
        return {}
    }
    return JSON.parse(qs.parse(location.search).json)
}
```

### TA.m._req(config, passCallback, failCallback)

发起 HTTP 请求

config 参数是 [axios](https://axios-http.com/zh/docs/api_intro) 的参数. 

`passCallback`  `failCallback` 是请求成功失败的回调,可以通过 在 [./project.js](./project.js) 中修改 
`TA.hook.req.handleError` 来匹配后端接口.

```js
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
```

### TA.m._submit(data, passCallback, failCallback)

提交数据到当前页面

**在模板中使用**

```html
<el-form-item>
    <el-button type="primary" @click="_submit(form)">提交</el-button>
</el-form-item>
```

如上代码在点击提交后可提交 vm.form 到当前页面


**自定义 passCallback**

````html
<el-button type="primary" @click="_submit(form, submitPass)">提交</el-button>
````

```js
new Vue({
    methods: {
        ...TA.m,
        submitPass: function (res) {
            console.log(res)
        }
    },
})
```

## TA.m._submitURL(url, data, passCallback, failCallback)

与 `TA.m._submit` 相同,区别是可以通过 url 配置请求地址