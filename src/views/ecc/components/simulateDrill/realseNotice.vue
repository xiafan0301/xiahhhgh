<template>
  <div class="bg-release">
    <div style=" margin-bottom: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'simulate-notice'}" v-if="this.$route.query.status === 'atgment'">模拟发布公告</el-breadcrumb-item>
        <el-breadcrumb-item ><span style='color: #0785FD'>发布公告</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-release-cot">
      <div>
        <el-form ref="form" :model="form" label-width="180px"  :rules="rules"  :inline-message="true"  v-if="this.$route.query.status === 'atgment'">
          <el-form-item label="接收者">
            <div style="display: inline-block">
              <el-checkbox-group v-model="form.checkList">
                <el-checkbox label= 2 name="type" >PC端</el-checkbox>
              </el-checkbox-group>
            </div>
            <div style="display: inline-block; margin-left: 20px;" >
              <el-select v-model="value" placeholder="请选择" size="medium" :disabled= "!(form.checkList[0] === '2'|| form.checkList[1] === '2')"  multiple collapse-tags style="width: 300px">
                <el-option
                  v-for="item in DepartmentList"
                  :key="item.uid"
                  :label="item.organName"
                  :value="item.uid">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="主题" prop= "title">
            <el-input v-model="form.title" style="width: 500px"  placeholder="请输入公告标题..."></el-input>
          </el-form-item>
          <el-form-item label="内容" prop = "desc">
            <div style=" position: relative; display: inline-block ">
              <el-input type="textarea" v-model="form.desc" style="display: inline-block; width: 500px"   :rows="9" placeholder="请输入公告内容..."></el-input>
              <!--<span style="display: inline-block; position: absolute; right: 0; bottom: -3px">{{form.desc.length}}/10000</span>-->
            </div>
          </el-form-item>
          <el-form-item>
            <el-upload
              :action="uploadUrl + '/upload/new'"
              list-type="picture-card"
              accept=".png,.jpg,.bmp"
              :data="imgParam"
              :before-upload='handleBeforeUpload'
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success='handleSuccess'
              :on-exceed="handleImgNumber"
              :limit='9'
            >
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加图片</span>
              <span class="imgTips" v-show="isImgNumber" style="width: 160px">图片最多上传9张</span>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" class="img-dialog">
              <img :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="margin-top: 21px" >
      <el-button @click="back">取消</el-button>
      <el-button type="primary" @click="onSubmit('form', 'form1')" :loading="addPageLoading">确定</el-button>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
import {checkTime} from '@/utils/validator.js';
import {imgBaseUrl2} from '@/config/config.js';
export default {
  data () {
    return {
      uploadUrl: null,
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      imgParam: {
        projectType: 3
      },
      addPageLoading: false,
      dialogImageUrl: '',
      dialogVisible: false,
      isImgNumber: false,
      isMsgError: false,
      status: '',
      form: {
        publishTime: '',
        terminal: 0,
        checkList: [],
        desc: '',
        time: '',
        title: '',
        attachmentList: [],
        receiveRelations: [],
        description: null
      },
      time: '',
      form1: {
        publishTime: '',
        type: '',
        receive: true,
        desc: '',
        time: ''
      },
      value: [],
      DepartmentList: [],
      rules: {
        title: [
          { required: true, message: '请输入主题', trigger: 'blur' },
          { max: 28, message: '最多可以输入28个字' }
        ],
        desc: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 10000, message: '最多可以输入10000个字' }
        ],
        time: [
          {required: true, message: '请选择发送时间'}
        ],
        publishTime: [
        ]
      },
      rule: {
        type: [
          { required: true, message: '请选择消息类型' }
        ],
        desc: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 10000, message: '最多可以输入10000个字' }
        ],
        time: [
          {required: true, message: '请选择发送时间'}
        ]
      }
    }
  },
  created () {
    this.getDepartmentList();
    this.uploadUrl = imgBaseUrl2;
  },
  computed: {
  },
  watch: {
    time (e) {
      this.setTime()
    }
  },
  mounted () {
    if (this.$route.query.status === 'atgment') {
      this.status = '添加公告'
    } else if (this.$route.query.status === 'system') {
      this.status = '添加消息'
    }
    this.time = this.form.time
  },
  methods: {
    aa () {
      this.time = this.form.time
    },
    onchangeTime (val) {
      if (val === 1) {
        this.isMsgError = false
      }
      if (val === 2) {
        this.onchangePub();
      }
    },
    onchangePub () {
      if (!(new Date(this.form.publishTime) - Date.now() > 3 * 60 * 1000) && this.form.time === 2 && !(this.form.publishTime === '') && !(this.form.publishTime === null)) {
        this.isMsgError = true;
        console.log(this.isMsgError)
      } else if (!(new Date(this.form1.publishTime) - Date.now() > 3 * 60 * 1000) && this.form1.time === 2 && !(this.form1.publishTime === '') && !(this.form1.publishTime === null)) {
        this.isMsgError = true;
      } else {
        this.isMsgError = false
      }
    },
    setTime () {
      if (this.time === 2) {
        this.rules.publishTime = []
        this.rules.publishTime.push({ validator: checkTime, trigger: 'blur' })
        console.log(this.rules.publishTime)
      }
    },
    onSubmit (val, val1) {
      if (this.$route.query.status === 'system') {
        this.$refs[val1].validate((valid) => {
          if (valid) {
            let params = {
              emiMessage: {
                details: this.form1.desc,
                messageType: this.form1.type,
                terminal: 1,
                publishTime: this.form1.publishTime
              }
            };
            if (this.form1.publishTime && this.form1.time === 2) {
              params.emiMessage.description = 1;
              params.emiMessage.publishState = 1
            }
            this.addPageLoading = true
            this.axios.post('A2/messageService', params)
              .then((res) => {
                if (res) {
                  this.$router.push({name: 'system'})
                  this.addPageLoading = false
                  this.$message.success('添加消息成功');
                } else {
                  this.addPageLoading = false
                }
              })
          } else {
            return false;
          }
        });
      } else {
        this.$refs[val].validate((valid) => {
          if (valid) {
            if (this.form.checkList[0] === '1' && this.form.checkList.length === 1) {
              this.form.terminal = 1
            } else if (this.form.checkList[0] === '2' && this.form.checkList.length === 1) {
              this.form.terminal = 2
            } else if (this.form.checkList.length === 2) {
              this.form.terminal = 3
            } else if (this.form.checkList.length === 0) {
              this.form.terminal = 4
            }
            if (this.form.attachmentList === []) {
              this.form.attachmentList = null;
            }
            if (this.form.publishTime && this.form.time === 2) {
              this.form.description = 1
            }
            if (this.form.terminal === 3 || this.form.terminal === 2) {
              this.value && this.value.map((item, index) => {
                this.form.receiveRelations.push({receiveUser: item, receiverType: 2});
              });
            }
            if (this.form.receiveRelations === []) {
              this.form.receiveRelations = null;
            }
            let params = {
              emiMessage: {
                details: this.form.desc,
                messageType: '39728bba-9b6f-11e8-8a14-3f814d634dc7',
                terminal: this.form.terminal,
                title: this.form.title,
                publishTime: this.form.publishTime,
                description: this.form.description
              },
              emiAttachments: this.form.attachmentList,
              receiveRelations: this.form.receiveRelations
            };
            if (this.form.description === 1) {
              params.emiMessage.publishState = 1
            }
            this.addPageLoading = true
            this.axios.post('A2/messageService', params)
              .then((res) => {
                if (res) {
                  this.$router.push({name: 'simulate-notice'})
                  this.addPageLoading = false
                  this.$message.success('添加公告成功');
                } else {
                  this.addPageLoading = false
                }
              })
              .catch(() => {
                this.addPageLoading = false
              });
          } else {
            return false;
          }
        });
      }
    },
    getDepartmentList () {
      let params = {
        pageSize: 0
      }
      this.axios.get('A3/authServices/organInfos', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.DepartmentList = res.data.list
          }
        })
        .catch(() => {})
    },
    back () {
      if (this.$route.query.status === 'system') {
        this.$router.push({name: 'system'})
      } else {
        this.$router.push({name: 'simulate-notice'})
      }
      let Data = new Date()
      console.log(Date.now() - this.form.publishTime)
      console.log(this.form.publishTime)
      console.log(Date.now())
      console.log(checkTime)
    },
    handleSuccess (res, file) { // 图片上传成功
      if (res && res.data) {
        const data = {
          attachmentType: dictType.imgId,
          url: res.data.newFileName,
          attachmentName: res.data.fileName,
          attachmentSize: res.data.fileSize,
          attachmentWidth: res.data.imageWidth,
          attachmentHeight: res.data.imageHeight,
          thumbnailUrl: res.data.thumbnailUrl,
          thumbnailWidth: res.data.thumbImageWidth,
          thumbnailHeight: res.data.thumbImageHeight
        };
        this.form.attachmentList.push(data);
        console.log(this.form.attachmentList)
      }
    },
    handleRemove (file, fileList) { // 删除图片
      if (file) {
        if (this.form.attachmentList.length > 0) {
          this.form.attachmentList.map((item, index) => {
            if (item.url === file.response.data.newFileName) {
              this.form.attachmentList.splice(index, 1);
            }
          });
        }
      }
      if (fileList.length < 9) {
        this.isImgNumber = false;
      }
    },
    handleBeforeUpload (file) { // 图片上传之前
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLtTenM = file.size / 1024 / 1024 < 10;
      if (!isImg) {
        this.$message.error('上传的图片只能是bmp、jpg、png格式!');
      }
      if (!isLtTenM) {
        this.$message.error('上传的图片大小不能超过10M');
      }
      return isImg && isLtTenM;
    },
    handleImgNumber (files, fileList) { // 图片超出最大个数限制
      this.isImgNumber = true;
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-release {
    padding: 20px;
    background-color: #F0F3F4;
  }
  .bg-release-cot {
    background-color: #FFFFFF;
    padding-top: 55px;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  /deep/ .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
    background-color: #EAEAEA;
    border: 1px solid #EAEAEA;
    position: relative;
    i {
      margin: 0 auto;
      font-weight: bold;
    }
    .add-img-text {
      color: #C4C2C2;
      font-size: 13px;
      display: block;
      width: 54px;
      height: 13px;
      position: absolute;
      top: 25%;
      left: 25%;
    }
  }
  /deep/  .el-upload-list--picture-card  .el-upload-list__item {
    width: 100px !important;
    height: 100px !important;
  }
  /deep/ .el-dialog--center .el-dialog__body {
    text-align: center !important;
  }
  /deep/ .el-dialog__header {
    background: #F0F0F0 !important;
    text-align: left !important;
    color: #555555;
    font-weight: bold;
    font-size: 16px;
  }
  .img-dialog {
    /deep/ .el-dialog__header {
      padding: 40px 20px 10px;
    }
    /deep/  .el-dialog__body {
      text-align: center !important;
    }
  }
  /deep/ .el-form-item__error {
    border: 1px solid #FA796C;
    height: 35px;
    line-height: 35px;
    background-color: #FEE6E0;
    border-radius: 2px;
    color: #FA796C;
    padding-top: 0;
    padding: 0 13px 0 26px;
  }
  /deep/ .el-form-item__error:before {
    content: '!';
    position: absolute;
    left: 5px;
    top: 9px;
    width: 15px;
    height: 15px;
    text-align: center;
    line-height: 16px;
    color: #FFF;
    font-weight: bold;
    background-color: #FA796C;
    border-radius: 50%;
  }
  .imgTips {
    border: 1px solid #FA796C;
    height: 35px;
    line-height: 35px;
    background-color: #FEE6E0;
    border-radius: 2px;
    position: absolute;
    color: #FA796C;
    padding-top: 0;
    padding: 0 13px 0 26px;
    -ms-flex-item-align: center;
    align-self: center;
    width: 250px;
    left: 105px;
    top: 50px;
  }
  .imgTips:before {
    content: '!';
    position: absolute;
    left: 5px;
    right: 0px;
    top: 9px;
    width: 15px;
    height: 15px;
    text-align: center;
    line-height: 16px;
    color: #FFF;
    font-weight: bold;
    background-color: #FA796C;
    border-radius: 50%;
  }
</style>
