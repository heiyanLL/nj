import VeeValidate from 'vee-validate'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(VeeValidate)

export default new VueRouter({
    routes: [{
            path: '*',
            name: 'homepage',
            component: resolve => require(['@/pages/homepage'], resolve)
        },
        {
            path: '/',
            name: 'homepage',
            component: resolve => require(['@/pages/homepage'], resolve)
        },
        {
            path: '/jumin',
            name: 'jumin',
            component: resolve => require(['@/pages/jumin'], resolve)
        },
        {
            path: '/zhigong',
            name: 'zhigong',
            component: resolve => require(['@/pages/zhigong'], resolve)
        },
        {
            path: '/mybx',
            name: 'mybx',
            component: resolve => require(['@/pages/mybx'], resolve)
        },
        {
            path: '/shengyu',
            name: 'shengyu',
            component: resolve => require(['@/pages/shengyu'], resolve)
        },{
            path: '/bxdetail/:id',
            name: 'bxdetail',
            component: resolve => require(['@/pages/bxdetail'], resolve)
        },{
            path: '/bxsuccess/:id',
            component: resolve => require(['@/pages/bxsuccess'], resolve)
        },{
            path: '/helpcenter',
            component: resolve => require(['@/pages/helpcenter'], resolve)
        },{
            path: '/everydetail/:id',
            component: resolve => require(['@/pages/everydetail'], resolve)
        }
        
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})