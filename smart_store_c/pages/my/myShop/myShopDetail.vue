<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">店铺详情</block>
      <block slot="right">
        <text class="equipment" @click="toEquipment">设备管理</text>
      </block>
    </cu-custom>
    <view class="content">
      <view class="content-info">
        <view class="content-info-item">
          <text class="text">店铺名称</text>
          <text class="data" v-text="info.shopName"></text>
        </view>
        <view class="content-info-item">
          <text class="text">店铺编号</text>
          <text class="data" v-text="info.num"></text>
        </view>
        <view class="content-info-item">
          <text class="text">省市区</text>
          <view>
            <text class="data" v-text="info.add"></text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
        </view>
        <view class="content-info-item">
          <text class="text">详细地址</text>
          <view class="item-view">
            <text class="data" v-text="info.addDetail"></text>
            <image :src="image"></image>
          </view>
        </view>
        <view class="content-info-item">
          <text class="text">店铺类型</text>
          <view>
            <text class="data" v-text="info.type"></text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
        </view>
        <view class="content-info-item">
          <text class="text">负责人姓名</text>
          <text class="data" v-text="info.name"></text>
        </view>
        <view class="content-info-item">
          <text class="text">负责人电话</text>
          <text class="data" v-text="info.tel"></text>
        </view>
        <view class="content-info-item">
          <text class="text">第一联系人姓名</text>
          <text class="data" v-text="info.oneName"></text>
        </view>
        <view class="content-info-item">
          <text class="text">第一联系人电话</text>
          <text class="data" v-text="info.oneTel"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const image = require('../../../static/my/location.png')

export default {
  data() {
    return {
      info: {
        shopName: '小海小鲜',
        num: '000001',
        add: '浙江省杭州市西湖区',
        addDetail: '西溪路100号',
        type: '餐饮',
        name: '小海',
        tel: '18977803265',
        oneName: '张三',
        oneTel: '13876480700',
      },
      image,
    }
  },
  methods: {
    toEquipment() {
      uni.navigateTo({
        url: '/pages/homepageIndex/equipment/equipment',
      })
    },
  },
}
</script>

<style lang="less">
page {
  height: 100%;
  background-color: #f0f0f0;

  .page-box {
    width: 100%;
    .equipment {
      margin-right: 40upx;
    }
    .content {
      width: 100%;
      // margin-top: 40upx;

      .content-info {
        width: 100%;
        background-color: #ffffff;

        .content-info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2upx solid rgba(237, 237, 237, 1);
          height: 112upx;
          padding: 0 40upx;
          box-sizing: border-box;

          &:last-child {
            border-bottom: 0;
          }

          .text {
            color: #333333;
            font-size: 32upx;
            font-weight: 500;
          }

          .data {
            color: rgba(153, 153, 153, 1);
            font-size: 28upx;
          }

          .item-view {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .uni-icons {
            margin-left: 20upx;
          }

          image {
            width: 32upx;
            height: 32upx;
            margin-left: 20upx;
          }
        }
      }
    }
  }
}
</style>
