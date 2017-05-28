import express from 'express'
import Thread from '../models/thread'

const router = express.Router()

// Create a new thread
router.post('/', async (req, res) => {
  const newThread = new Thread({
    timestamp: new Date()
  });
  const response = await newThread.save()
  res.json(response)
})

// Get a thread by ID (limit the messages coming through)
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { offset = 0, limit = 10 } = req.query
  const response = await Thread.findOne(
    { _id: id },
    { messages: { $slice: [parseInt(offset, 10), parseInt(limit, 10)] } },
  )
  if (!response) {
    res.status(404).json({error: 'Not found'})
  }
  res.json(response)
})

// Delete a thread
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const response = await Thread.findByIdAndRemove(id)
  if (!response) {
    res.status(404).json({error: 'Not found'})
  }
  res.json(response)
})

// Add a message to the thread.
router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { user, timestamp, message } = req.body
  const response = await Thread.findByIdAndUpdate(id,
    { "$push":
      { "messages":
        {
          "$each": [{
            user,
            message,
            timestamp: new Date(),
          }],
          "$position" : 0
        }
      }
    })
  if (!response) {
    res.status(404).json({error: 'Not found'})
  }
  res.json(response)
})

export default router
