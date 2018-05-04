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
const rule = require('../../../../lib/rules/vue/valid-scroller-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-scroller-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
          <scroller></scroller>
        </div>
      </template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template>
      <div>
        <scroller>
          <list></list>
        </scroller>
      </div>
    </template>`,
      errors: ['Cannot use <list> component in <scroller> component.']
    }
  ]
})
