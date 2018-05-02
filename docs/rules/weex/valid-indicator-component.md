# valid `<indicator>` component (vue/weex/valid-indicator-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks if the <indicator> component have contain other components.

## :book: Rule Details

This rule reports `indicator` components in the following cases:

- The component has that contains a component. E.g `<indicator><div></div></indicator>`.

## Ref

- [English Document -- <indicator> component](http://weex.apache.org/references/components/indicator.html)
- [中文文档 -- <indicator> 组件](http://weex.apache.org/cn/references/components/indicator.html)