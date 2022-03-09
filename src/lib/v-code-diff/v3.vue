<template>
  <div v-html="html" />
  <div class="viewer">
    <div class="viewer-inner">
      <div class="code-row">
        <div class="code-left">
          <div class="line-num">1</div>
          <div class="line-code line-code-added">123</div>
        </div>
        <div class="code-right">
          <div class="line-num">1</div>
          <div class="line-code line-code-removed">456</div>
        </div>
      </div>
      <div class="code-row">
        <div class="code-left">
          <div class="line-num">1</div>
          <div class="line-code line-code-added">123</div>
        </div>
        <div class="code-right">
          <div class="line-num">1</div>
          <div class="line-code line-code-removed">456</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as d2h from 'diff2html'
import { createPatch } from 'diff'
import 'diff2html/bundles/css/diff2html.min.css'
import { computed } from 'vue'

interface SideBySideLines {

}

const oldString = 'var a1 = {\n' +
    '  "name": "vue-diff",\n' +
    '  "version": "0.0.0",\n' +
    '  "description": "Vue diff viewer",\n' +
    '  "private": true,\n' +
    '  "peerDependencies": {\n' +
    '    "vue": "^3.0.0"\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    'asdasd\n' +
    'xxxxx'
const newString = 'fffff\n' +
    'asdasd\n' +
    'ffffffffx'

const dd = createPatch('123', oldString, newString, '', '', { context: 3 })
const struct = d2h.parse(dd, {
  outputFormat: 'side-by-side',
  drawFileList: false,
  matching: 'lines',
  diffStyle: 'word',
  renderNothingWhenEmpty: false
})
console.log(struct)
const html = computed(() => d2h.html(dd, {
  outputFormat: 'side-by-side',
  drawFileList: false,
  matching: 'lines',
  diffStyle: 'word',
  renderNothingWhenEmpty: false
}))
</script>

<style scoped lang="scss">
.viewer {
  width: 100%;
  .viewer-inner {
    .code-row {
      display: flex;
      width: 100%;
      user-select: none;
      .code-left {
        display: flex;
        width: 50%;
      }
      .code-right {
        display: flex;
        width: 50%;
      }
      .line-num {
        width: 50px;
        user-select: none;
      }
      .line-code {
        width: calc(100% - 50px);
        user-select: text;
      }
    }
  }
}
</style>
