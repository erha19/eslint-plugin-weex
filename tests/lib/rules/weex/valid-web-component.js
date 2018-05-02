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
const rule = require('../../../../lib/rules/weex/valid-web-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-web-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template>
      <web>
      </web>
    </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
      </template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template>
      <web>
        <div></div>
        Some Text
      </web>
    </template>`,
      errors: ['The <web> component should not contain a div compoennt.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <web>
        <cell>
          Some Text
        </cell>
      </web>
    </template>`,
      errors: ['The <web> component should not contain a cell compoennt.']
    }
  ]
})
