<template>
  <div class="replan-list">
    <div class='replan-list-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item>预案演练</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>查询预案</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix search-replan">
      <el-form :inline="true" :model='selectForm' ref='selectForm' class="demo-form-inline" size="small">
        <el-form-item style="width: 150px;" prop='planType'>
          <el-select placeholder="预案类型" style="width: 100%;" v-model='selectForm.planType'>
            <el-option value="全部类型"></el-option>
            <el-option
              v-for="item in eventTypeList"
              :key="item.dictId"
              :label="item.dictContent"
              :value="item.dictId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 150px;" prop='planLevel'>
          <el-select placeholder="适用等级" style="width: 100%;" v-model='selectForm.planLevel'>
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
        <el-form-item style="width: 200px;" prop='planName'>
          <el-input placeholder='请输入预案名称' style='width:100%' v-model='selectForm.planName'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass' @click='selectData'>查询</el-button>
          <el-button class='btnClass' @click="resetForm('selectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      style="width: 100%"
      :data='reservePlanList'
      class='ctc-table'
    >
      <el-table-column fixed label="预案名称" prop='planName' align='center' show-overflow-tooltip></el-table-column>
      <el-table-column label="预案类型" prop='eventTypeName' align='center'></el-table-column>
      <el-table-column label="适用等级" prop='levelNameList' align='center'>
        <template slot-scope='scope'>
          <span>{{scope.row.levelNameList.join('、')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="selectReplanDetail(scope)" title="查看"></i>
          <i class="icon-qiyong- icon-hover" @click="openReplan(scope)" title="启用"></i>
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
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      selectForm: {
        planLevel: '全部等级', // 预案等级
        planType: '全部类型', // 预案类型
        planName: '' // 预案名称
      },
      reservePlanList: [],
      eventLevelList: [],
      eventTypeList: [],
      eventId: '',
      pagination: { total: 0, pageSize: 10, pageNum: 1 }
    }
  },
  computed: {
  },
  mounted () {
    if (this.$route.query.eventId) {
      this.eventId = this.$route.query.eventId;
    }
    this.getEventLevel();
    this.getEventType();
    this.getReplanList();
  },
  methods: {
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getReplanList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getReplanList();
    },
    selectReplanDetail (scope) { // 查看预案详情
      this.$router.push({name: 'drill-replan-detail', query: {planId: scope.row.planId, eventId: this.$route.query.eventId}});
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
    getEventType () { // 获取事件类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          if (res && res.data) {
            this.eventTypeList = res.data;
          }
        })
        .catch(() => {})
    },
    getReplanList () { // 获取预案列表
      let planLevel, planType;
      if (this.selectForm.planLevel === '全部等级') {
        planLevel = '';
      } else {
        planLevel = this.selectForm.planLevel;
      }
      if (this.selectForm.planType === '全部类型') {
        planType = '';
      } else {
        planType = this.selectForm.planType;
      }
      const params = {
        'where.planType': planType,
        'where.planLevel': planLevel,
        'where.planName': this.selectForm.planName,
        pageNum: this.pagination.pageNum
      }
      this.axios.get('A2/planServices/plans', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.reservePlanList = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {})
    },
    selectData () {
      this.getReplanList(); // 查询
    },
    resetForm (form) { // 重置表单查询
      this.$refs[form].resetFields();
      this.getReplanList();
    },
    openReplan (scope) { // 启用预案
      this.$router.push({name: 'drill-enable-replan', query: {eventId: this.$route.query.eventId, planId: scope.row.planId}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .replan-list {
    padding: 20px;
    .replan-list-header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .search-replan {
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
    .btnClass {
      width: 80px;
    }
    .selectBtn {
      background-color: #0785FD;
    }
    .add-event {
      color: #fff;
      float: right;
    }
    /deep/ .el-table thead th {
      background-color: #FAFAFA !important;
    }
    /deep/ .hover-row>td {
      background-color: #E6F7FF !important;
    }
    .el-button+.el-button {
      margin-left: 2px !important;
    }
    .el-pagination {
      text-align: center;
    }
    .ctc-table {
      i {
        margin: 0 10px;
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
