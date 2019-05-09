import { fetch } from '@/util/axios.js'

// 获取搜索建议
// export function getSuggestions (keyword, pageNum, pageSize, uid) {
//   return fetch(`/search?query=${keyword}&filter=s:HELP&pageNum=${pageNum}&pageSize=${pageSize}&uid=${uid}&qFields=title`)
// }

export function getSuggestions (keyword = '', page = 1, pageSize = 15) {
    return fetch(`http://api-kylin-xg02.intra.xiaojukeji.com/moose_knowledge_base_dev/api/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
}

// 获取搜索当前目录下建议
export function getSuggestionsonly (keyword, pageNum, pageSize, uid, id) {
    return fetch(`/search?query=${keyword}&filter=s:HELP;subCategorys:${id}&pageNum=${pageNum}&pageSize=${pageSize}&uid=${uid}&qFields=title`)
}

// 获取左侧的菜单
export function getMenuList (department) {
    return fetch(`/category/tree/${department}`)
}

// 获取问题列表
export function getClassQuestionList (id, currentPage) {
    return fetch(`/content/${id}?currentPage=${currentPage}&pageSize=10`)
}

// 获取该部门的分类
export function getDepartmentClass () {
    return fetch('http://127.0.0.1:3000/api/testing')
}

// 获取问题的详情
export function getQuestionDetail (configName, contentId) {
    return fetch(`/content/${configName}/${contentId}/detail`)
}

// 删除
export function delContent (configName, contentId) {
    return fetch(`/content/${configName}/${contentId}`, {}, 'DELETE')
}

export function updateContent (configName, contentObj) {
    return fetch(`/content?type=${configName}`, contentObj, 'POST')
}
