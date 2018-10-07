<template>
  <div class="xxhzUser">
    <!-- 新增用户 -->
    <Button @click="newUser = true">新增用户</Button>
    <Modal title="新增用户" v-model="newUser" @on-ok="newUsers()" @on-cancel="onCancel" class="new-title">
      <Form :model="newInfo" :label-width="150" size="small">
        <Form-item label="用户名：" class="form-w">
          <Input v-model="newInfo.username" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="姓名：" class="form-w">
          <Input v-model="newInfo.name" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="联系方式：" class="form-w">
          <Input v-model="newInfo.telephone" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="密码：" class="form-w">
          <Input v-model="newInfo.password" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="确认密码：" class="form-w">
          <Input v-model="newInfo.confirm_password" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
  
        <Form-item label="权限：" class="form-w">
          <Radio-group v-model="newInfo.id" checked class="input-ws">
            <Radio label="1">管理员</Radio>
          </Radio-group>
        </Form-item>
  
        <Form-item label="单位名称：" class="form-w">
          <Input v-model="newInfo.company_name" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="部门名称：" class="form-w">
          <Input v-model="newInfo.department" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="邮箱：" class="form-w">
          <Input v-model="newInfo.email" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="职位：" class="form-w">
          <Input v-model="newInfo.position" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="备注：" class="form-w">
          <Input v-model="newInfo.remarks" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
      </Form>
    </Modal>
    <!-- 修改密码 -->
    <Button @click="changePassword" :disabled="disabled">修改密码</Button>
    <Modal title="修改密码" v-model="password" @on-ok="newPs()" @on-cancel="onCancel">
      <Form :model="newPswd" :rules="rulePswd" :label-width="150" size="small" class="form-wp">
        <Form-item label="用户名：" prop="username">
          <Input v-model="newPswd.username" size="small" disabled>
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="原密码" prop="old_password">
          <Input @keyup.native="checkPswd($event)" type="password" v-model="newPswd.old_password" size="small" :disabled="disabled">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="新密码" prop="new_password">
          <Input type="password" v-model="newPswd.new_password" size="small" :disabled="!disabled">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item label="确认密码" prop="confirm_password">
          <Input type="password" v-model="newPswd.confirm_password" size="small" :disabled="!disabled">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
      </Form>
    </Modal>
    <!-- 修改信息 -->
    <Button @click="changeInformation" :disabled="disabled">修改信息</Button>
    <Modal title="修改信息" v-model="information" @on-ok="reviseInfos()" @on-cancel="onCancel" class="new-title">
      <Form :model="reviseInfo" :label-width="150" size="small">
        <Form-item label="用户名：" class="form-w">
          <Input v-model="reviseInfo.username" placeholder="请输入" size="small" class="input-w" disabled></Input>
        </Form-item>
        <Form-item label="姓名：" class="form-w">
          <Input v-model="reviseInfo.name" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="联系方式：" class="form-w">
          <Input v-model="reviseInfo.telephone" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="单位名称：" class="form-w">
          <Input v-model="reviseInfo.company_name" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="部门：" class="form-w">
          <Input v-model="reviseInfo.department" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="职位：" class="form-w">
          <Input v-model="reviseInfo.position" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
        <Form-item label="备注：" class="form-w">
          <Input v-model="reviseInfo.remarks" placeholder="请输入" size="small" class="input-w"></Input>
        </Form-item>
      </Form>
    </Modal>
    <!-- 修改权限 -->
    <Button @click="changeRole" :disabled="disabled">修改权限</Button>
    <Modal title="修改权限" v-model="makerole" @on-ok="newRole()" @on-cancel="onCancel" class="new-title">
      <Form :model="reviseRole" :label-width="150" size="small">
        <Form-item label="用户名：" class="form-w">
          <Input v-model="reviseRole.username" placeholder="请输入" size="small" class="input-w" disabled></Input>
        </Form-item>
        <Form-item label="旧权限：" class="form-w">
          <Input v-model="reviseRole.old_role" placeholder="请输入" size="small" class="input-w" disabled></Input>
        </Form-item>
        <Form-item label="新权限：" class="form-w">
          <Radio-group v-model="role" class="input-ws">
            <Radio label="admin">管理员</Radio>
            <Radio label="business">商业用户</Radio>
            <Radio label="suer">普通用户</Radio>
          </Radio-group>
        </Form-item>
      </Form>
    </Modal>
    <!-- 删除用户 -->
    <Button @click="deleteUser()" :disabled="disabled">删除用户</Button>
    <!-- 表格数据 -->
    <Table border :columns="tables" :data="tableDatas" highlight-row class="table-w"></Table>
  </div>
</template>

<script>
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
      // 修改密码--修改信息--修改权限--删除用户状态不可选
      newUser: false,
      password: false,
      information: false,
      makerole: false,
      myIndex: 0,
      // 新增用户
      newInfo: {
        username: '',
        name: '',
        telephone: '',
        password: '',
        confirm_password: '',
        id: '1',
        company_name: '',
        department: '',
        email: '',
        position: '',
        remarks: ''
      },
      // 修改密码
      newPswd: {
        username: '',
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
      rulePswd: {
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
      //修改信息
      reviseInfo: {
        username: '',
        name: '',
        telephone: '',
        company_name: '',
        department: '',
        position: '',
        remarks: '',

      },
      //修改权限
      reviseRole: {
        username: '',
        old_role: '',
        role_id:''
      },
      role: 'admin',
      // table样式内容
      tables: [
        {
          title: '选框',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                nativeOn: {
                  click: () => {
                    this.checkPaper(params.index)
                  }
                }
              }),
            ]);
          }
        },
        {
          title: '用户名',
          key: 'username',
        },
        {
          title: '联系方式',
          key: 'telephone'
        },
        {
          title: '部门名称',
          key: 'department'
        },
        {
          title: '职位',
          key: 'position'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '权限',
          key: 'old_role'
        }
      ],
      tableDatas: [
        {
          username:'正传东',
          telephone:'18770811111',
          department:'助童支教部',
          position:'副部长',
          email:'123456@qq.com',
          old_role:'部长',
        },
        {
          username:'周小签',
          telephone:'18770711112',
          department:'财务部',
          position:'副部长',
          email:'654321@qq.com',
          old_role:'部长',
        }
      ],
      index: -1,
    }
  },
  created() {
    this.getAdmin()
  },
  // mounted() {
  //   this.getAdmin()
  // },
  methods: {
    // 新增用户
    newUsers() {
      let adduser = {
        'user.username': this.newInfo.username,
        'user.name': this.newInfo.name,
        'user.telephone': this.newInfo.telephone,
        'user.password': this.newInfo.password,
        'user.confirm_password': this.newInfo.confirm_password,
        'role.id': this.newInfo.id,
        'user.company_name': this.newInfo.company_name,
        'user.department': this.newInfo.department,
        'user.email': this.newInfo.email,
        'user.position': this.newInfo.position,
        'user.remarks': this.newInfo.remarks,
      }
      this.$http({
        method: 'post',
        url: '/userManager/checkUsername',
        data: {
          checkUser_name: this.newInfo.checkUser_name
        }
      }).then(res => {
        console.log(res)
        if (res.data == 'success') {
          this.$Message.info('用户名可用！');
          this.$http({
            method: 'post',
            url: '/userManager/ua_add_user',
            data: adduser
          }).then(res => {
            console.log(res)
            this.$Message.info('新增用户成功！');
          }).catch(err => {
            console.log(err)
          })
        } else if (res.data == 'failed') {
          this.$Message.info('用户名已存在！');
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 校验原密码
    checkPswd: function (ev) {
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
        console.log(res)
        if (res.data.code == 20000) {
          this.disabled = true;
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
    // 修改密码
    newPs() {
      this.$http({
        method: 'post',
        url: '/userManager/update_password',
        data: {
          // username: this.$tableDatas[index].username,
          username: this.newPswd.username,
          password: this.newPswd.new_password
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 20000) {
          this.$Message.info('修改密码成功！');
        } else {

        }
      }).catch(err => {
        this.$Message.info('修改密码失败！');
      })
    },
    //修改信息
    reviseInfos() {
      let revise = {
        username: this.reviseInfo.username,
        name: this.reviseInfo.name,
        telephone: this.reviseInfo.telephone,
        company_name: this.reviseInfo.company_name,
        department: this.reviseInfo.department,
        position: this.reviseInfo.position,
        remarks: this.reviseInfo.remarks
      }
      this.$http({
        method: 'post',
        url: '/userManager/ua_updateUserInfo',
        data: revise
      }).then(res => {
        if (res.data.code == 20000) {
          this.$Message.info('修改信息成功！');
        } else {

        }
      }).catch(err => {
        this.$Message.info('修改信息失败！');
      })
    },
    //修改权限
    newRole() {
      let user = {
        // user_id: '',
        role:this.role,
        username: this.reviseRole.username,
        old_role: this.reviseRole.old_role,
        role_id: this.reviseRole.role_id
      }
      this.$http({
        method: 'post',
        url: '/userManager/ua_updateUserPermission',
        data: user
      }).then(res => {
        if (res.data.code == 20000) {
          this.$Message.info('修改信息成功！');
        } else {

        }
      }).catch(err => {
        this.$Message.info('修改信息失败！');
      })
    },
    //删除用户
    deleteUser() {
      // this.remove(params.index)
      // console.log(params.index)
      this.$http({
        methods: 'post',
        url: 'userManager/userDelete',
        data: {
          userIds: ''
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 2000) {
          this.$Message.info('删除用户成功！');
        } else {

        }
      }).cath(err => {
        this.$Message.info('删除用户失败！');
      })
    },
    //获得table数据
    getAdmin() {
      this.$http({
        url: '/userManager/adminUserManager',
        method: 'get',
      }).then(res => {
        console.log(res)
        let array = []
        for (let i = 0; i < res.data.userInfo.userRoleExtList.length; i++) {
          let tableData = []
          tableData = {
            username: res.data.userInfo.userRoleExtList[i].user.username,
            telephone: res.data.userInfo.userRoleExtList[i].user.telephone,
            department: res.data.userInfo.userRoleExtList[i].user.department,
            position: res.data.userInfo.userRoleExtList[i].user.position,
            email: res.data.userInfo.userRoleExtList[i].user.email,
            old_role: res.data.userInfo.userRoleExtList[i].role.description,
            role_id: res.data.userInfo.userRoleExtList[i].role.id,
          };
          array.push(tableData)
        }
        console.log(array)
        this.tableDatas = array
      }).catch(err => console.log(err))
    },

    changePassword() {
      this.newPswd = this.tableDatas[this.myIndex];
      this.password = true;
    },
    changeInformation() {
      // console.log(this.tableDatas[this.myIndex]);
      this.reviseInfo = this.tableDatas[this.myIndex];
      this.information = true;
    },
    changeRole() {
      // console.log(this.tableDatas[this.myIndex]);
      this.reviseRole = this.tableDatas[this.myIndex];
      this.makerole = true;
    },
    
    //获取当前行信息
    checkPaper(index) {
      this.myIndex = index;
      console.log(this.myIndex);
      // console.log(this.tableDatas[index].username);
      if (this.index == index) {
        this.disabled = true;
      } else {
        this.disabled = !this.disabled;
      }
      this.index = index;
    },
    //取消按钮
    onCancel() {
      this.$Message.info('您选择了取消！');
    },
  },

}
</script>

<style scoped>
.xxhzUser {
  padding: 50px 0 30px 0;
  margin-left: 2%;
  width: 96%;
}

.new-title {
  text-align: center;
}

.input-w {
  width: 250px;
  float: left;
}

.input-ws {
  float: left;
}

.form-w {
  height: 15px;
  line-height: 15px;
}

.form-wp {
  margin-right: 120px;
}

.table-w {
  margin-top: 10px;
}
</style>
