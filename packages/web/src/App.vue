<template>
  <div v-for="item of uploadList" >
    <img src="" alt=""/>
    <input type="file"  />
  </div>
</template>
<script setup lang="ts">
import { Http } from 'fe-dk'

const http = new Http({
  baseUrl: '/api'
})

const handleChange = e => {
  console.log(e)
}

const uploadList = [{}]
</script>
