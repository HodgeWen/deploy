import { dirname } from 'path'
import { fileURLToPath } from 'url'

/** 获取文件地址 */
export const getFileName = () => fileURLToPath(import.meta.url)

/** 获取文件夹地址 */
export const getDirname = () => dirname(getFileName())
