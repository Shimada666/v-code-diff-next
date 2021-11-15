import { ref } from 'vue-demi'

export let newShortText = ref(`
{
  "name": "v-code-diff",
  "description": "A diff plugin of vue, support vue2 and vue3",
  "version": "0.0.1",
  "scripts": {
    "dev": "vite",
    "build": "npx rimraf dist && rollup --config rollup.config.js",
    "serve": "vite preview",
    "commit": "git-cz",
    "gh-pages": "vite build --base=/v-code-diff/ && gh-pages -d ./pages"
  },
  "main": "dist/v-code-diff.cjs.js",
  "module": "dist/v-code-diff.esm.js",
  "unpkg": "dist/v-code-diff.umd.js",
  "files": [
    "dist",
    "src/lib"
  ],
  "types": "dist/index.d.ts",
  "keywords": [
    "vue",
    "vue3",
    "code",
    "diff"
  ],
  "author": "Shimada666<649940882@qq.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Shimada666/v-code-diff/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Shimada666/v-code-diff.git"
  },
  "peerDependencies": {
    "@vue/composition-api": "^1.0.0-beta.1",
    "vue": "^2.0.0 || >=3.0.0-rc.0"
  },
  "peerDependenciesMeta": {
    "@vue/composition-api": {
      "optional": true
    }
  },
  "dependencies": {
    "diff": "^5.0.0",
    "diff2html": "^3.4.5",
    "highlight.js": "^10.7.3",
    "vue-demi": "latest"
  },
  "devDependencies": {
    "@ant-design-vue/use": "^0.0.1-alpha.10",
    "@commitlint/cli": "^8.2.0",
    "@commitlint/config-conventional": "^8.2.0",
    "@rollup/plugin-node-resolve": "^11.1.1",
    "@types/diff": "^5.0.0",
    "@types/node": "^14.14.41",
    "@typescript-eslint/eslint-plugin": "^4.22.0",
    "@typescript-eslint/parser": "^4.22.0",
    "@vitejs/plugin-legacy": "^1.3.1",
    "@vitejs/plugin-vue": "^1.1.5",
    "@vitejs/plugin-vue-jsx": "^1.1.2",
    "@vue/compiler-sfc": "^3.1.1",
    "@vue/eslint-config-standard": "^4.0.0",
    "@vue/eslint-config-typescript": "^4.0.0",
    "@vueuse/core": "^4.11.2",
    "ant-design-vue": "^2.1.2",
    "body-parser": "^1.19.0",
    "commitizen": "^4.2.3",
    "conventional-changelog-cli": "^2.1.1",
    "cross-env": "^7.0.3",
    "dotenv": "^8.2.0",
    "eslint": "^7.22.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-config-prettier": "^8.1.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-plugin-vue": "^7.8.0",
    "gh-pages": "^3.2.1",
    "lint-staged": "^10.5.4",
    "prettier": "^2.2.1",
    "rollup": "^2.38.5",
    "rollup-plugin-styles": "^3.14.1",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-typescript2": "^0.29.0",
    "rollup-plugin-vue": "^6.0.0",
    "sass": "^1.35.1",
    "stylelint": "^13.12.0",
    "stylelint-config-prettier": "^8.0.2",
    "stylelint-config-standard": "^21.0.0",
    "stylelint-order": "^4.1.0",
    "typescript": "^4.1.4",
    "vite": "^2.1.0",
    "vue": "^3.1.1",
    "vue-eslint-parser": "^7.6.0",
    "vue-tsc": "^0.0.8",
    "yorkie": "^2.0.0"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -e"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.{js,vue,ts}": [
      "eslint  --ext .ts,.vue,.tsx src",
      "git add"
    ]
  }
}
`
)
