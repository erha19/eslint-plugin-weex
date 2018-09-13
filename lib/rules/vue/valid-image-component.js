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
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'enforce valid `<image>` component',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.16/docs/rules/valid-image-component.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const sourceCodeText = utils.getStyleContent(context.getSourceCode().getText())
    const ast = cssTree.parse(sourceCodeText)
    let hasWidth = false
    let hasHeight = false
    let staticClass = []
    let classs
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='image']" (node) {
        const attrs = node.startTag.attributes || []
        const staticStyle = {}
        let style = {}
        attrs.forEach(attr => {
          if (attr.key.type === 'VIdentifier') {
            if (attr.key.name === 'style') {
              attr.value.value.split(';').forEach(style => {
                const temp = style.split(':')
                staticStyle[temp[0]] = temp[1]
              })
            }
            if (attr.key.name === 'class') {
              if (attr.value.value) {
                staticClass = attr.value.value.split(' ')
              }
            }
          } else if (attr.key.type === 'VDirectiveKey') {
            if (attr.key.name === 'bind' && attr.key.argument === 'style') {
              const expression = attr.value.expression
              let expressions
              if (expression && expression.name) {
                // while the component has a bind name of style, it could not be check
                hasWidth = true
                hasHeight = true
              } else {
                expressions = expression.properties || []
                expressions.forEach(exp => {
                  style[exp.key.name] = exp.value.value || exp.value.object
                })
              }
            } else if (attr.key.name === 'bind' && attr.key.argument === 'class') {
              if (attr.value.expression) {
                classs = attr.value.expression
              }
            }
          }
        })
        style = Object.assign({}, staticStyle, style)
        if (style) {
          const keys = Object.keys(style)
          if (keys.indexOf('width') >= 0) {
            hasWidth = true
          }
          if (keys.indexOf('height') >= 0) {
            hasHeight = true
          }
        }
        if (classs) {
          // that means it is a binding key
          if (classs.name || classs.elements) {
            return
          } else if (classs.value) {
            classs = staticClass.concat(classs.value.split(' '))
          } else if (typeof classs === 'string') {
            classs = staticClass.concat(classs.split(' '))
          } else if (Array.isArray(classs)) {
            classs = staticClass.concat(classs)
          }
        } else {
          classs = staticClass
        }
        if (classs) {
          cssTree.walk(ast, function (cssTreeNode) {
            if (cssTreeNode.type === 'StyleSheet' && cssTreeNode.children && cssTreeNode.children.head) {
              let current = cssTreeNode.children.head
              while (current) {
                const datas = current.data
                let preludeCurrent = datas.prelude.children.head
                while (preludeCurrent) {
                  if (preludeCurrent.data.children && classs.indexOf(preludeCurrent.data.children.head.data.name) > -1) {
                    if (datas.prelude && datas.block.children) {
                      let blockCurrent = datas.block.children.head
                      while (blockCurrent) {
                        if (blockCurrent.data.property === 'width') {
                          hasWidth = true
                        } else if (blockCurrent.data.property === 'height') {
                          hasHeight = true
                        }
                        blockCurrent = blockCurrent.next
                      }
                    }
                    break
                  }
                  preludeCurrent = preludeCurrent.next
                }
                current = current.next
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
