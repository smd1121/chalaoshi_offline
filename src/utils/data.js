// 从全局变量中获取数据
const data = window.__CHALAOSHI_DATA__ || {}

// 判断是否在开发环境
const isDev = process.env.NODE_ENV === 'development'

let teachers = null
let comments = {}
let colleges = null

// 动态获取所有学院列表
function getCollegesFromComments() {
  if (colleges) return colleges
  
  // 从 teachers.csv 中获取所有学院
  const teacherData = parseCSV(data['teachers.csv'])
  colleges = [...new Set(teacherData.map(t => t.学院))].filter(Boolean)
  return colleges
}

export async function loadData() {
  if (!teachers) {
    teachers = parseCSV(data['teachers.csv'])
  }
  return { teachers, gpaData: JSON.parse(data['gpa.json']) }
}

export async function loadComments(college) {
  if (!comments[college]) {
    const filename = `comment_${college}.csv`
    if (data[filename]) {
      comments[college] = parseCSV(data[filename])
    } else {
      console.warn(`No comment file found for college: ${college}`)
      return []
    }
  }
  return comments[college]
}

function parseCSV(text) {
  const lines = text.split('\n')
  const headers = lines[0].split(',').map(header => header.trim())
  return lines.slice(1).map(line => {
    const values = line.split(',')
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i]
      return obj
    }, {})
  })
}

export function getRandomTeachers(count = 10) {
  if (!teachers) return []
  const shuffled = [...teachers].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function getTeacherById(id) {
  if (!teachers) return null
  return teachers.find(t => t.id === id)
}

export function getTeacherGPA(teacherName) {
  const gpaData = JSON.parse(data['gpa.json'])
  if (!gpaData) return []
  return gpaData[teacherName] || []
}

export function getCourseTeachers(courseName) {
  const gpaData = JSON.parse(data['gpa.json'])
  if (!gpaData) return []
  const result = []
  for (const [teacherName, courses] of Object.entries(gpaData)) {
    const course = courses.find(c => c[0] === courseName)
    if (course) {
      const teacher = teachers.find(t => t.姓名 === teacherName)
      result.push({
        teacher: teacherName,
        id: teacher ? teacher.id : undefined,
        gpa: course[1],
        count: course[2],
        std: course[3]
      })
    }
  }
  return result
}

export function getAvailableColleges() {
  return getCollegesFromComments()
} 
