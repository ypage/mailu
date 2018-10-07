<template>
  <div class="container">
    <div class="box">
      <Form :model="formItem" :label-width="80">
        <Form-item label="用户名：">
          <Input v-model="formItem.username" placeholder="请输入" disabled></Input>
        </Form-item>
        <Form-item label="姓名：">
          <Input v-model="formItem.name" placeholder="请输入" :disabled="disabled"></Input>
        </Form-item>
        <Form-item label="联系方式：">
          <Input v-model="formItem.telephone" placeholder="请输入" :disabled="disabled"></Input>
        </Form-item>
        <Form-item label="地址：">
          <Input v-model="formItem.address" placeholder="请输入" :disabled="disabled"></Input>
        </Form-item>
        <Form-item label="部门：">
          <Input v-model="formItem.department" placeholder="请输入" :disabled="disabled"></Input>
        </Form-item>
        <Form-item label="职位：">
          <Input v-model="formItem.position" placeholder="请输入" :disabled="disabled"></Input>
        </Form-item>
        <Form-item label="邮箱：">
          <Input v-model="formItem.email" placeholder="请输入" :disabled="disabled"></Input>
        </Form-item>
        <Form-item label="备注：">
          <Input v-model="formItem.remarks" placeholder="请输入" :disabled="disabled"></Input>
        </Form-item>
        <Button type="primary" @click="disabled = !disabled" style="margin-left:80px;width:80px;">
                <span v-if="disabled">更新资料</span>
                <span v-else>取消</span>
              </Button>
        <Button type="primary" @click="checkSubmit" style="margin-left:50px;" :disabled="disabled">提交</Button>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        disabled: true,
        formItem: {
          username: this.$store.getters.name,
          name: this.$store.getters.user.name,
          telephone: this.$store.getters.user.telephone,
          address: this.$store.getters.user.address,
          department: this.$store.getters.user.department,
          position: this.$store.getters.user.position,
          email: this.$store.getters.user.email,
          remarks: this.$store.getters.user.remarks,
        }
      }
    },
    methods: {
      checkSubmit() {
        let video = this;
        let user = {
          username: this.formItem.username,
          name: this.formItem.name,
          telephone: this.formItem.telephone,
          address: this.formItem.address,
          department: this.formItem.department,
          position: this.formItem.position,
          email: this.formItem.email,
          remarks: this.formItem.remarks,
        }
        video.$Notice.config({
          top: 60,
          duration: 5
        });
        this.$http({
          method: 'post',
          url: '/userManager/update_person_info',
          data: user
        }).then(res => {
          console.log(res)
          this.$store.commit('SET_USER', user)
          console.log(this.$store.getters.user)
          if (res.data.code == 20000) {
            this.disabled = true;
            video.$Notice.success({
              title: '修改用户信息成功！',
              type: 'success'
            });
          } else if (res.data.code == 10000) {
            video.$Notice.error({
              title: '修改用户信息失败！',
              type: 'error'
            });
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
  }
</script>
<style>
  .box {
    margin-top: 80px;
    margin-bottom: 40px;
    width: 320px;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 55px;
  }
</style>
