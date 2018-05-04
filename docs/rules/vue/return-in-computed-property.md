# enforce that a return statement is present in computed property (weex/vue/return-in-computed-property)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

## :book: Rule Details

This rule enforces that a `return` statement is present in `computed` properties.

:-1: Examples of **incorrect** code for this rule:

```js
export default {
  computed: {
    foo () {},
    bar: function () {}
  }
}
```

:+1: Examples of **correct** code for this rule:

```js
export default {
  computed: {
    foo () {
      return true
    },
    bar: function () {
      return false
    }
  }
}
```

## :wrench: Options

This rule has an object option:
- `"treatUndefinedAsUnspecified"`: `true` (default) disallows implicitly returning undefined with a `return;` statement.

```json
{
  "vue/return-in-computed-property": [2, {
    "treatUndefinedAsUnspecified": true
  }]
}
```
