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
const rule = require('../../../../lib/rules/weex/valid-text-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-text-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template>
      <text>
        Some Text {{ Textval }}
      </text>
    </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <text>
          Some Text
        </text>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
      <text>
      </text>
    </template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template>
      <text>
        <div></div>
        Some Text
      </text>
    </template>`,
      errors: ['The <text> component should not contain a div compoennt.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <text>
        <cell>
          Some Text
        </cell>
      </text>
    </template>`,
      errors: [
        'The <text> component should not contain a cell compoennt.',
        'The text `Some Text` is used in the <cell> component,it should be contain into a <text> component.'
      ]
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
        Some Text
      </div>
    </template>`,
      errors: [
        'The text `Some Text` is used in the <div> component,it should be contain into a <text> component.'
      ]
    }
  ]
})
