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
const cssTree = require('css-tree')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Get the name of the given attribute node.
 * @param {ASTNode} attribute The attribute node to get.
 * @returns {string} The name of the attribute.
 */
function getName (attribute) {
  if (!attribute.directive) {
    return attribute.key.name
  }
  if (attribute.key.name === 'bind') {
    return attribute.key.argument || null
  }
  return null
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'weex not support to use `float` in style',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-weex/blob/v1.0.3/docs/rules/no-style-float.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const sourceCodeText = context.getSourceCode().getText()
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='template']" (node) {
        const ast = cssTree.parse(sourceCodeText)
        cssTree.walk(ast, function (cssTreeNode) {
          if (cssTreeNode.type === 'Declaration' && cssTreeNode.property === 'float') {
            context.report({
              node,
              loc: node.loc,
              message: "Style 'float' is not support in weex."
            })
          }
        })
      },
      'VAttribute' (node) {
        const name = getName(node)
        let styleVal = null
        if (name == null) {
          return
        }
        if (name === 'style' && node.value && node.value.value) {
          styleVal = node.value.value
          if (/float/.test(styleVal)) {
            context.report({
              node: node,
              message: "Style 'float' is not support in weex."
            })
          }
        }
      }
    })
  }
}
