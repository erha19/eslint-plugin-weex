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

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `<cell>` component',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.12/docs/rules/valid-cell-component.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const sourceCodeText = utils.getStyleContent(context.getSourceCode().getText())
    const ast = cssTree.parse(sourceCodeText)
    let hasMarginTop = false
    let hasMarginBottom = false
    let hasClassName
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='cell']" (node) {
        const attrs = node.startTag.attributes
        const styleSheet = {}
        attrs.forEach(attr => {
          if (attr.key.name === 'style') {
            attr.value.value.split(';').forEach(style => {
              const temp = style.trim().split(':')
              styleSheet[temp[0]] = temp[1]
            })
          }
          if (attr.key.name === 'class') {
            hasClassName = attr.value.value
          }
        })
        if (styleSheet) {
          if (styleSheet['margin-top']) {
            hasMarginTop = true
          }
          if (styleSheet['margin-bottom']) {
            hasMarginBottom = true
          }
        }

        if (hasClassName) {
          cssTree.walk(ast, function (cssTreeNode) {
            if (cssTreeNode.type === 'StyleSheet' && cssTreeNode.children.head && cssTreeNode.children.head.data) {
              const datas = cssTreeNode.children.head.data
              if (datas.prelude && datas.prelude.children.head.data.children.head.data.name === hasClassName) {
                let current = datas.block.children.head
                while (current) {
                  if (current.data.property === 'margin-top') {
                    hasMarginTop = true
                  } else if (current.data.property === 'margin-bottom') {
                    hasMarginBottom = true
                  }
                  current = current.next
                }
              }
            }
          })
        }
        if (hasMarginBottom && hasMarginTop) {
          // console.log(hasMarginBottom, hasMarginTop)
          context.report({
            node,
            loc: attrs.loc,
            message: `The style attributes of margin-top/margin-bottom is not support on <cell> component.`
          })
        } else {
          if (hasMarginBottom) {
            context.report({
              node,
              loc: attrs.loc,
              message: `The style attributes of margin-bottom is not support on <cell> component.`
            })
          } else if (hasMarginTop) {
            context.report({
              node,
              loc: attrs.loc,
              message: `The style attributes of margin-top is not support on <cell> component.`
            })
          }
        }
      }
    })
  }
}
