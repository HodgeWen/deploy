import { tar } from 'compressing'
import { createWriteStream, readFileSync } from 'node:fs'
import createRouter from '../utils/createRouter'
import { pumpAsync } from '../utils/stream'

export default createRouter('deploy', {
  Post: {
    '/': async (req, reply) => {
      const data = await req.file()
      if (data) {
        await pumpAsync(data.file, createWriteStream(data.filename))
        // TODO 解压缩的流的形式, 因为直接读取会有很大的内存消耗
        await tar.uncompress(readFileSync(data.filename), './dest')
      }

      return {
        data: null,
        msg: '成功',
        code: 200
      }
    }
  }
})
