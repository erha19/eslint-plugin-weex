# valid `<input>` component (vue/weex/valid-input-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks if click event or some unsupport type is used in a <input> component.

## :book: Rule Details

This rule reports `input` components in the following cases:

- The component using click event. E.g `<input @click="click"/>`.
- The component using unsupport type. E.g `<input type="non-email"/>`.

## Ref

- [English Document -- <input> component](http://weex.apache.org/references/components/input.html)
- [中文文档 -- <input> 组件](http://weex.apache.org/cn/references/components/input.html)