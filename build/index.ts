import { buildUtils } from './build-server'
import { clean } from './clean'
// import { copy } from './copy'

async function build() {
  await clean()
  await buildUtils()
  // copy()
}

build()