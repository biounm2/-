import { createRouter, createWebHistory } from 'vue-router'
import NoteList from '../views/NoteList.vue'
import NoteDetail from '../views/NoteDetail.vue'
import NoteCreate from '../views/NoteCreate.vue'

const routes = [
  { path: '/', name: 'NoteList', component: NoteList },
  { path: '/note/:id', name: 'NoteDetail', component: NoteDetail },
  { path: '/create', name: 'NoteCreate', component: NoteCreate }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router