export default `
<div>
    <van-search v-model="search" placeholder="请输入搜索关键词"></van-search>
    <div style="padding:10px;">
    <van-skeleton :row="3" :loading="loading">
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in banner"  v-bind:key="item.photo">
                <a :href="item.link">
                    <img style="display:block;height:200px;margin:0 auto;" :src="item.photo" />
                </a>
            </van-swipe-item>
        </van-swipe>
    </van-skeleton>
        <van-divider>推荐</van-divider>
    <van-skeleton avatar avatar-size="4em" :row="10" :loading="loading">
        <!-- 底部自动刷新 https://youzan.github.io/vant/v2/#/zh-CN/list-->
        <!-- 上拉刷新用 https://youzan.github.io/vant/v2/#/zh-CN/pull-refresh-->
        <van-card
                v-for="(item, index) in list"
                v-bind:key="index"
                @click="clickSpu(item)"
                :price="item.price"
                :desc="item.desc"
                :title="item.title"
                :thumb="item.thumb"
                :origin-price="item.originPrice"
        >
            <template #footer>
                销量:{{item.sales}}
            </template>
        </van-card>
    </van-skeleton>
    </div>
</div>
`