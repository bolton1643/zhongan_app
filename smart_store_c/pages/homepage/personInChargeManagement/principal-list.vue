<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">负责人管理</block>
      <block slot="right">
        <image class="title-right" src="../../../static/homepage/icon-add.png" @click="addPrincipal"></image>
      </block>
    </cu-custom>

    <view class="content-box">
      <uni-swipe-action>
        <uni-swipe-action-item v-for="(item, index) in swipeList" :key="item.id" @change="swipeChange($event, index)">
          <view class="content-item">
            <view class="content-box">
              <!-- ../../../static/homepage/icon-default-avatar.png -->
              <image class="content-avatar" :src="item.photo"></image>
              <view class="text-box">
                <text class="text-name">{{ item.name }}</text>
                <text class="text-phone">{{ item.phone }}</text>
              </view>
            </view>
            <view class="role" :class="{'operator':item.role!=1}">{{item.role==1?'管理员':'操作员'}}</view>
            <view class="icon-enter" @click="toDetail(item)">
              <image v-show="item.showIconEnter" src="../../../static/homepage/icon-enter.png"></image>
            </view>
          </view>
          <template v-slot:right>
            <view class="list-delete" @click="swipeClick($event, index)">
              <image src="../../../static/homepage/icon-list-delete.png"></image>
            </view>
          </template>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </view>
  </view>
</template>

<script>
import { getOperatorList, deleteOperator } from '../../../api'

export default {
  data() {
    return {
      swipeList: [],
    }
  },
  created() {
    this.getOperatorList()
  },
  methods: {
    getOperatorList() {
      const param = {
        shopId: uni.getStorageSync('shopId'),
      }
      getOperatorList(param).then((res) => {
        const { status, result } = res
        if (status === 200) {
          if (result && result.length > 0) {
            this.swipeList = result.map((item) => {
              item.showIconEnter = true
              item.photo = this.$tui.handleImageUrl(item.photo)
              return item
            })
          }
        }
      })
    },
    toDetail(item) {
      uni.setStorageSync('operatorData', JSON.stringify(item))
      uni.navigateTo({
        url: '/pages/homepage/personInChargeManagement/add-principal',
      })
    },
    addPrincipal() {
      uni.navigateTo({
        url: '/pages/homepage/personInChargeManagement/add-principal',
      })
    },

    swipeChange(e, index) {
      // console.log('swipeChange 返回：', e)
      // console.log('swipeChange 当前索引：', index)
      this.swipeList[index].showIconEnter = !this.swipeList[index].showIconEnter
    },
    deleteOperator(index) {
      const param = {
        userId: this.swipeList[index].id,
      }
      deleteOperator(param).then((res) => {
        const { status, result, message } = res
        this.$tui.toast(message)
        if (status === 200) {
          this.swipeList.splice(index, 1)
        }
      })
    },
    swipeClick(e, index) {
      let _this = this
      uni.showModal({
        title: '提示',
        content: '是否删除',
        success: (res) => {
          if (res.confirm) {
            // this.swipeList.splice(index, 1)
            _this.deleteOperator(index)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    },
  },
}
</script>

<style lang="less">
.page-box {
  width: 100vw;
  min-height: 100vh;
  background-color: #f0f0f0;

  .title-right {
    width: 44upx;
    height: 44upx;
    margin-right: 40upx;
  }

  .content-box {
    width: 100%;

    .content-item {
      width: 100%;
      padding: 0 40upx;
      box-sizing: border-box;
      height: 156upx;
      background-color: white;
      border-bottom: 1px #e6e6e6 solid;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .role {
        position: absolute;
        bottom: 30upx;
        left: 60upx;
        width: 90upx;
        height: 32upx;
        background: #1676f4;
        border-radius: 16upx;
        font-size: 20upx;
        color: #fff;
        line-height: 32upx;
        text-align: center;
        &.operator {
          background: #aaaaaa;
        }
      }
      .content-box {
        display: flex;
        align-items: center;
        height: 100%;

        .content-avatar {
          width: 88upx;
          height: 88upx;
          margin-right: 32upx;
          border-radius: 50%;
        }

        .text-box {
          height: 88upx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .text-name {
            font-size: 32upx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
          }

          .text-phone {
            font-size: 28upx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
          }
        }
      }

      .icon-enter {
        width: 32upx;
        height: 32upx;
        padding: 12upx;
        box-sizing: content-box;
        uni-image {
          height: 100%;
          width: 100%;
        }
      }
    }

    .list-delete {
      width: 172upx;
      height: 156upx;
      border-bottom: 1px #e6e6e6 solid;

      uni-image {
        height: 100%;
      }
    }
  }
}
</style>
