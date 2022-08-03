import Fastify, { FastifyRequest } from 'fastify'
import multipart from '@fastify/multipart'
import { readFileSync, writeFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'

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
fastify.addContentTypeParser('*', {}, (request, payload, done) => {
  payload.on('error', err => done(err))
  let buffer: any[] = []
  let result
  payload.on('data', chunk => {
    buffer.push(chunk)
  })
  payload.on('end', () => {
    result = Buffer.concat(buffer)
    done(null, result)
  })
})

fastify.post('/deploy', async (req, reply) => {
   await writeFile('json.json', req.body as any)

  return {
    data: 'hello world',
    msg: '成功',
    code: 200
  }
})

fastify.listen({ port: 22333 }).catch(reason => {
  fastify.log.error(reason)
})
