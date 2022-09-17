import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
interface Routes {
    [path: string]: (req: FastifyRequest<any>, reply: FastifyReply) => void;
}
declare type Method = 'Get' | 'Post' | 'Put' | 'Delete' | 'Patch';
declare type RouterConfig = {
    [key in Method]?: Routes;
};
export default function createRouter(prefix: string, routerConf: RouterConfig): (fastify: FastifyInstance) => void;
export {};
