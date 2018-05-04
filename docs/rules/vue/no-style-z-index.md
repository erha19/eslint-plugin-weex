# disallow use `z-index` in style (weex/vue/no-style-z-index)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

Weex does not support `z-index` property now.

## :book: Rule Details

This rule reports components in the following cases:

- The component has that style attribute. E.g `<cell style="z-index: 10;"></cell>`.
- The component has that class attribute. E.g `<cell class="zIndexClass"></cell> <style>.zIndexClass{ z-index: 10 }</style>`.