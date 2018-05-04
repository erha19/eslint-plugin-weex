# enforce valid style root (weex/vue/valid-style-root)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

This rule checks whether every style root is valid.

## :book: Rule Details

This rule reports the style root in the following cases:

- The root is has not `scoped` attribute. E.g. `<style></style>`.


:-1: Examples of **incorrect** code for this rule:

```html
<style>
  .hello{

  }
</style>
```

:+1: Examples of **correct** code for this rule:
```html
<style scoped>
  .hello{

  }
</style>
```

## :wrench: Options

Nothing.
