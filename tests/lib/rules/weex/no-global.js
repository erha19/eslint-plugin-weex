/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'
// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const rule = require('../../../../lib/rules/weex/no-global')
const RuleTester = require('eslint').RuleTester
const parserOptions = {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  }
  // ------------------------------------------------------------------------------
  // Tests
  // ------------------------------------------------------------------------------
const ruleTester = new RuleTester()
ruleTester.run('no-global', rule, {
  valid: [{
    filename: 'test.vue',
    code: '',
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
      export default {
        
      }
      `,
    parserOptions
  }],
  invalid: [{
    filename: 'test.vue',
    code: `
      export default {
        methods: {
          open: function() {
            global.require()
          },
          test1: {
            test2: function() {
              global.require()
            }
          }
        }
      }
      `,
    parserOptions,
    errors: [`global api is invalid in weex.`, `global api is invalid in weex.`]
  }, {
    filename: 'test.vue',
    code: `
      export default {
        methods: {
          test1: {
            test2: {
              test3: {
                test4: {
                  test5: function() {
                    global.require()
                  }
                }
              }
            }
          }
        }
      }
      `,
    parserOptions,
    errors: [`global api is invalid in weex.`]
  }]
})
