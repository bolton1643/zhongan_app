<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">设备管理</block>
    </cu-custom>
    <view class="content">
      <view class="content-view">
        <view class="view-item" v-for="item in equipList" :key="item.id">
          <image :src="getImage(item.deviceType)"></image>
          <view class="info">
            <text class="info-name" v-text="item.deviceName"></text>
            <text class="info-status" v-text="item.status ? '在线' : '离线'" :class="{'in':item.status}"></text>
          </view>
          <!-- <view class="icon">
            <uni-icons class="icon-item" type="arrowright"></uni-icons>
          </view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const image1 = require('../../../static/homepage/equipment/image1.png')
const image2 = require('../../../static/homepage/equipment/image2.png')
const image3 = require('../../../static/homepage/equipment/image3.png')
const imgList = [image1, image2, image3]
import { getDeviceList } from '@/api'
export default {
  data() {
    return {
      equipList: [],
    }
  },
  created() {
    this.getDeviceList()
  },
  methods: {
    getImage(type) {
      return imgList[type - 1]
    },
    getDeviceList() {
      let param = {
        shopId: uni.getStorageSync('shopId'),
      }
      getDeviceList(param).then((res) => {
        const { status, result } = res
        if (status === 200) {
          this.equipList = result || []
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
page {
  height: 100%;
  background-color: #f0f0f0;

  .page-box {
    width: 100%;

    .content {
      width: 100%;
      margin-top: 40upx;

      .content-view {
        display: flex;
        flex-direction: column;
        padding: 0 40upx;
        box-sizing: border-box;
        width: 100%;

        .view-item {
          height: 160upx;
          width: 100%;
          background-color: #ffffff;
          padding: 40upx 32upx;
          box-sizing: border-box;
          display: flex;
          border-radius: 24upx;
          align-items: center;

          & + .view-item {
            margin-top: 16upx;
          }

          image {
            width: 60upx;
            height: 60upx;
            flex-shrink: 0;
          }

          .info {
            flex: 1 0 0;
            display: flex;
            flex-direction: column;
            margin-left: 32upx;

            .info-name {
              height: 40upx;
              font-size: 32upx;
              color: #333333;
              font-weight: 500;
              display: flex;
              align-items: center;
            }

            .info-status {
              margin-top: 8upx;
              font-size: 24upx;
              height: 28upx;
              color: #fc3c31;
              display: flex;
              align-items: center;

              &.in {
                color: #1676fe;
              }
            }

            .icon {
              width: 32upx;
              display: flex;
              align-items: center;
              flex-shrink: 0;
              justify-content: center;
              height: 100%;

              .icon-item {
                width: 32upx;
                height: 32upx;
              }
            }
          }
        }
      }
    }
  }
}
</style>
