<template>
  <div class="note-detail">
    <el-button @click="$router.back()" style="margin-bottom: 20px">返回列表</el-button>
    <el-card v-if="note">
      <div class="detail-header">
        <el-tag size="large" type="primary">{{ note.course }}</el-tag>
        <span class="date">{{ note.createdAt }}</span>
      </div>
      <h2 class="detail-title">{{ note.title }}</h2>
      <div class="tags">
        <el-tag v-for="tag in note.tags" :key="tag">{{ tag }}</el-tag>
      </div>
      <div class="detail-content">
        <h3>笔记内容</h3>
        <p>{{ note.content }}</p>
      </div>
      <div class="summary" v-if="note.summary">
        <h3>AI总结</h3>
        <el-alert :title="note.summary" type="success" show-icon />
      </div>
      <div class="actions">
        <el-button type="primary" @click="generateSummary">生成总结</el-button>
        <el-button type="warning" @click="editNote">编辑</el-button>
        <el-button type="danger" @click="deleteNote">删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getNote, generateNoteSummary, deleteNote as deleteNoteApi } from '../api/note'

interface Note {
  _id: string
  title: string
  content: string
  course: string
  tags: string[]
  summary: string
  createdAt: string
}

const route = useRoute()
const note = ref<Note | null>(null)

onMounted(async () => {
  const id = route.params.id as string
  const response = await getNote(id)
  note.value = response.data
})

const generateSummary = async () => {
  if (!note.value) return
  const response = await generateNoteSummary(note.value._id)
  note.value!.summary = response.data.summary
}

const editNote = () => {
  if (!note.value) return
}

const deleteNote = async () => {
  if (!note.value) return
  await deleteNoteApi(note.value._id)
  window.location.href = '/'
}
</script>

<style scoped>
.note-detail {
  padding: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.date {
  font-size: 14px;
  color: #999;
}

.detail-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.detail-content {
  margin-bottom: 30px;
}

.detail-content h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.detail-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
}

.summary {
  margin-bottom: 30px;
}

.summary h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>