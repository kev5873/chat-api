import mongoose from 'mongoose'

const threadSchema = new mongoose.Schema({
  timestamp: Date,
  messages: [{
    user: String,
    timestamp: Date,
    message: String,
  }],
})

const Thread = mongoose.model('Thread', threadSchema)

Thread.createNew = async () => {
  const newThread = new Thread({
    timestamp: new Date(),
  })
  const response = await newThread.save()
  return response
}

Thread.getById = async (id, offset, limit) => {
  const response = await Thread.findOne(
    { _id: id },
    { messages: { $slice: [parseInt(offset, 10), parseInt(limit, 10)] } },
  )
  return response
}

Thread.deleteById = async (id) => {
  const response = await Thread.findByIdAndRemove(id)
  return response
}

Thread.postMessage = async (id, user, message) => {
  const response = await Thread.findByIdAndUpdate(id, {
    $push: {
      messages: {
        $each: [{
          user,
          message,
          timestamp: new Date(),
        }],
        $position: 0,
      },
    },
  })
  return response
}

export default Thread
