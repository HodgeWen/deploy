import type { FastifyRequest } from 'fastify'

export const response = (req: FastifyRequest, validator) => {
  return {
    code: 200,
    msg: '成功'
  }
}
