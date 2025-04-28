<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">查老师</router-link>
        <div class="flex-grow-1 position-relative">
          <input 
            class="form-control me-2" 
            type="search" 
            placeholder="搜索教师姓名/拼音/拼音缩写" 
            v-model="searchQuery" 
            @input="handleSearch"
          >
          <div class="search-results" v-if="searchResults.length > 0">
            <div 
              v-for="teacher in searchResults" 
              :key="teacher.id" 
              class="search-result-item" 
              @click="goToTeacher(teacher.id)"
            >
              {{ teacher.name }} - {{ teacher.college }} ({{ teacher.rating }})
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { searchTeachers } from './utils/search'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const searchResults = ref([])

    const handleSearch = async () => {
      if (searchQuery.value.length < 2) {
        searchResults.value = []
        return
      }
      searchResults.value = await searchTeachers(searchQuery.value)
    }

    const goToTeacher = (id) => {
      router.push(`/t/${id}`)
      searchResults.value = []
      searchQuery.value = ''
    }

    return {
      searchQuery,
      searchResults,
      handleSearch,
      goToTeacher
    }
  }
}
</script>

<style>
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 0.5rem;
}

.search-result-item {
  padding: 8px 16px;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #f8f9fa;
}
</style> 
