# valid `<textarea>` component (vue/weex/valid-textarea-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks if click event or some unsupport type is used in a <textarea> component.

## :book: Rule Details

This rule reports `textarea` components in the following cases:

- The component using click event. E.g `<textarea @click="click"/>`.
- The component using unsupport type. E.g `<textarea type="non-email"/>`.

## Ref

- [English Document -- <textarea> component](http://weex.apache.org/references/components/textarea.html)
- [中文文档 -- <textarea> 组件](http://weex.apache.org/cn/references/components/textarea.html)