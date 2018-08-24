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
      description: 'enforce valid css seletor used on the weex',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.14/docs/rules/valid-style-selector.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    const supportPseudoClass = ['focus', 'active', 'disabled', 'enabled']
    const sourceCodeText = utils.getStyleContent(context.getSourceCode().getText())
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='template']" (node) {
        const ast = cssTree.parse(sourceCodeText, {positions: true})
        cssTree.walk(ast, function (cssTreeNode) {
          if (cssTreeNode.type === 'Selector') {
            let current = cssTreeNode.children.head
            let seletor = ''
            const reg = /\.\w+\s+\S+/
            while (current) {
              seletor += (current.data.type === 'ClassSelector' ? '.' : '') + (current.data.name ? current.data.name : current.data.value)
              current = current.next
            }
            if (reg.test(seletor)) {
              context.report({
                cssTreeNode,
                loc: cssTreeNode.loc,
                message: `${cssTreeNode.type} \`${seletor}\` is not support in weex now, please do not use it.`
              })
            }
          } else if (/\w+Selector/.test(cssTreeNode.type) && cssTreeNode.type.indexOf('Class') === -1) {
            context.report({
              cssTreeNode,
              loc: cssTreeNode.loc,
              message: `${cssTreeNode.type} \`${cssTreeNode.name}\` is not support in weex now, please use ClassSelector.`
            })
          } else if (cssTreeNode.type === 'PseudoClassSelector') {
            if (supportPseudoClass.indexOf(cssTreeNode.name) === -1) {
              context.report({
                cssTreeNode,
                loc: cssTreeNode.loc,
                message: `${cssTreeNode.type} \`${cssTreeNode.name}\` is not support in weex now, you can use :${supportPseudoClass.join(' :')}.`
              })
            }
          } else if (cssTreeNode.type === 'Combinator') {
            context.report({
              cssTreeNode,
              loc: cssTreeNode.loc,
              message: `${cssTreeNode.type} \`${cssTreeNode.name}\` is not support in weex now, please do not use it.`
            })
          }
        })
      }
    })
  }
}
