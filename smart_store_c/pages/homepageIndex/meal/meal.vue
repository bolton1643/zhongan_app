<template>
  <view class="page-box">
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="content">我的套餐</block>
    </cu-custom>
    <view class="content">
      <view class="content-info mb16">
        <view class="content-info-item mb16">
          <text class="text">开始时间</text>
          <text class="data">{{ serviceEffectiveDate }}</text>
        </view>
        <view class="content-info-item mb16">
          <text class="text">结束时间</text>
          <text class="data">{{ serviceExpireDate }}</text>
        </view>
        <view class="content-info-item mb16">
          <text class="text">套餐价格</text>
          <text class="data">￥{{ totalMoney }}</text>
        </view>
        <view class="content-info-item mb8">
          <text class="text">设备</text>
        </view>
        <view
          class="content-info-item-sub space mb8"
          v-for="item in devices"
          :key="item.id"
        >
          <text class="text">{{ item.name }} * {{ item.amount }}</text>
          <text class="data">￥{{ item.price }}</text>
        </view>

        <view class="content-info-item mb8">
          <text class="text">服务费</text>
        </view>
        <view
          class="content-info-item-sub space mb8"
          v-for="item in services"
          :key="item.id"
        >
          <text class="text">{{ item.name }}</text>
          <text class="data">￥{{ item.price }}</text></view
        >
      </view>
      <view class="content-info">
        <view class="content-info-item mb8">
          <text class="text">保险</text>
        </view>
        <view class="content-info-item-sub space mb8">
          <text class="text">保障开始时间</text>
          <text class="data">{{ insurance.beginDate }}</text>
        </view>
        <view class="content-info-item-sub space mb8">
          <text class="text">保障结束时间</text>
          <text class="data">{{ insurance.endDate }}</text>
        </view>
        <view class="content-info-item-sub space mb8">
          <text class="text">投保人</text>
          <text class="data">{{ insurance.insuranerName }}</text>
        </view>
        <view class="content-info-item-sub space mb8">
          <text class="text">被保人</text>
          <text class="data">{{ insurance.insuraneeName }}</text>
        </view>
        <view class="content-info-item-sub space mb8">
          <text class="text">受益人</text>
          <text class="data">{{ insurance.benifitName }}</text>
        </view>
        <view class="content-info-item-sub space mb8">
          <text class="text">保额</text>
          <text class="data">￥{{ insurance.insuranceAmount }}</text>
        </view>
      </view>
      <view class="content-message mb16">
        <text class="text">电子保单</text>
        <view @click="downloadFile">
          <text>下载电子保单</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
      </view>
      <view class="download-info">
        <image src="../../../static/homepage/meal/danger.png"></image>
        <text class="text"
          >本页面仅供参考，实际保单信息以保险公司官方内容为准</text
        >
      </view>
      <button type="primary" class="primary" @click="showModal = true">
        我要发起
      </button>
      <!-- <template v-if="show">
        <view class="content-message bold">
          <text class="text">增加设备或提高保额</text>
          <view class="info">
            <text class="info-text">增加设备或提高保额</text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
        </view>
        <view class="content-message bold">
          <text class="text">变更套餐</text>
          <view class="info">
            <text class="info-text">次年从新选择套餐</text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
        </view>
        <view class="content-message bold" @click="handle">
          <text class="text">直接续费</text>
          <view class="info">
            <text class="info-text">次年套餐不变，直接续费</text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
        </view>
      </template>
      <template v-else>
        <view class="content-result">
          <view class="download">
            <text>下载电子保单</text>
          </view>
          <button type="primary" class="primary" @click="getText">
            我要发起
          </button>
        </view>
      </template> -->
    </view>
    <view
      class="cu-modal show meal-modal"
      v-if="showModal"
      @click="showModal = false"
    >
      <view class="cu-dialog">
        <view class="modal-item" @click="showChangeModal = true">
          <view class="title">变更套餐或保额</view>
        </view>
        <view class="modal-item" @click="renew">
          <view class="title">直接续费</view>
          <view class="text">（次年套餐不变，直接续费）</view>
        </view>
      </view>
    </view>
    <view
      class="cu-modal show change-modal"
      v-if="showChangeModal"
      @click="showChangeModal = false"
    >
      <view class="cu-dialog">
        <view class="title">你确定要发起变更套餐吗？</view>
        <view class="modal-btns">
          <view class="cancel-btn" @click="showChangeModal = false">取消</view>
          <view class="confirm-btn" @click="handleChange">确定</view>
        </view>
      </view>
    </view>
    <view
      class="cu-modal show change-modal changeEnd"
      v-if="showChangeEndModal"
      @click="showChangeEndModal = false"
    >
      <view class="cu-dialog">
        <view class="title">
          您的申请已提交，我们会有工作人员在2个工作日内联系您，请耐心等待！</view
        >
        <view class="modal-btns">
          <view class="confirm-btn" @click="showChangeEndModal = false"
            >确定</view
          >
        </view>
      </view>
    </view>

    <view class="cu-modal show meal-pay-modal" v-if="showPayModal">
      <view class="cu-dialog">
        <view class="modal-content">
          <image src="../../../static/homepage/meal/submit.png"></image>
        </view>
        <text class="modal-text">您有一个待支付任务</text>
        <view class="modal-btn-box">
          <button type="primary" class="submit" @click="submitPay">
            去支付
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getPackageInfo, changeShopCombo } from "@/api";
export default {
  data() {
    return {
      mealInfo: {},
      show: false,
      showModal: false, // 发起一个变更或续费操作
      showPayModal: false, // 未支付
      showChangeModal: false, // 套餐biang
      showChangeEndModal: false,
      serviceExpireDate: "", // 服务过期时间
      serviceEffectiveDate: "", // 服务生效时间
      devices: [], // 设备
      services: [], // 服务
      totalMoney: "", // 套餐价格
      insurance: {
        beginDate: "",
        insuranceAmount: "",
        endDate: "",
        insuranerName: "",
        benifitName: "",
        insuraneeName: "",
        insuranceFile: "",
      },
    };
  },
  mounted() {
    this.shopId = uni.getStorageSync("shopId");
    this.getPackageInfo();
  },
  methods: {
    downloadFile() {
      const path = this.$tui.handleImageUrl(this.insurance.insuranceFile);
      uni.showLoading({
        title: "正在下载...",
      });
      uni.downloadFile({
        url: "https://files1.xuetucn.com/xuetu2/assets/pdf/xuetu.pdf", //仅为示例，并非真实的资源
        success: ({ tempFilePath, statusCode }) => {
          if (statusCode === 200) {
            uni.saveFile({
              tempFilePath,
              success: (res) => {
                //res.savedFilePath文件的保存路径
                //保存成功并打开文件
                uni.openDocument({
                  filePath: res.savedFilePath,
                  success: () => {
                    uni.hideLoading();
                  },
                });
              },
              fail: (e) => {
                uni.hideLoading();
                uni.showToast("下载失败", JSON.stringify(e));
              },
            });
          }
        },
        fail: (e) => {
          uni.hideLoading();
          uni.showToast("下载失败", JSON.stringify(e));
        },
      });
    },
    handleChange() {
      changeShopCombo({
        shopId: this.shopId,
      }).then((res) => {
        this.showChangeEndModal = true;
      });
    },
    renew() {
      uni.navigateTo({
        url: "/pages/homepageIndex/meal/renew",
      });
    },
    getPackageInfo() {
      getPackageInfo({ shopId: this.shopId }).then((res) => {
        if (res.status === 200) {
          const {
            serviceEffectiveDate,
            serviceExpireDate,
            devices,
            services,
            totalMoney,
            insurance,
          } = res.result;
          this.serviceEffectiveDate = serviceEffectiveDate;
          this.serviceExpireDate = serviceExpireDate;
          this.devices = devices;
          this.services = services;
          this.totalMoney = totalMoney || "";
          this.insurance = {
            ...insurance,
          };
        }
      });
    },

    submitPay() {
      uni.navigateTo({
        url: "./mealInfo",
      });
    },
  },
};
</script>

<style lang="less" scoped>
page {
  height: 100%;
  background-color: #f0f0f0;

  .page-box {
    width: 100%;

    .content {
      width: 100%;
      .mb16 {
        margin-bottom: 32rpx;
      }

      .mb8 {
        margin-bottom: 16rpx;
      }

      .content-info {
        width: 100%;
        background: #ffffff;
        border: 2rpx solid #e6e6e6;
        box-sizing: border-box;
        padding: 32rpx 40rpx 40rpx;

        .content-info-item {
          display: flex;
          height: 40rpx;
          align-items: center;
          justify-content: space-between;
          font-size: 32rpx;
          font-weight: 500;

          .text {
            color: #333333;
          }

          .data {
            color: #999999;
          }
        }

        .content-info-item-sub {
          width: 300rpx;
          font-size: 32rpx;
          font-weight: 500;
          color: #999999;
          line-height: 48rpx;

          &.space {
            display: flex;
            height: 40rpx;
            align-items: center;
            justify-content: space-between;
            line-height: 40rpx;
            width: 100%;
          }
        }
      }

      .content-message {
        width: 100%;
        height: 112rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40rpx;
        box-sizing: border-box;
        background-color: #ffffff;
        color: #999999;

        &.bold {
          border-bottom: 2rpx solid #e6e6e6;
          box-sizing: border-box;

          .text {
            color: #333333;
          }

          .info {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .info-text {
              margin-right: 16rpx;
            }
          }
        }
      }

      .content-result {
        width: 100%;
        height: 392rpx;
        padding: 56rpx 40rpx 64rpx;
        box-sizing: border-box;
        background-color: #ffffff;

        .download {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40rpx;
          margin-bottom: 34rpx;

          text {
            font-size: 32rpx;
            color: #1676fe;
            text-decoration: underline;
          }
        }
      }
    }
  }
  .download-info {
    height: 28rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 54rpx;

    image {
      width: 24rpx;
      height: 24rpx;
      margin-right: 16rpx;
    }

    .text {
      font-size: 24rpx;
      color: #999999;
    }
  }
  .primary {
    height: 112rpx;
    border-radius: 56rpx;
    font-size: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.meal-pay-modal {
  .cu-dialog {
    width: 590rpx;
    border-radius: 20rpx;

    .modal-text {
      height: 52rpx;
      display: flex;
      align-items: center;
      font-weight: 500;
      margin-top: 64rpx;
      justify-content: center;
      color: #999999;
      font-size: 36rpx;
    }

    .modal-content {
      color: #777777;
      font-size: 28rpx;
      padding: 0 40rpx;
      box-sizing: border-box;
      line-height: 46rpx;
      text-align: left;
      margin-top: 64rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 148rpx;
        height: 162rpx;
      }
    }

    .modal-btn-box {
      height: 96rpx;
      color: #007aff;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 112rpx 0 80rpx;

      button {
        height: 48rpx;
        width: 350rpx;
        border-radius: 48rpx;
      }

      .default {
        border: 2rpx solid #999999;
        color: #999999;
        box-sizing: border-box;
      }
    }
  }
}
.meal-modal {
  .cu-dialog {
    padding: 80rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .modal-item {
      height: 98rpx;
      border: 1px solid #1576f4;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: rgba(21, 118, 244, 0.1);
      margin-top: 40px;
      &:first-of-type {
        margin-top: 0;
      }
    }
    .title {
      font-size: 26rpx;
      color: #1576f4;
      margin-bottom: 5rpx;
    }
    .text {
      font-size: 22rpx;
      color: #aaaaaa;
    }
  }
}
.change-modal {
  &.changeEnd {
    .cu-dialog {
      height: 380rpx;
    }
    .modal-btns {
      justify-content: center;
    }
  }
  .cu-dialog {
    width: 630rpx;
    height: 324rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 100rpx 100rpx 80rpx;
  }
  .title {
    font-size: 26rpx;
    color: #333333;
    text-align: center;
    margin-bottom: 60rpx;
  }
  .modal-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cancel-btn,
    .confirm-btn {
      width: 200rpx;
      height: 61rpx;
      border-radius: 30rpx;
      text-align: center;
      line-height: 61rpx;
      font-size: 26rpx;
    }
    .cancel-btn {
      border: 1px solid #aaaaaa;
      color: #333333;
    }
    .confirm-btn {
      background: #1676f4;
      color: #fff;
    }
  }
}
</style>
