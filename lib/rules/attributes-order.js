/**
 * @fileoverview enforce ordering of attributes
 * @author Erin Depew
 */
'use strict'
const utils = require('../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function getAttributeType (name, isDirective) {
  if (isDirective) {
    if (name === 'for') {
      return 'LIST_RENDERING'
    } else if (name === 'if' || name === 'else-if' || name === 'else' || name === 'show' || name === 'cloak') {
      return 'CONDITIONALS'
    } else if (name === 'pre' || name === 'once') {
      return 'RENDER_MODIFIERS'
    } else if (name === 'model') {
      return 'TWO_WAY_BINDING'
    } else if (name === 'on') {
      return 'EVENTS'
    } else if (name === 'html' || name === 'text') {
      return 'CONTENT'
    } else {
      return 'OTHER_ATTR'
    }
  } else {
    if (name === 'is') {
      return 'DEFINITION'
    } else if (name === 'id') {
      return 'GLOBAL'
    } else if (name === 'ref' || name === 'key' || name === 'slot') {
      return 'UNIQUE'
    } else {
      return 'OTHER_ATTR'
    }
  }
}
function getPosition (attribute, attributeOrder) {
  let attributeType
  if (attribute.directive && attribute.key.name === 'bind') {
    attributeType = getAttributeType(attribute.key.argument, false)
  } else {
    attributeType = getAttributeType(attribute.key.name, attribute.directive)
  }
  return attributeOrder.indexOf(attributeType)
}

function create (context) {
  const sourceCode = context.getSourceCode()
  let attributeOrder = ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_ATTR', 'EVENTS', 'CONTENT']
  if (context.options[0] && context.options[0].order) {
    attributeOrder = context.options[0].order
  }
  let currentPosition
  let previousNode

  function reportIssue (node, previousNode) {
    const currentNode = sourceCode.getText(node.key)
    const prevNode = sourceCode.getText(previousNode.key)
    context.report({
      node: node.key,
      loc: node.loc,
      message: `Attribute "${currentNode}" should go before "${prevNode}".`,
      data: {
        currentNode
      }
    })
  }

  return utils.defineTemplateBodyVisitor(context, {
    'VStartTag' () {
      currentPosition = -1
      previousNode = null
    },
    'VAttribute' (node) {
      if ((currentPosition === -1) || (currentPosition <= getPosition(node, attributeOrder))) {
        currentPosition = getPosition(node, attributeOrder)
        previousNode = node
      } else {
        reportIssue(node, previousNode)
      }
    }
  })
}

module.exports = {
  meta: {
    docs: {
      description: 'enforce order of attributes',
      category: 'recommended'
    },
    fixable: null,
    schema: {
      type: 'array',
      properties: {
        order: {
          items: {
            type: 'string'
          },
          maxItems: 10,
          minItems: 10
        }
      }
    }
  },
  create
}
