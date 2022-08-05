import { build } from 'esbuild'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import log from './log'
import { getDirname } from './utils'

export interface DeployConfig {
  /** 密钥, 该密钥由服务器提供, 只有固定的密钥才能够成功地访问和部署 */
  key: string
  /** 主机地址 */
  host: string
  /** 部署目标文件, 默认dist */
  targetPath?: string
  /** 服务端口, 默认22333 */
  port?: number
  /** 指定部署的目录名称 */
  dirName?: string
}

const buildConfigFile = async (configPath: string, esm: boolean) => {
  const result = await build({
    entryPoints: [configPath],
    platform: 'node',
    format: esm ? 'esm' : 'cjs',
    target: ['node16'],
    bundle: true,
    write: false,
    outfile: 'out.js'
  })

  if (!result.outputFiles) {
    return log.error(result.errors.map(err => err.text))
  }

  const { text } = result.outputFiles[0]

  return text
}

const require = async (id: string, isESM = false) => {
  if (isESM) {
    return import(id)
  }
  return createRequire(import.meta.url)(id)
}

/**
 * 加载配置文件
 * @param configFilePath 配置文件的绝对路径
 * @returns
 */
const loadConfigFile = async (configFilePath?: string) => {
  // 命令执行的根目录
  const rootPath = cwd()
  const pkg = JSON.parse(
    readFileSync(resolve(rootPath, 'package.json'), 'utf-8')
  )

  if (!configFilePath) {
    const fileNames = ['deploy.config.ts', 'deploy.config.js']

    fileNames.some(fileName => {
      configFilePath = resolve(rootPath, fileName)
      return existsSync(configFilePath)
    })
  }

  // 既没有定义配置文件的路径, 同时又没有提供默认的配置文件名则退出
  if (!configFilePath) return

  /**
   * 是否是es模块
   * es模块和commonjs模块的引入方式不一样
   */
  const isESM = pkg.type === 'module' || configFilePath.endsWith('mjs')

  // 如果是js文件直接引入
  if (configFilePath.endsWith('.js')) {
    return require(configFilePath, isESM)
  }
  // 如果是ts文件
  else if (configFilePath.endsWith('.ts')) {
    const code = await buildConfigFile(configFilePath, isESM)
    if (!code) return

    let tempFileName = `temporary-${Date.now()}.mjs`
    let tempFileNamePath = resolve(getDirname(), tempFileName)

    writeFileSync(tempFileNamePath, code)

    const result = await require(tempFileNamePath, isESM)

    unlinkSync(tempFileNamePath)

    return result
  }
}

/**
 * 获取配置文件
 * @returns
 */
export const getConfig = async (): Promise<DeployConfig | undefined> => {
  const conf = await loadConfigFile()
  return conf?.default
}

export function defineConfig(config: DeployConfig): DeployConfig {
  return config
}
