# enforce render function to always return value (weex/vue/require-render-return)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

This rule aims to enforce render function to always return value

## :book: Rule Details

:-1: Examples of **incorrect** code for this rule:

```js
export default {
  render () {}
}
```

```js
export default {
  render (h) {
    if (foo) {
      return h('div', 'hello')
    }
  }
}
```

:+1: Examples of **correct** code for this rule:

```js
export default {
  render (h) {
    return h('div', 'hello')
  }
}
```

## :wrench: Options

Nothing.
