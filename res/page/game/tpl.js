export default `
<div>
    user name: {{$store.state.user.name}}
    <br>
    从 <router-link to="/user"  type="primary"  siz="mini">/user</router-link> 页面中点击登录,
    <br>
    再返回本页查看 基于 $store 获取到的 user name
</div>
`