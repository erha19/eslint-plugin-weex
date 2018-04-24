# global api may not exist in weex. (vue/weex/no-global)

- :gear: This rule is included in all of `"plugin:vue/essential"`, `"plugin:vue/strongly-recommended"` and `"plugin:vue/recommended"`.

> Since weex sdk version >= 0.18.0, weex has been isolates the variables of each page, see Releas note here http://weex.apache.org/releasenote.html#v0-18-0.


## :book: Rule Details
You can see all global variables on `Vue` and `Rax` here:

| DSL | window | document | global |
| --- | --- | --- | --- |
| Vue | no | no | uncertainty |
| Rax | yes | yes | uncertainty |

We recommend that you try not to use these global variables, you can use the [weex variable](http://weex.apache.org/references/weex-variable.html) to build your pages.