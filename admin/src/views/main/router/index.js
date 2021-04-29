import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const LAYOUT = () => import('@/components/layout')

const router = new VueRouter({
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
                        prev: '审核管理'
                    }
                }
            ]
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
                    meta: {
                        prev: '报表统计'
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
                    meta: {
                        prev: '系统管理'
                    }
                },
                {
                    path:'group',
                    name: '机构管理',
                    meta: {
                        prev: '系统管理'
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
                    meta: {
                        prev: '内容发布'
                    }
                },
                {
                    path:'banner',
                    name: 'banner管理',
                    meta: {
                        prev: '内容发布'
                    }
                },
                {
                    path:'help',
                    name: '帮助中心',
                    meta: {
                        prev: '内容发布'
                    }
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
  }) 

export default router