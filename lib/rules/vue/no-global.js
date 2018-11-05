/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
/* eslint-disable eslint-plugin/report-message-format */

/**
 * @fileoverview Enforces props default values to be valid.
 * @author Armano
 */
'use strict'
const utils = require('../../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow global api may not exist in weex',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.1.2/docs/rules/no-global.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------
    /**
     * Checks if the passed prop is using global api
     * @param {Property} prop - Property AST node for a function expression
     * @return {boolean}
     */
    function hasUsingglobal (prop) {
      const calleedNodes = prop.body.body.filter(p =>
        p.type === 'ExpressionStatement' &&
        p.expression &&
        p.expression.callee &&
        p.expression.callee.object &&
        p.expression.callee.object.name === 'global'
      )
      return calleedNodes
    }

    /**
     * Finds all props that don't have a default value set
     * @param {Property} propsNode - Vue component's "props" node
     * @return {boolean}
     */
    function findPropsWithFunctionExpression (propsNode, prop) {
      let nodes = []
      propsNode
        .filter(prop => prop.type === 'FunctionExpression')
        .map(prop => {
          return hasUsingglobal(prop)
        })
        .forEach(prop => {
          nodes = nodes.concat(prop)
        })
      return nodes
    }

    function findFunctionExpression (node) {
      if (!node.properties || node.properties.length === 0) return
      let functionExpressionNode = []
      const nodes = node.properties
        .map(p => {
          if (p.type === 'Property' || p.type === 'ObjectExpression' && p.key.type === 'Identifier' && p.value.type === 'ObjectExpression') {
            return p
          }
        })
      if (nodes && nodes.length > 0) {
        nodes.forEach(objectExpressionNode => {
          if (!objectExpressionNode || !objectExpressionNode.value) return ''
          if (objectExpressionNode.value.type === 'FunctionExpression') {
            functionExpressionNode = [objectExpressionNode.value]
          } else if (objectExpressionNode.value.type === 'ObjectExpression') {
            const next = findFunctionExpression(objectExpressionNode.value)
            if (next && next.length > 0) {
              functionExpressionNode = functionExpressionNode.concat(next)
            }
          }
        })
      }
      return functionExpressionNode
    }
    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------
    return utils.executeOnVue(context, obj => {
      const functionExpression = findFunctionExpression(obj)
      if (!functionExpression || functionExpression.length === 0) return
      const propsWithFunctionExpression = findPropsWithFunctionExpression(functionExpression, 'global')
      propsWithFunctionExpression.forEach(prop => {
        context.report({
          node: prop,
          loc: prop.loc,
          message: `global api is invalid in weex.`
        })
      })
    })
  }
}
