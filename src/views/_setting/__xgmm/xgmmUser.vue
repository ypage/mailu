<template>
  <div class="container">
    <div class="box">
      <Form ref="newPswd" :model="newPswd" :rules="ruleCustom" :label-width="80">
        <Form-item label="用户名" prop="username">
          <Input v-model="newPswd.username" disabled>
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="原密码" prop="old_password">
          <Input @keyup.native="checkPswd($event)" type="password" v-model="newPswd.old_password" placeholder="请输入原密码" :disabled="!disabled">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="新密码" prop="new_password">
          <Input type="password" v-model="newPswd.new_password" placeholder="请输入新密码" :disabled="disabled">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="确认密码" prop="confirm_password">
          <Input type="password" v-model="newPswd.confirm_password" placeholder="请再次输入新密码" :disabled="disabled">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="checkSubmit" :disabled="disabled">提交</Button>
          <Button type="ghost" @click="handleReset('newPswd')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'));
      } else {
        if (this.newPswd.confirm_password !== '') {
          this.$refs.newPswd.validateField('confirm_password');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if (value !== this.newPswd.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      disabled: true,
      newPswd: {
        username: Cookies.get('username'),
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
      ruleCustom: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        old_password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        new_password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, validator: validatePassCheck, trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    checkPswd:function(ev){
      let video = this;
      video.$Notice.config({
        top: 60,
        duration: 5
      });
      this.$http({
        url: '/user/login',
        method: 'post',
        data: {
          username: this.newPswd.username,
          password: this.newPswd.old_password
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code == 20000) {
          this.disabled = false;
          video.$Notice.success({
            title: '密码正确！',
            type: 'success'
          });
        } else if (res.data.code == 10000) {

        }
      }).catch(err => {
        console.log(err)
      })
    },
    checkSubmit() {
      let video = this;
      video.$Notice.config({
        top: 60,
        duration: 5
      });
      if (this.newPswd.confirm_password != this.newPswd.new_password) {
        video.$Notice.warning({
          title: '两次输入的密码不一致！',
          type: 'warning'
        });
      } else {
        this.$http({
          method: 'post',
          url: '/userManager/update_password',
          data: {
            username: this.newPswd.username,
            password: this.newPswd.new_password
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code == 20000) {
            this.disabled = true;
            video.$Notice.success({
              title: '修改密码成功！',
              type: 'success',
            });
          } else {
            video.$Notice.error({
              title: '修改密码失败！',
              type: 'error'
            });
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style scoped>
.box {
  margin-top: 80px;
  width: 320px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 55px;
}

.showTishi {
  padding-left: 150px;
  color: red;
}
</style>
