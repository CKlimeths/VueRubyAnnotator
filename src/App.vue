<template lang="html">
  <div class="container">
    <div class="block">
      <p class="title">VueRubyAnnotator</p>
      <p class="subtitle">注音转换器</p>
    </div>

    <textarea
      class="textarea box input"
      v-model="inputText"
      placeholder="请输入要转换的文本"
      @input="previewText = convertRuby(inputText!)"
    ></textarea>

    <div class="box preview">
      <p v-if="previewText!.trim().length === 0" class="preview-empty">
        结果文本预览
      </p>
      <p v-else v-html="previewText"></p>
    </div>

    <button class="button" @click="copyText(previewText)">复制代码</button>
  </div>
</template>

<style lang="css">
body {
  margin: 1.5rem;
}
</style>

<style lang="css" scoped>
.container {
  height: calc(100vh - 3rem);
  width: calc(100vw - 3rem);
  display: flex;
  flex-direction: column;
}

.input {
  flex-basis: 50%;
}

.preview {
  flex-basis: 50%;
  overflow-y: scroll;
}

.preview-empty {
  color: lightgray;
  font-style: italic;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import 'bulma/css/bulma.css'

import { convertRuby, copyText } from './lib'

const inputText = defineModel<string>('')
const previewText = ref<string>('')
</script>
