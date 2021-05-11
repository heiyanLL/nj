import hosts from '@/utils/hosts'

export default {
    getTime(str){
        return new Date(str).Format("yyyy年M月d日 hh:mm")
    },
    imageUrl(id){
        return `${hosts.szjb1}/medical/help/downloadFile?medicalPicId=${id}`
    }

}