<template>
  <!--<v2 />-->
  <v3 />
  <!--<CodeDiff new-string="123" old-string="456" />-->
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, watch } from 'vue-demi'
import v2 from './lib/v-code-diff/v2.vue'
import v3 from './lib/v-code-diff/v3.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
