import { createWriteStream, readdirSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import createRouter from '../utils/createRouter'
import { response } from '../utils/reply'
import { pumpAsync } from '../utils/stream'

/** 资源路径 */
const dataPath = path.resolve('/data/assets')

const getDataImages = () => {
  return readdirSync(dataPath).filter(item => {
    return /\.(jpg|png|mp3)$/.test(item)
  })
}

export default createRouter('upload', {
  Post: {
    '/': async req => {
      const data = await req.file()
      if (!data) {
        return response(null)
      }

      const images = getDataImages()
      if (images.includes(data.filename)) {
        unlinkSync(path.resolve(dataPath, data.filename))
      }

      await pumpAsync(data.file, createWriteStream(path.resolve(dataPath, data.filename)))

      return response('/' + data.filename)
    }
  },
  Get: {
    '/list': async (req, reply) => {
      return response(getDataImages())
    }
  }
})
