import path from 'path'

/** 入口文件 */
export const SERVER_INPUT = path.resolve(__dirname, '../packages/server/start.ts')

/** 输出文件夹 */
export const SERVER_OUTPUT = path.resolve(__dirname, '../dist')

/** 包描述文件 */
export const PKG = path.resolve(process.cwd(), 'package.json')