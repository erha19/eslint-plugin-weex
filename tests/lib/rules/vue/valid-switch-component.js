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
const rule = require('../../../../lib/rules/vue/valid-switch-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-switch-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template>
      <switch>
      </switch>
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
      <switch>
        <div></div>
        Some Text
      </switch>
    </template>`,
      errors: ['The <switch> component should not contain a div compoennt.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <switch>
        <cell>
          Some Text
        </cell>
      </switch>
    </template>`,
      errors: ['The <switch> component should not contain a cell compoennt.']
    }
  ]
})
