const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.json(notes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.json(note)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    course: req.body.course,
    tags: req.body.tags || [],
    summary: req.body.summary || ''
  })

  try {
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.json(note)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.json({ message: 'Note deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/:id/summary', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    const summary = generateSummary(note.content)
    note.summary = summary
    await note.save()

    res.json({ summary })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

function generateSummary(content) {
  const sentences = content.split(/[。！？]/).filter(s => s.trim())
  if (sentences.length <= 3) {
    return content.substring(0, 200) + '...'
  }
  const summary = sentences.slice(0, 3).join('。') + '...'
  return summary
}

module.exports = router