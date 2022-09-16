<template>
  <div v-for="(item, i) of uploadList" class="upload-item" >

    <div class="wrap" @click="handleClick(i)">
      <img v-if="item.url" :src="item.url" />
      <el-button type="primary" v-else>上传</el-button>
      <input hidden type="file" ref="inputs" @change="handleUpload($event, i)"  />
    </div>


    <div class="text">
      背景{{i + 1}}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Http } from 'fe-dk'
import { shallowReactive, shallowRef } from 'vue'

const http = new Http({
  baseUrl: 'http://localhost:22333'
})

const handleClick = (index: number) => {
  inputs.value[index].click()
}

const handleUpload = async (e: Event, index: number) => {
  let target = e.target as HTMLInputElement
  const file = target.files![0]
  target.value = ''

  const formData = new FormData()

  formData.append('file', new File([file], `bg${index}`))

  const { data } = await http.post('/upload', formData)



}

const inputs = shallowRef<HTMLInputElement[]>([])

const uploadList = Array.from({ length: 12 }).map((_, i) => {
  return shallowReactive({ name: `bg${i + 1}`, url: '' })
})

const getList = async () => {
  const { data } = await http.get('/upload/list')
  console.log(data)
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