# valid `<text>` component (weex/vue/valid-text-component)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

This rule checks if there is some component used in a text component or some text are not wrapped by <text> component.

## :book: Rule Details

This rule reports `text` components in the following cases:

- The component has that contains a component. E.g `<text><div></div></text>`.
- The text has used in a non-text component. E.g `<div>Text</div>`.

## Ref

- [English Document -- <text> component](http://weex.apache.org/references/components/text.html)
- [中文文档 -- <text> 组件](http://weex.apache.org/cn/references/components/text.html)