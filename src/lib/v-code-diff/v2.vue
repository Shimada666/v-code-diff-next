<template>
  <div v-html="html" />
</template>

<script lang="ts" setup>
import { createPatch } from 'diff'
import { newShortText } from '@/new-short-text'
import { oldShortText } from '@/old-short-text'
import * as d2h from 'diff2html'
import hljs from 'highlight.js'
import 'diff2html/bundles/css/diff2html.min.css'

const oldString = oldShortText.value
const newString = newShortText.value
const pycode = `
from functools import reduce
from typing import TypeVar, Callable, List, Set, Generic, Dict, Iterable, Optional, Any
from itertools import islice, chain

T = TypeVar('T')
R = TypeVar('R')
K = TypeVar('K')
U = TypeVar('U')


class Stream(Generic[T]):
    def __init__(self, stream: Iterable[T]):
        self._stream = iter(stream)

    def __iter__(self):
        return self._stream

    @staticmethod
    def of(*args: T) -> 'Stream[T]':
        return Stream(args)

    def map(self, func: Callable[[T], R]) -> 'Stream[R]':
        return Stream(map(func, self._stream))

    def flat_map(self, func: Callable[[T], 'Stream[R]']) -> 'Stream[R]':
        return Stream(chain.from_iterable(map(func, self._stream)))

    def filter(self, func: Callable[[T], bool]) -> 'Stream[T]':
        return Stream(filter(func, self._stream))

    def for_each(self, func: Callable[[T], None]) -> None:
        for i in self._stream:
            func(i)

    def distinct(self):
        return Stream(list(dict.fromkeys(self._stream)))

    def sorted(self, key=None, reverse=False) -> 'Stream[T]':
        return Stream(sorted(self._stream, key=key, reverse=reverse))

    def count(self) -> int:
        return len(list(self._stream))

    def reduce(self, func: Callable[[T, T], T], initial: T = None) -> 'T':
        if initial:
            return reduce(func, self._stream, initial)
        else:
            return reduce(func, self._stream)

    def limit(self, max_size: int) -> 'Stream[T]':
        return Stream(islice(self._stream, max_size))

    def skip(self, n: int) -> 'Stream[T]':
        return Stream(islice(self._stream, n, None))

    def min(self, key: Callable[[T], Any] = None, default: T = None) -> T:
        """
        :param default: use default value when stream is empty
        :param key: at lease supported __lt__ method
        """
        if key is not None:
            return min(self._stream, key=key, default=default)
        return min(self._stream)

    def max(self, key: Callable[[T], Any] = None, default: T = None) -> T:
        """
        :param default: use default value when stream is empty
        :param key: at lease supported __lt__ method
        """
        if key is not None:
            return max(self._stream, key=key, default=default)
        return max(self._stream)

    def find_first(self) -> Optional[T]:
        try:
            return next(self._stream)
        except StopIteration:
            return None

    def any_match(self, func: Callable[[T], bool]) -> bool:
        """
        this is equivalent to
            for i in self._stream:
                if func(i):
                    return True
            return False
        :param func:
        :return:
        """
        return any(map(func, self._stream))

    def all_match(self, func: Callable[[T], bool]) -> bool:
        return all(map(func, self._stream))

    def none_match(self, func: Callable[[T], bool]) -> bool:
        return not self.any_match(func)

    def to_list(self) -> List[T]:
        return list(self._stream)

    def to_set(self) -> Set[T]:
        return set(self._stream)

    def to_map(self, k: Callable[[T], K], v: Callable[[T], U]) -> Dict[K, U]:
        return {k(i): v(i) for i in self._stream}
    `
const dd = createPatch('123', pycode, newString, '', '', { context: 3 })
const struct = d2h.parse(dd, {
  outputFormat: 'side-by-side',
  drawFileList: false,
  matching: 'lines',
  diffStyle: 'word',
  renderNothingWhenEmpty: false
})
const html = d2h.html(dd, {
  outputFormat: 'side-by-side',
  drawFileList: false,
  matching: 'lines',
  diffStyle: 'word',
  renderNothingWhenEmpty: false
})
// console.log(struct)
const res = hljs.highlight(pycode, { language: 'python' })
// https://github.com/hexojs/hexo-util/pull/246/files#diff-23bd09b492fb22d0b078517e838293bfa0031ece18b7bfba1adf706d5b9592d0R122
function closeTags (res) {
  const tokenStack = []
  res.value = res.value.split('\n').map(line => {
    const prepend = tokenStack.map(token => `<span class="${token}">`).join('')
    const matches = line.matchAll(/(<span class="(.*?)">|<\/span>)/g)
    for (const match of matches) {
      if (match[0] === '</span>') tokenStack.shift()
      // @ts-ignore
      else tokenStack.unshift(match[2])
    }
    const append = '</span>'.repeat(tokenStack.length)
    return prepend + line + append
  }).join('\n')
  return res
}
console.log(closeTags(res).value.split('\n'))

</script>

<style scoped>

</style>
