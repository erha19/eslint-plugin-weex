# weex `<cell>` component does not support margin-top/margin-bottom (vue/weex/valid-cell-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks whether every `margin-top/margin-bottom` style is used on a `<cell>` component.

## :book: Rule Details

This rule reports `cell` components in the following cases:

- The component has that style attribute. E.g `<cell style="margin-top: 10px;"></cell>`.
- The component has that class attribute. E.g `<cell class="marginTopClass"></cell> <style>.marginTopClass{ margin-top: 10px; }</style>`.