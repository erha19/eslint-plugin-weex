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
const rule = require('../../../../lib/rules/vue/valid-cell-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-cell-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <cell></cell>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <cell class="cell"></cell>
        </div>
      </template>
      <style>
        .cell {

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
      <cell style="margin-top: 10px; margin-bottom: 10px;"></cell>
      </div>
    </template>`,
      errors: [`The style attributes of margin-top/margin-bottom is not support on <cell> component.`]
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <cell style="margin-top: 10px;"></cell>
      </div>
    </template>`,
      errors: [`The style attributes of margin-top is not support on <cell> component.`]
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <cell style="margin-bottom: 10px;"></cell>
      </div>
    </template>`,
      errors: [`The style attributes of margin-bottom is not support on <cell> component.`]
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <cell class="cell"></cell>
      </div>
    </template>
    <style>
      .cell {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    </style>
    `,
      errors: [`The style attributes of margin-top/margin-bottom is not support on <cell> component.`]
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
        <cell style="margin-top: 10px; margin-bottom: 10px;" class="cell"></cell>
      </div>
    </template>
    <style>
      .cell {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    </style>
    `,
      errors: [
        `The style attributes of margin-top/margin-bottom is not support on <cell> component.`
      ]
    }
  ]
})
