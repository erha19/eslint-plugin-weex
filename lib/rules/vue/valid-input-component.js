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
      description: 'enforce valid `<input>` component',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.12/docs/rules/valid-input-component.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='input']" (node) {
        const supportTypes = 'text|date|datetime|email|password|tel|time|url|number'.split('|')
        node.startTag.attributes.forEach(attr => {
          if (attr.key.type === 'VDirectiveKey' && attr.key.argument === 'click') {
            context.report({
              attr,
              loc: attr.loc,
              message: `The click event is not support on <input> component, please use \`input\` or \`change\` event.`
            })
          }
          if (attr.key.type === 'VIdentifier' && attr.key.name === 'type') {
            if (supportTypes.indexOf(attr.value.value) === -1) {
              context.report({
                attr,
                loc: attr.loc,
                message: `The <input> component is not support the type of \`${attr.value.value}\`, you can use the one of \`text|date|datetime|email|password|tel|time|url|number\`.`
              })
            }
          }
        })
      }
    })
  }
}
