<template>
  <div class="ba-xf">
    <div style="padding-bottom: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急库</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>物资管理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="display: flex;">
    <div style=" width: 21%;" class="warehouse">
      <div style="padding:20px 10px; box-sizing: border-box; background-color: #FAFAFA;" class="clearfix">
        <span style="display: inline-block;float: left; padding-top: 5px;font-size:18px; color: #0785FD; font-weight:bold" >仓库管理</span>
        <el-button style="float: right;" class="add-material" size="small" @click.native="showEditDialog('add')" v-show="resouceData && resourceBtn[resouceData.addWarehouse]">添加仓库</el-button>
      </div>
        <div>
          <el-table
            height="650"
            ref="singleTable"
            highlight-current-row
            @current-change="handleCurrentChange"
            @row-click="rowclick"
            :show-header = 'false'
            :data="tableDatack"
            empty-text ="还没有可用仓库,请先添加仓库"
            style="width: 100%;" width="60%">
            <el-table-column
              prop="warehouseName" fixed>
            </el-table-column>
            <el-table-column width="40%" prop="warehouseId">
              <template slot-scope="scope">
                <el-popover trigger="click" width="50" style="padding: 0" class="tanchu">
                  <div style="text-align: center; margin: 0">
                    <div style="margin-bottom: 5px; border-bottom: 1px solid #E8E8E8">
                      <el-button type="text" @click.native="showEditDialog('modify', scope.row)" v-show="resouceData && resourceBtn[resouceData.modifyWarehouse]">修改</el-button>
                    </div>
                    <div style="margin-bottom: 5px; border-bottom: 1px solid #E8E8E8">
                      <el-button type="text" @click="seeck(scope.row)">查看</el-button>
                    </div>
                    <el-button  type="text" @click="del('warehouse',scope.row)" v-show="resouceData && resourceBtn[resouceData.delWarehouse]">删除</el-button>
                  </div>
                  <i class="icon iconfont anbutton" style="cursor: pointer;" slot="reference" @click="ii(scope)" v-if="scope.$index > 0">&#xe6f4;</i>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <div style="width: 80%">
      <div class="clearfix" style="position: relative; background-color: #FFFFFF; margin-bottom: 16px">
        <el-form style="float: left; margin-left: 20px; padding-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline" size="small">
          <el-form-item >
          <el-input v-model="searchForm.materialsName" placeholder="搜索物资名称..." style="width: 220px" ></el-input>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" class='selectBtn' @click="doSearch">查询</el-button>
            <el-button @click.native="searchFormReset">重置</el-button>
          </el-form-item>
        </el-form>
        <div style="position: absolute; right: 20px; top: 20px">
          <el-button type="primary" size="small" class='selectBtn btnClass' @click.native="addmodify('add')" v-show="resouceData && resourceBtn[resouceData.addMaterial]">添加物资</el-button>
        </div>
      </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      class="mater-table"
      >
      <el-table-column fixed  label="序号" type="index" width="80"></el-table-column>
      <el-table-column prop="materialsName" label="物资名称" align="center">
      </el-table-column>
      <el-table-column prop="amount" label="数量" align="center"></el-table-column>
      <el-table-column prop="measurementUnit" label="单位" align="center"></el-table-column>
      <el-table-column prop="warehouseName" label="所属仓库" align="center">
        <template slot-scope="scope">
          <el-popover placement="bottom" v-for="(item, index) in tableDatack" :key="index" effect="light"  trigger="hover">
            <div>
              <div style="padding-bottom: 15px"><span style="color: #555555; font-size: 14px; font-weight: bold">负责人：</span>{{scope.row.warehouseId === item.warehouseId ? item.administrators : ''}}</div>
              <div><span style="color: #555555; font-size: 14px; font-weight: bold">电话：</span>{{scope.row.warehouseId === item.warehouseId ? item.adminTel : ''}}</div>
            </div>
          <span style="cursor: pointer" slot="reference">{{scope.row.warehouseId === item.warehouseId ?  (item.warehouseName).slice(0,30): ''}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="see(scope.row)" title="查看"></i>
          <i class="icon-xiugai-1 icon-hover" @click="addmodify('modify',scope.row)" title="编辑" v-show="resouceData && resourceBtn[resouceData.modifyMaterial]"></i>
          <i class="icon-shanchu- icon-hover" @click="del('material',scope.row)" title="删除" v-show="resouceData && resourceBtn[resouceData.delMaterial]"></i>
        </template>
      </el-table-column>
    </el-table>
      <div class="bg-plan-tbp">
        <el-pagination
          background
          @size-change="pagerSizeChange"
          @current-change="pagerCurrChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  </div>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="deleteVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>{{messageStatus}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="deletEvent('warehouse')" v-if="delstatus === 'warehouse'&& tableData.length === 0">确定删除</el-button>
        <el-button class='sureBtn' @click="deletEvent('material')" v-if="delstatus === 'material'">确定删除</el-button>
        <el-button class='noSureBtn' @click="deleteVisiable = false">暂不删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {resouceData} from '@/config/data.js';
var list = [];
export default {
  data () {
    return {
      resourceBtn: {},
      resouceData: resouceData,
      statusindex: 0,
      visible2: false,
      visitType: 0,
      searchForm: {
        materialsName: '',
        warehouseId: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableDatack: [],
      deleteVisiable: false,
      materialsId: '',
      warehouseId: '',
      delstatus: 'material',
      messageStatus: ''
    }
  },
  created () {
    this.resourceBtn = JSON.parse(sessionStorage.getItem('resourcebtn'));
    this.getTableData();
    this.getTableDatack();
  },
  mounted () {
    if (this.$route.params.statusindex) {
      this.statusindex = this.$route.params.statusindex
    }
  },
  methods: {
    ii (scope) {
      console.log(scope)
    },
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange (row) {
      this.searchForm.warehouseId = row.warehouseId;
      this.getTableData();
    },
    rowclick (row, event, column) {
      this.searchForm.warehouseId = row.warehouseId;
      this.getTableData();
    },
    getTableData () {
      let params = {
        // 'where.beginTime': this.searchForm.beginTime,
        // 'where.endTime': this.searchForm.endTime,
        // 'where.publishState': this.searchForm.publishState,
        'where.warehouseId': this.searchForm.warehouseId,
        'where.materialsName': this.searchForm.materialsName,
        // 'where.publishUnitId': this.searchForm.publishUnitId,
        // 'where.receiverId': this.searchForm.receiverId,
        // 'where.isReceive': this.searchForm.isReceive,
        // 'where.publishTime': this.searchForm.publishTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.axios.get('A2/materialService/page?' + $.param(params))
        .then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
        });
    },
    getTableDatack () {
      let params = {
        pageSize: 999999999
      };
      this.axios.get('A2/warehouseService/page', {params})
        .then((res) => {
          this.tableDatack = res.data.list;
          this.tableDatack.unshift({warehouseName: '所有仓库'})
          this.setCurrent(this.tableDatack[this.statusindex])
        })
        .catch(() => {
        });
    },
    // 状态切换
    registrationChoice (type) {
      this.searchForm.warehouseId = '';
      this.getTableData();
      if (type === 1) {
      }
      if (type === 2) {
      }
      if (type === 3) {
      }
    },
    edit () {
    },
    doSearch () {
      this.pageNum = 1;
      this.getTableData();
    },
    // del (status, scope) {
    //   let messageStatus = ''
    //   let isconfirmButtonText = true
    //   if (status === 'material') {
    //     messageStatus = '确认删除吗'
    //   } else {
    //     if (status === 'warehouse' && this.tableData.length === 0) {
    //       messageStatus = '删除后不可恢复，是否确认删除'
    //     } else {
    //       messageStatus = '不可删除，请先删除该仓库下的物资'
    //       isconfirmButtonText = false
    //     }
    //   }
    //   console.log(isconfirmButtonText)
    //   // 不可删除，请先删除该仓库下的物资
    //   this.$confirm(messageStatus, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     showConfirmButton: isconfirmButtonText
    //   })
    //     .then(() => {
    //       if (scope) {
    //         const params = {
    //           materialsId: scope.materialsId,
    //           warehouseId: scope.warehouseId
    //         };
    //         if (status === 'material') {
    //           this.axios.delete('A2/materialService/' + scope.materialsId, {params})
    //             .then((res) => {
    //               if (res) {
    //                 this.getTableData();
    //                 this.$message({
    //                   type: 'success',
    //                   message: '删除成功!'
    //                 });
    //               } else {
    //                 this.$message.error('删除失败');
    //               }
    //             })
    //         } else {
    //           this.axios.delete('A2/warehouseService/' + scope.warehouseId, {params})
    //             .then((res) => {
    //               if (res) {
    //                 this.$message({
    //                   type: 'success',
    //                   message: '删除成功!'
    //                 });
    //                 this.getTableDatack();
    //               } else {
    //                 this.$message.error('删除失败');
    //               }
    //             })
    //         }
    //       }
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });
    //     });
    // },
    deletEvent (sta) {
      if (sta === 'material') {
        const params = {
          materialsId: this.materialsId
        };
        this.axios.delete('A2/materialService/' + this.materialsId, {params})
          .then((res) => {
            if (res) {
              this.getTableData();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.deleteVisiable = false
            }
          })
      } else {
        const params = {
          warehouseId: this.warehouseId
        };
        this.axios.delete('A2/warehouseService/' + this.warehouseId, {params})
          .then((res) => {
            if (res) {
              this.getTableDatack();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.deleteVisiable = false
            }
          })
      }
    },
    del (status, scope) {
      if (status === 'material') {
        this.messageStatus = '确认删除吗'
      } else {
        if (status === 'warehouse' && this.tableData.length === 0) {
          this.messageStatus = '删除后不可恢复，是否确认删除'
        } else {
          this.messageStatus = '不可删除，请先删除该仓库下的物资'
        }
      }
      this.delstatus = status
      if (status === 'material') {
        this.materialsId = scope.materialsId
      } else {
        this.warehouseId = scope.warehouseId
      }
      this.deleteVisiable = true
    },
    searchFormReset () {
      this.searchForm.materialsName = '';
      this.pageNum = 1;
      this.getTableData()
    },
    showEditDialog (status, scope) {
      if (status === 'add') {
        this.$router.push({name: 'emergency-addWarehouse', query: {status: status}});
      } else {
        this.$router.push({name: 'emergency-addWarehouse', query: {status: status, warehouseId: scope.warehouseId}});
      }
    },
    seeck (scope) {
      this.$router.push({name: 'emergency-seeWarehouse', query: {status: status, warehouseId: scope.warehouseId}});
    },
    addmodify (status, scope) {
      if (this.tableDatack.length > 0) {
        if (status === 'add') {
          this.$router.push({name: 'emergency-addMaterial', query: {status: status, warehouseId: this.searchForm.warehouseId}});
        } else {
          this.$router.push({name: 'emergency-addMaterial', query: {status: status, materialsId: scope.materialsId}});
        }
      } else {
        this.$message.error('请先添加仓库');
      }
    },
    see (scope) {
      this.$router.push({name: 'emergency-seeMaterial', query: {status: status, materialsId: scope.materialsId}});
    },
    // 分页
    pagerSizeChange (val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getTableData();
    },
    pagerCurrChange (val) {
      this.pageNum = val;
      this.getTableData();
    }
  },
  filters: {
    warehouseFilter: function (warehouseId) {
      // this.tableDatack && this.tableDatack.map((item, index) => {
      // });
      // console.log(this.tableDatack);
      list.map((item, index) => {
        if (item.warehouseId === warehouseId) {
          console.log(item.warehouseName);
          return item.warehouseName;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .ba-xf {
    padding: 20px;
    background-color: #F0F3F4;
    height: 100%;
    .btnClass {
      width: 100px;
    }
    .selectBtn {
      background-color: #0785FD;
    }
    .warehouse{
      margin-right: 2%;
      /*/deep/ .el-table__row:nth-child(1) {*/
          /*/deep/ .cell {*/
             /*i {*/
              /*display: none!important;*/
            /*}*/
          /*}*/
      /*}*/
      .active{
        color: #ffffff;
        background: #0785FD;
        position: relative;
        &:after{
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          background: #0785FD;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
          position: absolute;
          right: -6px;
          top: 50%;
        }
      }
      .anbutton{
        &:hover {
          color: #0785FD;
        }
      }
      .add-material {
        width: 80px;
        border: 1px solid #0785FD;
        border-radius: 2px;
        color: #0785FD;
        font-size: 14px;
      }
    }
    ul {
      li {
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #FAFAFA;
        position: relative;
        i{
          position: absolute;
          display: inline-block;
          top: 40%;
          right: 10px;
        }
      }
    }
    .el-table {
      >thead th {
        color: #555555 !important;
      }
    }
    /deep/ .el-table thead th {
      background-color: #FAFAFA !important;
    }
    /deep/ .hover-row>td {
      background-color: #E6F7FF !important;
    }
    .mater-table {
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
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
      font-weight: bold;
      font-size: 16px;
    }
    /deep/  .el-dialog--center .el-dialog__body {
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
  }
  .bg-plan-tbp{
    padding: 20px 0;
    text-align: center;
  }
</style>
