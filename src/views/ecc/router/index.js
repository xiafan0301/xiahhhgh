import Vue from 'vue'
import Router from 'vue-router'

// 主要
import main from '@/views/ecc/components/main.vue'
// 消息管理
import notice from '@/views/ecc/components/notice/notice.vue'
import system from '@/views/ecc/components/notice/system.vue'
import noticeRelease from '@/views/ecc/components/notice/release.vue'
import noticeSee from '@/views/ecc/components/notice/see.vue'
import noticeAtmanagementList from '@/views/ecc/components/notice/noticeAtmanagementList.vue'
import noticeModify from '@/views/ecc/components/notice/modify.vue'
// 事件管理
import event from '@/views/ecc/components/event/event.vue'
import eventList from '@/views/ecc/components/event/eventList.vue'
import addEvent from '@/views/ecc/components/event/addEvent.vue'
import addMsg from '@/views/ecc/components/event/addMsg.vue'
import eventDetailEnd from '@/views/ecc/components/event/eventDetailEnd.vue'
import eventEnd from '@/views/ecc/components/event/eventEnd.vue'
import unreatedEvent from '@/views/ecc/components/event/unreatedEvent.vue'
import eventDetailReat from '@/views/ecc/components/event/eventDetailReat.vue'
import mutualPerson from '@/views/ecc/components/event/mutualPerson.vue'
import mutualDetail from '@/views/ecc/components/event/mutualDetail.vue'
// 调度指挥
import ctc from '@/views/ecc/components/ctc/ctc.vue'
import ctcList from '@/views/ecc/components/ctc/ctcList.vue'
import ctcDetail from '@/views/ecc/components/ctc/ctcDetail.vue'
// 应急库
import emergency from '@/views/ecc/components/emergency/emergency.vue'
import emergencyPlanList from '@/views/ecc/components/emergency/planList.vue'
import emergencyAddPlan from '@/views/ecc/components/emergency/addPlan.vue'
import emergencyMaterialList from '@/views/ecc/components/emergency/materialList.vue'
import emergencyAddWarehouse from '@/views/ecc/components/emergency/warehouse.vue'
import emergencySeeWarehouse from '@/views/ecc/components/emergency/seehouse.vue'
import emergencySeePlan from '@/views/ecc/components/emergency/seePlan.vue'
import emergencyAddMaterial from '@/views/ecc/components/emergency/addmaterial.vue'
import emergencySeeMaterial from '@/views/ecc/components/emergency/seematerial.vue'
// 预案
import rePlanList from '@/views/ecc/components/ctc/rePlanList.vue'
import replanDetail from '@/views/ecc/components/ctc/replanDetail.vue'
import enableReplan from '@/views/ecc/components/ctc/enableReplan.vue'
// 联动单位的调度指挥
import linkage from '@/views/ecc/components/linkageUnit/linkage.vue'
import linkageList from '@/views/ecc/components/linkageUnit/linkageList.vue'
import linkageDetailEnd from '@/views/ecc/components/linkageUnit/linkageDetailEnd.vue'
import linkageDetailReat from '@/views/ecc/components/linkageUnit/linkageDetailReat.vue'
import feedback from '@/views/ecc/components/linkageUnit/feedback.vue'
// 系统管理--组织架构
import systemManage from '@/views/ecc/components/systemManage/systemManage.vue';
import organList from '@/views/ecc/components/systemManage/organList.vue';
// import organizationDetail from '@/views/user/organization/detail.vue';
// 系统管理--项目用户
import projectUser from '@/views/ecc/components/user/project-user/list.vue';
import userList from '@/views/ecc/components/user/project-user/user-list.vue';
import groupList from '@/views/ecc/components/user/project-user/group-list.vue';
import userCreate from '@/views/ecc/components/user/project-user/user-create.vue';
// 系统管理--角色管理
import role from '@/views/ecc/components/user/role/list.vue';
// 系统管理--权限管理
import authority from '@/views/ecc/components/user/authority/list.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {
          path: 'notice',
          component: notice,
          children: [
            {path: '', name: 'notice-atmanagementList', component: noticeAtmanagementList},
            {path: 'release', name: 'notice-release', component: noticeRelease},
            {path: 'modify', name: 'notice-modify', component: noticeModify},
            {path: 'see', name: 'notice-see', component: noticeSee}
          ]
        },
        {
          path: 'emergency',
          component: emergency,
          children: [
            {path: 'planList', name: 'emergency-planList', component: emergencyPlanList},
            {path: 'addPlan', name: 'emergency-addPlan', component: emergencyAddPlan},
            {path: 'seePlan', name: 'emergency-seePlan', component: emergencySeePlan},
            {path: 'materialList', name: 'emergency-materialList', component: emergencyMaterialList},
            {path: 'addMaterial', name: 'emergency-addMaterial', component: emergencyAddMaterial},
            {path: 'seeMaterial', name: 'emergency-seeMaterial', component: emergencySeeMaterial},
            {path: 'addWarehouse', name: 'emergency-addWarehouse', component: emergencyAddWarehouse},
            {path: 'seeWarehouse', name: 'emergency-seeWarehouse', component: emergencySeeWarehouse}
          ]
        },
        {
          path: 'system',
          component: system,
          name: 'system'},
        {
          path: 'event',
          component: event,
          children: [
            {path: 'eventList', name: 'event-list', component: eventList},
            {path: 'addEvent', name: 'add-event', component: addEvent},
            {path: 'addMsg', name: 'add-message', component: addMsg},
            {path: 'eventDetailEnd', name: 'event-detail-end', component: eventDetailEnd},
            {path: 'eventDetailReat', name: 'event-detail-reat', component: eventDetailReat},
            {path: 'eventEnd', name: 'event-end', component: eventEnd},
            {path: 'unreatedEvent', name: 'event-untreated', component: unreatedEvent},
            {path: 'mutualPerson', name: 'mutual-person', component: mutualPerson},
            {path: 'mutualDetail', name: 'mutual-detail', component: mutualDetail}
          ]
        },
        {
          path: 'ctc',
          component: ctc,
          children: [
            {path: 'ctcList', name: 'ctc-list', component: ctcList},
            {path: 'ctcDetail', name: 'ctc-detail', component: ctcDetail},
            {path: 'rePlanList', name: 'replan-list', component: rePlanList},
            {path: 'replanDetail', name: 'replan-detail', component: replanDetail},
            {path: 'enableReplan', name: 'enable-replan', component: enableReplan}
          ]
        },
        {
          path: 'linkage',
          component: linkage,
          children: [
            {path: 'linkageList', name: 'linkage-list', component: linkageList},
            {path: 'linkageDetailEnd', name: 'linkage-detail-end', component: linkageDetailEnd},
            {path: 'linkageDetailReat', name: 'linkage-detail-reat', component: linkageDetailReat},
            {path: 'feedback', name: 'feedback', component: feedback}
          ]
        },
        {
          path: 'systemManage',
          component: systemManage,
          children: [
            {path: 'organList', name: 'organ-list', component: organList},
            {path: 'user-create', name: 'user-create', component: userCreate},
            {path: 'role', name: 'role', component: role},
            {path: 'authority', name: 'authority', component: authority}
          ]
        }
      ]
    }
  ]
})
