# require default value for props (weex/vue/require-default-prop)

- :gear: This rule is included in `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

This rule requires default value to be set for each props that are not marked as `required`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
props: {
  a: Number,
  b: [Number, String],
  c: {
    type: Number
  },
  d: {
    type: Number,
    required: false
  }
}
```

Examples of **correct** code for this rule:

```js
props: {
  a: {
    type: Number,
    required: true
  },
  b: {
    type: Number,
    default: 0
  },
  c: {
    type: Number,
    default: 0,
    required: false
  }
}
```
