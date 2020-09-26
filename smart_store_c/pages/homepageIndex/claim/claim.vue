<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">理赔</block>
    </cu-custom>

    <view class="content">
      <view class="basic-info">
        <view class="basic-info-item" @click="goChoose">
          <text class="basic-info-item-title">被盗时间</text>
          <view class="basic-info-item-info">{{ claimInfo.time }}
            <!-- <uni-icons type="arrowright"></uni-icons> -->
          </view>
        </view>
        <view class="basic-info-item">
          <text class="basic-info-item-title">申请理赔金额</text>
          <view class="basic-info-item-info">
            <input class="input" type="digit" v-model="claimInfo.money" placeholder="请输入..." />
          </view>
        </view>
        <!-- <view class="basic-info-item">
					<text class="basic-info-item-title">基本资料</text>
					<text class="basic-info-item-info">{{ claimInfo.note }}
						<uni-icons type="arrowright" bgColor></uni-icons>
					</text>
				</view>
				<view class="basic-info-item">
					<text class="basic-info-item-title">进度跟踪</text>
					<text class="basic-info-item-info">{{ claimInfo.progress }}
						<uni-icons type="arrowright"></uni-icons>
					</text>
				</view> -->
      </view>
      <view class="basic-image-info">
        <view class="image-info-title">上传照片</view>
        <view class="image-box">
          <!-- <view class="img-item" v-for="(item, index) in imgList" :key="index">
            <image class="select-img" :src="item"></image>
            <image class="delete-img" src="../../../static/homepage/icon-delete.png" @click="deleteImg(index)"></image>
          </view> -->
          <view class="img-select-box" v-for="(item, index) in requireList" :key="index" @click="addImg(index)">
            <view class="img-select" v-show="!item.src">
              <image class="img-select-icon" src="../../../static/homepage/icon-camera.png"></image>
              <!-- <text class="selected-num">{{ selectImgNum }}/5</text> -->
            </view>
            <image class="img-content" v-show="item.src" :src="item.src"></image>
            <view class="img-select-title">{{item.title}}({{item.require?'必填':'选填'}})</view>
          </view>
        </view>

        <!-- <text class="select-img-prompt" v-show="imgList.length === 0">最多可上传5张照片</text> -->
      </view>
    </view>
    <view class="btn-group">
      <button type="primary" class="btn" @click="submitClaim">提交</button>
    </view>
    <view class="cu-modal show claim-modal" v-show="showModal">
      <view class="cu-dialog">
        <text class="modal-text">理赔须知</text>
        <view class="modal-content">理赔是指被保险人在保险合同有效期内发生保险事故时，索赔权利人依照保险合同约定申请保险金给付，保险人依照保险合同约定进行审核并给付保险金的过程</view>
        <view class="modal-btn-box">
          <text @click="showModal = false" v-if="!timeout">我知道了({{time}}s)</text>
          <text @click="showModal = false" v-else>确定</text>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" :maskClick="false"></uni-popup>
    <mx-date-picker :show="showPicker" type="datetime" color="#1676FE" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" format="yyyy-mm-dd hh:ii:ss" />
  </view>
</template>

<script>
const image = require('../../../static/homepage/claim/main-video.png')

import { getClaimRequire, getClaimDetail, addClaim, uploadImg } from '@/api'
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'

export default {
  components: { MxDatePicker, uniPopup },
  data() {
    return {
      showModal: false,
      timer: null,
      time: 5,
      timeout: false,
      claimInfo: {
        time: '',
        money: '',
      },
      requireList: [],
      showPicker: false,
    }
  },
  computed: {},
  mounted() {
    this.timer = setInterval(() => {
      this.time -= 1
      if (this.time === 0) {
        this.timeout = true
        clearInterval(this.timer)
      }
    }, 1000)
    this.getClaimRequire()
  },

  methods: {
    goChoose(val) {
      this.$refs.popup.open()
      this.showPicker = true
      this.value = val
    },
    onSelected(e) {
      //选择
      this.showPicker = false
      this.$refs.popup.close()
      if (e) {
        this.claimInfo.time = e.value
      }
    },
    getClaimDetail() {
      getClaimRequire(id).then((res) => {
        const { status, result } = res
        if (status === 200) {
        }
      })
    },
    getClaimRequire() {
      let param = {
        shopId: uni.getStorageSync('shopId'),
      }
      getClaimRequire(param).then((res) => {
        const { status, result } = res
        if (status === 200) {
          this.requireList = result.map((item) => {
            item.src = ''
            item.require = item.require == 1 ? true : false
            return item
          })
        }
      })
    },
    // 理赔
    submitClaim() {
      if (!this.claimInfo.time) {
        this.$tui.toast('请选择被盗时间')
        return
      }
      if (!this.claimInfo.money) {
        this.$tui.toast('请输入理赔金额')
        return
      }
      let arr = []
      this.cachePhoto = []
      for (let index = 0; index < this.requireList.length; index++) {
        const item = this.requireList[index]
        if (item.require && !item.src) {
          this.$tui.toast('请上传' + item.title)
          return
        }
        item.src && arr.push(this.uploadImg(item))
      }
      if (arr.length > 0) {
        Promise.all(arr).then((res) => {
          this.addClaim()
        })
      } else {
        this.addClaim()
      }
    },
    uploadImg(item) {
      return uploadImg(item.src).then((res) => {
        let rs = JSON.parse(res)
        const { status, result } = rs
        if (status === 200) {
          this.cachePhoto.push({
            title: item.title,
            image: result,
          })
        }
      })
    },
    addClaim() {
      let param = {
        shopId: uni.getStorageSync('shopId'),
        stolenDate: this.claimInfo.time,
        claimAmount: this.claimInfo.money,
        photo: JSON.stringify(this.cachePhoto),
      }
      addClaim(param).then((res) => {
        const { status, message } = res
        if (status === 200) {
          this.$tui.toast(message)
          setTimeout(() => {
            uni.navigateTo(
              {
                url: '../../homepage/homepage',
              },
              500
            )
          })
        }
      })
    },
    // 获取被盗时间
    getTime() {
      uni.navigateTo({
        url: '../../homepage/personInChargeManagement/stolen-time',
      })
    },

    addImg(index) {
      const _this = this
      uni.chooseImage({
        count: 1, //最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: function (res) {
          // _this.imgList = _this.imgList.concat(res.tempFilePaths[0])
          console.log(res.tempFilePaths[0])
          _this.requireList[index].src = res.tempFilePaths[0]
        },
        fail: function (res) {
          console.log(res)
        },
      })
    },

    deleteImg(index) {
      this.imgList.splice(index, 1)
    },
  },
}
</script>

<style lang="less" scoped>
.claim-modal {
  .cu-dialog {
    width: 590upx;
    border-radius: 20upx;

    .modal-text {
      height: 64upx;
      display: flex;
      align-items: center;
      color: #333;
      font-weight: 500;
      margin: 30upx 0 10upx;
      font-size: 40upx;
      justify-content: center;
    }

    .modal-content {
      color: #777777;
      font-size: 28upx;
      padding: 0 40upx;
      box-sizing: border-box;
      line-height: 46upx;
      text-align: left;
      margin-bottom: 10upx;
    }

    .modal-btn-box {
      height: 88upx;
      border-top: 2upx solid #ececec;
      color: #007aff;
      font-size: 32upx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

page {
  height: 100%;
  background-color: #f0f0f0;

  .page-box {
    width: 100%;

    .content {
      width: 100%;
      margin-top: 40upx;

      .basic-info,
      .increase-info {
        width: 100%;
        background-color: white;
        border-bottom: 1px #e6e6e6 solid;

        .basic-info-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 40upx;
          box-sizing: border-box;
          border-top: 1px #e6e6e6 solid;
          height: 124upx;

          .basic-info-item-title {
            font-size: 32upx;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }

          .basic-info-item-info {
            font-size: 28upx;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);

            .uni-icons {
              color: rgba(153, 153, 153, 1) !important;
              margin-left: 14upx;
            }

            .input {
              height: 44upx;
              line-height: 44upx;
              min-height: 44upx;
              text-align: right;
              // padding-right: 46upx;
              box-sizing: border-box;
            }
          }
        }
      }

      .basic-image-info {
        padding: 0 40upx;
        display: flex;
        flex-direction: column;
        margin-top: 40upx;
        background-color: #ffffff;
        margin-bottom: 160upx;

        .image-info-title {
          height: 76upx;
          font-size: 36upx;
          color: #333333;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .image-box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin: 20upx 0;
          justify-content: space-between;

          .img-item {
            position: relative;
            width: 320upx;
            height: 200upx;
            margin-bottom: 20upx;
            border-radius: 20upx;

            .select-img {
              width: 100%;
              height: 100%;
            }

            .delete-img {
              width: 40upx;
              height: 40upx;
              position: absolute;
              right: -20upx;
              top: -20upx;
              background-color: white;
              border-radius: 100%;
            }
          }

          .img-select-box {
            margin-bottom: 20upx;
            .img-select {
              width: 320upx;
              height: 200upx;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 2upx #979797 dashed;

              .img-select-icon {
                width: 40upx;
                height: 40upx;
              }

              .selected-num {
                font-size: 16upx;
                font-family: PingFang-SC-Medium, PingFang-SC;
                font-weight: 500;
                color: rgba(210, 210, 214, 1);
                margin-top: 10upx;
              }
            }
            .img-content {
              width: 320upx;
              height: 200upx;
              object-fit: cover;
              display: block;
            }
            .img-select-title {
              text-align: center;
              padding-top: 10upx;
            }
          }
        }

        .select-img-prompt {
          font-size: 24upx;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(210, 210, 214, 1);
          margin-bottom: 20upx;
          width: 320upx;
          text-align: center;
        }
      }
    }

    .btn-group {
      position: fixed;
      bottom: 30upx;
      left: 0;
      width: 100%;
      height: 96upx;
      padding: 0 40upx;
      z-index: 10;

      .btn {
        width: 100%;
        height: 100%;
        border-radius: 48upx;
      }
    }
  }
}
</style>
