<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true" :url="url" :reLaunch="reLaunch">
      <block slot="content">支付结果</block>
    </cu-custom>
    <view class="content-box">
      <view class="content-image-box">
        <view class="image-box" v-if="!payStatus">
          <image :src="payImage"></image>
          <text class="payText" v-text="payText"></text>
          <text class="payTooltip" v-text="payTip"></text>
        </view>
        <view class="image-box success" v-else>
          <image :src="payImage"></image>
          <text class="payText" v-text="payText"></text>
          <text class="payTooltip" v-text="payTip"></text>
        </view>
      </view>
      <view class="pay-fail-btn-group" v-if="!payStatus">
        <button class="fail-btn" type="primary" @click="payForNew">
          从新支付
        </button>
      </view>
      <view class="pay-success-text" v-else>
        <text class="text">
          您已支付完成，安保服务自次日零时生效，保单正在出单中，生效时间一般为次日凌晨，遇节假日顺延，实际生效时间以保险公司为准。
        </text>
      </view>
    </view>
    <button type="primary" class="submit" @click="handleBackHome">
      返回首页
    </button>
  </view>
</template>

<script>
const payFail = require("../../../static/homepage/pay/pay-fail.png");
const paySuccess = require("../../../static/homepage/pay/pay-success.png");

export default {
  data() {
    return {
      payStatus: null,
      url: "",
      reLaunch: false,
    };
  },

  computed: {
    payImage() {
      return this.payStatus ? paySuccess : payFail;
    },

    payText() {
      return this.payStatus ? "支付完成！" : "支付失败";
    },

    payTip() {
      return this.payStatus ? "保单正在出单中" : "请尝试从新支付";
    },
  },

  onLoad(obj) {
    this.payStatus = obj.payStatus && Number(obj.payStatus) ? true : false;
    const list = uni.getStorageSync("smart_c_shopList");
    let url = "../../homepage/homepage-no";
    if (list && list.length) {
      url = "../../homepageIndex/homepageIndex";
      this.reLaunch = true;
    }
    this.url = url;
  },
  methods: {
    // 从新支付
    payForNew() {},
    handleBackHome() {
      uni.switchTab({
        url: "/pages/homepageIndex/homepageIndex",
      });
    },
  },
};
</script>

<style lang="less">
page {
  height: 100%;
  background-color: #f0f0f0;

  .page-box {
    width: 100%;

    .content-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 40upx;
      align-items: center;

      .content-image-box {
        width: 456upx;
        display: flex;
        align-items: center;
        justify-content: center;

        .image-box {
          width: 456upx;
          height: 456upx;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;

          image {
            margin-top: 72upx;
            width: 176upx;
            height: 176upx;
            border-radius: 50%;
          }

          .payText {
            height: 52upx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 44upx;
            font-weight: 500;
            color: #e61212;
            margin-top: 28upx;
          }

          .payTooltip {
            margin-top: 22upx;
            height: 40upx;
            font-size: 32upx;
            color: #999999;
          }

          &.success {
            image {
              margin-top: 76upx;
              width: 228upx;
              height: 152upx;
              border-radius: unset;
            }

            .payText {
              margin-top: 48upx;
              color: #333333;
            }

            .payTooltip {
              color: #3085ff;
            }
          }
        }
      }

      .pay-fail-btn-group {
        height: 96upx;
        width: 100%;
        padding: 0 80upx;
        margin-top: 64upx;
        box-sizing: border-box;

        .fail-btn {
          background-color: #1676fe;
          border-radius: 48upx;
        }
      }

      .pay-success-text {
        width: 100%;
        padding: 0 40upx;
        box-sizing: border-box;
        line-height: 46upx;
        margin-top: 28upx;
      }
    }
  }
}
</style>
