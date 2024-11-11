# VueRubyAnnotator

## 简介

VueRubyAnnotator 是一个基于 `Vue.js` 的 `HTML Ruby` 注音转换工具。它允许用户轻松地将汉字与其对应的注音（如拼音）进行关联，并获得对应的 `HTML` 代码。

## 注音规则

- `|BaseText^RubyText|` 是注音转换的基本格式。

  其中：`|` 代表注音的开始和结束，`BaseText` 是基础文本（如汉字）； `^` 代表注音文本的开始， `RubyText` 是注音文本（如拼音）。

- `\` 是转义字符，紧跟着转义字符的第一个字符不会被解释为注音格式的一部分。将会保持原样输出。

### 示例

以下为输入文本：

```
我是 VueRubyAnnotator \^_\^，一个基于 Vue.js 的 HTML\|Ruby |注^zhù| 音 |转换^zhuǎn huàn| 器。\\
```

转换得到的 `HTML Ruby` 代码：

```html
我是 VueRubyAnnotator ^_^，一个基于 Vue.js 的 HTML|Ruby
<ruby>注<rt>zhù</rt></ruby> 音 <ruby>转换<rt>zhuǎn huàn</rt></ruby> 器。\
```

效果预览：

> 我是 VueRubyAnnotator ^\_^，一个基于 Vue.js 的 HTML|Ruby <ruby>注<rt>zhù</rt></ruby> 音 <ruby>转换<rt>zhuǎn huàn</rt></ruby> 器。\

## 运行方法

### 1. 在线访问

你可以访问以下链接访问来使用 VueRubyAnnotator。

[VueRubyAnnotator (Github Pages)](cklimeths.github.io/VueRubyAnnotator)

### 2. 通过 `Node.js` 运行

1. **下载源代码**：

   首先，确保你已经安装了 `Git` , `Node.js` 和 `npm` 。然后，克隆本项目到本地：

   ```bash
   git clone https://github.com/cklimeths/VueRubyAnnotator.git
   ```

2. **安装依赖**：

   进入项目目录：

   ```
   cd VueRubyAnnotator
   ```

   安装项目依赖：

   ```bash
   npm install
   ```

3. **运行项目**：

   在项目根目录下运行以下命令以启动开发服务器：

   ```
   npm run dev
   ```

4. **访问应用**：

   打开浏览器，访问 `http://localhost:5173` 。

## 技术栈

- [HTML Ruby (Annotation Element)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby)
- [Vue.js (Vue 3 - JavaScript Framework)](https://vuejs.org/)
- [Bulma (CSS Framework)](https://bulma.io/)

## 开源协议

本项目遵循 `LGPL-2.1 license` 开源协议。
