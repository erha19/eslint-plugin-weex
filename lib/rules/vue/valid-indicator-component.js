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

function detectComponent (node) {
  const components = []
  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'VElement') {
        components.push(child)
      }
    })
  }
  return components
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `<indicator>` component',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.1.3/docs/rules/valid-indicator-component.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='indicator']" (node) {
        const detect = detectComponent(node)
        if (detect.length > 0) {
          detect.forEach(d => {
            context.report({
              d,
              loc: d.loc,
              message: `The <indicator> component should not contain a ${d.name} compoennt.`
            })
          })
        }
      }
    })
  }
}
