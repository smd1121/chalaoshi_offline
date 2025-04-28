<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <h2>随机推荐</h2>
        <div class="row">
          <div v-for="teacher in randomTeachers" :key="teacher.id" class="col-md-6 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ teacher.姓名 }}</h5>
                <p class="card-text">
                  学院：{{ teacher.学院 }}<br>
                  评分：{{ teacher.评分 }} ({{ teacher.评分人数 }}人评分)
                </p>
                <router-link :to="'/t/' + teacher.id" class="btn btn-primary">查看详情</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">关于</h5>
            <p class="card-text">
              这是一个离线版本的查老师应用，数据来源于 <a href="https://github.com/zjuchalaoshi/chalaoshi" target="_blank">查老师项目</a>。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { loadData, getRandomTeachers } from '../utils/data'

export default {
  name: 'Home',
  setup() {
    const randomTeachers = ref([])

    onMounted(async () => {
      await loadData()
      randomTeachers.value = getRandomTeachers()
    })

    return {
      randomTeachers
    }
  }
}
</script> 
