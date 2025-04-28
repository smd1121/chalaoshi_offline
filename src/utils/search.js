import { loadData } from './data'

export async function searchTeachers(query) {
  const { teachers } = await loadData()
  if (!teachers) return []

  const lowerQuery = query.toLowerCase()
  return teachers
    .filter(teacher => {
      const name = (teacher.姓名 || '').toLowerCase()
      const pinyin = (teacher.拼音 || '').toLowerCase()
      const pinyinAbbr = (teacher.拼音缩写 || '').toLowerCase()
      return name.includes(lowerQuery) ||
             pinyin.includes(lowerQuery) ||
             pinyinAbbr.includes(lowerQuery) ||
             pinyinAbbr.split('').join('').includes(lowerQuery) // 处理拼音缩写
    })
    .map(teacher => ({
      id: teacher.id,
      name: teacher.姓名 || '',
      college: teacher.学院 || '',
      rating: teacher.评分 || 0,
      ratingCount: teacher.评分人数 || 0
    }))
    .slice(0, 10) // 限制搜索结果数量
} 
