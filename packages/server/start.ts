import Fastify, { FastifyRequest } from 'fastify'
import multipart from '@fastify/multipart'
import { readFileSync, writeFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { tar } from 'compressing'
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

router(fastify)

fastify.listen({ port: 22333 }).catch(reason => {
  fastify.log.error(reason)
})
