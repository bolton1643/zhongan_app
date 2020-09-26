<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">布撤防记录</block>
      <view slot="right" class="slot-view" @click="showCalendar">
        <image :src="calendarImage"></image>
      </view>
    </cu-custom>

    <view class="content">
      <view class="record-view">
        <!-- <view class="record-view-date" v-text="item.time" :class="{'bold': item.isNow}"></view> -->
        <view class="record-view-list">
          <view class="record-view-list-item" v-for="item in record" :key="item.id">
            <view class="item-title">
              <text class="title" v-text="item.deploy==1 ? '布防' : '撤防'"></text>
              <text class="time" v-text="item.opDate"></text>
            </view>
            <text class="item-operate">操作人：{{item.operator}}</text>
          </view>
        </view>
      </view>
    </view>
    <view v-show="isLoadMore">
      <uni-load-more :status="loadStatus"></uni-load-more>
    </view>
    <view>
      <uni-calendar ref="calendar" :insert="false" :needTodayBtn="false" :showMonth="false" title="请选择查询时间" :lunar="false" :range="true" :clearDate="false" @confirm="confirm">
      </uni-calendar>
    </view>
  </view>
</template>

<script>
const calendarImage = require('../../../static/homepage/defence/calendar.png')
import { getDeployList } from '@/api'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

export default {
  components: {
    uniLoadMore,
  },
  data() {
    return {
      calendarImage,
      page: 1,
      pageSize: 10,
      record: [],
      isLoadMore: false, //是否加载中
      loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
    }
  },
  created() {
    this.startTime = ''
    this.endTime = ''
    this.getDeployList()
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      //此处判断，上锁，防止重复请求
      this.isLoadMore = true
      this.page += 1
      this.getDeployList()
    }
  },
  methods: {
    // 日历组件确定事件
    confirm(e) {
      this.startTime = e.range.before + ' 00:00:00'
      this.endTime = e.range.after + ' 23:59:59'
      this.getDeployList()
    },

    // 展示日历组件
    showCalendar() {
      this.$refs.calendar.open()
    },
    handlePage() {
      this.isLoadMore = false
      if (this.page > 1) {
        this.page -= 1
      }
    },
    getDeployList() {
      const param = {
        shopId: uni.getStorageSync('shopId'),
        start: this.startTime,
        end: this.endTime,
        pageNo: this.page,
        pageSize: this.pageSize,
      }
      getDeployList(param)
        .then((res) => {
          const { status, result } = res
          if (status === 200) {
            if (result.records) {
              this.record = this.record.concat(result.records)
              if (result.records.length < this.pageSize) {
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
          } else {
            this.handlePage()
          }
        })
        .catch(() => {
          this.handlePage()
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

      .record-view {
        display: flex;
        flex-direction: column;
        padding: 40upx;
        box-sizing: border-box;

        .record-view-date {
          display: flex;
          height: 40upx;
          width: 100%;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 20upx;
          color: #999999;
          font-size: 28upx;

          &.bold {
            font-size: 32upx;
            color: #333333;
            font-weight: 500;
          }
        }

        .record-view-list {
          display: flex;
          flex-direction: column;

          .record-view-list-item {
            display: flex;
            padding: 40upx 40upx 40upx 60upx;
            background-color: #ffffff;
            box-sizing: border-box;
            height: 160upx;
            border-radius: 24upx;
            flex-direction: column;

            & + .record-view-list-item {
              margin-top: 16upx;
            }
            .item-title {
              height: 40upx;
              display: flex;
              justify-content: space-between;

              .title {
                font-size: 32upx;
                font-weight: 500;
                color: #333333;
              }

              .time {
                font-size: 24upx;
                color: #999999;
              }
            }

            .item-operate {
              margin-top: 8upx;
              display: flex;
              height: 32upx;
              align-items: center;
              justify-content: flex-start;
              font-size: 28upx;
              color: #666666;
            }
          }
        }
      }
    }
  }
}

.slot-view {
  padding-right: 40upx;

  image {
    width: 56upx;
    height: 56upx;
  }
}
</style>
