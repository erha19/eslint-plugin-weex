# valid `<video>` component (weex/vue/valid-video-component)

- :gear: This rule is included in all of `"plugin:weex/vue/essential"`, `"plugin:weex/vue/strongly-recommended"` and `"plugin:weex/vue/recommended"`.

This rule checks if the <video> component have contain other components.

## :book: Rule Details

This rule reports `video` components in the following cases:

- The component has that contains a component. E.g `<video><div></div></video>`.

## Ref

- [English Document -- <video> component](http://weex.apache.org/references/components/video.html)
- [中文文档 -- <video> 组件](http://weex.apache.org/cn/references/components/video.html)