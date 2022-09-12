import type { FastifyRequest } from 'fastify'

export const response = ( data: any) => {
  return {
    code: 200,
    data,
    msg: '成功'
  }
}
