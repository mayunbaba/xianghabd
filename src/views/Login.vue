<template>
  <div class="login">
    <van-form>
      <van-field
        v-model="tel"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        clearable
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary" v-show="isOvertime" @click="sendVerifyCode">发送验证码</van-button>
          <van-button size="small" disabled v-show="!isOvertime">重新获取({{time}}s)</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { request } from "@/network/request";
import store from "../store";
export default {
  name: "Login",
  data() {
    return {
      tel: "",
      sms: "",
      time: 60,
      isOvertime: true,
      sendTimer: ""
    };
  },
  methods: {
    submit() {
      request("/baidu/v1/login/login?", {
        tel: this.tel,
        verifyCode: this.sms
      }).then(res => {
        this.$toast.success("登录成功");
        if (res) {
          store.commit("setUserInfo",res);
        }
        if (this.$route.params.prepath) {
          this.$router.push(this.$route.params.prepath);
        }
      });
    },
    sendVerifyCode() {
      if (!this.tel) return;
      this.timeReduce();
      request("/baidu/v1/login/sendVerifyCode?", {
        tel: this.tel
      }).then(() => {
        this.$toast.success("验证码已发送");
      });
    },
    timeReduce() {
      if (!this.isOvertime) {
        return false;
      }
      this.isOvertime = false;
      this.sendTimer = setInterval(() => {
        this.isOvertime = false;
        this.time--;
        if (this.time < 0) {
          this.isOvertime = true;
          this.time = 60;
          clearInterval(this.sendTimer);
        }
      }, 1000);
    }
  },
  destroyed() {
    clearInterval(this.sendTimer);
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  .van-form {
    width: 100%;
  }
}
</style>

