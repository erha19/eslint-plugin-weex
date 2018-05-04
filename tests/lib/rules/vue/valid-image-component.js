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
const rule = require('../../../../lib/rules/vue/valid-image-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-image-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image style="width:500px;height:500px" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image class="image" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>
      <style>
        .image {
          width:500px;
          height:500px;
        }
        .other {
          width: 20px;
          height: 100px;
        }
      </style>
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <image class="image" src="https://vuejs.org/images/logo.png"></image>
      </div>
    </template>
    <style>
      .image {

      }
    </style>`,
      errors: ['The style attributes of width and height must be specified in image component, otherwise it won’t work.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <image style="" src="https://vuejs.org/images/logo.png"></image>
      </div>
    </template>`,
      errors: ['The style attributes of width and height must be specified in image component, otherwise it won’t work.']
    }
  ]
})
