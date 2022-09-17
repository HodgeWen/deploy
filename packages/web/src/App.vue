<template>
  <div v-for="(item, i) of uploadList" class="upload-item">
    <div class="wrap" @click="handleClick(i)">
      <img v-if="item.url" :src="`http://assets.wenhongjie.tech${item.url}`" />
      <el-button type="primary" v-else>上传</el-button>
      <input
        hidden
        type="file"
        ref="inputs"
        @change="handleUpload($event, i)"
      />
    </div>

    <div class="text">背景{{ i + 1 }}</div>
  </div>

  <div class="upload-item">
    <div class="wrap" @click="audioRef?.click()">
      <audio v-if="audioUrl" :src="`http://assets.wenhongjie.tech${audioUrl}`" />
      <el-button type="primary" v-else>上传</el-button>
      <input
        hidden
        type="file"
        ref="audioRef"
        @change="handleUploadAudio"
      />
    </div>

    <div class="text">背景音乐</div>
  </div>
</template>
<script setup lang="ts">
import { Http } from 'fe-dk'
import { shallowReactive, shallowRef } from 'vue'

const http = new Http({
  baseUrl: '/api',

  after(res) {
    if (res.data?.data !== undefined) {
      res.data = res.data.data
    }

    return res
  }
})

const handleClick = (index: number) => {
  inputs.value[index].click()
}

const inputs = shallowRef<HTMLInputElement[]>([])
const audioRef = shallowRef<HTMLInputElement>()

const uploadList = Array.from({ length: 14 }).map((_, i) => {
  return shallowReactive({ name: `bg${i + 1}`, url: '' })
})

const handleUpload = async (e: Event, index: number) => {
  let target = e.target as HTMLInputElement
  const file = target.files![0]
  target.value = ''

  const formData = new FormData()

  formData.append(
    'file',
    new File([file], `bg${index + 1}.jpg`, {
      type: 'image/jpg'
    })
  )

  const { data } = await http.post('/upload', formData)

  uploadList[index].url = `${data}` + `?t=${Date.now()}`
}

const audioUrl = shallowRef('')

const handleUploadAudio = async (e: Event) => {
  let target = e.target as HTMLInputElement
  const file = target.files![0]
  target.value = ''

  const formData = new FormData()

  formData.append(
    'file',
    new File([file], 'bgm.mp3')
  )

  const { data } = await http.post('/upload', formData)
  audioUrl.value = `/${data}`
}

const getList = async () => {
  const { data } = await http.get<string[]>('/upload/list')
  data.forEach(path => {
    const bgIndex = (path.match(/bg(\d+)\./) || [])[1]
    if (bgIndex !== undefined) {
      uploadList[+bgIndex - 1].url = `/${path}`
    }

    if (path === 'bgm.mp3') {
      audioUrl.value = path
    }
  })
}

getList()
</script>

<style scoped lang="scss">
.upload-item {
  display: inline-block;
  width: 150px;
  height: 180px;
  border: 1px solid #eee;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 4px;

  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .text {
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #eee;
  }
}
</style>
