# disallow use `z-index` in style (vue/weex/no-style-z-index)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

Weex does not support `z-index` property now.

## :book: Rule Details

This rule reports components in the following cases:

- The component has that style attribute. E.g `<cell style="z-index: 10;"></cell>`.
- The component has that class attribute. E.g `<cell class="zIndexClass"></cell> <style>.zIndexClass{ z-index: 10 }</style>`.