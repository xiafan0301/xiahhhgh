<template>
  <div class="um-main">
    <div class="um-box">
      <!--<div class="box-singer-create">-->
        <!--<el-form-->
          <!--ref="form"-->
          <!--:model="createUserData"-->
          <!--:inline-message= true-->
          <!--class="pa-box-form"-->
          <!--label-width="120px"-->
          <!--:rules="rules" >-->
          <!--<el-form-item label="手机号码" prop="userMobile">-->
            <!--<el-input v-model="createUserData.userMobile" placeholder="请输入用户手机号码"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="岗位角色" prop="userMobile">-->
            <!--<el-input v-model="createUserData.userMobile" placeholder="请输入岗位角色"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="姓名" prop="userName">-->
            <!--<el-input v-model="createUserData.userName" placeholder="请输入用户姓名"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="身份号码" prop="userIdcard">-->
            <!--<el-input v-model="createUserData.userIdcard" placeholder="请输入用户身份证号码"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="性别" prop="userSex">-->
            <!--<el-radio-group class="retire-page-radio" v-model="createUserData.userSex">-->
              <!--<el-radio :label="1">男</el-radio>-->
              <!--<el-radio :label="2">女</el-radio>-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="邮箱" prop="userEmail">-->
            <!--<el-input v-model="createUserData.userEmail" placeholder="请输入用户邮箱"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="居住地">-->
            <!--<el-select-->
              <!--v-model="createUserData.province"-->
              <!--style="width: 246px;"-->
              <!--clearable-->
              <!--placeholder="请选择省份"-->
              <!--@change="onProvinceChange"-->
              <!--value-key="uid">-->
              <!--<el-option v-for="item in provinceData" :key="item.uid" :label="item.cname" :value="item"/>-->
            <!--</el-select>-->
            <!--<el-select-->
              <!--v-model="createUserData.city"-->
              <!--style="width: 246px;"-->
              <!--clearable-->
              <!--placeholder="请选择城市">-->
              <!--<el-option v-for="item in cityData" :key="item.uid" :label="item.cname" :value="item.cname"/>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->
      <div class="box-multi-create">
      <div class="content">
      <div class="one">您需要下载模板文件并按要求填写相关信息，上传成功后，点击创建批量创建用户账号。</div>
      <div class="two">下载模板</div>
      <el-input class="three" placeholder="未选择任何文件" v-model="value">
      <el-upload
      slot="append"
      class="singe-upload"
      :action="$store.state.fileUploadUrl + '/api/network/upload/new'"
      :limit="1"
      :show-file-list="false"
      :on-success="onSelectPhoto">
      <el-button size="small" type="primary">选择文件</el-button>
      </el-upload>
      </el-input>
      </div>
      </div>
      <div class="bottom-btn">
        <span @click="goBack">返 回</span>
        <span @click="onCreateSinger">创 建</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from '@/utils/util.js';
import {checkTel, checkEmail, checkIdCard} from '../../../../utils/validator';
export default {
  data () {
    return {
      value: '',
      plateName: getCookie('plateName'),
      selectList: [],
      provinceData: [], // 省份列表
      cityData: [], // 城市列表
      createUserData: {
        userMobile: null,
        userName: null,
        proKey: this.$store.state.proKey,
        userIdcard: null,
        userSex: null,
        userEmail: null,
        province: null,
        city: null
      },
      rules: {
        userMobile: [
          { required: true, message: '该项内容不可为空' },
          { validator: checkTel, trigger: 'blur' }
        ],
        userName: [{ required: true, message: '该项内容不可为空' }],
        userEmail: [{ validator: checkEmail, trigger: 'blur' }],
        userIdcard: [{ validator: checkIdCard, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getSelectList();
    this.getProvince();
  },
  methods: {
    getSelectList () {
      // this.axios.get('S2/auth/authServices/plateList', {params: { 'where.authState': 2 }})
      //   .then(res => {
      //     if (res) {
      //       this.selectList = res.data.list;
      //     }
      //   })
    },
    // 获取省份列表
    getProvince () {
      // let params = { parentUid: '00000000-0000-0000-0000-000000000000' }
      // this.axios.get('/usersServices/areas', {params})
      //   .then((res) => {
      //     if (res) {
      //       this.provinceData = res.data;
      //     }
      //   })
    },
    // 省份改变时
    onProvinceChange (obj) {
      // this.cityData = {};
      // this.createUserData.city = null;
      // let params = { parentUid: obj.uid }
      // this.axios.get('/usersServices/areas', {params})
      //   .then((res) => {
      //     if (res) {
      //       this.cityData = res.data;
      //     }
      //   })
    },
    onSelectPhoto () {},
    onCreateSinger () {
      // this.$refs['form'].validate(valid => {
      //   if (valid) {
      //     this.createUserData.province = this.createUserData.province.cname;
      //     this.axios.post('S2/auth/authServices/user', this.createUserData)
      //       .then(res => {
      //         if (res) {
      //           this.$message.success('创建成功');
      //           this.$router.push({name: 'user-list'});
      //         }
      //       })
      //   }
      // })
    },
    goBack () {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .um-main {
    /*.header {*/
      /*margin-bottom: 10px;*/
      /*display: flex;*/
      /*justify-content: space-between;*/
    /*}*/
    .um-box {
      .box-header-tip {
        background: #FFF;
        width: 100%;
        height: 54px;
        line-height: 54px;
        font-size: 12px;
        color: #666;
        padding-left: 15px;
        margin: 15px 0 2px 0;
      }
      /*.box-singer-create {*/
        /*background: #FFF;*/
        /*display: inline-block;*/
        /*width: 100%;*/
        /*.title {*/
          /*height: 60px; line-height: 60px;*/
          /*border-left: 5px solid #0785FD;*/
          /*border-bottom: 2px solid #F4F4F4;*/
          /*> span {*/
            /*font-size: 16px;*/
            /*color: #333;*/
            /*padding-left: 15px;*/
          /*}*/
        /*}*/
        /*.pa-box-form {*/
          /*padding: 28px 190px 18px 20px;*/
          /*/deep/ .el-form-item__label { font-weight: 600; }*/
          /*.retire-page-radio {*/
            /*margin-left: 15px;*/
            /*/deep/ .el-radio__input.is-checked .el-radio__inner {*/
              /*border-color: #0785FD;*/
              /*background: #0785FD;*/
            /*}*/
            /*/deep/ .el-radio__input.is-checked+.el-radio__label {*/
              /*color: #606266;*/
            /*}*/
            /*/deep/ .el-radio__inner:hover {*/
              /*border-color: #0785FD;*/
            /*}*/
          /*}*/
          /*.el-input{*/
            /*width: 500px;*/
          /*}*/
          /*.el-form-item {*/
            /*margin-bottom: 14px;*/
            /*/deep/ .el-form-item__content {*/
              /*width: 80%;*/
              /*!*<!--.el-form-item__error {-->*!*/
              /*!*<!--right: -105px;-->*!*/
              /*!*<!--top: 11px;-->*!*/
              /*!*<!--left: auto;-->*!*/
              /*!*<!--}-->*!*/
            /*}*/
          /*}*/
          /*.el-form-item.is-required /deep/ .el-form-item__label:before {*/
            /*content: '*';*/
            /*color: #f56c6c;*/
            /*margin-right: 4px;*/
            /*display: none;*/
          /*}*/
          /*.el-form-item.is-required /deep/ .el-form-item__label:after {*/
            /*content: '*';*/
            /*color: #f56c6c;*/
            /*margin-left: 4px;*/
          /*}*/
        /*}*/
        /*.bottom-btn {*/
          /*text-align: center;*/
          /*padding-bottom: 55px;*/
          /*padding-right: 90px;*/
          /*span {*/
            /*display: inline-block;*/
            /*width: 120px; height: 42px;*/
            /*line-height: 42px;*/
            /*text-align: center;*/
            /*cursor: pointer;*/
            /*border-radius:3px;*/
          /*}*/
          /*span:nth-child(1) {*/
            /*border: 1px solid #DBDBDB;*/
            /*color: #666;*/
            /*margin-right: 20px;*/
          /*}*/
          /*span:nth-child(2) {*/
            /*color: #fff;*/
            /*background: #0785FD;*/
          /*}*/
        /*}*/
        /*.bottom-btn {*/
          /*text-align: center;*/
          /*span {*/
            /*display: inline-block;*/
            /*width: 120px; height: 42px;*/
            /*line-height: 42px;*/
            /*text-align: center;*/
            /*cursor: pointer;*/
            /*border-radius:3px;*/
          /*}*/
          /*span:nth-child(1) {*/
            /*border: 1px solid #DBDBDB;*/
            /*color: #666;*/
            /*margin-right: 20px;*/
          /*}*/
          /*span:nth-child(2) {*/
            /*color: #fff;*/
            /*background: #0785FD;*/
          /*}*/
        /*}*/
      /*}*/
      .box-multi-create {
        height: 350px;
        background: #FFF;
        display: inline-block;
        width: 100%;
        .title {
          height:60px; line-height: 60px;
          border-left: 5px solid #0785FD;
          border-bottom: 2px solid #F4F4F4;
          > span {
            font-size: 16px;
            color: #333;
            padding-left: 15px;
          }
        }
        .content {
          text-align: center;
          padding: 28px 30px;
          .one {
            font-size: 18px;
            color: #666;
          }
          .two {
            width:130px;height:48px;
            line-height: 48px;
            text-align: center;
            background:#E1F2FF;
            border-radius:24px;
            color: #0785FD;
            border: 1px solid #E1F2FF;
            font-size: 16px;
            margin: 0 auto;
            margin-top: 35px;
            cursor: pointer;
          }
          .three {
            width: 90%;
            margin-top: 35px;
          }
          .bottom-btn {
            text-align: center;
            padding-top: 60px;
            span {
              display: inline-block;
              width: 120px; height: 42px;
              line-height: 42px;
              text-align: center;
              cursor: pointer;
              border-radius:3px;
            }
            span:nth-child(1) {
              border: 1px solid #DBDBDB;
              color: #666;
              margin-right: 20px;
            }
            span:nth-child(2) {
              color: #fff;
              background: #0785FD;
            }
          }
        }
      }
      .bottom-btn {
        padding-top: 20px;
        padding-bottom: 55px;
        padding-right: 90px;
        span {
          display: inline-block;
          width: 80px; height: 42px;
          line-height: 42px;
          text-align: center;
          cursor: pointer;
          border-radius:3px;
        }
        span:nth-child(1) {
          border: 1px solid #DBDBDB;
          color: #666;
          margin-right: 20px;
        }
        span:nth-child(2) {
          color: #fff;
          background: #0785FD;
        }
      }
      .bottom-btn {
        span {
          display: inline-block;
          width: 80px; height: 42px;
          line-height: 42px;
          text-align: center;
          cursor: pointer;
          border-radius:3px;
        }
        span:nth-child(1) {
          border: 1px solid #DBDBDB;
          color: #666;
          margin-right: 20px;
        }
        span:nth-child(2) {
          color: #fff;
          background: #0785FD;
        }
      }
    }
  }
</style>
