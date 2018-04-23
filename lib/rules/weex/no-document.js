/**
 * @fileoverview Enforces props default values to be valid.
 * @author Armano
 */
'use strict'
const utils = require('../../utils')

const NATIVE_TYPES = new Set([
  'String',
  'Number',
  'Boolean',
  'Function',
  'Object',
  'Array',
  'Symbol'
])

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'document api is invalid in weex.',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v1.0.0/docs/rules/no-document.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------
    /**
     * Checks if the passed prop is using document api
     * @param {Property} prop - Property AST node for a function expression
     * @return {boolean}
     */
    function hasUsingdocument (prop) {
      const calleedNode = prop.body.body.find(p =>
        p.type === 'ExpressionStatement' &&
        p.expression &&
        p.expression.callee.object.name === 'document'
      )
      return Boolean(calleedNode)
    }
    /**
     * Finds all props that don't have a default value set
     * @param {Property} propsNode - Vue component's "props" node
     * @return {boolean}
     */
    function findPropsWithFunctionExpression (propsNode, prop) {
      return propsNode
      .filter (prop => prop.type === 'FunctionExpression')
      .filter(prop => {
        return hasUsingdocument(prop)
      })
    }

    function findFunctionExpression (node) {
      if (!node.properties || node.properties.length === 0) return;
      let functionExpressionNode = [];
      let nodes = node.properties
      .map(p => {
        if (p.type === 'Property' || p.type === 'ObjectExpression' && p.key.type === 'Identifier' && p.value.type === 'ObjectExpression') {
          return p;
        }
      })
      if (nodes && nodes.length > 0) {
        nodes.forEach(objectExpressionNode => {
          if (!objectExpressionNode || !objectExpressionNode.value) return '';
          if (objectExpressionNode.value.type === 'FunctionExpression') {
            functionExpressionNode = [objectExpressionNode.value];
          }
          else if (objectExpressionNode.value.type === 'ObjectExpression') {
            let next = findFunctionExpression(objectExpressionNode.value);
            if (next && next.length > 0) {
              functionExpressionNode = functionExpressionNode.concat(next);
            }
          }
        })
      }
      return functionExpressionNode;
    }
    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------
    return utils.executeOnVue(context, obj => {
      const functionExpression = findFunctionExpression(obj)
      if (!functionExpression || functionExpression.length === 0) return ;
      const propsWithFunctionExpression = findPropsWithFunctionExpression(functionExpression, 'document')
      propsWithFunctionExpression.forEach(prop => {
        context.report({
          node: prop,
          loc: prop.loc,
          message: `document api is invalid in weex.`
        })
      })
    })
  }
}
