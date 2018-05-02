# valid `<switch>` component (vue/weex/valid-switch-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks if the <switch> component have contain other components.

## :book: Rule Details

This rule reports `switch` components in the following cases:

- The component has that contains a component. E.g `<switch><div></div></switch>`.

## Ref

- [English Document -- <switch> component](http://weex.apache.org/references/components/switch.html)
- [中文文档 -- <switch> 组件](http://weex.apache.org/cn/references/components/switch.html)