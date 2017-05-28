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

export default Thread
