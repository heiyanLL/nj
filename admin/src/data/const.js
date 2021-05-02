const NAV = [
  {
      path:'/',
      name:'审核管理',
      children: [
          {
              path:'audit/index',
              name: '报销审核'
          }
      ]
  },
  {
      path:'/sheet',
      name:'报表统计',
      children: [
          {
              path:'index',
              name: '统计分析',
          }
      ]
  },
  {
      path:'/system',
      name:'系统管理',
      children: [
          {
              path:'user',
              name: '账号管理',
          },
          {
              path:'group',
              name: '机构管理',
          }
      ]
  },
  {
      path:'/content',
      name:'内容发布',
      children: [
          {
              path:'news',
              name: '咨询管理'
          },
          {
              path:'banner',
              name: 'banner管理'
          },
          {
              path:'help',
              name: '帮助中心',
          },
          {
              path:'public',
              name: '公告',
              meta: {
                  prev: '内容发布'
              }
          }
      ]
  }
] 
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
const ROLE_LIST = [{
  name: '管理员',
  value: 1
},{
  name: '街道',
  value: 2
},{
  name: '人社局',
  value: 3
},]

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
  NAV,
  PAY_TYPE,
  AUDIT_RESULT,
  PAGE_SIZE,
  PAGE_SIZE_LIST,
  USER_LIST,
  PUBLISH_STATE,
  ROLE_LIST
}