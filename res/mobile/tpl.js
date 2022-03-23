export default
`
<div>
    <div :style="tabber?'padding-bottom: 50px;':''">
        <slot></slot>
    </div>
    <van-tabbar v-if="tabber" route >
        <van-tabbar-item replace to="/">
            <template #icon="props">
                <img src="https://icon.2type.cn/school/task.svg" />
            </template>
            首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/game">
            <template #icon="props">
                <img src="https://icon.2type.cn/game.svg" />
            </template>
            娱乐
        </van-tabbar-item>
        <van-tabbar-item replace to="/order">
            <template #icon="props">
                <img src="https://icon.2type.cn/school/task.svg" />
            </template>
            订单
        </van-tabbar-item>
        <van-tabbar-item replace to="/user">
            <template #icon="props">
                <img src="https://icon.2type.cn/user-male.svg" />
            </template>
            我的
        </van-tabbar-item>
    </van-tabbar>
</div>
`