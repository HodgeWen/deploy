import { getConfig } from './config'
import { request, FormData, File } from 'undici'
import { tar } from 'compressing'
import { join, resolve } from 'path'
import { cwd } from 'process'
import { createWriteStream, unlinkSync } from 'fs'
import  pump from 'pump'
import log from './log'
import { readFile } from 'fs/promises'

const pumpAsync = (...streams: Array<pump.Stream>) => {
  return new Promise<void>((rs, rj) => {
    pump(...streams, err => {
      err ? rj(err) : rs()
    })
  })
}

const deploy = async () => {
  const conf = await getConfig()
  if (!conf) return
  const { targetPath = 'dist', dirName, host, port = 22333, key } = conf

  const rootPath = cwd()

  log.info('开始压缩...')
  let start = Date.now()

  const tarStream = new tar.Stream()
  tarStream.addEntry(resolve(rootPath, targetPath))

  const destName = targetPath + '.tar'
  const destPath = join(rootPath, destName)
  const destStream = createWriteStream(destPath)

  await pumpAsync(tarStream, destStream).catch(err => {
    log.error(err)
    return Promise.reject(err)
  })

  log.info(`压缩完成. 用时${Date.now() - start}ms`)

  const buffer = await readFile(destPath)

  const formData = new FormData()
  formData.append('file', new File([buffer], destName))
  if (dirName) {
    formData.append('dirName', dirName)
  }
  formData.append('key', key)

  const { body, statusCode } = await request(`${host}:${port}/deploy`, {
    method: 'POST',
    body: formData
  })

  const res = await body.json()

  unlinkSync(destPath)

  if (statusCode !== 200) {
    log.error(`部署失败: ${res.msg || res.message}`)
  }
}

deploy()
