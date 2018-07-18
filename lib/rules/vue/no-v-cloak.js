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
      description: 'disallow use `v-cloak` directives',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.14/docs/rules/no-v-cloak.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='cloak']" (node) {
        if (node && node.key && node.key.name === 'cloak') {
          context.report({
            node,
            loc: node.loc,
            message: "'v-cloak' directives is disallow in weex."
          })
        }
      }
    })
  }
}
