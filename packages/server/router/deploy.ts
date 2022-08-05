import { tar } from 'compressing'
import { FastifyInstance } from 'fastify'
import createRouter from '../utils/createRouter'

export default createRouter('deploy', {
  Post: {
    '/': async (req, reply) => {
      const data = await req.file()

      await tar.uncompress(await data.toBuffer(), './dest')

      return {
        data: null,
        msg: '成功',
        code: 200
      }
    }
  }
})
