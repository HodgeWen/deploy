import { remove } from 'fs-extra'
import { SERVER_OUTPUT } from './constants'

export const clean = async () => {
  await remove(SERVER_OUTPUT)
}