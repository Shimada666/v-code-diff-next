import { defineComponent, isVue3, PropType, h, ref, watch, onUpdated, onMounted } from 'vue-demi'
import { createHtml, highlightElements, syncScroll, useDebounceFn } from '@/lib/v-code-diff/util'
import './styles'

export default defineComponent({
  name: 'CodeDiff',
  props: {
    highlight: {
      type: Boolean,
      default: true
    },
    oldString: {
      type: String,
      default: ''
    },
    newString: {
      type: String,
      default: ''
    },
    context: {
      type: Number,
      default: 10
    },
    outputFormat: {
      type: String as PropType<'line-by-line' | 'side-by-side'>,
      default: 'line-by-line'
    },
    drawFileList: {
      type: Boolean,
      default: false
    },
    renderNothingWhenEmpty: {
      type: Boolean,
      default: false
    },
    diffStyle: {
      type: String as PropType<'word' | 'char'>,
      default: 'word'
    },
    fileName: {
      type: String,
      default: ''
    },
    isShowNoChange: {
      type: Boolean,
      default: false
    },
    trim: {
      type: Boolean,
      default: false
    }
  },
  emits: ['before-render', 'after-render'],
  setup (props, ctx) {
    const html = ref(createHtml(props))
    const cb = useDebounceFn(async () => {
      html.value = createHtml(props)
      if (props.highlight) {
        const el = document.createElement('div')
        el.innerHTML = html.value
        await highlightElements(el, props, ctx)
        html.value = el.innerHTML
      }
    }, 200)
    watch(props, cb, { deep: true, immediate: true })
    onMounted(() => {
      if (props.outputFormat === 'side-by-side') {
        syncScroll('.d2h-file-side-diff')
      }
    })
    onUpdated(() => {
      if (props.outputFormat === 'side-by-side') {
        syncScroll('.d2h-file-side-diff')
      }
    })
    return {
      html
    }
  },
  render () {
    if (isVue3) {
      return h('div', {
        innerHTML: this.html
      })
    } else {
      return h('div', {
        domProps: {
          innerHTML: this.html
        }
      })
    }
  }
})
