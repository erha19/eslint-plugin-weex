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
const rule = require('../../../../lib/rules/weex/no-v-show')
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

tester.run('no-v-show', rule, {
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
  invalid: [
    {
      filename: 'test.vue',
      code: `
        <template>
            <div>
                <router-view class="r-box" v-show></router-view>
                <image style="width:999px" resize="cover" :src="i.img"></image>
            </div>
        </template>
        <style>
          .child{
          }
        </style>
            `,
      parserOptions,
      errors: ["'v-show' directives is disallow in weex."]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
          <div>
              <image class="pic" resize="cover" :src="i.img"/>
          </div>
      </template>
      <style>
        .pic{
          display:none
        }
        .pic2{
          display:none;
        }
      </style>
          `,
      parserOptions,
      errors: ["'display:none' is disallow in weex.", "'display:none' is disallow in weex."]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
          <div>
              <image class="pic" v-show="showPic" resize="cover" :src="i.img"/>
          </div>
      </template>
      <style>
        .pic{
          display:none
        }
      </style>
          `,
      parserOptions,
      errors: ["'display:none' is disallow in weex.", "'v-show' directives is disallow in weex."]
    },
    {
      filename: 'test.vue',
      code: `
        <template>
            <div>
                <router-view class="r-box" v-show="showSomething"></router-view>
                <image style="display:none; width=745px" resize="cover" :src="i.img"></image>
            </div>
        </template>
            `,
      parserOptions,
      errors: ["'v-show' directives is disallow in weex.", "'display:none' is disallow in weex."]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
          <div>
              <image style="height:300px;display : none;  width:450px;" resize="cover" :src="i.img"></image>
          </div>
      </template>
            `,
      parserOptions,
      errors: ["'display:none' is disallow in weex."]
    }, {
      filename: 'test.vue',
      code: `
      <template>
          <div>
              <image class="img" resize="cover" :src="i.img"></image>
          </div>
      </template>
      <style>
        .img{
          display:none;
        }
      </style>
            `,
      parserOptions,
      errors: ["'display:none' is disallow in weex."]
    }
  ]
})
