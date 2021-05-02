import fetch from '@/utils/fetch'
 export default{
     mock() {
         return fetch({
             url: '/menu',
             method: 'POST'
         })
     },
     // 查询审核列表
     describeVerifyList(param) {
         return fetch({
             url: '/medical/verify/describeVerifyList',
             data: param
         })
     }
 }