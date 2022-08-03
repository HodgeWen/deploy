import fs from 'fs'
import { request, FormData, File } from 'undici'

const file = fs.readFileSync('./pnpm-lock.yaml')
const formData = new FormData()
formData.append('file', new File([file], 'json文件.json'))

const {
  statusCode,
  headers,
  trailers,
  body
} = await request('http://localhost:22333/deploy', {
  method: 'POST',
  body: file
})



console.log(await body.json())