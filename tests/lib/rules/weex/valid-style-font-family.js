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
const rule = require('../../../../lib/rules/weex/valid-style-font-family')
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

tester.run('valid-style-font-family', rule, {
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
            <div style="font-family: sans-serif;">
            </div>
        </template>
        <style>
          .wrapper {
            font-family: sans-serif;
          }
        </style>
            `,
    parserOptions
  }],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <div style="font-family: Georgia, serif;">
        </div>
      </template>
      <style>
        .wrapper {
          font-family: Georgia, serif;
        }
      </style>
            `,
      parserOptions,
      errors: [
        'Style `font-family` is not support multiple fonts, please use the style like `font-family: sans-serif;`',
        'Style `font-family` is not support multiple fonts, please use the style like `font-family: sans-serif;`'
      ] }
  ]
})
