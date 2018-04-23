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

function detectList (node) {
  let lists = [];
  if (node.children) {
    node.children.forEach(child => {
      if (child.name === 'list') {
        lists.push(child);
      }
      else {
        if (child.children && child.children.length > 0) {
          lists.push(detectList(child));
        }
      }
    })
  }
  return lists;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'valid `<scroller>` component',
      category: 'essential',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v1.0.0/docs/rules/valid-scroller-component.md'
    },
    fixable: null,
    schema: []
  },

  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='scroller']" (node) {
        let detect = detectList(node);
        if (detect.length > 0) {
          detect.forEach(d => {
            context.report({
              d,
              loc: d.loc,
              message: `Cannot use <list> component in <scroller> component`
            })
          })
        }
      }
    })
  }
}
