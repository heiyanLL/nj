const PAY_TYPE = [{
  name: '全部',
  value: ''
},{
  name: '居民医保报销',
  value: 1
},{
  name: '职工医保报销',
  value: 2
},{
  name: '生育报销',
  value: 3
}]

const AUDIT_RESULT = [{
  name: '不通过',
  value: 0
},{
  name: '通过',
  value: 1
}]

const PAGE_SIZE_LIST = [10,20,50,100]
const PAGE_SIZE = 10


// 系统模块
const USER_LIST = [{
  name:"全部",
  value:0
},{
  name:"管理员",
  value:1
},{
  name:"普通用户",
  value:2
}]

// 内容模块
const PUBLISH_STATE = [{
  name:"全部",
  value:0
},{
  name:"显示",
  value:1
},{
  name:"隐藏",
  value:2
}]

export default {
  PAY_TYPE,
  AUDIT_RESULT,
  PAGE_SIZE,
  PAGE_SIZE_LIST,
  USER_LIST,
  PUBLISH_STATE
}