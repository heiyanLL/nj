import fetch from '@/utils/fetch'
 export default{
     /**审核 */
     // 查询审核列表
     describeVerifyList(param) {
         return fetch({
             url: '/medical/verify/describeVerifyList',
             data: param
         })
     },
     // 查询审核详情
     verifyReimburse(param) {
         return fetch({
            url: '/medical/verify/verifyReimburse',
            data: param
         })
     },
     /**报表 */
     countVerifyDataOnPhase(param) {
         return fetch({
            url: '/medical/verify/countVerifyDataOnPhase',
            data: param
         })
     },
     /**系统 */
     /**用户 */
     // 用户列表查询
     queryAccountList(param) {
         return fetch({
             url: '/medical/account/queryAccountList',
             data: param
         })
     },
     // 修改账户密码
     updateAccountPass(param) {
        return fetch({
            url: '/medical/account/updateAccountPass',
            data: param
        })
     },
     // 新增与修改用户
     updateOrInsertAccount(param) {
        return fetch({
            url: '/medical/account/updateOrInsertAccount',
            data: param
        })
     },
     // 删除用户
     deleteAccountById(param) {
        return fetch({
            url: '/medical/account/deleteAccountById',
            data: param
        })
     },
     /**机构 */
     // 查询机构列表
     queryOrgList(param) {
         return fetch({
             url: '/medical/org/queryOrgList',
             data: param
         })
     },
     // 新增修改机构
     updateOrInsertOrg(param) {
        return fetch({
            url: '/medical/org/updateOrInsertOrg',
            data: param
        })
     },
     // 删除机构
     deleteOrg(param) {
         return fetch({
            url: '/medical/org/deleteOrg',
            data: param
         })
     },
     /**内容 */
     /**咨询与banner */
     // 资讯与banner列表查询
     queryNewsList(param) {
         return fetch({
            url: '/medical/news/queryNewsList',
            data: param
         })
     },
     // 置顶
     newsTop(param) {
         return fetch({
            url: '/medical/news/newsTop',
            data: param
         })
     },
     // 隐藏显示
     newsEnable(param) {
         return fetch({
            url: '/medical/news/newsEnable',
            data: param
         })
     },
     // 资讯新增/修改
     updateOrInsertnews(param) {
         return fetch({
            url: '/medical/news/updateOrInsertnews',
            data: param
         })
     },
     // 删除资讯
     deleteNews(param) {
         return fetch({
            url: '/medical/news/deleteNews',
            data: param
         })
     },
      /**帮助 */
      // 查询帮助中心列表
     queryHelpList(param) {
         return fetch({
            url: '/medical/help/queryHelpList',
            data: param
         })
     },
     // 新增删除帮助数据
     updateOrInsertHelp(param) {
         return fetch({
            url: '/medical/help/updateOrInsertHelp',
            data: param
         })
     },
     // 删除帮助中心数据
     deleteHelp(param) {
         return fetch({
            url: '/medical/help/deleteHelp',
            data: param
         })
     },
     /**其他模块 */
     // 图片上传
     uploadPictures(param) {
         return fetch({
            url: '/medical/help/uploadPictures',
            data: param
         })
     },

 }