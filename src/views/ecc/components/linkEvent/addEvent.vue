<template>
  <div class="link-addEvent">
    <div style="margin-bottom: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>添加事件</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-body'>
      <div class='add-form'>
        <el-form class='form-content' inline-message :model='addForm' :rules='rules' ref='addForm'>
          <el-form-item label="上报人手机号" label-width='150px' prop='reporterPhone'>
            <el-input style='width: 500px' placeholder='请输入手机号' v-model='addForm.reporterPhone'></el-input>
          </el-form-item>
          <el-form-item label="上报时间" label-width='150px' prop='reportTime'>
            <el-date-picker :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择上报时间" style="width: 500px;" v-model='addForm.reportTime'></el-date-picker>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px' prop='eventAddress' class="address">
            <el-input style='width: 500px' id="tipinput" placeholder='请选择事发地点...' v-model='addForm.eventAddress' @input="onPositionChange" ></el-input>
            <div class='map-ecc'><img title="选择事发地点" src="../../../../assets/img/temp/map-ecc.png" style='cursor:pointer' @click='showMap' /></div>
          </el-form-item>
          <el-form-item label="事件情况" label-width='150px' prop='eventDetail' class="event-detail">
            <el-input type="textarea" style='width: 500px' placeholder='请输入事件详细情况...' rows='7' v-model='addForm.eventDetail' @input="calNumber(addForm.eventDetail)"></el-input>
            <span class="number-tip">{{currentNum}}/{{totalNum}}</span>
          </el-form-item>
          <el-form-item style='margin-left: 150px' class="img-form-item">
            <el-upload
              :action="uploadUrl + '/upload/new'"
              list-type="picture-card"
              :data="imgParam"
              accept=".png,.jpg,.bmp"
              :before-upload='handleBeforeUpload'
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success='handleSuccess'
              :on-exceed="handleImgNumber"
              :disabled="isImgDisabled"
              :title="[isImgDisabled === true ? '禁用' : '']"
              :limit='9'
            >
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加图片</span>
              <span class="imgTips" v-show="isImgNumber">图片最多上传9张</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="事件类型" label-width='150px' prop='eventType'>
            <el-select  placeholder="请选择事件类型" style='width: 500px' v-model="addForm.eventType">
              <el-option
                v-for="item in eventTypeList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件等级" label-width='150px' prop='eventLevel'>
            <el-select  placeholder="请选择事件等级" style='width: 500px' v-model="addForm.eventLevel">
              <el-option
                v-for="item in eventLevelList"
                :key="item.dictId"
                :label="item.dictContent"
                :value="item.dictId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有人员伤亡" label-width='150px' prop='casualties'>
            <el-radio-group style='width: 330px' v-model='addForm.casualties'>
              <el-radio label="无"></el-radio>
              <el-radio label="不确定" style='margin-left:22%'></el-radio>
              <el-radio label="有" style='margin-left:22%'></el-radio>
            </el-radio-group>
            <template v-if="addForm.casualties === '有'">
              <el-input style='width: 150px;margin-left:-1%' placeholder='请输入伤亡人数' v-model='dieNumber'></el-input>
              <span style='margin-left:1%'>人</span>
              <div class="el-form-item__error--inline el-form-item__error" v-show="isDieError">{{dieTip}}</div>
            </template>
          </el-form-item>
          <!-- <el-form-item label="事件性质" label-width='150px'>
            <el-checkbox label="应急事件" name="type" disabled v-model='addForm.eventFlag'></el-checkbox>
            <el-checkbox label="民众互助" name="type" v-model='addForm.mutualFlag'></el-checkbox>
          </el-form-item> -->
        </el-form>
      </div>
      <div class='operation-btn'>
        <el-button @click="back('addForm')">返回</el-button>
        <el-button style='background: #0785FD;color:#fff' :loading="isAddLoading" @click="submitForm('addForm')">确认提交</el-button>
        <!-- <el-button v-show="resouceData && resourceBtn[resouceData.ctcEvent]" style='background: #FB796C;color:#fff' @click="skipCtcDetail('addForm')">去调度指挥</el-button> -->
      </div>
    </div>
    <div is="mapPoint" @mapPointSubmit="mapPointSubmit" :open="open" :oConfig="oConfig"></div>
    <el-dialog
      title="操作提示"
      :visible.sync="closeReturnVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>返回后您添加的数据不会保存，是否确认返回?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='sureBack'>确定返回</el-button>
        <el-button class='noSureBtn' @click="closeReturnVisiable = false">暂不返回</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" class="img-dialog">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {valiPhone} from '@/utils/validator.js';
import {dictType, resouceData} from '@/config/data.js';
import mapPoint from '@/components/common/mapPoint.vue';
import {imgBaseUrl2} from '@/config/config.js';
export default {
  components: {mapPoint},
  data () {
    return {
      resouceData: resouceData,
      resourceBtn: {}, // 按钮权限
      uploadUrl: null,
      open: false,
      dialogImageUrl: '',
      dialogVisible: false,
      closeReturnVisiable: false,
      isImgDisabled: false,
      oConfig: {},
      isAddLoading: false, // 保存加载中图标
      isDieError: false,
      dieTip: '',
      isImgNumber: false,
      imgParam: {
        projectType: 4
      },
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > (new Date().getTime());
        }
      },
      isDefaultChecked: true,
      currentNum: 0, // 事件情况当前字数
      totalNum: 140, // 可输入的总字数
      dieNumber: '', // 死亡人数
      addForm: {
        reporterPhone: '',
        reportTime: '',
        eventAddress: '',
        eventSource: 'cee2d05e-97b1-11e8-b784-db60b034ea84',
        eventDetail: '',
        longitude: '', // 经度
        latitude: '', // 纬度
        eventType: '',
        eventLevel: null,
        casualties: '',
        eventFlag: true,
        mutualFlag: false,
        dispatchFlag: null,
        attachmentList: [] // 附件列表
      },
      rules: {
        reporterPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: valiPhone, trigger: 'blur' }
        ],
        reportTime: [
          { required: true, message: '请选择上报时间', trigger: 'blur' }
        ],
        eventAddress: [
          { required: true, message: '请输入事件地点', trigger: 'blur' }
        ],
        eventDetail: [
          { required: true, message: '请输入事件情况', trigger: 'blur' },
          { max: 140, message: '最多可以输入140个字' }
        ],
        eventType: [
          { required: true, message: '请选择事件类型', trigger: 'blur' }
        ]
      },
      eventTypeList: [], // 事件类型列表
      eventLevelList: [] // 事件等级
    }
  },
  created () {
    this.resourceBtn = JSON.parse(sessionStorage.getItem('resourcebtn'));
  },
  mounted () {
    this.dataStr = JSON.stringify(this.addForm); // 将初始数据转成字符串
    this.getEventType();
    this.getEventLevel();
    this.uploadUrl = imgBaseUrl2;
  },
  methods: {
    onPositionChange (val) { // 事件地点输入框值改变
      let value = val;
      let _this = this;
      const map = new AMap.Map('container', {
        resizeEnable: true
      });
      // 输入提示
      const autoOptions = {
        input: 'tipinput'
      };
      const auto = new AMap.Autocomplete(autoOptions);
      const placeSearch = new AMap.PlaceSearch({
        map: map
      }); // 构造地点查询类
      AMap.service('AMap.Geocoder', () => {
        var geocoder = new AMap.Geocoder({});
        geocoder.getLocation(value, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            this.addForm.longitude = result.geocodes[0].location.lng;
            this.addForm.latitude = result.geocodes[0].location.lat;
          }
        });
      })
      AMap.event.addListener(auto, 'select', function (e) {
        value = e.poi.name;
        _this.addForm.eventAddress = e.poi.name;
        AMap.service('AMap.Geocoder', () => {
          var geocoder = new AMap.Geocoder({});
          geocoder.getLocation(e.poi.name, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              _this.addForm.longitude = result.geocodes[0].location.lng;
              _this.addForm.latitude = result.geocodes[0].location.lat;
            }
          });
        })
      }); // 注册监听，当选中某条记录时会触发
    },
    calNumber (val) { // 计算事件情况字数
      this.currentNum = val.length;
    },
    // skipCtcDetail (form) { // 跳到调度指挥方案制定页面
    //   this.$refs[form].validate((valid) => {
    //     if (valid) {
    //       this.addForm.dispatchFlag = true;
    //       if (this.addForm.casualties === '无') {
    //         this.addForm.casualties = 0;
    //       } else if (this.addForm.casualties === '不确定') {
    //         this.addForm.casualties = -1;
    //       } else if (this.addForm.casualties === '有') {
    //         this.addForm.casualties = this.dieNumber;
    //       }
    //       const param = {
    //         emiEvent: this.addForm
    //       }
    //       this.axios.post('A2/eventServices/event', param.emiEvent)
    //         .then((res) => {
    //           if (res && res.data) {
    //             console.log(res)
    //             this.$message({
    //               message: '添加事件成功',
    //               type: 'success'
    //             });
    //             this.$router.push({name: 'ctc-detail', query: {eventId: res.data}});
    //           } else {
    //             this.$message.error('添加事件失败');
    //           }
    //         })
    //         .catch(() => {})
    //     }
    //   });
    // },
    showMap () {
      if (this.addForm.eventAddress === '') {
        this.oConfig = {};
      } else {
        if (this.addForm.longitude || this.addForm.latitude) {
          this.oConfig = {
            _name: this.addForm.eventAddress,
            center: [Number(this.addForm.longitude), Number(this.addForm.latitude)]
          }
        } else {
          this.oConfig = {
            _name: this.addForm.eventAddress
          }
        }
      }
      this.open = !this.open;
    },
    mapPointSubmit (val, address) {
      if (val) {
        const str = val.split(',');
        this.addForm.longitude = Number(str[0]);
        this.addForm.latitude = Number(str[1]);
        this.addForm.eventAddress = address;
      }
    },
    back (form) {
      const data = JSON.stringify(this.addForm);
      if (this.dataStr === data) {
        this.$router.back(-1);
      } else {
        this.closeReturnVisiable = true;
      }
    },
    sureBack () {
      this.closeReturnVisiable = false;
      this.$router.back(-1);
    },
    submitForm (form) { // 保存数据
      let reg = /^([1-9]\d*|0)(\.\d*[1-9])?$/; // 校验死亡人数
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.addForm.casualties === '无') {
            this.addForm.casualties = 0;
          } else if (this.addForm.casualties === '不确定') {
            this.addForm.casualties = -1;
          } else if (this.addForm.casualties === '有') {
            if (!reg.test(this.dieNumber)) {
              this.isDieError = true;
              this.dieTip = '死亡人数只能为正整数';
              return false;
            } else {
              this.isDieError = false;
              this.dieTip = '';
            }
            if (parseInt(this.dieNumber) > 9999) {
              this.isDieError = true;
              this.dieTip = '可输入的最大死亡人数为9999';
              return false;
            } else {
              this.isDieError = false;
              this.dieTip = '';
            }
            this.addForm.casualties = this.dieNumber;
          }
          const param = {
            emiEvent: this.addForm
          }
          this.isAddLoading = true;
          this.axios.post('A2/eventServices/event', param.emiEvent)
            .then((res) => {
              if (res) {
                this.$message({
                  message: '添加事件成功',
                  type: 'success'
                });
                this.$router.push({name: 'link-event-list'});
                this.isAddLoading = false;
              } else {
                this.$message.error('添加事件失败');
                this.isAddLoading = false;
              }
            })
            .catch(() => {})
        }
      });
    },
    getEventType () { // 获取事件类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          if (res && res.data) {
            this.eventTypeList = res.data;
          }
        })
        .catch(() => {})
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res && res.data) {
            this.eventLevelList = res.data;
          }
        })
        .catch(() => {})
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
        }
        this.addForm.attachmentList.push(data);
        this.isImgDisabled = false;
      }
    },
    handleRemove (file, fileList) { // 删除图片
      if (file) {
        if (this.addForm.attachmentList.length > 0) {
          this.addForm.attachmentList.map((item, index) => {
            if (item.url === file.url) {
              this.addForm.attachmentList.splice(index, 1);
            }
          });
        }
      }
      if (fileList.length < 9) {
        this.isImgNumber = false;
      }
    },
    deleteImg (url) {
      if (url) {
        this.addForm.attachmentList && this.addForm.attachmentList.map((item, index) => {
          if (item.url === url) {
            this.addForm.attachmentList.splice(index, 1);
          }
        });
      }
    },
    handleBeforeUpload (file) { // 图片上传之前
      this.isImgDisabled = true;
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLtTenM = file.size / 1024 / 1024 < 10;
      if (!isImg) {
        this.$message.error('上传的图片只能是bmp、jpg、png格式!');
        this.isImgDisabled = false;
      }
      if (!isLtTenM) {
        this.$message.error('上传的图片大小不能超过10M');
        this.isImgDisabled = false;
      }
      return isImg && isLtTenM;
    },
    handleImgNumber (files, fileList) { // 图片超出最大个数限制
      this.isImgNumber = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .link-addEvent {
    padding: 20px;
    .add-body {
      .add-form {
        background-color: #fff;
        padding-bottom: 1%;
        .form-content {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
          .event-detail {
            position: relative;
            .number-tip {
              position: absolute;
              bottom: 0;
              left: 450px;
              color: #999999;
              font-size: 13px;
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
            width: 160px;
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
        }
        .img-form-item /deep/ .el-form-item__content{
          display: flex;
          .img-list {
            // width: 100px;
            height: 100px;
            margin-left: 10px;
            margin-bottom: 10px;
            display: flex;
            .error-item {
              position: absolute;
              top: -10px;
              right: -8px;
              font-size: 18px;
              color: #666;
              z-index: 1;
            }
          }
        }
      }
    }
    .operation-btn {
      margin-top: 3%;
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
    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 100px !important;
      height: 100px !important;
    }
    .address /deep/ .el-form-item__content {
      display: flex;
      .map-ecc {
        img {
          padding-top: 5px;
          padding-left: 5px;
        }
      }
    }
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
      font-weight: bold;
      font-size: 16px;
    }
    /deep/  .el-dialog__body {
      text-align: center !important;
    }
    .sureBtn {
      background:#0785FD;
      height:35px;
      color: #fff;
      line-height: 10px;
    }
    .noSureBtn {
      border-color:#e5e5e5;
      height:35px;
      line-height: 10px;
      color:#666666;
    }
    .img-dialog {
      /deep/ .el-dialog__header {
        padding: 40px 20px 10px;
      }
       /deep/  .el-dialog__body {
        text-align: center !important;
      }
    }
  }
</style>
