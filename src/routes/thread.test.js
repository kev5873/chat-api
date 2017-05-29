import mongoose from 'mongoose'
import { MONGO_URL_TEST } from '../config'

import Thread from '../models/thread'

beforeAll(() => {
  mongoose.connect(MONGO_URL_TEST)
})

afterAll(async () => {
  await mongoose.connection.collections.threads.drop()
  mongoose.disconnect()
})


test('Create a new Thread', async () => {
  const response = await Thread.createNew()
  expect(!!response._id).toBe(true)
  expect(!!response.timestamp).toBe(true)
  expect(response.messages.length).toBe(0)
})

test('Get Thread by ID', async () => {
  const newThread = await Thread.createNew()
  const response = await Thread.getById(newThread._id, 0, 10)
  expect(!!response._id).toBe(true)
  expect(!!response.timestamp).toBe(true)
  expect(response.messages.length).toBe(0)
})

test('Delete Thread by ID', async () => {
  const newThread = await Thread.createNew()
  const oldThread = await Thread.deleteById(newThread._id)
  expect(!!oldThread._id).toBe(true)
  expect(!!oldThread.timestamp).toBe(true)
  expect(oldThread.messages.length).toBe(0)
  const emptyThread = await Thread.deleteById(newThread._id)
  expect(emptyThread).toBe(null)
})

test('Post a message to a Thread', async () => {
  const newThread = await Thread.createNew()
  await Thread.postMessage(newThread._id, 'test', 'message')
  const response = await Thread.getById(newThread._id, 0, 10)
  expect(response.messages.length).toBe(1)
})
