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
const rule = require('../../../../lib/rules/vue/no-style-float')
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

tester.run('no-style-float', rule, {
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
              <image style="float:left; width:881px; hieght:45px" resize="cover" :src="i.img"></image>
          </div>
      </template>
      <style>
        .child{
            float:left;
        }
      </style>
          `,
    parserOptions,
    errors: [{
      message: "Style 'float' is not support in weex.",
      line: 2
    }, {
      message: "Style 'float' is not support in weex.",
      line: 5
    }]
  }, {
    filename: 'test.vue',
    code: `
      <template>
          <div>
              <router-view class="r-box" v-html={{}}></router-view>
              <image style="float:letf; width:760px;" resize="cover" :src="./i.img"/>
          </div>
      </template>
          `,
    parserOptions,
    errors: ["Style 'float' is not support in weex."]
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div>
            <image style="height:300px; float : left;  width:450px;" resize="cover" :src="i.img"></image>
        </div>
    </template>
          `,
    parserOptions,
    errors: ["Style 'float' is not support in weex."]
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div>
            <image style="height:320px;float : left" resize="cover" :src="i.img"></image>
        </div>
    </template>
    <style>
        .child{
            float:left;
        }
    </style>
          `,
    parserOptions,
    errors: [{
      message: "Style 'float' is not support in weex.",
      line: 2
    }, {
      message: "Style 'float' is not support in weex.",
      line: 4
    }]
  }]
})
