export default `
<div>
    <van-nav-bar
      title="优惠券详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner"  v-bind:key="index">
            <a :href="item.link">
                <img style="display:block;height:200px;margin:0 auto;" :src="item.photo" />
            </a>
        </van-swipe-item>
    </van-swipe>
    <div>
            
    </div>
    <van-card
                price="196"
                desc="#火爆加推#【丰收日〡上海配送】168/168元享A/B套餐：A:黑椒牛肉粒300g 、原汤狮子头600g 、宫保鸡丁250g 、四鲜烤麸190g、 酱鸭200g 、香卤鸭肫150g、 目鱼大烤150g、 酒酿米馒头240g；B:糖醋小排200g、水晶虾仁200g 、宫保鸡丁250g 、山药咕咾肉260g 、酱鸭200g 、香卤鸭肫150g、 目鱼大烤150g 、五彩八宝饭350g"
                title="【丰收日大厨带回家〡上海配送】"
                
                origin-price="200"
        >
            <template #footer>
                销量: 1241
            </template>
        </van-card>
        <img style="width:100%"  src="https://user-images.githubusercontent.com/3949015/159667064-27271025-47dd-4929-ba7c-c5ccb9e3635e.png" alt="">
        <van-submit-bar :price="19600" button-text="提交订单" @submit="onSubmit">
        <template #tip>
            剩余10份
          </template>
        </van-submit-bar>
</div>
`