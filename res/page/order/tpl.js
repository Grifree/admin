export default `
<div>
    <van-nav-bar
          title="订单列表"
   ></van-nav-bar>
    <van-card
                price="196"
                title="【丰收日大厨带回家〡上海配送】"
                thumb="https://cdn1.lianlianlvyou.com/lianlian/design/a2dfd9808a72418092f938c9ee3e0fb1.gif"
    >
     <template #footer>
        <van-tag type="primary">已支付</van-tag>
      </template>
    </van-card>
    <van-card
                price="99"
                title="第一江南·无需预约·60000㎡超大水汇"
                thumb="https://cdn.lianlianlvyou.com/lianlian/design/845f5ab7aa69438ebc86b2f2f62a7ec8.gif"
    >
     <template #footer>
        <van-tag type="success">已完成</van-tag>
      </template>
    </van-card>
</div>
`