import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const LAYOUT = () => import('@/components/layout')

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path:'/',
            name:'审核管理',
            redirect: '/audit/index',
            component: LAYOUT,
            children: [
                {
                    path:'audit/index',
                    name: '报销审核',
                    component: () => import("@/view/audit/index"),
                    meta: {
                        bread: [{name: '审核管理'}]
                    }
                },
                {
                    path:'audit/index/detail',
                    name: '医保报销',
                    component: () => import("@/view/audit/detail"),
                    meta: {
                        bread: [{name: '审核管理'} , {name: '报销审核', src: '/audit/index'}]
                    }
                }
            ]
        },
        {
            path: '/login',
            name: '登陆',
            component: () => import("@/view/login"),
            meta: {
            }
        },
        {
            path:'/sheet',
            name:'报表统计',
            component: LAYOUT,
            redirect: '/sheet/index',
            children: [
                {
                    path:'index',
                    name: '统计分析',
                    component: () => import('@/view/sheet'),
                    meta: {
                        bread: [{name: '报表统计'}]
                    }
                }
            ]
        },
        {
            path:'/system',
            name:'系统管理',
            component: LAYOUT,
            redirect: '/system/user',
            children: [
                {
                    path:'user',
                    name: '账号管理',
                    component: () => import('@/view/system'),
                    meta: {
                        bread: [{name: '系统管理'}]
                    }
                },
                {
                    path:'group',
                    name: '机构管理',
                    component: () => import('@/view/system/group'),
                    meta: {
                        bread: [{name: '系统管理'}]
                    }
                }
            ]
        },
        {
            path:'/content',
            name:'内容发布',
            component: LAYOUT,
            redirect: '/content/news',
            children: [
                {
                    path:'news',
                    name: '咨询管理',
                    component: () => import("@/view/content/news"),
                    meta: {
                        bread: [{name: '内容发布'}]
                    }
                },
                {
                    path:'banner',
                    name: 'banner管理',
                    component: () => import("@/view/content/news"),
                    meta: {
                        bread: [{name: '内容发布'}]
                    }
                },
                {
                    path:'help',
                    name: '帮助中心',
                    component: () => import("@/view/content/help"),
                    meta: {
                        bread: [{name: '内容发布'}]
                    }
                },
                {
                    path:'help/add',
                    name: '新增帮助',
                    component: () => import("@/view/content/helpAdd"),
                    meta: {
                        bread: [{name: '内容发布'}, {name: '帮助中心',src: '/content/help'}]
                    }
                },
                {
                    path:'news/add',
                    name: '添加咨询',
                    component: () => import("@/view/content/newsAdd"),
                    meta: {
                        bread: [{name: '内容发布'}, {name: '咨询管理', src: '/content/news'}]
                    }
                },
                {
                    path:'public',
                    name: '公告',
                    meta: {
                        bread: [{name: '内容发布'}]
                    }
                }
            ]
        }
    ] 
  }) 

export default router