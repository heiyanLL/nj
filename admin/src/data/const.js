const BASE_UPLOAD = process.env.NODE_ENV == 'development' ? 'http://121.196.42.224:8080/medical/help/downloadFile?medicalPicId=' : 'http://121.196.42.224/medical/help/downloadFile?medicalPicId='
const NAV = [
  {
    path: '/',
    name: '审核管理',
    icon: 'el-icon-s-order',
    children: [
      {
        path: 'audit/index',
        name: '报销审核'
      }
    ]
  },
  {
    path: '/sheet',
    name: '报销统计',
    icon: 'el-icon-s-data',
    children: [
      {
        path: 'index',
        name: '统计分析',
      }
    ]
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'el-icon-s-platform',
    children: [
      {
        path: 'user',
        name: '账号管理',
      },
      {
        path: 'group',
        name: '机构管理',
      }
    ]
  },
  {
    path: '/content',
    name: '内容发布',
    icon: 'el-icon-s-claim',
    children: [
      {
        path: 'news',
        name: '资讯管理'
      },
      {
        path: 'banner',
        name: 'banner管理'
      },
      {
        path: 'help',
        name: '帮助中心',
      },
      // {
      //   path: 'public',
      //   name: '公告'
      // }
    ]
  }
]
const PAY_TYPE = [{
  name: '职工医保报销',
  value: '0'
}, {
  name: '居民医保报销',
  value: '1'
}, {
  name: '生育报销',
  value: '2'
}]

const AUDIT_RESULT = [{
  name: '不通过',
  value: '1'
}, {
  name: '通过',
  value: '0'
}]

const PAGE_SIZE_LIST = [10, 20, 50, 100]
const PAGE_SIZE = 10


// 系统模块
const ROLE_LIST = [{
  name: '管理员',
  value: "1"
}, {
  name: '街道',
  value: "2"
}, {
  name: '人社局',
  value: "3"
}]

// 内容模块
const PUBLISH_STATE = [{
  name: "隐藏",
  value: 0
}, {
  name: "显示",
  value: 1
}]

export default {
  NAV,
  PAY_TYPE,
  AUDIT_RESULT,
  PAGE_SIZE,
  PAGE_SIZE_LIST,
  PUBLISH_STATE,
  ROLE_LIST,
  BASE_UPLOAD
}