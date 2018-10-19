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
      description: 'disallow use multiple fonts in font-family',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.19/docs/rules/valid-style-font-family.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const sourceCodeText = context.getSourceCode().getText()
    const multipleReg = /,/
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='template']" (node) {
        const ast = cssTree.parse(sourceCodeText, { positions: true })
        cssTree.walk(ast, function (cssTreeNode) {
          const propertiesValue = []
          if (cssTreeNode.type === 'Declaration') {
            const childrenList = cssTreeNode.value.children
            if (!childrenList) return
            childrenList.each(e => {
              propertiesValue.push(e.name || e.value)
            })
            if (cssTreeNode.property === 'font-family' && multipleReg.test(propertiesValue.join(''))) {
              context.report({
                cssTreeNode,
                loc: cssTreeNode.loc,
                message: `Style \`${cssTreeNode.property}\` is not support multiple fonts, please use the style like \`font-family: sans-serif;\``
              })
            }
          }
        })
      },
      'VAttribute' (node) {
        const name = getName(node)
        if (name == null) {
          return
        }
        if (name === 'style' && node.value && node.value.value) {
          const styleSheet = node.value.value.match(/((\w+(\-\w+)?)(:.*;?))/g) || []
          const properties = {}
          styleSheet.forEach(style => {
            if (!style) return
            style = style.replace(';', '')
            const temp = style.split(':')
            properties[temp[0]] = temp[1].replace(/^\s{0,1}/, '')
          })
          for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
              if (key === 'font-family' && multipleReg.test(properties[key])) {
                context.report({
                  node,
                  loc: node.loc,
                  message: `Style \`${key}\` is not support multiple fonts, please use the style like \`font-family: sans-serif;\``
                })
              }
            }
          }
        }
      }
    })
  }
}
