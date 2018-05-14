# enforce valid module animation in weex (weex/vue/valid-animation-module)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

This rule checks whether the `animation` module has meet the rules.

## :book: Rule Details

While using `animation` module with wrong style, it will cause crash on native app, you can see the demo here [dotwe](http://dotwe.org/vue/0dca91753d40dc84e725fb8bd7c8918e).

This rule reports `animation` module in the following cases:

- The module using like this. E.g:

```
animation.transition(this.$refs.block1, {
  styles: {
      height: 'px',
      width : 'px',
      backgroundColor : self.bgc
    },
    timingFunction:  'ease',
    duration: 300,
    needLayout:false
  }, function() {
});
```
