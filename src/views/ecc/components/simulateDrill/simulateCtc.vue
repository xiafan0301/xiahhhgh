<template>
  <div class="simulate-ctc">
    <div class='simulate-ctc-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>模拟调度指挥</span></el-breadcrumb-item>
      </el-breadcrumb>
      <template  v-if="resouceData && resourceBtn[resouceData.lookEventS]">
        <a :href="url" target="_blank">
          <el-button class='selectBtn look-event'>查看事件分布</el-button>
        </a>
      </template>
    </div>
    <div class="clearfix search-event">
      <el-form style="float: left;width:100%" :inline="true" ref='selectForm' :model='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 250px;" prop='reportTime'>
          <el-date-picker
            v-model='selectForm.reportTime'
            value-format="yyyy-MM-dd"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 200px;" prop='eventType'>
          <el-select placeholder="事件类型" style="width: 100%;" v-model='selectForm.eventType'>
            <el-option value='全部类型'></el-option>
            <el-option
              v-for="item in eventTypeList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 150px;" prop='eventLevel'>
          <el-select placeholder="事件等级" style="width: 100%;" v-model='selectForm.eventLevel'>
            <el-option value="全部等级"></el-option>
            <el-option
              v-for="item in eventLevelList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn' style='width: 80px' @click='selectData'>查询</el-button>
          <el-button style='width: 80px' @click="resetForm('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="width: 100%" :data='ctcDataList' class="table-ctc">
      <el-table-column fixed prop='eventCode' label="演练项目名称" align='center' show-overflow-tooltip></el-table-column>
      <el-table-column prop='eventTypeName' label="事件类型" align='center' show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.eventTypeName">{{scope.row.eventTypeName}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop='eventLevelName' label="事件等级" align='center' show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.eventLevelName">{{scope.row.eventLevelName}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop='acceptTime' label="开始时间" align='center' show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.reportTime">{{scope.row.reportTime}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop='eventAddress' label="事件地点" align='center' show-overflow-tooltip></el-table-column>
      <el-table-column prop='feedbackNumber' label="新反馈数" align='center' show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="color: #FB796C;" v-if="scope.row.feedbackNumber > 0">{{scope.row.feedbackNumber}}</span>
          <span style="color: #555555;" v-else>{{scope.row.feedbackNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center' width='200px'>
        <template slot-scope="scope">
          <template v-show="resouceData && resourceBtn[resouceData.lookCtcS]">
            <a :href="urlDetail + '?eventId=' + scope.row.eventId + '&' + userInfoParam()" target="_blank" @click="handleLook(scope.row.eventId)">
              <i class="icon-chakan- icon-hover" title="查看"></i>
            </a>
          </template>
          <i class="icon-tiaodu- icon-hover" v-show="resouceData && resourceBtn[resouceData.ctcEventS]" @click="skipCtcDetail(scope)" title="调度"></i>
          <i class="icon-jieshu- icon-hover"  v-show="resouceData && resourceBtn[resouceData.endEventS]" @click="skipCtcEnd(scope)" title="结束"></i>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right; padding-top: 10px;">
      <template v-if="pagination.total > 0">
        <el-pagination
          background
          @size-change="onSizeChange"
          @current-change="onPageChange"
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </template>
    </div>
  </div>
</template>
<script>
import {formatDate} from '@/utils/method.js';
import {dictType, resouceData} from '@/config/data.js';
import { setCookie, getCookie } from '@/utils/util.js';
import {ajaxCtx3} from '@/config/config.js';
export default {
  data () {
    return {
      resourceBtn: {},
      resouceData: resouceData,
      pagination: { total: 0, pageSize: 10, pageNum: 1 },
      selectForm: {
        eventFlag: true,
        mutualFlag: false,
        reportTime: [],
        eventStatus: '4037156e-97b5-11e8-b784-93a0bc9b77e5',
        eventLevel: '全部等级',
        eventType: '全部类型'
      },
      ctcDataList: [],
      url: null,
      urlDetail: null,
      eventLevelList: [],
      eventTypeList: []
    }
  },
  created () {
    this.resourceBtn = JSON.parse(sessionStorage.getItem('resourcebtn'));
  },
  mounted () {
    this.getOneMonth();
    this.getEventLevel();
    this.getEventType();
    this.getCtcDataList();
    this.url = ajaxCtx3 + '?' + this.userInfoParam();
    this.urlDetail = ajaxCtx3;
  },
  methods: {
    handleLook (id) { // 点击查看详情
      if (id) {
        const params = {
          'read_flag': true
        };
        this.axios.put('A2/taskServices/task/process/' + id, params)
          .then(res => {
          })
          .catch(() => {});
      }
    },
    userInfoParam () {
      let ln = getCookie('cookieUserName');
      if (!ln) { ln = ''; }
      return $.param({ln: ln});
    },
    skipCtcDetail (scope) { // 跳到调度指挥页面
      this.$router.push({name: 'simulate-ctc-detail', query: {eventId: scope.row.eventId, eventType: scope.row.eventType}});
    },
    skipCtcEnd (scope) { // 跳转到演练结束页面
      this.$router.push({name: 'drill-end', query: {eventId: scope.row.eventId, level: scope.row.eventLevel}});
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getCtcDataList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getCtcDataList();
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res) {
            this.eventLevelList = res.data;
          }
        })
        .catch(() => {})
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
    getOneMonth () { // 设置默认一个月
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      const startDate = formatDate(start, 'yyyy-MM-dd');
      const endDate = formatDate(end, 'yyyy-MM-dd');
      this.selectForm.reportTime.push(startDate);
      this.selectForm.reportTime.push(endDate);
    },
    getCtcDataList () { // 获取调度任务列表数据
      let eventLevel, eventType;
      if (this.selectForm.eventLevel === '全部等级') {
        eventLevel = '';
      } else {
        eventLevel = this.selectForm.eventLevel;
      }
      if (this.selectForm.eventType === '全部类型') {
        eventType = '';
      } else {
        eventType = this.selectForm.eventType;
      }
      const data = {
        'where.eventFlag': this.selectForm.eventFlag,
        'where.mutualFlag': this.selectForm.mutualFlag,
        'where.reportTimeStart': this.selectForm.reportTime[0],
        'where.reportTimeEnd': this.selectForm.reportTime[1],
        'where.eventStatus': this.selectForm.eventStatus,
        'where.eventType': eventType,
        'where.eventLevel': eventLevel,
        'where.simulateFlag': true,
        pageNum: this.pagination.pageNum
      }
      this.axios.get('A2/eventServices/events/page', {params: data})
        .then((res) => {
          console.log(res)
          if (res && res.data.list) {
            this.ctcDataList = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
    },
    selectData () { // 根据条件查询
      this.getCtcDataList();
    },
    resetForm (form) { // 重置表单
      this.$refs[form].resetFields();
      this.getOneMonth();
      this.getCtcDataList();
    }
  }
}
</script>

<style lang="scss" scoped>
.simulate-ctc {
  padding: 20px;
  .simulate-ctc-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .look-event {
      color: #fff;
    }
  }
  .search-event {
    position: relative;
    width: 100%;
    background: #fff;
    height: 90px;
    line-height: 90px;
    margin-bottom: 1%;
    .demo-form-inline {
      float: left;
      padding-left: 1%;
      padding-top: 30px;
      width:100%;
      height: 45px;
    }
  }
  .selectBtn {
    background: #0785FD;
  }
  .el-button+.el-button {
    margin-left: 2px !important;
  }
  /deep/ .el-table thead th {
    background-color: #FAFAFA !important;
  }
  /deep/ .hover-row>td {
    background-color: #E6F7FF !important;
  }
  .el-pagination {
    text-align: center;
  }
  .table-ctc {
    i {
      margin: 0 10px;
    }
    a{
      text-decoration: none;
    }
  }
  .icon-hover {
    font-size: 30px;
    color: #BBBBBB;
  }
  .icon-hover:hover {
    color: #0785FD;
  }
}
</style>
