<template>
  <view>
    <view class="homepage-index-container">
      <view scroll-y class="top-content">
        <view class="top-content-view"></view>
        <view class="top-content-menu">
          <view class="menu" v-for="(item, index) in menuList" :key="index">
            <image :src="item.image"></image>
            <text v-text="item.text"></text>
          </view>
        </view>
        <view class="top-image-content">
          <view class="image-content-text">
            <text class="title">一键布防</text>
            <text class="text">带给您最方便的操作方式</text>
          </view>
          <image src="../../static/homepage/position.png"></image>
        </view>
        <view class="top-operate-content">
          <text>{{ shopInfo.shopName }}({{ shopInfo.shopNo }})</text>
          <image
            src="../../static/homepage/back.png"
            v-if="shopList.length > 1"
          ></image>
          <image class="plus" src="../../static/homepage/jiahao.png"></image>
        </view>
      </view>
      <view class="main-content">
        <view class="main-menu-content">
          <view class="main-menu">
            <view
              class="menu"
              v-for="(item, index) in mainMenuList"
              :key="index"
              @click="getSubMenu(item)"
            >
              <image :src="item.image"></image>
              <text v-text="item.text"></text>
            </view>
          </view>
        </view>
        <view
          class="main-defence"
          :class="{ 'main-defence-false': !defenceStatus }"
        >
          <view class="defence-content">
            <image :src="defenceImage"></image>
            <text class="text" v-text="defenceText"></text>
            <text class="time" v-text="defenceTime"></text>
            <!-- <text class="tooltip" v-if="!defenceStatus" v-text="defenceTextTip"></text> -->
            <button
              type="primary"
              class="defence-btn"
              v-text="defenceBtnText"
              @click="defence"
            ></button>
            <image
              class="time-select"
              @click="getDefenceRecord"
              src="../../static/homepage/timeSelect.png"
            ></image>
          </view>
        </view>
        <title-content title="视频查看" height="418upx" class="video-content">
          <mosowe-swiper
            swiperType="videoType"
            indicator="dots"
            :touchable="true"
            :height="270"
            :lists="videoList"
            pyramid
            pyramidMargin="48rpx"
          ></mosowe-swiper>
        </title-content>
        <title-content title="客流查看" height="516upx" class="person-content">
          <view slot="titleIcon" @click="getFlowDetail">
            <text>查看更多</text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
          <view class="chart-content">
            <canvas
              canvas-id="canvasLine"
              id="canvasLine"
              class="charts"
              @touchstart="touchLineA"
            ></canvas>
          </view>
        </title-content>
      </view>
    </view>
    <view class="cu-modal show meal-modal" v-if="showModal">
      <view class="cu-dialog">
        <text class="modal-text">套餐{{ lastDay }}天即将到期</text>
        <view class="modal-content">请及时续费，以免影响您的使用</view>
        <view class="modal-image">
          <image src="../../static/homepage/meal.png"></image>
        </view>
        <view class="modal-btn-box">
          <button class="primary" type="primary" @click="getMeal">
            立即续费
          </button>
          <text class="text" @click="modalClose">我知道了</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import titleContent from "../../components/title-content/title-content.vue";
import mosoweSwiper from "../../components/mosowe-swiper/mosowe-swiper.vue";
import uCharts from "../../js_sdk/u-charts/u-charts/u-charts.js";
import utils from "../../utils/util.js";
import { getShopInfo, getShopHourly } from "../../api/index";

const shopHome = require("../../static/homepage/shopHome.png");
const protect = require("../../static/homepage/protect.png");
const chaperonage = require("../../static/homepage/chaperonage.png");
const control = require("../../static/homepage/control.png");
const menu1 = require("../../static/homepage/menu1.png");
const menu2 = require("../../static/homepage/menu2.png");
const menu3 = require("../../static/homepage/menu3.png");
const menu4 = require("../../static/homepage/menu4.png");
const menu5 = require("../../static/homepage/menu5.png");
const defenceImage1 = require("../../static/homepage/main-pic.png");
const defenceImage2 = require("../../static/homepage/main-defence.png");

export default {
  data() {
    return {
      menuList: [
        {
          image: shopHome,
          text: "智慧商家",
        },
        {
          image: protect,
          text: "随身护卫",
        },
        {
          image: chaperonage,
          text: "亲情陪护",
        },
        {
          image: control,
          text: "智慧消防",
        },
      ],
      mainMenuList: [
        {
          image: menu1,
          text: "我要赚钱",
          url: "../../pages/my/money/index",
        },
        {
          image: menu2,
          text: "我要维修",
        },
        {
          image: menu3,
          text: "我要理赔",
          url: "../../pages/homepageIndex/claim/claim",
        },
        {
          image: menu4,
          text: "我的套餐",
          url: "../../pages/homepageIndex/meal/meal",
        },
        {
          image: menu5,
          text: "店铺设置",
        },
      ],
      videoList: [
        "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg",
        "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg",
        "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00043-1699.jpg",
      ],
      cWidth: "335",
      cHeight: "210",
      pixelRatio: 1,
      chartData: {
        categories: ["2012", "2013", "2014", "2015", "2016", "2017"],
        series: [
          {
            name: "成交量A",
            data: [35, 20, 25, 37, 4, 20],
            color: "#1f99ff",
          },
        ],
      },
      chartLine: null,
      defenceStatus: false, // 布撤防状态 true 已布防 false已撤防
      defenceTextTip: "您的套餐还有30天即将到期",
      defenceTime: "",
      lastDay: "", // 套餐剩余过期天数
      showModal: true,
      shopInfo: {},
      shopList: [],
    };
  },

  components: {
    titleContent,
    mosoweSwiper,
  },

  onLoad() {
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(420);
    this.getServerData();
  },

  computed: {
    defenceImage() {
      return this.defenceStatus ? defenceImage2 : defenceImage1;
    },

    defenceText() {
      return this.defenceStatus ? "已布防" : "已撤防";
    },

    defenceBtnText() {
      return this.defenceStatus ? "撤防" : "布防";
    },
  },

  created() {
    this.defenceTime = utils.formatNow();
    const shopList = uni.getStorageSync("smart_c_shopList");
    this.shopList = shopList || [];
    if (this.shopList.length) {
      this.shopInfo = shopList[0];
      this.defenceStatus = this.shopInfo.armingStatus == "1";
      this.saveShopLocal();
      this.getShopHourly();
      this.getShopInfo();
    }
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(420);
  },

  methods: {
    saveShopLocal() {
      uni.setStorageSync("shopId", this.shopInfo.id);
    },
    // 店铺客流查看
    getShopHourly() {
      getShopHourly(this.shopInfo.id).then((res) => {
        console.log(res);
      });
    },
    // 获取店铺信息，计算过期时间
    getShopInfo() {
      getShopInfo(this.shopInfo.id).then((res) => {
        const now = new Date();
        const endTime = new Date();
        const day = Math.floor((endTime - now) / 1000 / 60 / 60 / 24);
        if (day <= 7) {
          this.showModal = true;
          this.lastDay = day;
        }
      });
    },
    getServerData() {
      this.showLineA("canvasLine", this.chartData);
    },

    // line 图
    showLineA(canvasId, chartData) {
      const _self = this;
      this.chartLine = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: "area",
        fontSize: 11,
        legend: {
          show: false,
        },
        padding: [15, 30, 4, 24],
        dataLabel: false,
        dataPointShape: true,
        background: "#FFFFFF",
        pixelRatio: _self.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: true,
        xAxis: {
          type: "grid",
          gridColor: "#CCCCCC",
          gridType: "dash",
          dashLength: 8,
          disableGrid: true,
          boundaryGap: "justify",
        },
        yAxis: {
          gridType: "dash",
          gridColor: "#CCCCCC",
          dashLength: 8,
          splitNumber: 5,
        },
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          area: {
            type: "curve",
            opacity: 0.2,
            addLine: true,
            width: 3,
            gradient: true,
          },
        },
      });
    },

    // 展示tooltip
    touchLineA(e) {
      this.chartLine.showToolTip(e, {
        format: function (item, category) {
          return category + " " + item.name + ":" + item.data;
        },
      });
    },

    // 布防撤防
    defence() {
      const { shopId } = this.shopInfo;
      const obj = {
        shopId,
        flag: this.defenceStatus ? 0 : 1,
      };
      this.$tui
        .request("/shop/deploy", "get", obj)
        .then((res) => {
          if (res.success && res.status === 200) {
            const text = this.defenceStatus ? "撤防成功" : "布防成功";
            uni.showToast({
              title: text,
            });
            this.defenceStatus = !this.defenceStatus;
          }
        })
        .catch();
    },

    // 跳转到子菜单
    getSubMenu({ url }) {
      if (!url) return;
      uni.navigateTo({
        url: url,
      });
    },

    // 立即续费
    getMeal() {
      this.modalClose();
      this.getSubMenu({ url: "./meal/meal" });
    },

    // 模态框关闭
    modalClose() {
      this.showModal = false;
    },

    // 客流查看详情
    getFlowDetail() {
      this.getSubMenu({ url: "./flowStatistics/flowStatistics" });
    },

    // 布撤防记录
    getDefenceRecord() {
      this.getSubMenu({ url: "./defence/defence" });
    },
  },
};
</script>

<style lang="less">
.homepage-index-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: #fbfbfb;

  .top-content {
    height: 730upx;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(to right, #146eee, #3588ff);
    position: relative;
    z-index: 1;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      border-bottom: 100upx solid #fbfbfb;
      height: 0;
      border-right: 200upx solid transparent;
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      border-bottom: 100upx solid #fbfbfb;
      height: 0;
      border-left: 200upx solid transparent;
    }

    .top-content-view {
      height: 88upx;
    }

    .top-content-menu {
      height: 136upx;
      display: flex;
      justify-content: space-around;
      width: 100%;

      .menu {
        width: 120upx;
        padding: 32upx 0 0;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 24upx;
        color: #ffffff;
        flex-direction: column;
        align-items: center;

        image {
          width: 60upx;
          height: 60upx;
        }
      }
    }

    .top-image-content {
      height: 270upx;
      margin-top: 20upx;
      display: flex;

      image {
        width: 392upx;
        flex: 392upx 0 0;
        height: 100%;
      }

      .image-content-text {
        flex: 1 0 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 30upx 0 40upx;
        box-sizing: border-box;
        color: #ffffff;
        justify-content: center;

        .title {
          font-size: 64upx;
          height: 90upx;
          display: flex;
          align-items: center;
        }

        .text {
          font-size: 24upx;
          height: 34upx;
          display: flex;
          align-items: center;
        }
      }
    }

    .top-operate-content {
      height: 36upx;
      display: flex;
      padding: 0 0 0 40upx;
      align-items: center;
      justify-content: ;
      color: #ffffff;

      text {
        font-size: 32upx;
      }

      image {
        width: 40upx;
        height: 40upx;
        margin-left: 16upx;
      }

      .plus {
        width: 34upx;
        height: 32upx;
        margin-left: 32upx;
      }
    }
  }

  .main-content {
    margin-top: -144upx;
    z-index: 100;
    display: flex;
    flex-direction: column;

    .main-menu-content {
      padding: 0 40upx;
      height: 204upx;
      width: 100%;
      box-sizing: border-box;

      .main-menu {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        border-radius: 18upx;
        background-color: #ffffff;
        padding: 32upx 0 40upx;
        box-sizing: border-box;

        .menu {
          width: 120upx;
          box-sizing: border-box;
          height: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 24upx;
          color: #2e435f;
          flex-direction: column;
          align-items: center;

          image {
            width: 88upx;
            height: 88upx;
          }
        }
      }
    }

    .main-defence {
      height: 498upx;
      width: 100%;
      padding: 0 40upx;
      box-sizing: border-box;
      margin-top: 8upx;

      &.main-defence-false {
        height: 532upx;
      }

      .defence-content {
        padding: 32upx 32upx 40upx;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        background: url(../../static/homepage/bg.png) no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        image {
          width: 258upx;
          height: 252upx;
        }

        .text {
          font-size: 28upx;
          height: 40upx;
          display: flex;
          align-items: center;
          transform: translateY(-8upx);
          justify-content: center;
          color: #ff8446;
        }

        .time {
          font-size: 24upx;
          color: #1676fe;
          height: 32upx;
        }

        .tooltip {
          height: 32upx;
          font-size: 24upx;
          transform: scale(0.8333);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff0000;
          margin-top: 4upx;
        }

        .defence-btn {
          width: 388upx;
          height: 108upx;
          border-radius: 54upx;
          background-color: #1676fe;
          margin-top: 8upx;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .time-select {
          position: absolute;
          right: 32upx;
          top: 32upx;
          width: 44upx;
          height: 46upx;
        }
      }
    }

    .person-content {
      margin-bottom: 20upx;

      .chart-content {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        flex-direction: column;

        .content-info {
          height: 28upx;
          display: flex;
          justify-content: space-between;
          font-size: 20upx;
          color: #999999;
          padding: 0 40upx;
          width: 100%;
          box-sizing: border-box;

          & .text-view {
            color: #2098fe;
          }
        }

        .charts {
          width: 750upx;
          height: 420upx;
        }
      }
    }
  }
}

.meal-modal {
  .cu-dialog {
    width: 590upx;
    height: 630upx;
    border-radius: 18upx;

    .modal-text {
      height: 52upx;
      display: flex;
      align-items: center;
      color: #333;
      font-weight: 500;
      margin: 64upx 0 16upx;
      font-size: 44upx;
      justify-content: center;
    }

    .modal-content {
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 28upx;
      line-height: 32upx;
      text-align: left;
      margin-bottom: 40upx;
    }

    .modal-image {
      width: 100%;
      height: 136upx;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
        width: 166upx;
        height: 100%;
      }
    }

    .modal-btn-box {
      color: #1676fe;
      font-size: 36upx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 50upx;

      .primary {
        width: 376upx;
        height: 96upx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 56upx;
      }

      .text {
        margin-top: 48upx;
        height: 44upx;
      }
    }
  }
}
</style>
