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
const rule = require('../../../../lib/rules/weex/valid-style-flex')
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

tester.run('valid-style-flex', rule, {
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
            <div style="flex-direction: row;
            justify-content: center;
            flex-wrap: nowrap;
            flex:1;
            align-items: center;
            align-self: center;">
            </div>
        </template>
        <style>
          .wrapper {
            flex-direction: row;
            justify-content: center;
            flex-wrap: nowrap;
            flex:1;
            align-items: center;
            align-self: center;
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
      <div style="
      flex: 1 1 auto;
      align-items: baseline;
      align-self: baseline;">
      </div>
    </template>
    <style>
      .wrapper {
        flex-direction: row;
        flex: 1 1 auto;
        align-items: baseline;
        align-self: baseline;
      }
    </style>
          `,
      parserOptions,
      errors: [
        'Style `flex: 1 1 auto` is not support, please use the style like `flex: Number`',
        'Style `align-items: baseline` is not support, please use the style like `align-items: auto|flex-start|flex-end|center|stretch`',
        'Style `align-self: baseline` is not support, please use the style like `align-self: auto|flex-start|flex-end|center|stretch`',
        'Style `flex: 1 1 auto` is not support, please use the style like `flex: Number`',
        'Style `align-items: baseline` is not support, please use the style like `align-items: auto|flex-start|flex-end|center|stretch`',
        'Style `align-self: baseline` is not support, please use the style like `align-self: auto|flex-start|flex-end|center|stretch`'
      ] },
    {
      filename: 'test.vue',
      code: `
      <template>
        <div style="
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: baseline;
        order: 10;">
        </div>
      </template>
      <style>
        .wrapper {
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: baseline;
          order: 10;
        }
      </style>
            `,
      parserOptions,
      errors: [
        'Style `flex-shrink: 1` is not support, please use one of `[ flex-direction | justify-content | flex-wrap | flex | align-self | align-items]` to layout your page',
        'Style `flex-basis: baseline` is not support, please use one of `[ flex-direction | justify-content | flex-wrap | flex | align-self | align-items]` to layout your page',
        'Style `order: 10` is not support, please use one of `[ flex-direction | justify-content | flex-wrap | flex | align-self | align-items]` to layout your page'
      ] }
  ]
})
