/**
 * @author Erha19
 * @copyright 2018 Erha19. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../../lib/rules/vue/valid-image-component')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-image-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image style="width:500px;height:500px" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image style="width:500px;" :style="{height:'500px'}" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image style="width:500px;" :style="{height:data.height}" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :style="{width: '200px', height:'500px'}" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image class="image" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>
      <style>
        .image {
          width:500px;
          height:500px;
        }
        .other {
          width: 20px;
          height: 100px;
        }
      </style>
      `
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :class="image" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :class="'image'" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>
      <style>
        .image {
          width:500px;
          height:500px;
        }
        .other {
          width: 20px;
          height: 100px;
        }
      </style>
      `
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :class="bgStyle" style="" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :class="bgStyle" style="height:20px" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :style="bgStyle" style="" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image class="bgImage" :style="bgStyle" style="" src="https://vuejs.org/images/logo.png"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :class="['row-' + row.cols, 'row-item-image', 'row-item-image-' + row.cols]" :src="col.itemImg"></image>
        </div>
      </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image class="imagesClass" :style="{height: imageH}" :src="col.itemImg"></image>
        </div>
      </template>
      <style>
      .imagesClass {
        width: 120px;
      }
    </style>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image :class="imagesClass" :style="{height: imageH}" :src="col.itemImg"></image>
        </div>
      </template>
      <style>
      .imagesClass {
        width: 120px;
      }
    </style>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image class="images-class" :src="col.itemImg"></image>
        </div>
      </template>
      <style>
      .images-class {
        height: 20px;
        width: 120px;
      }
    </style>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div>
        <image class="images-class" :src="col.itemImg"></image>
        </div>
      </template>
      <style scoped="">
      .images-class {
        height: 20px;
        width: 120px;
      }
    </style>`
    },
    {
      filename: 'test.vue',
      code: `<template>
        <div class="wrapper">
          <image style="height:96px; width:96px;" :src="successIcon"></image>
          <image style="height:100px; width:100px" :src="logo" class="logo"></image>
          <image :src="logo" :class="logo"></image>
          <image style="height:96px; width:96px;" :src="successIcon"></image>
        </div>
      </template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <image class="image" src="https://vuejs.org/images/logo.png"></image>
      </div>
    </template>
    <style>
      .image {

      }
    </style>`,
      errors: ['The style attributes of width and height must be specified in image component, otherwise it won’t work.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <image :class="'image'" src="https://vuejs.org/images/logo.png"></image>
      </div>
    </template>
    <style>
      .image {

      }
    </style>`,
      errors: ['The style attributes of width and height must be specified in image component, otherwise it won’t work.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div>
      <image style="" src="https://vuejs.org/images/logo.png"></image>
      </div>
    </template>`,
      errors: ['The style attributes of width and height must be specified in image component, otherwise it won’t work.']
    },
    {
      filename: 'test.vue',
      code: `<template>
      <div class="wrapper">
        <image style="height:96px;" :src="successIcon"></image>
        <image style="height:100px; width:100px" :src="logo" class="logo"></image>
        <image :src="logo" class="logo"></image>
        <image style="height:96px;" :src="successIcon"></image>
      </div>
    </template>`,
      errors: [{
        message: 'The style attributes of width must be specified in image component, otherwise it won’t work.',
        line: 3,
        column: 9
      }, {
        message: 'The style attributes of width and height must be specified in image component, otherwise it won’t work.',
        line: 5,
        column: 9
      }, {
        message: 'The style attributes of width must be specified in image component, otherwise it won’t work.',
        line: 6,
        column: 9
      }]
    }
  ]
})
