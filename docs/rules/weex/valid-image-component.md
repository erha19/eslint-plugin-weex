# weex `<image>` component need style attributes of width and height (vue/weex/valid-image-component)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks if there is a width and height pattern on the image component to define the size， weex `<image>` component need style attributes of width and height.

## :book: Rule Details

This rule reports `image` components in the following cases:

- The component has that has no style or class attribute. E.g `<image></image>`.
- The component has that class attribute but not define `width` or `height` property. E.g `<image class="imageClass"></image> <style>.imageClass{ }</style>`.
- The component has that style attribute but not define `width` or `height` property. E.g `<image style=""></image>`.