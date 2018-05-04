/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../../lib/rules/vue/no-style-z-index')
const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
}
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2015
  }
})

tester.run('no-style-z-index', rule, {
  valid: [{
    filename: 'test.vue',
    code: `
        <template>
            <div style="">
            </div>
        </template>
            `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
        <template>
            <div style>
            </div>
        </template>
            `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
        <template>
            <div style="width:740px">
            </div>
        </template>
            `,
    parserOptions
  }],
  invalid: [{
    filename: 'test.vue',
    code: `
      <template>
          <div>
              <router-view class="r-box" v-html={{}}></router-view>
              <image style="z-index:999" resize="cover" :src="i.img"></image>
          </div>
      </template>
      <style>
        .child{
            z-index:999;
        }
      </style>
          `,
    parserOptions,
    errors: ["'z-index' is disallow in weex.", "'z-index' is disallow in weex."]
  }, {
    filename: 'test.vue',
    code: `
      <template>
          <div>
              <router-view class="r-box" v-html={{}}></router-view>
              <image style="z-index:999;width:760px;" resize="cover" :src="i.img"></image>
          </div>
      </template>
          `,
    parserOptions,
    errors: ["'z-index' is disallow in weex."]
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div>
            <image style="height:300px; z-index : 111;  width:450px;" resize="cover" :src="i.img"></image>
        </div>
    </template>
          `,
    parserOptions,
    errors: ["'z-index' is disallow in weex."]
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div>
            <image style="height:320px;z-index : 111" resize="cover" :src="i.img"></image>
        </div>
    </template>
          `,
    parserOptions,
    errors: ["'z-index' is disallow in weex."]
  }]
})
