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
const rule = require('../../../../lib/rules/weex/valid-input-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-input-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template>
      <input />
    </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <input @change="change" type="email"/>
      </template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template>
      <input type="email2" />
    </template>`,
      errors: ['The <input> component is not support the type of `email2`, you can use the one of `text|date|datetime|email|password|tel|time|url|number`.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <input @click="click" />
    </template>`,
      errors: ['The click event is not support on <input> component, please use `input` or `change` event.']
    }
  ]
})
