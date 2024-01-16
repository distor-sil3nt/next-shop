import mongoose from 'mongoose'

let cache = global.mongoose

if (!cache) cache = global.mongoose = { conn: null, promise: null }

const connect = async () => {
  if (cache.conn) {
    return cache.conn
  }

  if (!cache.promise) {
    const options = {
      bufferCommands: false,
    }

    cache.promise = mongoose.connect(process.env.MONGODB_URI!, options).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cache.conn = await cache.promise
  } catch (error) {
    cache.promise = null
    throw error
  }

  return cache.conn
}

const disconnect = async () => {
  await mongoose.disconnect()
}

export default { connect, disconnect }
