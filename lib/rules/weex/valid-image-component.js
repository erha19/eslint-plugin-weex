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
      description: 'weex `<image>` component need style attributes of width and height',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v1.0.0/docs/rules/valid-image-component.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const sourceCodeText = utils.getStyleContent(context.getSourceCode().getText())
    const ast = cssTree.parse(sourceCodeText)
    let hasWidth = false
    let hasHeight = false
    let hasClassName
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='image']" (node) {
        const attrs = node.startTag.attributes
        const styleSheet = {}
        attrs.forEach(attr => {
          if (attr.key.name === 'style') {
            attr.value.value.split(';').forEach(style => {
              const [key, value] = style.split(':')
              styleSheet[key] = value
            })
          }
          if (attr.key.name === 'class') {
            hasClassName = attr.value.value
          }
        })
        if (styleSheet) {
          if (styleSheet['width']) {
            hasWidth = true
          }
          if (styleSheet['height']) {
            hasHeight = true
          }
        }

        if (hasClassName) {
          cssTree.walk(ast, function (cssTreeNode) {
            if (cssTreeNode.type === 'StyleSheet' && cssTreeNode.children.head && cssTreeNode.children.head.data) {
              const datas = cssTreeNode.children.head.data
              if (datas.prelude && datas.prelude.children.head.data.children.head.data.name === hasClassName) {
                let current = datas.block.children.head
                while (current) {
                  if (current.data.property === 'width') {
                    hasWidth = true
                  } else if (current.data.property === 'height') {
                    hasHeight = true
                  }
                  current = current.next
                }
              }
            }
          })
        }

        if (!hasHeight && !hasWidth) {
          // console.log(hasHeight, hasWidth)
          context.report({
            node,
            loc: attrs.loc,
            message: `The style attributes of width and height must be specified in image component, otherwise it won’t work.`
          })
        } else if (!hasHeight) {
          context.report({
            node,
            loc: attrs.loc,
            message: `The style attributes of height must be specified in image component, otherwise it won’t work.`
          })
        } else if (!hasWidth) {
          context.report({
            node,
            loc: attrs.loc,
            message: `The style attributes of width must be specified in image component, otherwise it won’t work.`
          })
        }
      }
    })
  }
}
