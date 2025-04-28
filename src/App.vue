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
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchTeachers } from './utils/search'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const route = useRoute()
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-result-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  line-height: 1.5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .search-results {
    max-height: 200px;
  }
  
  .search-result-item {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .navbar {
    padding: 0.5rem 1rem;
  }
  
  .form-control {
    font-size: 16px;
    height: 40px;
  }
}
</style> 
