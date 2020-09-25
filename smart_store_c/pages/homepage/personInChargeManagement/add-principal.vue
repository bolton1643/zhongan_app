<template>
  <view>
    <view class="page-box">
      <cu-custom bgColor="bg-gray" :isBack="true">
        <block slot="content">新增负责人</block>
        <block slot="right">
          <text style="margin-right: 40upx;">取消</text>
        </block>
      </cu-custom>

      <view class="content-box">
        <view class="content-item">
          <text class="item-text">姓名</text>
          <input class="item-input" v-model="formData.name" maxlength="10" placeholder="请填写姓名" />
        </view>
        <view class="divide"></view>
        <view class="content-item">
          <text class="item-text">手机号</text>
          <input class="item-input" v-model="formData.phone" type="number" maxlength="11" placeholder="请输入手机号" />
        </view>
        <view class="content-item">
          <text class="item-text">密码</text>
          <input class="item-input" v-model="formData.password" type="number" maxlength="11" placeholder="请输入密码" />
        </view>

        <view class="content-item" style="margin-top: 40upx;" @click="chooseRole">
          <text class="item-text">角色</text>
          <text class="role-text">{{ roleText }}</text>
          <image class="icon-enter" src="../../../static/homepage/icon-enter.png"></image>
        </view>
        <view class="divide"></view>
        <view class="content-item">
          <text class="item-text">查看视频</text>
          <radio-group class="radio-box">
            <label class="uni-list-cell uni-list-cell-pd">
              <radio value="1" :checked="formData.isCheckVideo === '1'" />
              <text>是</text>
            </label>
            <label class="uni-list-cell uni-list-cell-pd">
              <radio value="0" :checked="formData.isCheckVideo === '0'" />
              <text>否</text>
            </label>
          </radio-group>
        </view>
        <view class="divide"></view>
        <view class="content-item" @click="chooseImg" style="justify-content: space-between;">
          <text class="item-text">照片</text>
          <text class="img-path">{{ formData.imgPath }}</text>
          <image v-show="formData.imgPath" :src="formData.imgPath"></image>
          <image class="img-camera" src="../../../static/homepage/icon-xiangji.png"></image>
        </view>

        <view class="makesure-btn" @click="addOperator">确定</view>
      </view>
    </view>

    <uni-popup ref="popup" type="bottom" :maskClick="false">
      <view class="modal-box">
        <view class="role-box">
          <view class="role-item" @click="selectRole(1)">
            <text>管理员</text>
            <image v-show="formData.role===1" src="../../../static/homepage/icon-choose.png"></image>
          </view>
          <view class="divide"></view>
          <view class="role-item" @click="selectRole(2)">
            <text>操作员</text>
            <image v-show="formData.role===2" src="../../../static/homepage/icon-choose.png"></image>
          </view>
        </view>

        <view class="cancel" @click="cancelModal">取消</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { addOperator } from '../../../api'
import tui from '../common/httpRequest'

import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
  components: {
    uniPopup,
  },

  data() {
    return {
      formData: {
        name: '',
        phone: '',
        password: '',
        role: '',
        isCheckVideo: '1',
        imgPath: '',
      },
      roleList: [
        { name: '管理员', value: 1 },
        { name: '操作员', value: 2 },
      ],
    }
  },
  computed: {
    roleText() {
      switch (this.formData.role) {
        case 1:
          return '管理员'
        case 2:
          return '操作员'
        default:
          return '请选择'
      }
    },
  },

  methods: {
    addOperator() {
      let param = {
        shopId: uni.getStorageSync('shopId'),
        name: this.formData.name,
        phone: this.formData.phone,
        role: this.formData.role,
        password: this.formData.password,
        videoFlag: this.formData.isCheckVideo,
        photo: this.formData.imgPath,
      }
      console.log(param)
      return
      addOperator(param).then((res) => {
        const { status, result } = res
        if (status === 200) {
          console.log(result)
        }
      })
    },
    chooseRole() {
      this.$refs.popup.open()
    },

    cancelModal() {
      this.$refs.popup.close()
    },

    selectRole(val) {
      this.formData.role = val
      this.cancelModal()
    },

    chooseImg() {
      const _this = this
      uni.chooseImage({
        count: 1, //最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: function (res) {
          console.log(JSON.stringify(res.tempFilePaths))
          _this.formData.imgPath = res.tempFilePaths[0]
        },
        fail: function (res) {
          console.log(res)
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
  display: flex;
  flex-direction: column;

  .content-box {
    flex: 1;
    width: 100%;
    margin-top: 40upx;

    .content-item {
      width: 100%;
      display: flex;
      align-items: center;
      height: 112upx;
      background-color: white;
      padding: 0 40upx;
      box-sizing: border-box;

      .item-text {
        min-width: 192upx;
        font-size: 32upx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }

      .item-input,
      .role-text,
      .img-path,
      .radio-box {
        flex: 1;
        font-size: 28upx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #999999;
      }

      .icon-enter {
        width: 32upx;
        height: 32upx;
      }

      .img-path {
        max-width: 360upx;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .img-camera {
        width: 88upx;
        height: 88upx;
      }

      .radio-box uni-label:nth-child(1) {
        margin-right: 64upx;
      }

      .radio-box uni-label uni-radio {
        margin-right: 18upx;
      }
    }

    .divide {
      width: 100%;
      height: 2upx;
      background-color: #e6e6e6;
    }

    .makesure-btn {
      width: 100%;
      height: 112upx;
      line-height: 112upx;
      text-align: center;
      background-color: #1676fe;
      font-size: 32upx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 40upx;
    }
  }
}

.modal-box {
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0 40upx 68upx;
  box-sizing: border-box;

  .role-box {
    width: 100%;
    background-color: white;
    border-radius: 24upx;
    display: flex;
    flex-direction: column;

    .role-item {
      width: 100%;
      height: 112upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40upx;
      box-sizing: border-box;
      font-size: 32upx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;

      uni-image {
        width: 32upx;
        height: 32upx;
      }
    }

    .divide {
      width: 100%;
      height: 2upx;
      background-color: #e6e6e6;
    }
  }

  .cancel {
    width: 100%;
    margin-top: 16upx;
    height: 112upx;
    line-height: 112upx;
    text-align: center;
    background-color: white;
    border-radius: 24upx;
    font-size: 36upx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
}
</style>
