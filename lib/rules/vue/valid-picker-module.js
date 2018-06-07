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
      description: 'enforce valid module picker in weex',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.12/docs/rules/valid-picker-module.md'
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
    function hasUsingProp (propNode, prop) {
      const calleedNode = propNode.body.body.find(p =>
        p.type === 'ExpressionStatement' &&
        p.expression &&
        p.expression.callee &&
        p.expression.callee.object.name === prop
      )
      return Boolean(calleedNode)
    }
    /**
     * Finds all props that don't have a default value set
     * @param {Property} propsNode - Vue component's "props" node
     * @return {boolean}
     */
    function findPropsWithFunctionExpression (propsNode, propname) {
      return propsNode
        .filter(prop => prop.type === 'FunctionExpression')
        .filter(prop => {
          return hasUsingProp(prop, propname)
        })
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

    function getModuleVar (text) {
      const name = /[const|let|var]\s*?(\w+)\s*?\= weex\.requireModule\([\'\"]picker[\'\"]\)/.exec(text)
      if (name) {
        return name[1]
      }
      return ''
    }
    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------
    return utils.executeOnVue(context, obj => {
      const sourceCodeText = context.getSourceCode().getText()
      const calleeName = getModuleVar(sourceCodeText)
      const functionExpression = findFunctionExpression(obj)
      if (!functionExpression || functionExpression.length === 0) return
      const propsWithFunctionExpression = findPropsWithFunctionExpression(functionExpression, calleeName)
      propsWithFunctionExpression.forEach(prop => {
        // console.log(prop.body.body[0].expression.callee.property.name)
        prop.body.body.forEach(body => {
          if (body.expression.arguments.length <= 1 || body.expression.arguments.length > 1 && (body.expression.arguments[1].type !== 'FunctionExpression' && body.expression.arguments[1].type !== 'Identifier')) {
            context.report({
              node: body,
              loc: body.loc,
              message: `Module \`picker\` needs callback function.`
            })
          }
        })
      })
    })
  }
}
