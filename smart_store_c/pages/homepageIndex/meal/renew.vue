<template>
  <view class="renew-box">
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="content">我要续费</block>
    </cu-custom>
    <view class="title">套餐内容</view>
    <view class="content">
      <view class="name">·设备</view>
      <view class="box" v-for="item in devices" :key="item.id">
        <view>{{ item.name }} * {{ item.amount }}</view>
        <view class="right">¥{{ item.price * item.amount }}</view>
      </view>
      <view class="name">·服务</view>
      <view class="box" v-for="item in services" :key="item.id">
        <view>{{ item.name }} * {{ item.amount }}</view>
        <view class="right">¥{{ item.price * item.amount }}</view>
      </view>
      <!-- <view class="name">·保险</view>
      <view class="box">
        <view>保费</view>
        <view class="right">¥{{ insurance.insuranceAmount }}</view>
      </view> -->
      <view class="time">
        <view class="time-itle">续费时长（年）</view>
        <view class="right">
          <view class="minus" @click="handleMinus">-</view>
          <input type="number" v-model="year" class="ipt" />
          <view class="add" @click="handleAdd">+</view>
        </view>
      </view>
      <div class="price">合计：￥{{ price }}</div>
      <button class="submit" @click="handleSubmit">确定</button>
    </view>
  </view>
</template>

<script>
import { getPackageInfo } from "@/api";

export default {
  data() {
    return {
      year: 1,
      devices: [],
      services: [],
      totalMoney: "",
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
  computed: {
    price() {
      return this.totalMoney ? this.totalMoney * this.year : "";
    },
  },
  mounted() {
    this.shopId = uni.getStorageSync("shopId");
    this.getPackageInfo();
  },
  methods: {
    getPackageInfo() {
      getPackageInfo({ shopId: this.shopId }).then((res) => {
        if (res.status === 200) {
          const { devices, services, totalMoney, insurance } = res.result;
          this.devices = devices;
          this.services = services;
          this.totalMoney = totalMoney || "";
          this.insurance = insurance;
        }
      });
    },
    handleMinus() {
      this.year = Math.max(1, this.year - 1);
    },
    handleAdd() {
      this.year += 1;
    },
    handleSubmit() {
      uni.redirectTo({
        url: `/pages/homepage/pay/pay?totalMoney=${this.price}&payType=renew&period=${this.year}`,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.renew-box {
  .title {
    padding: 39rpx 0 21rpx 30rpx;
    font-size: 22rpx;
    color: #aaaaaa;
  }
  .content {
    background-color: #fff;
    padding-left: 30rpx;
    overflow: hidden;
    position: relative;
  }
  .name {
    font-weight: 500;
    color: rgba(52, 52, 52, 1);
    font-size: 26rpx;
    margin-top: 30rpx;
  }
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    padding: 20rpx 60rpx 30rpx 30rpx;
    color: rgba(52, 52, 52, 1);
    border-bottom: 1rpx solid rgba(238, 238, 238, 1);
    .left {
      margin-right: 30rpx;
    }
    .center {
    }
  }
  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid rgba(238, 238, 238, 1);
    padding-right: 60rpx;
    height: 90rpx;
    .time-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #343434;
    }
    .right {
      display: flex;
      align-items: center;
      .minus,
      .add {
        width: 50rpx;
        height: 50rpx;
        line-height: 50rpx;
        background: rgba(22, 118, 244, 0.1);
        text-align: center;
        font-size: 32rpx;
        color: rgba(52, 52, 52, 1);
      }
      .ipt {
        width: 80rpx;
        height: 50rpx;
        background: #ffffff;
        border: 1rpx solid #aaaaaa;
        text-align: center;
        font-size: 28rpx;
        color: rgba(52, 52, 52, 1);
      }
    }
  }
  .price {
    text-align: right;
    font-size: 20rpx;
    color: #343434;
    height: 60rpx;
    line-height: 60rpx;
    padding-right: 60rpx;
  }
  .submit {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    line-height: 88rpx;
    background: #1676f4;
    box-shadow: 0rpx -1rpx 10rpx 0rpx rgba(0, 0, 0, 0.05);
    font-size: 32rpx;
    color: #f4f6f8;
    text-align: center;
    border-radius: 0;
  }
}
</style>