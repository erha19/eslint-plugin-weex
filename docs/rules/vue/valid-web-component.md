# enforce valid `<web>` component (weex/vue/valid-web-component)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

This rule checks if the <web> component have contain other components.

## :book: Rule Details

This rule reports `web` components in the following cases:

- The component has that contains a component. E.g `<web><div></div></web>`.

## Ref

- [English Document -- <web> component](http://weex.apache.org/references/components/web.html)
- [中文文档 -- <web> 组件](http://weex.apache.org/cn/references/components/web.html)