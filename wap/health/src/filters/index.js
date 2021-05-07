import utils from '@/utils/utils'

export default {
    getTime(str){
        return new Date(str).Format("yyyy年M月d日 hh:mm")
    }

}