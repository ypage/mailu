<template>
  <div class="app-container">
    <p>{{`本次共上传:0个文件。成功${countInfo.successed}个,失败:${countInfo.failed}个`}}</p>
    <span>请选择同时上传的数量:</span>
    <Select v-model="dropzoneOptions.parallelUploads" size="small" style="width:40px">
        <Option v-for="item in uploadsNum" :value="item" :key="item">{{ item }}</Option>
    </Select>
    <Button type="info" @click="submitFiles()">开始上传</Button>
    <Button type="warning" @click="removedFiles()">清空</Button>
    <Button type="success" @click="showFailed">{{tableControl.text}}</Button>
    <!-- <Button type="info" @click="test()">test</Button> -->
    <Table v-show="tableControl.isShow" :columns="tableHead" :data="countInfo.failedList" :show-header="false"></Table>
    <div class="line"></div>
    <!-- url="https://httpbin.org/post" :url="url"-->
    <dropzone ref="myVueDropzone" id="dropzone" :url="url"
              v-on:vdropzone-success="showSuccess"
              @vdropzone-removed-file="removedFiles"

              v-bind:dropzone-options="dropzoneOptions"
              v-bind:use-custom-dropzone-options="true">
    </dropzone>

  </div>
</template>

<script>
import Dropzone from 'components/Dropzone/index'
export default {
  components: { Dropzone },
  data() {
    return {
      tableControl: {
        isShow: false,
        text: '显示上传错误信息'
      },
      countInfo: {
        successed: 0,
        failed: 0,
        failedList: []
      },
      url: process.env.BASE_URL + '/rm/upload',
      uploadsNum: [1,2,3,4,5,10],
      dropzoneOptions: {
        autoProcessQueue: false,
        uploadMultiple: false,
        parallelUploads: 3,
        maxNumberOfFiles: 500,
        maxFileSizeInMB: 1024,
        params: {
          "userId": 9,
          "username": "admin"
        }
      },
      tableHead: [{
          title: '错误信息',
          align: 'center',
          key: 'message'
      }],
    }
  },
  computed: {
  },
  methods: {
    test(a,b,c,d,e){
      console.log(this.$refs.myVueDropzone.getRejectedFiles())
    },
    showFailed(){
      this.tableControl.isShow = !this.tableControl.isShow
      if(this.tableControl.isShow){
        this.tableControl.text = '隐藏上传错误信息'
      }else{
        this.tableControl.text = '显示上传错误信息'
      }
    },
    showSuccess(file,message) {
      let res = JSON.parse(message)
      console.log(res)
      // this.$Message.info(res.message);
      if(res.code == '20000'){
        this.countInfo.successed++
      }else if (res.code == '10000'){
        this.countInfo.failed++
        this.countInfo.failedList.push(res)
        // console.log(this.countInfo.failedList)
      }
    },
    submitFiles() {
      this.$refs.myVueDropzone.processQueue()
    },
    removedFiles(){
      this.countInfo.successed = 0
      this.countInfo.failed = 0
      this.countInfo.failedList = []
      this.$refs.myVueDropzone.removeAllFiles()
    }
  }
}
</script>

<style>
@import '../../../../src/styles/dropzone.css';
@import url('https://fonts.googleapis.com/css?family=Roboto');
.app-container {
  padding: 60px 0 30px 0;
  margin-left: 2%;
  width: 96%;
}

.line {
  height: 1px;
  margin: 10px 0;
  background: #ccc;
}

.ivu-btn {
  margin-left: 10px;
}
</style>
