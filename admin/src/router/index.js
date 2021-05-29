import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const LAYOUT = () => import('@/components/layout')

const router = new VueRouter({
    mode: 'history',
    base: '/jiangbei-medical/mage/dist/',
    routes: [
        {
            path: '*',
            redirect: '/audit/index',
        },
        {
            path: '/',
            name: 'audit',
            redirect: '/audit/index',
            component: LAYOUT,
            meta: {
                title: '审核管理'
            },
            children: [
                {
                    path: 'audit/index',
                    name: 'auditIndex',
                    component: () => import(/* webpackChunkName: "audit" */ "@/view/audit/index"),
                    meta: {
                        bread: [{ title: '审核管理' }],
                        title: '报销审核'
                    }
                },
                {
                    path: 'audit/index/detail/:id',
                    name: 'auditDetails',
                    component: () => import(/* webpackChunkName: "audit" */ "@/view/audit/detail"),
                    meta: {
                        bread: [{ title: '审核管理' }, { title: '报销审核', src: '/audit/index' }],
                        title: '审核详情'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ "@/view/login"),
            meta: {
                isLogin: true,
                title: '登录'
            }
        },
        {
            path: '/sheet',
            name: 'sheet',
            component: LAYOUT,
            redirect: '/sheet/index',
            meta: {
                title: '报销统计'
            },
            children: [
                {
                    path: 'index',
                    name: 'sheetIndex',
                    component: () => import(/* webpackChunkName: "sheet" */ '@/view/sheet'),
                    meta: {
                        bread: [{ title: '报销统计' }],
                        title: '统计分析'
                    }
                }
            ]
        },
        {
            path: '/system',
            name: 'system',
            component: LAYOUT,
            redirect: '/system/user',
            meta: {
                title: '系统管理'
            },
            children: [
                {
                    path: 'user',
                    name: 'user',
                    component: () => import(/* webpackChunkName: "system" */ '@/view/system'),
                    meta: {
                        bread: [{ title: '系统管理' }],
                        title: '账号管理'
                    }
                },
                {
                    path: 'group',
                    name: 'group',
                    component: () => import(/* webpackChunkName: "system" */ '@/view/system/group'),
                    meta: {
                        bread: [{ title: '系统管理' }],
                        title: '机构管理'
                    }
                },
                {
                    path: 'street',
                    name: 'street',
                    component: () => import(/* webpackChunkName: "system" */ '@/view/system/street'),
                    meta: {
                        bread: [{ title: '系统管理' }],
                        title: '街道管理'
                    }
                }
            ]
        },
        {
            path: '/content',
            name: 'content',
            component: LAYOUT,
            redirect: '/content/news',
            meta: {
                title: '内容发布'
            },
            children: [
                {
                    path: 'news',
                    name: 'news',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/news"),
                    meta: {
                        bread: [{ title: '内容发布' }],
                        title: '资讯管理'
                    }
                },
                {
                    path: 'banner',
                    name: 'banner',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/news"),
                    meta: {
                        bread: [{ title: '内容发布' }],
                        title: 'banner管理'
                    }
                },
                {
                    path: 'help',
                    name: 'help',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/help"),
                    meta: {
                        bread: [{ title: '内容发布' }],
                        title: '帮助中心'
                    }
                },
                {
                    path: 'help/add',
                    name: 'helpAdd',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/helpAdd"),
                    meta: {
                        bread: [{ title: '内容发布' }, { title: '帮助中心', src: '/content/help' }],
                        title: '添加帮助'
                    }
                },
                {
                    path: 'help/add/:id',
                    name: 'helpAdd',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/helpAdd"),
                    meta: {
                        bread: [{ title: '内容发布' }, { title: '帮助中心', src: '/content/help' }],
                        title: '修改帮助'
                    }
                },
                {
                    path: 'news/add',
                    name: 'newsAdd',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/newsAdd"),
                    meta: {
                        bread: [{ title: '内容发布' }, { title: '资讯管理', src: '/content/news' }],
                        title: '添加资讯'
                    }
                },
                {
                    path: 'news/add/:id',
                    name: 'newsAdd',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/newsAdd"),
                    meta: {
                        bread: [{ title: '内容发布' }, { title: '资讯管理', src: '/content/news' }],
                        title: '添加资讯'
                    }
                },
                {
                    path: 'banner/add',
                    name: 'bannerAdd',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/newsAdd"),
                    meta: {
                        bread: [{ title: '内容发布' }, { title: 'banner管理', src: '/content/banner' }],
                        title: '添加banner'
                    }
                },
                {
                    path: 'banner/add/:id',
                    name: 'bannerAdd',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/newsAdd"),
                    meta: {
                        bread: [{ title: '内容发布' }, { title: 'banner管理', src: '/content/banner' }],
                        title: '编辑banner'
                    }
                },
                {
                    path: 'public',
                    name: 'public',
                    component: () => import(/* webpackChunkName: "content" */ "@/view/content/notice"),
                    meta: {
                        bread: [{ title: '内容发布' }],
                        title: '公告'
                    }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => !record.meta.isLogin)) {   //遍历 $route.matched 来检查路由记录中的 meta 字段
        if (sessionStorage.getItem("userInfo")) {
            next()          //进行路由管道中的下一个钩子
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next()
    }
})

export default router