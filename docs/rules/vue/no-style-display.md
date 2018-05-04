# weex not support to use `display` in style (weex/vue/no-style-display)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

Weex does not support `display` property, the default layout elements are flex layouts, it means if you are using a `<div>` element, it will be `display:flex`.

## :book: Rule Details

This rule reports components in the following cases:

- The component has that style attribute. E.g `<cell style="display: none;"></cell>`.
- The component has that class attribute. E.g `<cell class="displayClass"></cell> <style>.displayClass{ display: node; }</style>`.