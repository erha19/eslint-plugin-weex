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
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.1.6/docs/rules/valid-style-root.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='template']" (node) {
        const result = utils.checkStyleRoot(context.getSourceCode().getText())
        if (result.start) {
          context.report({
            node,
            loc: result,
            message: `The style root requires scoped attribute.`
          })
        }
      }
    })
  }
}
