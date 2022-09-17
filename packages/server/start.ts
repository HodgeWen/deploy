import Fastify from 'fastify'
import multipart from '@fastify/multipart'
// import cors from '@fastify/cors'

import router from './router'

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      /** @type {import('pino-pretty').PrettyOptions} */
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        colorize: true
      }
    }
  }
})

fastify.register(multipart)
// fastify.register(cors)

router(fastify)

fastify.listen({ port: 22333, host: '0.0.0.0' }).catch(reason => {
  fastify.log.error(reason)
})
