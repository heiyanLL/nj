import fetch from '@/utils/fetch'
 export default{
     /**审核 */
     // 查询审核列表
     describeVerifyList(param) {
         return fetch({
             url: '/medical/verify/describeVerifyList',
             params: param
         })
     },
     // 查询审核详情
     verifyReimburse(param) {
         return fetch({
            url: '/medical/verify/verifyReimburse',
            params: param
         })
     },
     /**报表 */
     // 周月年数据查询
     countVerifyparamsOnPhase(param) {
         return fetch({
            url: '/medical/verify/countVerifyparamsOnPhase',
            params: param
         })
     },
     // 时间段数据查询
     countVerifyData(param) {
         return fetch({
            url: '/medical/verify/countVerifyData',
            params: param
         })
     },
     /**系统 */
     /**用户 */
     // 用户列表查询
     queryAccountList(param) {
         return fetch({
             url: '/medical/account/queryAccountList',
             params: param
         })
     },
     // 修改账户密码
     updateAccountPass(param) {
        return fetch({
            url: '/medical/account/updateAccountPass',
            params: param
        })
     },
     // 新增与修改用户
     updateOrInsertAccount(param) {
        return fetch({
            url: '/medical/account/updateOrInsertAccount',
            method: 'post',
            data: param
        })
     },
     // 删除用户
     deleteAccountById(param) {
        return fetch({
            url: '/medical/account/deleteAccountById',
            params: param
        })
     },
     /**机构 */
     // 查询机构列表
     queryOrgList(param) {
         return fetch({
             url: '/medical/org/queryOrgList',
             params: param
         })
     },
     // 新增修改机构
     updateOrInsertOrg(param) {
        return fetch({
            url: '/medical/org/updateOrInsertOrg',
            method: 'post',
            data: param
        })
     },
     // 删除机构
     deleteOrg(param) {
         return fetch({
            url: '/medical/org/deleteOrg',
            params: param
         })
     },
     /**内容 */
     /**咨询与banner */
     // 资讯与banner列表查询
     describeNewsList(param) {
         return fetch({
            url: '/medical/news/describeNewsList',
            params: param
         })
     },
     // 置顶
     newsTop(param) {
         return fetch({
            url: '/medical/news/newsTop',
            params: param
         })
     },
     // 隐藏显示
     newsEnable(param) {
         return fetch({
            url: '/medical/news/newsEnable',
            params: param
         })
     },
     // 资讯新增/修改
     updateOrInsertNews(param) {
         return fetch({
            url: '/medical/news/updateOrInsertNews',
            method: 'post',
            data: param
         })
     },
     // 删除资讯
     deleteNews(param) {
         return fetch({
            url: '/medical/news/deleteNews',
            params: param
         })
     },
      /**帮助 */
      // 查询帮助中心列表
     queryHelpList(param) {
         return fetch({
            url: '/medical/help/queryHelpList',
            params: param
         })
     },
     // 新增删除帮助数据
     updateOrInsertHelp(param) {
         return fetch({
            url: '/medical/help/updateOrInsertHelp',
            method: 'post',
            data: param
         })
     },
     // 删除帮助中心数据
     deleteHelp(param) {
         return fetch({
            url: '/medical/help/deleteHelp',
            params: param
         })
     },
     /**其他模块 */
     // 登录
     login(param) {
         return fetch({
            url: '/medical/account/login',
            params: param
         })
     },
     // 图片上传
     uploadPictures(param) {
         return fetch({
            url: '/medical/help/uploadPictures',
            method: 'POST',
            data: param
         })
     },

 }