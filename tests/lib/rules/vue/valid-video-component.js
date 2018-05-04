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
const rule = require('../../../../lib/rules/vue/valid-video-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-video-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template>
      <video>
      </video>
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
      <video>
        <div></div>
        Some Text
      </video>
    </template>`,
      errors: ['The <video> component should not contain a div compoennt.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <video>
        <cell>
          Some Text
        </cell>
      </video>
    </template>`,
      errors: ['The <video> component should not contain a cell compoennt.']
    }
  ]
})
