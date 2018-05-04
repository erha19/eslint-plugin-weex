# eslint-plugin-weex

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-weex.svg?style=flat)](https://npmjs.org/package/eslint-plugin-weex)
[![NPM downloads](https://img.shields.io/npm/dm/eslint-plugin-weex.svg?style=flat)](https://npmjs.org/package/eslint-plugin-weex)
[![CircleCI](https://circleci.com/gh/erha19/eslint-plugin-weex.svg?style=svg)](https://circleci.com/gh/erha19/eslint-plugin-weex)

> Official ESLint plugin for Weex

## :grey_exclamation: Requirements

- [ESLint](http://eslint.org/) `>=3.18.0`.
  - `>=4.7.0` to use `eslint --fix`.
  - `>=4.14.0` to use with `babel-eslint`.
- Node.js `>=4.0.0`

## :cd: Installation

```bash
npm install --save-dev eslint eslint-plugin-weex
```

## :rocket: Usage

Create `.eslintrc.*` file to configure rules. See also: [http://eslint.org/docs/user-guide/configuring](http://eslint.org/docs/user-guide/configuring).

Example **.eslintrc.js**:

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
```

### Attention

All component-related rules are being applied to code that passes any of the following checks:

* `Vue.component()` expression
* `Vue.extend()` expression
* `Vue.mixin()` expression
* `export default {}` in `.vue` or `.jsx` file

If you however want to take advantage of our rules in any of your custom objects that are Vue components, you might need to use special comment `// @vue/component` that marks object in the next line as a Vue component in any file, e.g.:

```js
// @vue/component
const CustomComponent = {
  name: 'custom-component',
  template: '<div></div>'
}
```
```js
Vue.component('AsyncComponent', (resolve, reject) => {
  setTimeout(() => {
    // @vue/component
    resolve({
      name: 'async-component',
      template: '<div></div>'
    })
  }, 500)
})
```

### `eslint-disable` functionality in `<template>`

You can use `<!-- eslint-disable -->`-like HTML comments in `<template>` of `.vue` files. For example:

```html
<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div a="1" b="2" c="3" d="4">
  </div>
</template>
```

If you want to disallow `eslint-disable` functionality, please disable [vue/comment-directive](./docs/rules/comment-directive.md) rule.

## :gear: Configs

This plugin provides two predefined configs:
- `plugin:vue/base` - Settings and rules to enable correct ESLint parsing
- `plugin:vue/essential` - Above, plus rules to prevent errors or unintended behavior
- `plugin:vue/strongly-recommended` - Above, plus rules to considerably improve code readability and/or dev experience
- `plugin:vue/recommended` - Above, plus rules to enforce subjective community defaults to ensure consistency

## :bulb: Rules

Rules are grouped by priority to help you understand their purpose. The `--fix` option on the command line automatically fixes problems reported by rules which have a wrench :wrench: below.

<!--RULES_TABLE_START-->

### Base Rules (Enabling Correct ESLint Parsing)

Enforce all the rules in this category, as well as all higher priority rules, with:

```json
{
  "extends": "plugin:vue/base"
}
```

|    | Rule ID | Description |
|:---|:--------|:------------|
|  | [weex/vue/comment-directive](./docs/rules/vue/comment-directive.md) | support comment-directives in `<template>` |
|  | [weex/vue/jsx-uses-vars](./docs/rules/vue/jsx-uses-vars.md) | prevent variables used in JSX to be marked as unused |

### Priority A: Essential (Error Prevention)

Enforce all the rules in this category, as well as all higher priority rules, with:

```json
{
  "extends": "plugin:vue/essential"
}
```

|    | Rule ID | Description |
|:---|:--------|:------------|
|  | [weex/vue/no-async-in-computed-properties](./docs/rules/vue/no-async-in-computed-properties.md) | disallow asynchronous actions in computed properties |
|  | [weex/vue/no-document](./docs/rules/vue/no-document.md) | disallow document api is invalid in weex |
|  | [weex/vue/no-dupe-keys](./docs/rules/vue/no-dupe-keys.md) | disallow duplication of field names |
|  | [weex/vue/no-duplicate-attributes](./docs/rules/vue/no-duplicate-attributes.md) | disallow duplication of attributes |
|  | [weex/vue/no-global](./docs/rules/vue/no-global.md) | disallow global api may not exist in weex |
|  | [weex/vue/no-parsing-error](./docs/rules/vue/no-parsing-error.md) | disallow parsing errors in `<template>` |
|  | [weex/vue/no-reserved-keys](./docs/rules/vue/no-reserved-keys.md) | disallow overwriting reserved keys |
| :wrench: | [weex/vue/no-shared-component-data](./docs/rules/vue/no-shared-component-data.md) | enforce component's data property to be a function |
|  | [weex/vue/no-side-effects-in-computed-properties](./docs/rules/vue/no-side-effects-in-computed-properties.md) | disallow side effects in computed properties |
|  | [weex/vue/no-style-display](./docs/rules/vue/no-style-display.md) | weex not support to use `display` in style |
|  | [weex/vue/no-style-float](./docs/rules/vue/no-style-float.md) | weex not support to use `float` in style |
|  | [weex/vue/no-style-z-index](./docs/rules/vue/no-style-z-index.md) | disallow use `z-index` in style |
|  | [weex/vue/no-template-key](./docs/rules/vue/no-template-key.md) | disallow `key` attribute on `<template>` |
|  | [weex/vue/no-textarea-mustache](./docs/rules/vue/no-textarea-mustache.md) | disallow mustaches in `<textarea>` |
|  | [weex/vue/no-unused-vars](./docs/rules/vue/no-unused-vars.md) | disallow unused variable definitions of v-for directives or scope attributes |
|  | [weex/vue/no-v-cloak](./docs/rules/vue/no-v-cloak.md) | disallow use `v-cloak` directives |
|  | [weex/vue/no-v-html](./docs/rules/vue/no-v-html.md) | disallow use `v-html` directives |
|  | [weex/vue/no-v-show](./docs/rules/vue/no-v-show.md) | disallow use `no-v-show` directive |
|  | [weex/vue/no-window](./docs/rules/vue/no-window.md) | disallow window api is invalid in weex |
|  | [weex/vue/require-component-is](./docs/rules/vue/require-component-is.md) | require `v-bind:is` of `<component>` elements |
|  | [weex/vue/require-render-return](./docs/rules/vue/require-render-return.md) | enforce render function to always return value |
|  | [weex/vue/require-v-for-key](./docs/rules/vue/require-v-for-key.md) | require `v-bind:key` with `v-for` directives |
|  | [weex/vue/require-valid-default-prop](./docs/rules/vue/require-valid-default-prop.md) | enforce props default values to be valid |
|  | [weex/vue/return-in-computed-property](./docs/rules/vue/return-in-computed-property.md) | enforce that a return statement is present in computed property |
|  | [weex/vue/valid-cell-component](./docs/rules/vue/valid-cell-component.md) | enforce valid `<cell>` component |
|  | [weex/vue/valid-image-component](./docs/rules/vue/valid-image-component.md) | enforce valid `<image>` component |
|  | [weex/vue/valid-indicator-component](./docs/rules/vue/valid-indicator-component.md) | enforce valid `<indicator>` component |
|  | [weex/vue/valid-input-component](./docs/rules/vue/valid-input-component.md) | enforce valid `<input>` component |
|  | [weex/vue/valid-list-component](./docs/rules/vue/valid-list-component.md) | enforce valid `<list>` component |
|  | [weex/vue/valid-picker-module](./docs/rules/vue/valid-picker-module.md) | enforce valid module picker in weex |
|  | [weex/vue/valid-scroller-component](./docs/rules/vue/valid-scroller-component.md) | enforce valid `<scroller>` component |
|  | [weex/vue/valid-style-flex](./docs/rules/vue/valid-style-flex.md) | disallow use all properties with flex layout |
|  | [weex/vue/valid-style-font-family](./docs/rules/vue/valid-style-font-family.md) | disallow use multiple fonts in font-family |
|  | [weex/vue/valid-style-selector](./docs/rules/vue/valid-style-selector.md) | enforce valid css seletor used on the weex |
|  | [weex/vue/valid-switch-component](./docs/rules/vue/valid-switch-component.md) | enforce valid `<switch>` component |
|  | [weex/vue/valid-template-root](./docs/rules/vue/valid-template-root.md) | enforce valid template root |
|  | [weex/vue/valid-text-component](./docs/rules/vue/valid-text-component.md) | enforce valid `<text>` component |
|  | [weex/vue/valid-textarea-component](./docs/rules/vue/valid-textarea-component.md) | enforce valid `<textarea>` component |
|  | [weex/vue/valid-v-bind](./docs/rules/vue/valid-v-bind.md) | enforce valid `v-bind` directives |
|  | [weex/vue/valid-v-cloak](./docs/rules/vue/valid-v-cloak.md) | enforce valid `v-cloak` directives |
|  | [weex/vue/valid-v-else-if](./docs/rules/vue/valid-v-else-if.md) | enforce valid `v-else-if` directives |
|  | [weex/vue/valid-v-else](./docs/rules/vue/valid-v-else.md) | enforce valid `v-else` directives |
|  | [weex/vue/valid-v-for](./docs/rules/vue/valid-v-for.md) | enforce valid `v-for` directives |
|  | [weex/vue/valid-v-html](./docs/rules/vue/valid-v-html.md) | enforce valid `v-html` directives |
|  | [weex/vue/valid-v-if](./docs/rules/vue/valid-v-if.md) | enforce valid `v-if` directives |
|  | [weex/vue/valid-v-model](./docs/rules/vue/valid-v-model.md) | enforce valid `v-model` directives |
|  | [weex/vue/valid-v-on](./docs/rules/vue/valid-v-on.md) | enforce valid `v-on` directives |
|  | [weex/vue/valid-v-once](./docs/rules/vue/valid-v-once.md) | enforce valid `v-once` directives |
|  | [weex/vue/valid-v-pre](./docs/rules/vue/valid-v-pre.md) | enforce valid `v-pre` directives |
|  | [weex/vue/valid-v-show](./docs/rules/vue/valid-v-show.md) | enforce valid `v-show` directives |
|  | [weex/vue/valid-v-text](./docs/rules/vue/valid-v-text.md) | enforce valid `v-text` directives |
|  | [weex/vue/valid-video-component](./docs/rules/vue/valid-video-component.md) | enforce valid `<video>` component |
|  | [weex/vue/valid-web-component](./docs/rules/vue/valid-web-component.md) | enforce valid `<web>` component |

### Priority B: Strongly Recommended (Improving Readability)

Enforce all the rules in this category, as well as all higher priority rules, with:

```json
{
  "extends": "plugin:vue/strongly-recommended"
}
```

|    | Rule ID | Description |
|:---|:--------|:------------|
| :wrench: | [weex/vue/attribute-hyphenation](./docs/rules/vue/attribute-hyphenation.md) | enforce attribute naming style in template |
| :wrench: | [weex/vue/html-end-tags](./docs/rules/vue/html-end-tags.md) | enforce end tag style |
| :wrench: | [weex/vue/html-indent](./docs/rules/vue/html-indent.md) | enforce consistent indentation in `<template>` |
| :wrench: | [weex/vue/html-self-closing](./docs/rules/vue/html-self-closing.md) | enforce self-closing style |
| :wrench: | [weex/vue/max-attributes-per-line](./docs/rules/vue/max-attributes-per-line.md) | enforce the maximum number of attributes per line |
| :wrench: | [weex/vue/mustache-interpolation-spacing](./docs/rules/vue/mustache-interpolation-spacing.md) | enforce unified spacing in mustache interpolations |
| :wrench: | [weex/vue/name-property-casing](./docs/rules/vue/name-property-casing.md) | enforce specific casing for the name property in Vue components |
| :wrench: | [weex/vue/no-multi-spaces](./docs/rules/vue/no-multi-spaces.md) | disallow multiple spaces |
|  | [weex/vue/require-default-prop](./docs/rules/vue/require-default-prop.md) | require default value for props |
|  | [weex/vue/require-prop-types](./docs/rules/vue/require-prop-types.md) | require type definitions in props |
| :wrench: | [weex/vue/v-bind-style](./docs/rules/vue/v-bind-style.md) | enforce `v-bind` directive style |
| :wrench: | [weex/vue/v-on-style](./docs/rules/vue/v-on-style.md) | enforce `v-on` directive style |

### Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

Enforce all the rules in this category, as well as all higher priority rules, with:

```json
{
  "extends": "plugin:vue/recommended"
}
```

|    | Rule ID | Description |
|:---|:--------|:------------|
|  | [weex/vue/attributes-order](./docs/rules/vue/attributes-order.md) | enforce order of attributes |
| :wrench: | [weex/vue/html-quotes](./docs/rules/vue/html-quotes.md) | enforce quotes style of HTML attributes |
|  | [weex/vue/no-confusing-v-for-v-if](./docs/rules/vue/no-confusing-v-for-v-if.md) | disallow confusing `v-for` and `v-if` on the same element |
| :wrench: | [weex/vue/order-in-components](./docs/rules/vue/order-in-components.md) | enforce order of properties in components |
|  | [weex/vue/this-in-template](./docs/rules/vue/this-in-template.md) | enforce usage of `this` in template |

### Uncategorized

|    | Rule ID | Description |
|:---|:--------|:------------|
| :wrench: | [weex/vue/html-closing-bracket-newline](./docs/rules/vue/html-closing-bracket-newline.md) | require or disallow a line break before tag's closing brackets |
| :wrench: | [weex/vue/html-closing-bracket-spacing](./docs/rules/vue/html-closing-bracket-spacing.md) | require or disallow a space before tag's closing brackets |
|  | [weex/vue/prop-name-casing](./docs/rules/vue/prop-name-casing.md) | enforce specific casing for the Prop name in Vue components |
| :wrench: | [weex/vue/script-indent](./docs/rules/vue/script-indent.md) | enforce consistent indentation in `<script>` |

<!--RULES_TABLE_END-->

## :couple: FAQ

### What is the "Use the latest vue-eslint-parser" error?

The most rules of `eslint-plugin-weex` require `vue-eslint-parser` to check `<template>` ASTs.

Make sure you have one of the following settings in your **.eslintrc**:

- `"extends": ["plugin:vue/recommended"]`
- `"extends": ["plugin:vue/base"]`

If you already use other parser (e.g. `"parser": "babel-eslint"`), please move it into `parserOptions`, so it doesn't collide with the `vue-eslint-parser` used by this plugin's configuration:

```diff
- "parser": "babel-eslint",
  "parserOptions": {
+     "parser": "babel-eslint",
      "ecmaVersion": 2017,
      "sourceType": "module"
  }
```

The `vue-eslint-parser` uses the parser which is set by `parserOptions.parser` to parse scripts.

### Why doesn't it work on .vue file?

1. Make sure you don't have `eslint-plugin-html` in your config. The `eslint-plugin-html` extracts the content from `<script>` tags, but `eslint-vue-plugin` requires `<script>` tags and `<template>` tags in order to distinguish template and script in single file components.

  ```diff
    "plugins": [
      "vue",
  -   "html"
    ]
  ```

2. Make sure your tool is set to lint `.vue` files.
  - CLI targets only `.js` files by default. You have to specify additional extensions by `--ext` option or glob patterns. E.g. `eslint "src/**/*.{js,vue}"` or `eslint src --ext .vue`.
  - VSCode targets only JavaScript or HTML files by default. You have to add `{"autoFix": true, "language": "vue"}` into `eslint.validate` entry.

## :anchor: Semantic Versioning Policy

This plugin follows [semantic versioning](http://semver.org/) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## :newspaper: Changelog

We're using [GitHub Releases](https://github.com/vuejs/eslint-plugin-weex/releases).

## :beers: Contribution guide

In order to add a new rule, you should:
- Create issue on GH with description of proposed rule
- Generate a new rule using the [official yeoman generator](https://github.com/eslint/generator-eslint)
- Run `npm start`
- Write test scenarios & implement logic
- Describe the rule in the generated `docs` file
- Make sure all tests are passing
- Run `npm run update` in order to update readme and recommended configuration
- Create PR and link created issue in description

We're more than happy to see potential contributions, so don't hesitate. If you have any suggestions, ideas or problems feel free to add new [issue](https://github.com/vuejs/eslint-plugin-weex/issues), but first please make sure your question does not repeat previous ones.

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
