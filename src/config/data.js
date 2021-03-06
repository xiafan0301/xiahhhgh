/* 数据集 */
export const dictType = { // 字典类型
  eventTypeId: '65bdb71f-7a02-4fd6-9b61-0c15de7047bf', // 事件类型
  enclosureTypeId: '39728bba-9b6f-11e8-8a14-3f814d634dc0', // 附件类型
  processTypeId: '77a639ed-fa52-4092-a948-8171cdc06427', // 事件处理过程id
  parttakeTypeId: '84ad5d8e-99ea-11e8-b7b2-d3a3f9880dd0', // 参与类型
  eventLevelId: 'b0945ddf-b1a4-41f7-b7a4-5bcec25414a8', // 事件等级
  taskStateId: '492a3855-cc38-45ab-970a-20ff5473532f', // 任务状态
  eventStateId: '2403be88-97b5-11e8-b862-0301fbeb3059', // 事件状态
  eventSourceId: 'a5ae3d0e-97b1-11e8-b862-c7991770c8c7', // 事件来源
  belongStageId: 'fa97082c-97ad-11e8-b862-4302e8dcc63f', // 归属阶段
  closeReasonId: 'dcbf5108-a039-11e8-be44-ef7e44e9c79d', // 关闭原因Id
  messagetypeId: '39728bba-9b6f-11e8-8a14-3f814d634dc1', // 消息类型ID
  imgId: '4eccd132-9b6f-11e8-8458-13ff89a8a582', // 图片类型
  videoId: '55a7160c-9b6f-11e8-8458-3b3b0f4508db', // 视频类型
  fileId: '5af69ac4-9b6f-11e8-8458-fbb97127e007', // 文件类型
  distanceId: 'aca1385e-a121-11e8-b464-3f8bff15103e' // 接受App用户--距离
}
export const resouceData = { // 功能按钮id
  addEvent: '2a2ce3a7-3f99-4a11-96b0-d032319a3a4a', // 添加事件
  closeEvent: 'd05388c3-f3fb-4459-83da-974c42fdee9f', // 关闭事件
  modifyEvent: '80ab2e11-7995-4867-b823-18c6d3a9bfb5', // 修改事件
  delCommntE: '8ad94d6c-21f1-4acf-a826-4a1fb95af7c1', // 删除评论--事件
  saveEvent: '21629ab3-8e35-4bd0-b469-d12f17d3365b', // 保存事件
  ctcEvent: 'f9a922cf-e70e-42ff-8062-a0bb9e40b358', // 调度指挥事件
  delMsg: 'b2fe968d-543f-4b41-aabd-fb07e9c682eb', // 删除消息
  addMsg: '47873362-4aec-4b16-ae2e-0e29e390d126', // 添加消息
  modifyMsg: 'd594942a-c4b1-4500-a342-cdfe1d834b17', // 编辑消息
  delCommntA: '8ca06f94-720f-4797-b4d0-a022585bba44', // 删除评论--互助
  endHelp: '6706fdd8-820e-4976-92bf-c3ae81adb95a', // 结束互助
  lookEvent: '1ceecfc9-5fa3-4061-a6c7-a4acf195275d', // 查看事件分布
  lookCtc: '72a16fcc-fd68-4e5f-91ea-71d5ac3e5cd7', // 查看调度
  endEvent: '86f4eaba-978c-4f48-88fd-55b486352492', // 结束事件
  ctcTask: 'f0492e84-405d-4166-aece-e8be41fbb594', // 调度
  seePlan: '1f7d40dd-7f5b-442f-9aaf-1002f6c97803', // 查看预案--调度指挥
  startPlan: 'fb19f195-92db-482e-b70b-829f77104a16', // 启用预案--调度指挥
  seeAllPlan: '67147b52-58fe-4dce-b605-7cec552d89d8', // 查看更多预案--调度指挥
  addWarehouse: 'bf9a27a5-9618-44ec-bddb-de969a7920c5', // 添加仓库
  modifyWarehouse: '669cd01b-83ec-4617-86c0-b48ea8d08874', // 修改仓库
  delWarehouse: 'a5d3b66b-42bb-4c7e-bdf8-b9e7c2791b28', // 删除仓库
  addMaterial: '42a98c28-ea69-411e-ab48-2c087a6d715d', // 添加物资
  modifyMaterial: 'de9ce181-9611-4b27-8fbd-785635b274db', // 修改物资
  delMaterial: 'f3eb8ec1-040e-4b8f-9aeb-dfd51d003ab2', // 删除物资
  addPlan: 'c36b04fc-ece9-4821-a9ec-afdcd32886c1', // 添加预案
  modifyPlan: '74d52237-67d4-411e-8433-6cac4e9d286b', // 修改预案
  delPlan: 'b869c2f0-56b7-4c5f-81b7-9e2facd4840b', // 删除预案
  addKnowBase: 'bc70cf31-1222-48cf-b8bf-f5bbaec148c7', // 添加知识库
  modifyKnowBase: '6b8ee251-5cc7-4534-8795-f6cfd9544c68', // 修改知识库
  delKnowBase: 'e49a3100-0c26-4c8e-99b1-f6c3cfd962a2', // 删除知识库
  sendSysMsg: 'e5c22543-3ab8-43a7-b268-27772b4f32ad', // 发布系统消息
  modifySysMsg: 'a1146bb0-f284-4410-8b5c-ff7c132630f7', // 修改系统消息
  delSysMsg: '69155f6e-b493-4436-980e-1cb08fcc444f', // 删除系统消息
  revokeSysMsg: '4360896f-4728-462a-aa32-2a6f59f855e1', // 撤销系统消息
  sendNotice: 'cedfef3e-36aa-47c9-a6d9-45cec5e67544', // 发布公告
  modifyNotice: '800eaea5-1aef-4282-b8d0-18319b5ff383', // 修改公告
  revokeNotice: 'd0f1b828-e87c-4b2b-9c8b-b568ab84c6fb', // 撤销公告
  delNotice: '975be8b6-576f-4fd9-89d8-7f150933b6ac', // 删除公告
  addDepart: '91b6e655-21e2-4b60-b7a5-f5eb9ededc85', // 新建部门
  modifyDepart: 'bed0d040-97cd-496a-93bf-e0c0983b0896', // 修改部门
  memberManage: '54ed9517-6135-4bd2-8aff-08b63784d6b9', // 成员管理
  delDepart: '32417ecc-1599-47ea-bace-1a78e77d4c78', // 删除部门
  addRole: '7050a758-8682-46dd-b31b-37487b4b1c18', // 添加角色
  configResourse: 'b7b20afc-3d93-47c2-a9ac-0ae56c0b9447', // 配置权限
  lookConfig: 'aad422d8-dea3-4282-9398-88b8d5a53efc', // 查看权限
  modifyRole: '63734b2d-d30b-4c6a-be62-ff086bea88e1', // 修改角色
  delRole: '48c4f063-707d-4262-9633-fd9b88f1a260', // 删除角色
  addUser: 'ee3a88c0-967b-481d-8330-4c4256629839', // 创建用户
  modifyUser: '77c5652a-ad59-4175-9caa-282765f7e120', // 修改用户
  addUserGroup: 'dcbb9a37-7333-4eef-b82f-a78a57765453', // 创建用户组
  modifyUserGroup: 'b9df9344-b5fc-4fb9-a590-d445209ceab6', // 修改用户组
  userRoleManage: '552dc7ac-7233-43a8-8508-35bc92874ddd', // 用户角色管理
  userGroupManage: 'da81b00b-7fca-40a0-aac8-7c056921cace', // 用户所属组管理
  ugRoleManage: 'b6553764-8e06-4b32-aef1-2f9bb24798f5', // 用户组角色管理
  ugMemberManage: 'c082ddb4-5779-4a52-8a65-10a1b358c342', // 用户组成员管理
  delUser: '6bd2dac6-bbdd-44d3-9b31-1fe243783fa1', // 删除用户
  delUserGroup: 'b50e82fb-ad89-4b7d-af7f-966952295159', // 删除用户组
  addResource: '1120df16-85ea-4a1e-815b-5a901ac3b711', // 添加权限
  modifyResource: '394e7683-6016-4485-983a-ea3fd950bad8', // 修改权限
  delResource: '117ecb42-43d8-49d5-a6c9-9f59b03eb248', // 删除权限
  startUser: '7a94d029-c502-460c-82c5-560070ecbc4c', // 启用禁用用户
  addVersion: 'e3d3e308-7555-4aeb-aad9-1f0c7fd2c53f', // 新增版本
  modifyVersion: 'cffce051-9bf6-4a31-ac38-58e5a223d56c', // 编辑版本
  addDrill: '2524ccaa-c85d-4a77-bc61-754a9091a4b1', // 新建演练
  modifyDrill: '53e8046d-50bc-472c-9410-f12fc8bc4c14', // 修改演练
  endDrill: 'e9edafed-ddcd-42c5-ac45-73f3cc9f0c0b', // 结束演练
  ctcDrill: 'f46acd54-c5e8-41d8-b1af-d9147931d822', // 调度--演练记录
  lookEventS: 'e64a8c23-c4b3-48d6-a3be-c7be13822ad3', // 查看事件分布--模拟
  ctcEventS: '9cb90915-e2cf-43bf-bf51-8d55b483309c', // 调度--模拟
  lookCtcS: 'd7b29896-de0f-43ce-832b-52c425ff4c5a', // 查看调度--模拟
  endEventS: '8f20c547-3bb7-4db5-a336-635c0675f821', // 结束事件--模拟
  sendNoticeS: '53e781e4-e8f0-43ee-baae-347efaaacfc6', // 发布公告--模拟
  // modifyNoticeS: '6fc516f4-2bf2-4e24-8191-321dec2451d4', // 修改公告--模拟
  // revokeNoticeS: '670bd7c9-82b2-4b31-af67-51019bb4aadf', // 撤销公告--模拟
  // delNoticeS: 'e4ec57e2-41de-40af-a2de-a3c963c88271', // 删除公告--模拟
  lookCtcLinkage: '26becb41-394d-43c0-b572-584e9c8c9e05', // 查看调度指挥--联动单位--调度指挥
  feekbackLinkage: '973def65-46e3-49b8-9815-f27ec1b75b65', // 反馈情况--联动单位--调度指挥
  reportEvent: '08f4262d-cd6f-43e3-a6e6-6f15e3f5e725', // 上报事件--联动单位--事件管理
  feekbackEventLink: '4b92e4b2-736c-4adc-86d6-d010b55e6e0b', // 反馈情况--联动单位--事件管理
  feekbackEventLinkY: '69846da4-79b0-4a88-8413-a69562026ec3', // 反馈情况--联动单位--模拟演练--演练记录
  feekbackEventLinkD: '51e1be74-ed2c-4330-95cf-9e4054d08632', // 反馈情况--联动单位--模拟演练--模拟调度指挥
  linkRelseNotice: 'f71b5c34-e407-429d-aebf-38a2e8f02209', //  联动单位-消息管理-发布公告
  linckModifyNotice: '08e29e31-1589-4463-b105-05e16bb0a246', // 联动单位-消息管理-修改公告
  linckReckNotice: '1e55c057-57dd-40c1-9da1-2f1ec253f37b', // 联动单位-消息管理-撤销公告
  linckDelNotice: '1339a79f-f133-4aaa-b41b-3c0a8db6c080', // 联动单位-消息管理-删除公告
  linckDirrReckNotice: '61e3acea-bbfb-4322-a6e9-8885f04ee9e3' // 联动单位-模拟演练-发布公告
}
