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
      description: 'disallow use all properties with flex layout',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.1.9/docs/rules/valid-style-flex.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const supportProps = {
      'flex-direction': { reg: /^\s?(row|row\-reverse|column|column\-reverse)\s?/, tips: 'flex-direction: [row|row-reverse|column|column-reverse]' },
      'justify-content': { reg: /^\s?(flex\-start|flex\-end|center|space\-between|space\-around)\s?/, tips: 'justify-content:[flex-start|flex-end|center|space-between|space-around]' },
      'flex-wrap': { reg: /^\s?(nowrap|wrap|wrap\-reverse)\s?/, tips: 'flex-wrap: [nowrap|wrap|wrap-reverse]' },
      flex: { reg: /^\s?\d+\s?$/, tips: 'flex: Number' },
      'align-self': { reg: /^\s?(auto|flex\-start|flex\-end|center|stretch)\s?/, tips: 'align-self: auto|flex-start|flex-end|center|stretch' },
      'align-items': { reg: /^\s?(auto|flex\-start|flex\-end|center|stretch)\s?/, tips: 'align-items: auto|flex-start|flex-end|center|stretch' }
    }
    const unSupportProps = {
      props: ['flex-grow', 'flex-shrink', 'flex-basis', 'order'],
      tips: `[ flex-direction | justify-content | flex-wrap | flex | align-self | align-items]`
    }
    const sourceCodeText = context.getSourceCode().getText()
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
            if (supportProps[cssTreeNode.property] && !supportProps[cssTreeNode.property].reg.test(propertiesValue.join(''))) {
              context.report({
                cssTreeNode,
                loc: cssTreeNode.loc,
                message: `Style \`${cssTreeNode.property}: ${propertiesValue.join('')}\` is not support, please use the style like \`${supportProps[cssTreeNode.property].tips}\``
              })
            } else if (unSupportProps.props.indexOf(cssTreeNode.property) > 0) {
              context.report({
                cssTreeNode,
                loc: cssTreeNode.loc,
                message: `Style \`${cssTreeNode.property}: ${propertiesValue.join('')}\` is not support, please use one of \`${unSupportProps.tips}\` to layout your page`
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
              if (supportProps[key] && !supportProps[key].reg.test(properties[key])) {
                context.report({
                  node,
                  loc: node.loc,
                  message: `Style \`${key}: ${properties[key]}\` is not support, please use the style like \`${supportProps[key].tips}\``
                })
              }
            } else if (unSupportProps.props.indexOf(key) > 0) {
              context.report({
                node,
                loc: node.loc,
                message: `Style \`${key}: ${properties[key]}\` is not support, please use one of \`${unSupportProps.tips}\` to layout your page`
              })
            }
          }
        }
      }
    })
  }
}
