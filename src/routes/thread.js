import express from 'express'
import Thread from '../models/thread'

const router = express.Router()

// Create a new thread
router.post('/', async (req, res) => {
  const response = await Thread.createNew()
  res.json(response)
})

// Get a thread by ID (limit the messages coming through)
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { offset = 0, limit = 10 } = req.query
  const response = await Thread.getById(id, offset, limit)
  if (!response) {
    res.status(404).json({ error: 'Not found' })
  }
  res.json(response)
})

// Delete a thread
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const response = await Thread.deleteById(id)
  if (!response) {
    res.status(404).json({ error: 'Not found' })
  }
  res.json(response)
})

// Add a message to the thread.
router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { user, message } = req.body
  const response = await Thread.postMessage(id, user, message)
  if (!response) {
    res.status(404).json({ error: 'Not found' })
  }
  res.json(response)
})

export default router
