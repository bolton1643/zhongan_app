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
              <image class="content-avatar" src="../../../static/homepage/icon-default-avatar.png"></image>
              <view class="text-box">
                <text class="text-name">{{ item.name }}</text>
                <text class="text-phone">{{ item.phone }}</text>
              </view>
            </view>
            <image v-if="item.showIconEnter" class="icon-enter" src="../../../static/homepage/icon-enter.png"></image>
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
import { getOperatorList } from '../../../api'

export default {
  data() {
    return {
      swipeList: [],
    }
  },
  onReady() {
    // 模拟延迟赋值
    this.swipeList = [
      {
        id: 0,
        name: 'item1',
        phone: '13312341234',
        showIconEnter: true,
      },
      {
        id: 1,
        name: 'item2',
        phone: '12312345678',
        showIconEnter: true,
      },
      {
        id: 2,
        name: 'item3',
        phone: '15512344321',
        showIconEnter: true,
      },
    ]
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
          console.log(result)
        }
      })
    },
    addPrincipal() {
      uni.navigateTo({
        url: '/pages/homepage/personInChargeManagement/add-principal',
      })
    },

    swipeChange(e, index) {
      console.log('swipeChange 返回：', e)
      console.log('swipeChange 当前索引：', index)
      this.swipeList[index].showIconEnter = !this.swipeList[index].showIconEnter
    },

    swipeClick(e, index) {
      console.log('swipeClick 返回：', e)
      console.log('swipeClick 当前索引：', index)
      uni.showModal({
        title: '提示',
        content: '是否删除',
        success: (res) => {
          if (res.confirm) {
            this.swipeList.splice(index, 1)
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

      .content-box {
        display: flex;
        align-items: center;
        height: 100%;

        .content-avatar {
          width: 88upx;
          height: 88upx;
          margin-right: 32upx;
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
