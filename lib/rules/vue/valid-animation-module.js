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
      description: 'enforce valid module animation in weex',
      category: 'essential',
      url: 'https://github.com/weexteam/eslint-plugin-weex/blob/v1.0.12/docs/rules/valid-animation-module.md'
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
      const name = /[const|let|var]\s*?(\w+)\s*?\= weex\.requireModule\([\'\"]animation[\'\"]\)/.exec(text)
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
      const checkPropertyReg = {
        width: /^(\d+)(px|wx)?/,
        height: /^(\d+)(px|wx)?/
      }
      if (!functionExpression || functionExpression.length === 0) return
      const propsWithFunctionExpression = findPropsWithFunctionExpression(functionExpression, calleeName)
      propsWithFunctionExpression.forEach(prop => {
        prop.body.body.forEach(body => {
          const args = body.expression && body.expression.arguments || []
          if (args.length > 1 && args[1].type === 'ObjectExpression') {
            const options = args[1].properties
            options.forEach(node => {
              if (node.key.name === 'styles' && node.value.type === 'ObjectExpression') {
                const styles = node.value.properties
                styles.forEach(style => {
                  if (checkPropertyReg[style.key.name] && style.value.type === 'Literal') {
                    if (!checkPropertyReg[style.key.name].test(style.value.value)) {
                      context.report({
                        node: style,
                        loc: style.loc,
                        message: `The style ${style.key.name} on \`animation\` module function need to meet the rules \`${checkPropertyReg[style.key.name]}\``
                      })
                    }
                  }
                })
              }
            })
          }
        })
      })
    })
  }
}
