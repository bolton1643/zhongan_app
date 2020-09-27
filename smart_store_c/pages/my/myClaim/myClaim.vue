<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">我的理赔</block>
    </cu-custom>
    <view class="content">
      <view class="content-search">
        <uni-search-bar @confirm="search" @input="input" placeholder="请输入店铺名字或编号"></uni-search-bar>
      </view>
      <view class="content-list">
        <view class="content-list-item" v-for="(item, index) in list" :key="index" @click="handleReLaunch(item.id)">
          <view class="item-image">
            <image :src="item.photo"></image>
          </view>
          <view class="item-content">
            <view class="item-content-text">
              <text class="title">店铺名称</text>
              <text class="text" v-text="item.shopName"></text>
            </view>
            <view class="item-content-text">
              <text class="title">申请理赔金额(元)</text>
              <text class="text" v-text="item.claimAmount"></text>
            </view>
            <view class="item-content-btn">
              <button :type="item.type" v-text="item.text" :class="item.type"></button>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-show="isLoadMore">
      <uni-load-more :status="loadStatus"></uni-load-more>
    </view>
  </view>
</template>

<script>
import { getClaimList } from '@/api'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

export default {
  components: {
    uniLoadMore,
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      isLoadMore: false, //是否加载中
      loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
    }
  },
  created() {
    this.getClaimList()
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true
      this.page += 1
      this.getClaimList()
    }
  },
  methods: {
    getStatusText(status) {
      switch (status) {
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
    getStatusType(status) {
      if (status == 4) {
        return 'refause'
      } else {
        return 'primary'
      }
    },
    handlePage() {
      this.isLoadMore = false
      if (this.page > 1) {
        this.page -= 1
      }
    },
    getClaimList(name) {
      let param = {
        pageNo: this.page,
        pageSize: this.pageSize,
        shopName: name,
      }
      // this.$tui.handleImageUrl
      getClaimList(param)
        .then((res) => {
          const { status, result } = res
          if (status === 200) {
            if (result.records) {
              let arr = result.records.map((item) => {
                let image = JSON.parse(item.photo)[0].image
                item.photo = image ? this.$tui.handleImageUrl(image) : ''
                item.text = this.getStatusText(item.status * 1)
                item.type = this.getStatusType(item.status)
                return item
              })
              this.list = this.list.concat(arr)
              if (arr.length < this.pageSize) {
                //判断接口返回数据量小于请求数据量，则表示此为最后一页
                this.isLoadMore = true
                this.loadStatus = 'nomore'
              } else {
                this.isLoadMore = false
              }
            } else {
              this.isLoadMore = true
              this.loadStatus = 'nomore'
            }
          }
        })
        .catch(() => {
          this.handlePage()
        })
    },
    search(e) {
      this.getClaimList(e.value)
    },

    input() {},
    handleReLaunch(id) {
      uni.navigateTo({
        url: `../myClaim/detail?id=${id}`,
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
      position: relative;
      overflow-y: auto;

      .content-search {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        height: 104upx;
        box-sizing: border-box;
      }

      .content-list {
        display: flex;
        flex-direction: column;

        .content-list-item {
          display: flex;
          height: 312upx;
          width: 100%;
          background-color: #ffffff;
          padding: 40upx;
          box-sizing: border-box;
          margin-bottom: 16upx;

          .item-image {
            height: 232upx;
            width: 184upx;
            flex-shrink: 0;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .item-content {
            margin-left: 32upx;
            flex: 1 0 0;

            .item-content-text {
              display: flex;
              margin-top: 8upx;
              justify-content: space-between;
              line-height: 40upx;
              height: 40upx;
              align-items: center;

              .title {
                font-size: 32upx;
                color: rgba(51, 51, 51, 1);
              }

              .text {
                font-size: 28upx;
                color: #999999;
              }

              & + .item-content-text {
                margin-top: 20upx;
              }
            }

            .item-content-btn {
              display: flex;
              justify-content: flex-end;
              margin-top: 70upx;

              .primary,
              .refause {
                height: 56upx;
                display: flex;
                align-items: center;
                font-size: 28upx;
                margin-right: inherit;
              }

              .refause {
                background-color: #e97b47;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
