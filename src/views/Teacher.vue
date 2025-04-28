<template>
  <div class="container mt-4" v-if="teacher">
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <h1 class="card-title">{{ teacher.姓名 }}</h1>
            <p class="card-text">
              学院：{{ teacher.学院 }}
            </p>
          </div>
          <div class="col-md-4 text-end">
            <div class="display-4 text-primary">{{ teacher.评分 }}</div>
            <p class="text-muted">{{ teacher.评分人数 }}人评分</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title">课程信息</h2>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>课程名称</th>
                <th>平均绩点</th>
                <th>人数</th>
                <th>标准差</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in courses" :key="course[0]">
                <td>
                  <router-link :to="'/c/' + encodeURIComponent(course[0])">
                    {{ course[0] }}
                  </router-link>
                </td>
                <td>{{ course[1] }}</td>
                <td>{{ course[2] }}</td>
                <td>{{ course[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="card-title mb-0">评论</h2>
          <div class="btn-group">
            <button 
              class="btn btn-outline-primary" 
              :class="{ active: sortBy === 'popular' }"
              @click="sortBy = 'popular'"
            >
              人气排序
            </button>
            <button 
              class="btn btn-outline-primary" 
              :class="{ active: sortBy === 'latest' }"
              @click="sortBy = 'latest'"
            >
              最新排序
            </button>
          </div>
        </div>

        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">加载中...</span>
          </div>
        </div>

        <div v-else>
          <div v-for="comment in sortedComments" :key="comment.评论id" class="card mb-3">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="card-text" style="white-space: pre-line; word-break: break-word; line-height: 1.5">
                    {{ formatComment(comment.内容) }}
                  </p>
                  <small class="text-muted">{{ comment.发表时间 }}</small>
                </div>
                <div class="ms-3 text-end">
                  <div class="text-success">+{{ comment.点赞量 }}</div>
                  <div class="text-danger">-{{ comment.点踩量 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadData, getTeacherById, getTeacherGPA, loadComments } from '../utils/data'

export default {
  name: 'Teacher',
  setup() {
    const route = useRoute()
    const teacher = ref(null)
    const courses = ref([])
    const comments = ref([])
    const loading = ref(true)
    const sortBy = ref('popular')

    const formatComment = (content) => {
      return content
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .trim()
    }

    const sortedComments = computed(() => {
      if (sortBy.value === 'popular') {
        return [...comments.value].sort((a, b) => 
          (parseInt(b.点赞量) - parseInt(b.点踩量)) - (parseInt(a.点赞量) - parseInt(a.点踩量))
        )
      } else {
        return [...comments.value].sort((a, b) => new Date(b.发表时间) - new Date(a.发表时间))
      }
    })

    onMounted(async () => {
      await loadData()
      teacher.value = getTeacherById(route.params.id)
      if (teacher.value) {
        courses.value = getTeacherGPA(teacher.value.姓名)
        const teacherComments = await loadComments(teacher.value.学院)
        console.log('Loaded comments:', teacherComments)
        comments.value = teacherComments.filter(c => c.老师姓名 === teacher.value.姓名)
        console.log('Filtered comments:', comments.value)
      }
      loading.value = false
    })

    return {
      teacher,
      courses,
      sortedComments,
      loading,
      sortBy,
      formatComment
    }
  }
}
</script> 
