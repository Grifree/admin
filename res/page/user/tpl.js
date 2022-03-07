export default `
<div>
    <van-button @click="clickLoginBtn" type="primary">登录</van-button>
    <br>
    user name: {{$store.state.user.name}}
    <br>
    到  <router-link to="/game"  type="primary"  siz="mini">/game</router-link> 页面中查看 vuex store 中的数据
</div>
`