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
      description: 'valid css seletor used on the weex',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v1.0.0/docs/rules/no-style-float.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const supportPseudoClass = ['focus', 'active', 'disabled', 'enabled'];
    const sourceCodeText = utils.getStyleContent(context.getSourceCode().getText())
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='template']" (node) {
        const ast = cssTree.parse(sourceCodeText)
        cssTree.walk(ast, function (cssTreeNode) {
          if (/\w+Selector/.test(cssTreeNode.type) && cssTreeNode.type.indexOf('Class') === -1) {
            context.report({
              node,
              loc: node.loc,
              message: `${cssTreeNode.type} \`${cssTreeNode.name}\` is not support in weex now, please use ClassSelector.`
            })
          }
          else if (cssTreeNode.type === 'PseudoClassSelector') {
            if (supportPseudoClass.indexOf(cssTreeNode.name) === -1) {
              context.report({
                node,
                loc: node.loc,
                message: `${cssTreeNode.type} \`${cssTreeNode.name}\` is not support in weex now, you can use :${supportPseudoClass.join(' :')}.`
              })
            }
          }
        })
      }
    })
  }
}
