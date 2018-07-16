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
      description: 'enforce valid `<text>` component',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.13/docs/rules/valid-text-component.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='text']" (node) {
        const detect = detectComponent(node)
        if (detect.length > 0) {
          detect.forEach(d => {
            context.report({
              d,
              loc: d.loc,
              message: `The <text> component should not contain a ${d.name} compoennt.`
            })
          })
        }
      },
      'VText' (node) {
        const parent = node.parent
        const value = node.value.replace(/^\s+|\n|\s+$/g, '')
        if (value && parent.type === 'VElement' && parent.name !== 'text') {
          context.report({
            parent,
            loc: parent.loc,
            message: `The text \`${value}\` is used in the <${parent.name}> component,it should be contain into a <text> component.`
          })
        }
      }
    })
  }
}
