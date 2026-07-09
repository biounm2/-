<template>
  <div class="note-create">
    <el-button @click="$router.back()" style="margin-bottom: 20px">返回列表</el-button>
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="课程名称" required>
        <el-input v-model="form.course" placeholder="请输入课程名称" />
      </el-form-item>
      <el-form-item label="笔记标题" required>
        <el-input v-model="form.title" placeholder="请输入笔记标题" />
      </el-form-item>
      <el-form-item label="笔记内容" required>
        <el-input v-model="form.content" type="textarea" :rows="10" placeholder="请输入笔记内容" />
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tags" multiple placeholder="请选择标签" @change="handleTagChange">
          <el-option v-for="tag in availableTags" :key="tag" :label="tag" :value="tag" />
        </el-select>
        <el-input v-model="newTag" placeholder="添加新标签" style="margin-top: 10px">
          <template #append>
            <el-button @click="addTag">添加</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存笔记</el-button>
        <el-button @click="generateSummary">AI自动总结</el-button>
      </el-form-item>
    </el-form>
    <div v-if="form.summary" class="summary-preview">
      <h3>AI总结预览</h3>
      <el-alert :title="form.summary" type="success" show-icon />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { createNote } from '../api/note'

const formRef = ref()
const newTag = ref('')
const availableTags = ref(['数学', '英语', '物理', '化学', '计算机', '历史', '地理'])

const form = reactive({
  course: '',
  title: '',
  content: '',
  tags: [] as string[],
  summary: ''
})

const handleTagChange = () => {}

const addTag = () => {
  if (newTag.value && !availableTags.value.includes(newTag.value)) {
    availableTags.value.push(newTag.value)
    form.tags.push(newTag.value)
    newTag.value = ''
  }
}

const submitForm = async () => {
  const response = await createNote(form)
  if (response.data) {
    window.location.href = '/'
  }
}

const generateSummary = () => {
  form.summary = 'AI总结生成中...'
}
</script>

<style scoped>
.note-create {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.summary-preview {
  margin-top: 30px;
}

.summary-preview h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}
</style>