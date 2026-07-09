import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000
})

export const getNotes = () => api.get('/notes')
export const getNote = (id: string) => api.get(`/notes/${id}`)
export const createNote = (data: { course: string; title: string; content: string; tags: string[]; summary?: string }) =>
  api.post('/notes', data)
export const updateNote = (id: string, data: { course?: string; title?: string; content?: string; tags?: string[]; summary?: string }) =>
  api.put(`/notes/${id}`, data)
export const deleteNote = (id: string) => api.delete(`/notes/${id}`)
export const generateNoteSummary = (id: string) => api.post(`/notes/${id}/summary`)