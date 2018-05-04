# disallow use all properties with flex layout (weex/vue/valid-style-flex)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

Weex does not fully support `flex layout` property, it will never be effect if you use it wrong.

## :book: Rule Details

- supports

```
flex-direction
justify-content
flex-wrap
```

- partial support

```
flex - just support single number value
align-items - not support `baseline`
align-self - not support `baseline`
```

- unsupport

```
flex-grow
flex-shrink
flex-basis
order
```

This rule reports components in the following cases:

- The component has that style attribute. E.g `<div style="flex: 1 1 auto; ..."></div>`.
- The component has that class attribute. E.g `<cell class="flexClass"></cell> <style>.flexClass{ flex:  1 1 auto; ... }</style>`.