<template>
  <div class="container">
    <div class="block">
      <p class="title">VueRubyAnnotator</p>
      <p class="subtitle">注音转换器</p>
    </div>

    <textarea
      class="textarea box input"
      v-model="inputText"
      placeholder="请输入要转换的文本"
      @input="[previewText, errorText] = convertRuby(inputText)"
    ></textarea>

    <div class="box preview">
      <p
        v-if="previewText.length === 0 && errorText.length === 0"
        class="preview-empty"
      >
        转换结果预览
      </p>
      <p v-else v-html="previewText"></p>
      <p v-if="errorText.length !== 0" class="error" v-html="errorText"></p>
    </div>

    <button class="button" @click="copyText(previewText)">复制代码</button>
  </div>
</template>

<style>
@import url('bulma/css/bulma.css');

body {
  margin: 1.5rem;
}
</style>

<style scoped>
.container {
  height: calc(100vh - 3rem);
  width: calc(100vw - 3rem);
  display: flex;
  flex-direction: column;
}

.input {
  flex-basis: 50%;
  overflow-y: scroll;
}

.preview {
  flex-basis: 50%;
  overflow-y: scroll;
}

.preview-empty {
  color: lightgray;
}

.error {
  color: lightgray;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { convertRuby, copyText } from '@/lib'

const inputText = ref<string>('')
const previewText = ref<string>('')
const errorText = ref<string>('')
</script>
