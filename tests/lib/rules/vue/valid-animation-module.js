/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'
// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const rule = require('../../../../lib/rules/vue/valid-animation-module')
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
ruleTester.run('valid-animation-module', rule, {
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
      const animation = weex.requireModule('animation')
      export default {
        methods: {
          test1: {
            test2: {
              test3: {
                test4: {
                  test5: function() {
                    animation.transition(this.$refs.block1, {
                      styles: {
                        height: '1',
                        width : '1px',
                        backgroundColor : self.bgc
                      },
                      timingFunction:  'ease',
                      duration: 300,
                      needLayout:false
                    }, function() {
                    });
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
                    animation.transition()
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
      const animation = weex.requireModule('animation')
      const callback = function() {};
      export default {
        methods: {
          test1: {
            test2: {
              test3: {
                test4: {
                  test5: function() {
                    animation.pick({index: this.index, items}, callback)
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
      const body_1 = this.$refs.animate_body_1;
      const body_2 = this.$refs.animate_body_2;
      export default {
        methods: {
          moveleft: function() {
            const body_1 = this.$refs.animate_body_1;//这两行报错
                const body_2 = this.$refs.animate_body_2;//这两行导致报错
                animation.transition(body_2, {
                    styles: {
                        transform: 'translateX(-200%)',
                    },
                    duration: 0, //ms
                }, function () {})
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
      const animation = weex.requireModule('animation')
      export default {
        methods: {
          open: function() {
            animation.transition(this.$refs.block1, {
              styles: {
                height: 'px',
                width : 'px',
                backgroundColor : self.bgc
              },
              timingFunction:  'ease',
              duration: 300,
              needLayout:false
            }, function() {
            });
          }
        }
      }
      `,
      parserOptions,
      errors: [
        'The style height on `animation` module function need to meet the rules `/^(\\d+)(px|wx)?/`',
        'The style width on `animation` module function need to meet the rules `/^(\\d+)(px|wx)?/`'
      ]
    }
  ]
})
