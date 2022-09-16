import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { join } from 'path'

interface Routes {
  [path: string]: (req: FastifyRequest<any>, reply: FastifyReply) => void
}

type Method = 'Get' | 'Post' | 'Put' | 'Delete' | 'Patch'

type RouterConfig = {
  [key in Method]?: Routes
}

export default function createRouter(prefix: string, routerConf: RouterConfig) {
  return (fastify: FastifyInstance) => {
    Object.keys(routerConf).forEach(method => {
      const handlers = routerConf[method]
      Object.keys(handlers).forEach(key => {
        const url =  join(`/${prefix}`, key).replace(/\\/g, '/').replace(/\/$/, '')
        fastify[method.toLowerCase()](
         url,
          handlers[key]
        )
      })
    })
  }
}
