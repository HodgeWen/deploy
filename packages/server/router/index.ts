import { FastifyInstance } from 'fastify'
import deploy from './deploy'

export default function router(fastify: FastifyInstance) {
  deploy(fastify)
}
