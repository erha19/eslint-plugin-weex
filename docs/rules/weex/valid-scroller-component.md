# valid `<scroller>` component (vue/weex/valid-scroller-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks whether the `<list>` component is used in the `<scroller>` component.

## :book: Rule Details

This rule reports `scroller` components in the following cases:

- The component has that component. E.g `<scroller><list></list></scroller>`.
