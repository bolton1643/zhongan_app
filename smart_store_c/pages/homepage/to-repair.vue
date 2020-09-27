<template>
  <view class="page-box">
    <cu-custom bgColor="bg-gray" :isBack="true">
      <block slot="content">我要维修</block>
    </cu-custom>

    <view class="content-box">
      <view>
        <view class="title-box">
          <text class="title-desp">维修描述</text>
          <text class="remaining-words">您还可以输入{{ remainingWords }}字</text>
        </view>
        <textarea class="textarea" v-model.trim="value" placeholder="维修说明......" placeholder-class="input-placeholder" maxlength="100"></textarea>
        <view class="image-box">
          <view class="img-item" v-for="(item, index) in imgList" :key="index">
            <image class="select-img" :src="item"></image>
            <image class="delete-img" src="../../static/homepage/icon-delete.png" @click="deleteImg(index)"></image>
          </view>
          <view class="img-select-box" v-show="imgList.length !== 5" @click="addImg">
            <view class="img-select">
              <image class="img-select-icon" src="../../static/homepage/icon-camera.png"></image>
              <text class="selected-num">{{ selectImgNum }}/5</text>
            </view>
            <text class="select-img-prompt" v-show="imgList.length === 0">最多可上传5张照片</text>
          </view>
        </view>
      </view>

      <view class="btn-box">
        <button class="form-submit-btn" type="primary" @click="submit">确认</button>
      </view>
    </view>
  </view>
</template>

<script>
import { addRepairInfo, uploadImg } from '@/api'

export default {
  data() {
    return {
      value: '',
      imgList: [],
      imgNum: '上传照片',
      // selectImgNum: 0,
    }
  },

  onLoad: function (options) {},
  computed: {
    remainingWords() {
      return 100 - this.value.length
    },
    selectImgNum() {
      return this.imgList.length
    },
  },
  methods: {
    // inputHandle(event) {
    //   console.log(event);
    //   this.remainingWords = 100 - event.detail.value.length
    // },
    submit() {
      if (!this.value) {
        this.$tui.toast('请填写维修说明')
        return
      }
      if (this.imgList.length <= 0) {
        this.$tui.toast('请选择图片')
        return
      }
      if (this.doubleClick) {
        return
      }
      let list = []
      this.doubleClick = true
      let length = this.imgList.length
      this.imgList.forEach((item) => {
        uploadImg(item).then((res) => {
          let rs = JSON.parse(res)
          const { status, result, message } = rs
          if (status === 200) {
            list.push(result)
            if (list.length === length) {
              this.addRepairInfo(list)
            }
          } else {
            this.$tui.toast(message)
            this.doubleClick = false
          }
        })
      })
    },
    addRepairInfo(imgList) {
      let param = {
        shopId: uni.getStorageSync('shopId'),
        content: this.value,
        photo: imgList,
      }
      addRepairInfo(param).then((res) => {
        const { status, message } = res
        this.doubleClick = false
        if (status === 200) {
          this.$tui.toast(message)
        }
      })
    },
    addImg() {
      const _this = this
      uni.chooseImage({
        count: 5 - _this.selectImgNum, //最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: function (res) {
          _this.imgList = _this.imgList.concat(res.tempFilePaths)
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

<style lang="less">
.page-box {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;

  .content-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-top: 40upx;
    background-color: white;
    border-top-left-radius: 24upx;
    border-top-right-radius: 24upx;
    padding: 64upx 40upx 68upx;
    box-sizing: border-box;

    .title-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-desp {
        font-size: 36upx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(71, 71, 71, 1);
      }

      .remaining-words {
        font-size: 32upx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(210, 210, 214, 1);
      }
    }

    .textarea {
      width: 100%;
      margin-top: 40upx;

      .input-placeholder {
        font-size: 32upx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(210, 210, 214, 1);
      }
    }

    .image-box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 10upx;

      .img-item {
        width: 130upx;
        height: 130upx;
        position: relative;
        margin-right: 30upx;
        margin-top: 30upx;

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
        display: flex;
        align-items: flex-end;
        margin-top: 30upx;

        .img-select {
          width: 130upx;
          height: 130upx;
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

        .select-img-prompt {
          font-size: 32upx;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(210, 210, 214, 1);
          margin-left: 40upx;
        }
      }
    }

    .btn-box {
      width: 100%;
      margin-top: 80upx;

      .form-submit-btn {
        width: 100%;
        height: 112upx;
        line-height: 112upx;
        background-color: #1676fe;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        border-radius: 56upx;
      }
    }
  }
}
</style>
