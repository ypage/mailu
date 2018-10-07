<template>
  <div class="app-container">
    <Form :label-width="50" size="small">
      <Form-item>
        <label class="industry">部门：</label>
        <Select v-model="select1" style="width:200px" size="small" placeholder="请选择部门">
          <Option v-for="item in industryList" :value="item.value" :key="item.value" size="small">{{ item.label }}</Option>
        </Select>

        <label class="customer">用户：</label>
        <Select v-model="select2" style="width:200px" size="small" placeholder="请选择用户">
          <Option v-for="item in customerList" :value="item.id" :key="item.id" size="small">{{ item.name }}</Option>
        </Select>
        <!-- <Button class="search" type="ghost" shape="circle" icon="ios-search" @click="findproject()" size="small">搜索</Button> -->

        <Button class="createproModel" @click="changeModel()" size="small" :disabled="isdisabled">
          <Icon type="plus-round"></Icon> 新建部门</Button>
        <!-- <Modal v-model="createproModel" @on-ok="createproject()" @on-cancel="onCancel()" size="small"> -->
        <Modal v-model="createproModel" size="small">
          <Form ref="createInfo" :model="createInfo" size="small" style="margin:10px 0 0 30px;">
            请输入方案名称：<input type="text" v-model="createInfo.projectname">
            <a style="color:red;"> *</a><br/> 请选择方案类型：
            <Select v-model="select3" style="width:150px;" size="small" placeholder="请选择方案类型">
              <Option v-for="item in moldList" :value="item.hardCode" :key="item.hardCode" size="small">{{ item.name }}</Option>
            </Select>
            <a style="color:red;"> *</a><br/>请输入
            <a style="color:red;">至少一个</a>信息(每个输入框限填一个词)：
            <br/> 关键词一：
            <input type="text" v-model="createInfo.keywords0">关键词二：<input type="text" v-model="createInfo.keywords1"><br/> 关键词三：
            <input type="text" v-model="createInfo.keywords2">关键词四：<input type="text" v-model="createInfo.keywords3"><br/> 关键词五：
            <input type="text" v-model="createInfo.keywords4">关键词六：<input type="text" v-model="createInfo.keywords5"><br/> 关键词七：
            <input type="text" v-model="createInfo.keywords6">关键词八：<input type="text" v-model="createInfo.keywords7"><br/> 关键词九：
            <input type="text" v-model="createInfo.keywords8">关键词十：<input type="text" v-model="createInfo.keywords9"><br/> 请输入排除词(每个输入框限填一个词)：
            <br/> 修改信息：
            <input type="text" v-model="createInfo.filterwords0">修改信息：<input type="text" v-model="createInfo.filterwords1"><br/> 修改信息：
            <input type="text" v-model="createInfo.filterwords2">修改信息：<input type="text" v-model="createInfo.filterwords3"><br/> 修改信息：
            <input type="text" v-model="createInfo.filterwords4">
          </Form>
          <div slot="footer">
            <Button @click="onCancel()">取消</Button>
            <Button @click="createproject()" :disabled="isok">确定</Button>
          </div>
        </Modal>   
      </Form-item>
    </Form>

    <Table border :columns="project" :data="tableDatas" size="small"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="page.total" :current="page.current" :page-size="page.size" @on-change="changePage()" @on-page-size-change="changeSize()" show-total show-elevator show-sizer size="small"></Page>
      </div>
    </div> 
    <!-- <Modal v-model="updateproModel" @on-ok="updateproject()" @on-cancel="onCancel()"> -->
    <Modal v-model="updateproModel"> 
      <Form ref="updateInfo" :model="updateInfo" :label-width="80" size="small" style="margin:10px 0 0 30px;">
        请修改关键词(每个输入框限填一个词)：(<a style="color:red;">不允许全为空</a>)<br/> 关键词一：
        <input type="text" v-model="updateInfo.keywords0">关键词二：<input type="text" v-model="updateInfo.keywords1"><br/> 关键词三：
        <input type="text" v-model="updateInfo.keywords2">关键词四：<input type="text" v-model="updateInfo.keywords3"><br/> 关键词五：
        <input type="text" v-model="updateInfo.keywords4">关键词六：<input type="text" v-model="updateInfo.keywords5"><br/> 关键词七：
        <input type="text" v-model="updateInfo.keywords6">关键词八：<input type="text" v-model="updateInfo.keywords7"><br/> 关键词九：
        <input type="text" v-model="updateInfo.keywords8">关键词十：<input type="text" v-model="updateInfo.keywords9"><br/> 请修改排除词(每个输入框限填一个词)：
        <br/> 排除词一：
        <input type="text" v-model="updateInfo.filterwords0">排除词二：<input type="text" v-model="updateInfo.filterwords1"><br/> 排除词三：
        <input type="text" v-model="updateInfo.filterwords2">排除词四：<input type="text" v-model="updateInfo.filterwords3"><br/> 排除词五：
        <input type="text" v-model="updateInfo.filterwords4">
      </Form>
      <div slot="footer">
            <Button @click="onCancel()">取消</Button>
            <Button @click="updateproject()" :disabled="isNative">确定</Button>
          </div>
    </Modal>
    <Modal v-model="deleteModel" width="200" :closable="false"> 
      <div slot="header" style="text-align:center;color:red;font-size:24px">
        警示
      </div>
      <p style="text-align:center;color:black;font-size:12px">是否确认删除？</p>
      <div slot="footer" style="text-align:center;">
            <Button @click="onCancel()">取消</Button>
            <Button @click="remove(index)" :disabled="isNative">确定</Button>
          </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      createproModel: false,
      disabled: true,
      updateproModel: false,
      deleteModel:false,
      //机构信息
      industryList: [],
      //客户信息
      customerList: [],
      //方案信息
      moldList: [],
      //新建方案input数据
      createInfo: {
        projectname: '',
        keywords0: '',
        keywords1: '',
        keywords2: '',
        keywords3: '',
        keywords4: '',
        keywords5: '',
        keywords6: '',
        keywords7: '',
        keywords8: '',
        keywords9: '',
        filterwords0: '',
        filterwords1: '',
        filterwords2: '',
        filterwords3: '',
        filterwords4: '',
      },
      //修改方案input数据
      updateInfo: {
        keywords0: '',
        keywords1: '',
        keywords2: '',
        keywords3: '',
        keywords4: '',
        keywords5: '',
        keywords6: '',
        keywords7: '',
        keywords8: '',
        keywords9: '',
        filterwords0: '',
        filterwords1: '',
        filterwords2: '',
        filterwords3: '',
        filterwords4: '',
      },
      deleteInfo: {
        id: '',
        userId: '',
      },
      select1: '',
      select2: '',
      select3: '',
      page: {
        total: null,
        size: 10,
        current: 1
      },
      //方案table标题
      project: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '部门名',
          key: 'projectname',
          align: 'center',
          width: 150
        },
        {
          title: '部长',
          key: 'ckey0',
          align: 'center',
          width: 150
        },
        {
          title: '活动',
          key: 'ckey1',
          align: 'center',
          width: 150
        },
        {
          title: '信息',
          key: 'ckey2',
          align: 'center',
          width: 150
        },
        {
          title: '时间',
          align: 'center',
          key: 'ckey3',
          width: 150
        },
        {
          title: '地址',
          align: 'center',
          key: 'ckey4',
          width: 150
        },
        {
          title: '关键',
          align: 'center',
          key: 'ckey5',
          width: 150
        },
        {
          title: '备注',
          align: 'center',
          key: 'ckey6',
          width: 150
        },
        {
          title: '权限',
          align: 'center',
          key: 'ckey7',
          width: 150
        },
        {
          title: '审核',
          align: 'center',
          key: 'ckey8',
          width: 150
        },
        {
          title: '指示',
          align: 'center',
          key: 'ckey9',
          width: 150
        },
        // {
        //   title: '排除词一',
        //   key: 'ukey0',
        //   width: 100
        // },
        // {
        //   title: '排除词二',
        //   key: 'ukey1',
        //   width: 100
        // },
        // {
        //   title: '排除词三',
        //   key: 'ukey2',
        //   width: 100
        // },
        // {
        //   title: '排除词四',
        //   key: 'ukey3',
        //   width: 100
        // },
        // {
        //   title: '排除词五',
        //   key: 'ukey4',
        //   width: 100
        // },
        {
          title: '操作',
          fixed: 'right',
          align: 'center',
          key: 'delete',
          width: 130,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                nativeOn: {
                  click: () => {
                    this.checkPaper(params.index)
                    this.updateproModel = true;
                  },
                }
              }, '修改'),
              h('Button', {
                style: {
                  marginLeft: '2px'
                },
                props: {
                  type: 'error',
                  size: 'small'
                },
                nativeOn: {
                  click: () => {
                    this.checkPaper(params.index)
                    this.deleteModel = true;
                    // this.remove(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      //方案table数据
      tableDatas: [
        {
          projectname:'活动部',
          ckey0: '陈贱伟',
          ckey1: '亲亲宝贝',
          ckey2: '江西儿童医院活动',
          ckey3: '2018-5-10',
          ckey4: '江西儿童医院',
          ckey5: '注意安全',
          ckey6: '组织安排好',
          ckey7: '活动权限',
          ckey8: '审核通过',
          ckey9: '',
        },
        {
          projectname:'财务部',
          ckey0: '周签',
          ckey1: '财务管理',
          ckey2: '',
          ckey3: '2018-5-6',
          ckey4: '江西财经大学',
          ckey5: '严格计算',
          ckey6: '活动资金报销',
          ckey7: '财务权限',
          ckey8: '审核通过',
          ckey9: '',
        },
        ],
      //初始化选中行
      index: -1,
    }
  },
  computed: {
    isdisabled() {
      if (this.select2 == '') {
        return true
      } else {
        return false
      }
    },
    isok() {
      if (this.select3 && this.createInfo.projectname &&
        (this.createInfo.keywords0 || this.createInfo.keywords1 ||
          this.createInfo.keywords2 || this.createInfo.keywords3 ||
          this.createInfo.keywords4 || this.createInfo.keywords5 ||
          this.createInfo.keywords6 || this.createInfo.keywords7 ||
          this.createInfo.keywords8 || this.createInfo.keywords9) !== '') {
        return false
      } else {
        return true
      }
    },
    isNative() {
      // this.isNative = true;
      if  (this.updateInfo.keywords0 !== '') {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    this.getindustryList()
    this.getprojecttype()
  },
  methods: {
    //获取所有客户信息
    getindustryList() {
      this.$http({
        method: 'post',
        url: '/myinfo/finduser',
        data: {
          id: this.$store.getters.id
        }
      }).then(res => {
        // console.log(res)
        for (let i = 0; i < res.data.data.length; i++) {
          let tableData = []
          tableData = {
            id: res.data.data[i].id,
            name: res.data.data[i].name
          };
          this.customerList.push(tableData)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //获取新建方案中方案类型
    getprojecttype() {
      this.$http({
        method: 'post',
        url: '/myinfo/getprojecttype',
      }).then(res => {
        // console.log(res)
        for (let i = 0; i < res.data.data.length; i++) {
          let tableData = []
          tableData = {
            hardCode: res.data.data[i].hardCode,
            name: res.data.data[i].name
          };
          this.moldList.push(tableData)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //获取方案信息(table数据)
    findproject() {
      this.$http({
        method: 'post',
        url: '/myinfo/findproject',
        data: {
          id: this.select2,
          // from: (this.page.current - 1) * (this.page.size),
          // size: this.page.size
        }
      }).then(res => {
        console.log(res)
        let key = {}
        let filter = {}
        let tableDatas = []
        // console.log('1',res.data.data)
        this.tableDatas = []
        for (let i in res.data.data) {
          if (res.data.data[i].keywords !== '') {
            key = res.data.data[i].keywords.slice(1, -1).split(',')
          }else if (res.data.data[i].filterwords !== '') {
            filter = res.data.data[i].filterwords.slice(1, -1).split(',')
          }
          // key = res.data.data[i].keywords.slice(1, -1).split(',')
          // filter = res.data.data[i].filterwords.slice(1, -1).split(',')
          // console.log('2',key)
          this.tableDatas.push({
            "id": res.data.data[i].id,
            "userId": res.data.data[i].userId,
            "projectname": res.data.data[i].projectname,
            "ckey0": key[0],
            "ckey1": key[1],
            "ckey2": key[2],
            "ckey3": key[3],
            "ckey4": key[4],
            "ckey5": key[5],
            "ckey6": key[6],
            "ckey7": key[7],
            "ckey8": key[8],
            "ckey9": key[9],
            "ukey0": filter[0],
            "ukey1": filter[1],
            "ukey2": filter[2],
            "ukey3": filter[3],
            "ukey4": filter[4],
          })
        }
        // console.log('3',this.tableDatas)
      }).catch(err => {
        console.log(err)
      })
    },
    //新建方案
    createproject() {
      let data = {
        'project.userId': this.select2,
        'project.projectname': this.createInfo.projectname,
        'project.flag': this.select3,
        'keyWords[0]': this.createInfo.keywords0,
        'keyWords[1]': this.createInfo.keywords1,
        'keyWords[2]': this.createInfo.keywords2,
        'keyWords[3]': this.createInfo.keywords3,
        'keyWords[4]': this.createInfo.keywords4,
        'keyWords[5]': this.createInfo.keywords5,
        'keyWords[6]': this.createInfo.keywords6,
        'keyWords[7]': this.createInfo.keywords7,
        'keyWords[8]': this.createInfo.keywords8,
        'keyWords[9]': this.createInfo.keywords9,
        'filterWords[0]': this.createInfo.filterwords0,
        'filterWords[1]': this.createInfo.filterwords1,
        'filterWords[2]': this.createInfo.filterwords2,
        'filterWords[3]': this.createInfo.filterwords3,
        'filterWords[4]': this.createInfo.filterwords4,
      }
      // console.log('3', this.newdata)
      this.$http({
        method: 'post',
        url: '/myinfo/createproject',
        data: data
      }).then(res => {
        // console.log(res)
        this.$Message.success('创建成功！');
        this.findproject();
        this.createproModel = false;
      }).catch(err => {
        console.log(err)
      })
    },
    //获取当前行信息
    checkPaper(index) {
      this.myIndex = index;
      // console.log(this.myIndex);
      // console.log(this.tableDatas[index].ckey0);
      this.index = index;
      this.changeFind();
    },
    //将table选中行信息{{}}到input中
    changeFind() {
      // console.log(this.tableDatas[this.myIndex]);
      this.updateInfo = this.tableDatas[this.myIndex];
      this.deleteInfo.id = this.tableDatas[this.index].id,
        this.deleteInfo.userId = this.tableDatas[this.index].userId,
        this.updateInfo.keywords0 = this.tableDatas[this.index].ckey0;
      this.updateInfo.keywords1 = this.tableDatas[this.index].ckey1;
      this.updateInfo.keywords2 = this.tableDatas[this.index].ckey2;
      this.updateInfo.keywords3 = this.tableDatas[this.index].ckey3;
      this.updateInfo.keywords4 = this.tableDatas[this.index].ckey4;
      this.updateInfo.keywords5 = this.tableDatas[this.index].ckey5;
      this.updateInfo.keywords6 = this.tableDatas[this.index].ckey6;
      this.updateInfo.keywords7 = this.tableDatas[this.index].ckey7;
      this.updateInfo.keywords8 = this.tableDatas[this.index].ckey8;
      this.updateInfo.keywords9 = this.tableDatas[this.index].ckey9;
      this.updateInfo.filterwords0 = this.tableDatas[this.index].ukey0;
      this.updateInfo.filterwords1 = this.tableDatas[this.index].ukey1;
      this.updateInfo.filterwords2 = this.tableDatas[this.index].ukey2;
      this.updateInfo.filterwords3 = this.tableDatas[this.index].ukey3;
      this.updateInfo.filterwords4 = this.tableDatas[this.index].ukey4;
    },
    //修改方案
    updateproject() {
      let data = {
        'project.id': this.deleteInfo.id,
        'project.userId': this.deleteInfo.userId,
        'keyWords[0]': this.updateInfo.keywords0,
        'keyWords[1]': this.updateInfo.keywords1,
        'keyWords[2]': this.updateInfo.keywords2,
        'keyWords[3]': this.updateInfo.keywords3,
        'keyWords[4]': this.updateInfo.keywords4,
        'keyWords[5]': this.updateInfo.keywords5,
        'keyWords[6]': this.updateInfo.keywords6,
        'keyWords[7]': this.updateInfo.keywords7,
        'keyWords[8]': this.updateInfo.keywords8,
        'keyWords[9]': this.updateInfo.keywords9,
        'filterWords[0]': this.updateInfo.filterwords0,
        'filterWords[1]': this.updateInfo.filterwords1,
        'filterWords[2]': this.updateInfo.filterwords2,
        'filterWords[3]': this.updateInfo.filterwords3,
        'filterWords[4]': this.updateInfo.filterwords4,
      }
      this.$http({
        method: 'post',
        url: '/myinfo/updateproject',
        data: data
      }).then(res => {
        console.log(res)
        this.findproject();
        this.updateproModel = false;
      }).catch(err => {
        console.log(err)
      })
    },
    //删除当前行数据前端效果
    remove(index) {
      this.tableDatas.splice(index, 1);
      this.deleteproject();
      this.deleteModel = false;
      // this.findproject();
    },
    //删除方案
    deleteproject() {
      this.$http({
        method: 'post',
        url: '/myinfo/deleteproject',
        data: {
          'project.id': this.deleteInfo.id,
          'project.userId': this.deleteInfo.userId,
          userId: this.$store.getters.id,
        }
      }).then(res => {
        // console.log(res)
        this.$Message.success('删除成功！');
        this.findproject();
      }).catch(err => {
        console.log(err)
      })
    },
    onCancel() {
      this.$Message.info('您选择了取消！');
      this.createproModel = false;
      this.updateproModel = false;
      this.deleteModel = false;
    },
    //点击弹出修改方案模态框
    changeModel() {
      this.createproModel = true;
    },
    //翻页
    changePage(current) {
      this.page.current = current
      this.getReport()
    },
    //选择每页数据条数
    changeSize(size) {
      this.page.size = size
      this.getReport()
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 60px 0 30px 0;
  margin-left: 2%;
  width: 96%;
  .industry {
    color: #000000;
  }
  .customer {
    margin-left: 50px;
    color: #000000;
  }
  .search {
    margin-left: 50px;
  }
  .createproModel {
    margin-left: 50px;
  }
}
</style>


