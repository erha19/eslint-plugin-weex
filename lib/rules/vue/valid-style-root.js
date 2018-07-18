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
// Helpers
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid style root',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.14/docs/rules/valid-style-root.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='template']" (node) {
        const hasScoped = utils.checkStyleRoot(context.getSourceCode().getText())
        if (!hasScoped) {
          context.report({
            node,
            loc: null,
            message: `The style root requires scoped attribute.`
          })
        }
      }
    })
  }
}
