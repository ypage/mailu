<template>
  <div class="container">
    <div class="box">
      <Form :label-width="80">
        <Form-item label="用户名：">
          <Input v-model="userInfos.username" disabled></Input>
        </Form-item>
        <Form-item v-for="(item,index) in formItem" :key="item" :label="item.name">
          <Input v-model="item.inputInfo" placeholder="请输入" :disabled="disabled"></Input>
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
      userInfos: {
        username: this.$store.getters.name,
      },
      formItem: [{
        name: '姓名：',
        inputInfo: this.$store.getters.user.name,
      }, {
        name: '联系方式：',
        inputInfo: this.$store.getters.user.telephone,
      }, {
        name: '单位名称：',
        inputInfo: this.$store.getters.user.companyName,
      }, {
        name: '部门：',
        inputInfo: this.$store.getters.user.department,
      }, {
        name: '职位：',
        inputInfo: this.$store.getters.user.position,
      }, {
        name: '邮箱：',
        inputInfo: this.$store.getters.user.email,
      }, {
        name: '备注：',
        inputInfo: this.$store.getters.user.remarks,
      }]
    }
  },
  methods: {
    checkSubmit() {
      let video = this;
      let user = {
        username: this.userInfos.username,
        name: this.formItem[0].inputInfo,
        telephone: this.formItem[1].inputInfo,
        companyName: this.formItem[2].inputInfo,
        department: this.formItem[3].inputInfo,
        position: this.formItem[4].inputInfo,
        email: this.formItem[5].inputInfo,
        remarks: this.formItem[6].inputInfo,
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
