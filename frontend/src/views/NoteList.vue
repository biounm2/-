<template>
  <div class="note-list">
    <el-input v-model="searchQuery" placeholder="搜索笔记..." prefix-icon="Search" style="margin-bottom: 20px" />
    <el-row :gutter="20">
      <el-col :span="8" v-for="note in filteredNotes" :key="note._id">
        <el-card shadow="hover" class="note-card" @click="$router.push(`/note/${note._id}`)">
          <div class="card-header">
            <el-tag size="small" type="info">{{ note.course }}</el-tag>
            <span class="date">{{ note.createdAt }}</span>
          </div>
          <h3 class="note-title">{{ note.title }}</h3>
          <p class="note-content">{{ truncateContent(note.content) }}</p>
          <div class="tags">
            <el-tag v-for="tag in note.tags" :key="tag" size="small">{{ tag }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getNotes } from '../api/note'

interface Note {
  _id: string
  title: string
  content: string
  course: string
  tags: string[]
  summary: string
  createdAt: string
}

const notes = ref<Note[]>([])
const searchQuery = ref('')

const filteredNotes = computed(() => {
  if (!searchQuery.value) return notes.value
  const query = searchQuery.value.toLowerCase()
  return notes.value.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query) ||
    note.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

const truncateContent = (content: string) => {
  return content.length > 100 ? content.slice(0, 100) + '...' : content
}

onMounted(async () => {
  const response = await getNotes()
  notes.value = response.data
})
</script>

<style scoped>
.note-list {
  padding: 20px;
}

.note-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.note-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.date {
  font-size: 12px;
  color: #999;
}

.note-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.note-content {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>