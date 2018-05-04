# valid css seletor used on the weex (weex/vue/valid-style-selector)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

Weex just support `ClassSelector` and part of `PseudoClassSelector`.

## :book: Rule Details

- supports

```
.
:active
:focus
:disabled
:enabled
```

This rule reports components in the following cases:

- The component has that style attribute. E.g `<style>#id {}</style>`.
