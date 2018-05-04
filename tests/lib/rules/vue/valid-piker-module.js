/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'
// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const rule = require('../../../../lib/rules/vue/valid-picker-module')
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
ruleTester.run('valid-picker-module', rule, {
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
  }, {
    filename: 'test.vue',
    code: `
      const picker = weex.requireModule('picker')
      export default {
        methods: {
          test1: {
            test2: {
              test3: {
                test4: {
                  test5: function() {
                    picker.pick({index: this.index, items}, function(){})
                  }
                }
              }
            }
          }
        }
      }
      `,
    parserOptions
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
                    picker.pick({index: this.index, items}, function(){})
                  }
                }
              }
            }
          }
        }
      }
      `,
    parserOptions
  }, {
    filename: 'test.vue',
    code: `
      const picker = weex.requireModule('picker')
      const callback = function() {};
      export default {
        methods: {
          test1: {
            test2: {
              test3: {
                test4: {
                  test5: function() {
                    picker.pick({index: this.index, items}, callback)
                  }
                }
              }
            }
          }
        }
      }
      `,
    parserOptions
  }],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      const picker = weex.requireModule('picker')
      export default {
        methods: {
          open: function() {
              picker.pick({index: this.index, items})
          },
          test1: {
            test2: function() {
              picker.pick({index: this.index, items})
            }
          }
        }
      }
      `,
      parserOptions,
      errors: [`Module \`picker\` needs callback function.`, `Module \`picker\` needs callback function.`]
    },
    {
      filename: 'test.vue',
      code: `
        const picker = weex.requireModule('picker')
        export default {
          methods: {
            test1: {
              test2: {
                test3: {
                  test4: {
                    test5: function() {
                      picker.pick({index: this.index, items})
                    }
                  }
                }
              }
            }
          }
        }
        `,
      parserOptions,
      errors: [`Module \`picker\` needs callback function.`]
    },
    {
      filename: 'test.vue',
      code: `
        const picker = weex.requireModule('picker')
        export default {
          methods: {
            test1: {
              test2: {
                test3: {
                  test4: {
                    test5: function() {
                      picker.pick({index: this.index, items}, '')
                    }
                  }
                }
              }
            }
          }
        }
        `,
      parserOptions,
      errors: [`Module \`picker\` needs callback function.`]
    }
  ]
})
