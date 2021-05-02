import fetch from '@/utils/fetch'
 export default{
     mock() {
         return fetch({
             url: '/menu'
         })
     }
 }