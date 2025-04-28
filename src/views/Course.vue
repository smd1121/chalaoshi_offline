<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ courseName }}</h1>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>教师姓名</th>
                <th>平均绩点</th>
                <th>人数</th>
                <th>标准差</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="teacher in teachers" :key="teacher.teacher">
                <td>
                  <router-link v-if="teacher.id" :to="'/t/' + teacher.id">
                    {{ teacher.teacher }}
                  </router-link>
                  <span v-else>{{ teacher.teacher }}</span>
                </td>
                <td>{{ teacher.gpa }}</td>
                <td>{{ teacher.count }}</td>
                <td>{{ teacher.std }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseTeachers, loadData } from '../utils/data'

export default {
  name: 'Course',
  setup() {
    const route = useRoute()
    const courseName = ref(decodeURIComponent(route.params.name))
    const teachers = ref([])

    onMounted(async () => {
      await loadData()
      teachers.value = getCourseTeachers(courseName.value)
    })

    return {
      courseName,
      teachers
    }
  }
}
</script> 
