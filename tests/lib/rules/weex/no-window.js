/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../../lib/rules/weex/no-window')
const RuleTester = require('eslint').RuleTester
const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: { experimentalObjectRestSpread: true },
  sourceType: 'module'
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('no-window', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '',
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `
      export default {
        
      }
      `,
      parserOptions
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      export default {
        methods: {
          open: function() {
            window.open('about:blank')
          }
        }
      }
      `,
      parserOptions,
      errors: ["'window' is not exist in weex."]
    }
    // {
    //   filename: 'test.vue',
    //   code: `
    //   window.open('about:blank')
    //   export default {
    //   }
    //   `,
    //   parserOptions,
    //   errors: ["'window' is not exist in weex."]
    // }
  ]
})
