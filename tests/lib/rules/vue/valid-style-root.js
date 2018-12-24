/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../../lib/rules/vue/valid-style-root')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-style-root', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template></template><style scoped></style>'
    },
    {
      filename: 'test.vue',
      code: '<template></template><script></script><style scoped lang="sass"></style>'
    },
    {
      filename: 'test.vue',
      code: '<template></template><style lang="less" scoped></style>'
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      <template></template>
      <style></style>
      `,
      errors: [{
        message: 'The style root requires scoped attribute.',
        line: 3,
        column: 6,
        endColumn: 22,
        endLine: 3
      }]
    },
    {
      filename: 'test.vue',
      code: `
      <template></template>


      <style></style>

      `,
      errors: [{
        message: 'The style root requires scoped attribute.',
        line: 5,
        column: 6,
        endColumn: 22,
        endLine: 5
      }]
    },
    {
      filename: 'test.vue',
      code: `
      <template></template>


      <stylescoped></style>

      `,
      errors: [{
        message: 'The style root requires scoped attribute.',
        line: 5,
        column: 6,
        endColumn: 28,
        endLine: 5
      }]
    },
    {
      filename: 'test.vue',
      code: `
      <template></template>


      <style lang="sass"></style>   

      `,
      errors: [{
        message: 'The style root requires scoped attribute.',
        line: 5,
        column: 6,
        endColumn: 34,
        endLine: 5
      }]
    }
  ]
})
