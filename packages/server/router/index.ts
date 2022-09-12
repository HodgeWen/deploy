import type { FastifyInstance } from 'fastify'
import deploy from './deploy'
import upload from './upload'

export default function router(fastify: FastifyInstance) {

  deploy(fastify)
  upload(fastify)
}
