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
const rule = require('../../../../lib/rules/weex/valid-style-selector')
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

tester.run('valid-style-selector', rule, {
  valid: [
  {
    filename: 'test.vue',
    code: `
      <template>
          <div></div>
      </template>
      <style>
        .child{
            color: #fff;
        }
      </style>
    `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div></div>
    </template>
    <style>
      .child, .parent{
        color: #fff;
      }
    </style>
    `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div></div>
    </template>
    <style>
      .child: active{
        color: #fff;
      }
    </style>
    `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div></div>
    </template>
    <style>
      .child: focus{
        color: #fff;
      }
    </style>
    `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div></div>
    </template>
    <style>
      .child: disabled{
        color: #fff;
      }
    </style>
    `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div></div>
    </template>
    <style>
      .child: enabled{
        color: #fff;
      }
    </style>
    `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
    <template>
        <div></div>
    </template>
    <style>
      .child {
        color: #fff;
      }
      .child: active{
        color: #fff;
      }
      .child: focus{
        color: #fff;
      }
      .child: disabled{
        color: #fff;
      }
      .child: enabled{
        color: #fff;
      }
    </style>
    `,
    parserOptions
  }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
        <template>
            <div></div>
        </template>
        <style>
          div{
            color: #fff;
          }
        </style>
            `,
      parserOptions,
      errors: [{
        message: "TypeSelector `div` is not support in weex now, please use ClassSelector.",
        line: 2
      }]
    },
    {
      filename: 'test.vue',
      code: `
        <template>
            <div></div>
        </template>
        <style>
          #child{
            color: #fff;
          }
        </style>
            `,
      parserOptions,
      errors: [{
        message: "IdSelector `child` is not support in weex now, please use ClassSelector.",
        line: 2
      }]
    },
    {
      filename: 'test.vue',
      code: `
        <template>
            <div></div>
        </template>
        <style>
          * {
            color: #fff;
          }
        </style>
            `,
      parserOptions,
      errors: [{
        message: "TypeSelector `*` is not support in weex now, please use ClassSelector.",
        line: 2
      }]
    },
    {
      filename: 'test.vue',
      code: `
        <template>
            <div></div>
        </template>
        <style>
          div[attr=name]{
            color: #fff;
          }
        </style>
            `,
      parserOptions,
      errors: [{
        message: "TypeSelector `div` is not support in weex now, please use ClassSelector.",
        line: 2
      },
      {
        message: "AttributeSelector `[object Object]` is not support in weex now, please use ClassSelector.",
        line: 2
      }]
    },
    {
      filename: 'test.vue',
      code: `
        <template>
            <div></div>
        </template>
        <style>
          .child:hover{
            color: #fff;
          }
        </style>
            `,
      parserOptions,
      errors: [{
        message: "PseudoClassSelector `hover` is not support in weex now, you can use :focus :active :disabled :enabled.",
        line: 2
      }]
    } 
  ]
})
