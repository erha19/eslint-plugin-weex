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
const rule = require('../../../../lib/rules/vue/valid-indicator-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-indicator-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template>
      <indicator>
      </indicator>
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
      <indicator>
        <div></div>
        Some Text
      </indicator>
    </template>`,
      errors: ['The <indicator> component should not contain a div compoennt.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <indicator>
        <cell>
          Some Text
        </cell>
      </indicator>
    </template>`,
      errors: ['The <indicator> component should not contain a cell compoennt.']
    }
  ]
})
