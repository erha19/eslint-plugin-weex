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
const rule = require('../../../../lib/rules/vue/no-style-display')
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

tester.run('no-style-display', rule, {
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
            <image style="height:320px;display:none;" resize="cover" :src="i.img"></image>
        </div>
    </template>
    <style>
        .child{
            display:none;
        }
    </style>
          `,
    parserOptions,
    errors: [{
      message: "Style 'display' is not support in weex, you need to use flex for page layout.",
      line: 4
    }, {
      message: "Style 'display' is not support in weex, you need to use flex for page layout.",
      line: 9
    }]
  }]
})
