<template>
  <div class="login register">
    <section class="loginBg"></section>
    <div class="loginBox">
      <section class="title">
        <a class="logo">
          <!-- 麦庐义协 -->
          <router-link :to="'/home'">
            <img src="../../../assets/mailuyx.png" style="width:150px;height:100%;z-index:999;opacity: 1!important;">
          </router-link>
        </a>
      </section>
      <section>
        <form>
          <div class="form-group">
            <input type="username" class="form-control" v-model="username" v-on:focus="clear" placeholder="起个用户名">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" v-model="password" v-on:focus="clear" placeholder="输入密码">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" v-model="password2" v-on:focus="clear" placeholder="确认密码">
          </div>
          <p class="error">{{error}}</p>
          <button type="submit" class="btn btn-primary" v-on:click="register">注册</button>
          <div class="other">
            <a class="goLogin">
              <router-link :to="'/login'">登录</router-link>
            </a>
            <a class="forget">忘记密码?</a>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
div.register {
  .loginBg {
    background-image: url('../../../assets/register.jpg');
  }

  .loginBox {
    height: 340px;
    border-radius: 5px;
  }
}

div.other {
  margin-top: 20px;

  a {
    display: inline-block;
  }

  .forget {
    float: right;
  }
}
</style>

<script>
// 导入模块

export default {
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      error: ''
    }
  },
  methods: {
    register(event) {
      event.preventDefault()
      if (this.password !== this.password2) {
        this.error = '两次密码不一致!'
      } else {
        this.error = '注册失败, 还没做注册'
      }
    },
    clear() {
      this.error = ''
    }
  }
}
</script>
