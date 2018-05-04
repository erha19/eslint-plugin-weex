# weex not support to use `float` in style (weex/vue/no-style-float)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

Weex does not support `float` property, it will never be effect if you are use it.

## :book: Rule Details

This rule reports components in the following cases:

- The component has that style attribute. E.g `<cell style="float: left;"></cell>`.
- The component has that class attribute. E.g `<cell class="floatClass"></cell> <style>.floatClass{ float: left; }</style>`.