/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow use `v-html` directives',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v1.0.0/docs/rules/no-v-html.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='html']" (node) {
        if (node && node.key && node.key.name === 'html') {
          context.report({
            node,
            loc: node.loc,
            message: "'v-html' directives is disallow in weex."
          })
        }
      }
    })
  }
}
