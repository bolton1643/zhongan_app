<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">理赔详情</block>
      <block slot="right">
        <text v-if="info.status==4" class="equipment" @click="toEquipment">重新发起</text>
      </block>
    </cu-custom>
    <view class="content">
      <view class="content-info">
        <view class="content-info-item">
          <text class="text">店铺名称</text>
          <text class="data" v-text="info.shopName"></text>
        </view>
        <view class="content-info-item">
          <text class="text">申请理赔金额(元)</text>
          <text class="data" v-text="info.claimAmount"></text>
        </view>
        <view class="content-info-item">
          <text class="text">进度</text>
          <text class="data" v-text="getStatusText"></text>
        </view>
        <view v-for="(item,index) in photoList" :key="index" class="content-info-item">
          <text class="text" v-text="item.title"></text>
          <image class="image" :src="$tui.handleImageUrl(item.image)"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// const image = require('../../../static/my/location.png')

import { getClaimDetail } from '@/api'

export default {
  data() {
    return {
      info: {},
      photoList: [],
    }
  },
  onLoad(options) {
    this.claimId = options.id
  },
  created() {
    this.getClaimDetail()
  },
  computed: {
    getStatusText() {
      switch (this.info.status * 1) {
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '已支付'
        case 4:
          return '审核未通过'
      }
    },
  },
  methods: {
    getClaimDetail() {
      getClaimDetail(this.claimId).then((res) => {
        const { status, result } = res
        if (status === 200) {
          this.info = result
          this.photoList = JSON.parse(result.photo)
        }
      })
    },
    toEquipment() {
      uni.navigateTo({
        url: '/pages/homepageIndex/claim/claim',
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
      margin-top: 40upx;

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
          .image {
            height: 100upx;
            width: 100upx;
            object-fit: cover;
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
