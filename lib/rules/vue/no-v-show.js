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
  // debugger
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
      description: 'disallow use `no-v-show` directive',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-weex/blob/v0.0.1/docs/rules/no-v-show.md'
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
          if (cssTreeNode.type === 'Declaration' && cssTreeNode.property === 'display' &&
            cssTreeNode.value.type === 'Value') {
            cssTreeNode.value.children.forEach(property => {
              if (property.type === 'Identifier' && property.name === 'none') {
                context.report({
                  node: node,
                  message: "'display:none' is disallow in weex."
                })
              }
            })
          }
        })
      },
      "VAttribute[directive=true][key.name='show']" (node) {
        if (node && node.key && node.key.name === 'show') {
          context.report({
            node,
            loc: node.loc,
            message: "'v-show' directives is disallow in weex."
          })
        }
      },
      'VAttribute' (node) {
        const name = getName(node)
        let styleVal = null
        if (name == null) {
          return
        }
        if (name === 'style' && node.value && node.value.value) {
          styleVal = node.value.value
          if (/display\s*:\s*none/.test(styleVal)) {
            context.report({
              node: node,
              message: "'display:none' is disallow in weex."
            })
          }
        }
      }
    })
  }
}
