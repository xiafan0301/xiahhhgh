<template>
  <div class="bg-plate-ecl bg-plate-ecl1" v-show="this.$store.state.progressIndex === 1">
    <div class="plate-ecl1-tab">
      <div>
        <span :class="{'ecl1-tab-sed': styleType === 1}" @click="changeStyleType(1)">左右两侧</span>
        <span :class="{'ecl1-tab-sed': styleType === 2}" @click="changeStyleType(2)">地图区域</span>
      </div>
    </div>
    <div class="plate-ecl1-c" style='border-bottom: 1px solid #ddd'>
      <ul class="plate-ecl1-ul  plate-ecl1-ul1 clearfix">
        <li v-for="item in allPlateList" :key="item.configId">
            <img v-bind:src="item.thumbnailUrl" alt="">
          <p>
            <el-radio v-model="styleRadio" :label="item.configId" @change="setStyleRadio(item)">
              {{item.configName}}
            </el-radio>
          </p>
        </li>
      </ul>
    </div>
    <div class="plate-ecl-b">
      <el-button :disabled="!styleRadio" :style="[!styleRadio ? styleObj : '']" @click.native="nextStep" type="primary" class='selectBtn'>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
    </div>
  </div>
</template>
<script>
import store from '../../../../store/store.js';
export default {
  data () {
    return {
      styleType: 1, // 1 所有两侧 2 地图区域
      allPlateList: [], // 所有的版块
      plateInfo: {
        configId: '',
        markUrl: '',
        configCode: ''
      }, // 新增版块信息
      // 选择样式
      styleRadio: '',
      styleObj: {
        background: '#ddd'
      }
    }
  },
  created () {
    this.getAllPlateList();
  },
  methods: {
    changeStyleType (type) {
      this.styleRadio = '';
      this.styleType = type;
      this.getAllPlateList();
      this.$store.commit('setStyleType', {styleType: type});
    },
    // 获取所有的版块
    getAllPlateList () {
      let params = {
        configType: this.styleType
      };
      this.axios.get('/plateStyleServices/configs', {params})
        .then((res) => {
          if (res) {
            if (this.styleType === 2) {
              this.styleRadio = res.data[0].configId;
              this.plateInfo.configId = res.data[0].configId;
              this.plateInfo.markUrl = res.data[0].markUrl;
              this.plateInfo.configCode = res.data[0].configCode;
              this.$store.commit('setPlateInfo', {plateInfo: res.data[0]});
            }
            this.allPlateList = res.data;
          }
        })
        .catch(() => {});
    },
    setStyleRadio (val) {
      this.styleRadio = val.configId;
      this.plateInfo.configId = val.configId;
      this.plateInfo.markUrl = val.markUrl;
      this.plateInfo.configCode = val.configCode;
      this.$store.commit('setPlateInfo', {plateInfo: val});
    },
    nextStep () {
      this.$store.commit('setProgressIndex', {progressIndex: 2});
      const param = this.plateInfo.configId;
      this.axios.get('/plateServices/areaInfos/' + param + '')
        .then((res) => {
          if (res) {
            let typeArr = [];
            let oneType = [];
            res.data.map((item, index) => {
              oneType.push(item.configCount);
              if (item.areaDataType === 2 || item.areaDataType === 3) {
                typeArr.push(item);
              }
            });
            this.$store.commit('setConfigInfo', {plateConfigInfo: res.data});
            this.$store.commit('setType', {typeArr: typeArr});
            this.$store.commit('setOneType', {oneType: oneType});
          }
        })
        .catch(() => {});
    }
  }
}
</script>
<style lang="scss">
  .selectBtn {
    background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
    background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
  }
  .pb-plate-pro {
    padding: 0 10% 0 10%;
    overflow: hidden;
    > .plate-pro-i {
      position: relative;
      width: 25%; height: 80px;
      float: left;
      background-position: center center;
      background-repeat: no-repeat;
      > p {
        position: absolute; top: 50%; left: 0;
        margin-top: 15px;
        width: 100%;
        text-align: center;
        color: #D3D3D3;
      }
      &.plate-pro-ised > p { color: #0785FD; }
      > div.plate-pro-ilr {
        position: absolute; top:50%; left: 50%;
        margin-left: 15px;
        width: 50%;
        height: 1px;
        overflow: hidden;
        background-color: #d3d3d3;
      }
      > div.plate-pro-ill {
        position: absolute; top:50%; right: 50%;
        margin-right: 15px;
        width: 50%;
        height: 1px;
        overflow: hidden;
        background-color: #d3d3d3;
      }
      &.plate-pro-ised > div {  background-color: #0785FD; }
    }
  }
  .vis-bg-plate {
    padding: 20px 20px 0 20px;
    height: 100%;
    position: relative;
  }
  .bg-plate-bd {
    border-bottom: 1px solid #E3E3E3;
    height: 38px;
    padding: 2px 0 18px 2px;
  }
  .bg-plate-et {
    position: absolute; top: 20px; left: 20px;
    width: 100%;
    height: 138px;
  }
  .bg-plate-ec {
    height: 100%;
    padding-top: 138px; padding-bottom: 20px;
  }
  .bg-plate-ecc {
    width: 100%;
    height: 100%;
    border: 1px solid #E3E3E3;
  }
  .bg-plate-ecl {
    // height: calc(100% - 138px);
    height: 100%;
    position: relative;
    > .plate-ecl-b {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      // height: 80px;
      // line-height: 80px;
      text-align: right;
      padding: 0 4% 1% 0;
      // border-top: 1px solid #ddd;
    }
  }
  .bg-plate-ecl1 {
    padding: 80px 0 80px 0;
    > .plate-ecl1-tab {
      position: absolute; top: 0; left: 0;
      width: 100%;  height: 80px;
      text-align: center;
      > div {
        width: 500px;
        overflow: hidden;
        margin: 0 auto;
        padding-top: 28px;
        > span {
          display: inline-block;
          float: left;
          border: 1px solid #0785FD;
          background-color: #fff;
          color: #999;
          width: 250px; height: 32px; line-height: 32px;
          cursor: pointer;
          transition: all .4s;
          &.ecl1-tab-sed {
            background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
            background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
            color: #fff;
            cursor: default;
          }
          &:first-child {
            border-radius: 6px 0 0 6px;
          }
          &:last-child {
            border-radius: 0 6px 6px 0;
          }
        }
      }
    }
    > .plate-ecl1-c {
      height: 100%;
      overflow: auto;
      margin: 0 auto;
      padding: 0 0 0 5%;
      > .plate-ecl1-ul {
        // width: 100%;
        margin: 0 auto;
        > li {
          width: 325px;
          height: 250px;
          float: left;
          text-align: center;
          margin: 0 5px;
          // padding: 10px 30px;
          overflow: hidden;
          > img {
            width: 315px; height: 196px;
          }
          > p {
            height: 20px; line-height: 20px;
          }
        }
      }

    }
  }
  .bg-plate-ecl2 {
    padding-bottom: 80px;
  }
  .plate-ecl2-c {
    height: 100%;
    overflow: auto;
    padding: 20px 20px 20px 20px;
    > .plate-ecl2-cl {
      width: 500px;
      float: left;
      text-align: center;
      > img {
        // width: 100%;
      }
      > ul {
        text-align: left;
        padding-top: 20px;
        padding-left: 20px;
        > li {
          padding-bottom: 10px;
          overflow: hidden;
          > div {
            &:first-child {
              float: left;
              width: 100px;
              text-align: right;
              display: inline-block;
              color: #333333;
              font-weight: 600;
            }
            &:last-child {
              color: #666666;
              margin-left: 120px;
            }
          }
        }
      }
    }
    > .plate-ecl2-cr {
      margin-left: 560px;
      .remark-item {
        width: 180px;
        .el-form-item__content {
          width: 60%;
        }
      }
    }
  }
  .ecl2-cr-list {
    > h3 {
      font-size: 16px; color: #333; font-weight: 600;
      padding-bottom: 10px;
    }
  }

  .bg-plate-ecl3 {
    padding-bottom: 80px;
  }
</style>
