# valid module picker in weex (vue/weex/valid-picker-module)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

This rule checks whether the `picker` module has a callback function.

## :book: Rule Details

While using `picker` module without a callback function, it will cause crash on native app, you can see the demo here [dotwe](http://dotwe.org/vue/354a5e2b6f83062a87f6513e6cd81074).

This rule reports `picker` module in the following cases:

- The module using like this. E.g `picker.pick({index: this.index,items})`.
