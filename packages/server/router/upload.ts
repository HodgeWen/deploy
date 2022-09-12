import { createWriteStream, readdirSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import createRouter from '../utils/createRouter'
import { response } from '../utils/reply'
import { pumpAsync } from '../utils/stream'

const dataPath = path.resolve(cwd(), 'packages/server/router')

const getDataImages = () => {
  return readdirSync(dataPath).filter(item => {
    return /\.(jpg|png)$/.test(item)
  })
}

export default createRouter('upload', {
  Post: {
    '/': async (req, reply) => {
      const data = await req.file()
      if (!data) {
        return response(null)
      }
      const images = getDataImages()
      if (images.includes(data.filename)) {
        unlinkSync(path.resolve(dataPath, data.filename))
      }
      await pumpAsync(data.file, createWriteStream(data.filename))

      return response(null)
    }
  },
  Get: {
    '/list': async (req, reply) => {
      return response(getDataImages())
    }
  }
})
