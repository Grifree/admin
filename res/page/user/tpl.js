export default `
<div style="padding:20px;">
    <div style="text-align: center;">
        <div v-if="$store.state.user.name">
        <van-image
          round
          width="5rem"
          height="5rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div>{{$store.state.user.name}}</div>        
        </div>
        <div v-else>
            <van-image
              round
              width="5rem"
              height="5rem"
              src="https://icon.2type.cn/user-male.svg"
            />
            <div>
            <van-button @click="clickLoginBtn" plain type="primary" block >登录</van-button>
            </div>        
        </div>
       
    </div>
    <van-cell value="设置" @click="showAddressEdit = true">
      <template #title>
        收货地址
      </template>
    </van-cell>
    <van-overlay :show="showAddressEdit">
        <div style="padding:10px;">
        <van-address-edit
            style="background: white;"
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSaveAddress"
        
        />
        </div>
    </van-overlay>
    <van-cell value="" @click="showAbout = true">
      <template #title>
        关于好券
      </template>
    </van-cell>
    <van-popup v-model="showAbout">
        <div style="padding:10px;   ">
        好券是一个分享优质优惠券的平台,优惠券信息真实,更新频率高.
        </div>
    </van-popup>
</div>
`