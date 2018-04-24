# valid `<list>` component (vue/weex/valid-list-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks whether the `<scroller>` component is used in the `<list>` component.

## :book: Rule Details

This rule reports `list` components in the following cases:

- The component has that component. E.g `<list><scroller></scroller></list>`.
