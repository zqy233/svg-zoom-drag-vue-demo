<template>
  <div id="svg" v-html="svgString" v-svgWheel v-svgDrag></div>
</template>
<script setup lang="ts">
import { svgText } from "./svgText";
/**
 * 创建 animate 元素，从而设置svg指定节点的设置闪络动画
 */
const setBling = (id: string) => {
  const doms = document.querySelectorAll(id);
  for (let i = 0; i < doms.length; i++) {
    const dom = doms[i];
    // document.createElementNS() 方法必须传递两个参数，第一个参数为所需的命名空间URI，第二个参数为要创建的元素名称。
    // 在使用 createElementNS() 方法创建 SVG 元素时，需要使用正确的命名空间URI，以确保浏览器能够正确地解析和渲染 SVG 元素及其属性
    // "http://www.w3.org/2000/svg" 是一个 URL 地址，表示 SVG（Scalable Vector Graphics，可缩放矢量图形）命名空间的标识符。
    // 在使用 JavaScript 操作 SVG 元素时，需要在创建元素之前指定所使用的命名空间，以确保正确解析元素和属性。因此，我们在创建 animate 元素时，使用 document.createElementNS() 方法，并传递 "http://www.w3.org/2000/svg" 作为命名空间的标识符，以告诉浏览器创建一个 SVG 元素
    const animateGraph = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    // 各个属性的含义：
    // attributeName：指定要应用动画的属性名称。在此代码段中，我们将其设置为 "visibility"，以使 animate 元素控制 SVG 元素的可见性。
    // from：指定动画的起始值。在此代码段中，我们将其设置为 "visible"，以使 SVG 元素一开始是可见的。
    // to：指定动画的结束值。在此代码段中，我们将其设置为 "hidden"，以使 SVG 元素最终是不可见的。
    // dur：指定动画的持续时间。在此代码段中，我们将其设置为 "1s"，即 1 秒钟。
    // fill：指定动画完成后要应用到 SVG 元素的属性值。在此代码段中，我们将其设置为 "freeze"，以使 SVG 元素保持在动画结束时的状态。
    // repeatCount：指定动画重复的次数。在此代码段中，我们将其设置为 "indefinite"，表示动画将无限期地重复执行。
    // 通过设置这些属性，我们可以使用 animate 元素来创建一个简单的动画，控制 SVG 元素的可见性。动画将在 1 秒钟内从 "visible" 到 "hidden"，然后在结束时将 SVG 元素的可见性保持为 "hidden"。同时，动画将无限期地重复执行。
    animateGraph.setAttribute("attributeName", "visibility");
    animateGraph.setAttribute("from", "visible");
    animateGraph.setAttribute("to", "hidden");
    animateGraph.setAttribute("dur", "1s");
    animateGraph.setAttribute("fill", "freeze");
    animateGraph.setAttribute("repeatCount", "indefinite");
    dom.appendChild(animateGraph);
  }
};

// 业务中我是请求后端，获取svg字符串，再用v-html渲染出来
// 这样的话，我们先定义一个空字符串
const svgString = ref("");
// 在onMounted里面再设置svg字符串的值，达到一个模拟的效果
onMounted(() => {
  svgString.value = svgText;

  nextTick(() => {
    // 设置svg整体闪烁
    // setBling("svg");
    // 设置指定节点闪烁：消息图标（若要在 document.querySelectorAll() 中根据多个属性的值选择，可以使用,号将这些属性值分隔开来）
    setBling(
      `path[d='M 923.06 63.32 L 923.06 31.24 L 923.06 27.57 L 923.51 24.67 L 924.32 22.39 L 925.45 20.61 L 926.88 19.24 L 928.68 18.23 L 930.90 17.59 L 933.67 17.36 L 1054.54 17.36 L 1057.39 17.59 L 1059.63 18.24 L 1061.37 19.23 L 1062.72 20.57 L 1063.72 22.30 L 1064.36 24.51 L 1064.60 27.33 L 1064.60 90.66 L 1064.87 92.59 L 1064.55 94.15 L 1063.67 95.48 L 1062.11 96.65 L 1059.61 97.63 L 1055.83 98.32 L 1050.34 98.60 L 946.71 98.60 L 923.06 124.95 L 923.06 63.32 Z'],
      path[d='M 1084.88 22.31 L 1084.66 25.38 L 1084.09 28.26 L 1083.16 30.96 L 1081.89 33.52 L 1079.71 36.64 L 1077.10 39.28 L 1074.03 41.49 L 1071.50 42.78 L 1068.83 43.72 L 1066.00 44.30 L 1062.97 44.52 L 1059.93 44.30 L 1057.10 43.72 L 1054.43 42.78 L 1051.90 41.49 L 1048.83 39.28 L 1046.22 36.64 L 1044.04 33.52 L 1042.77 30.96 L 1041.84 28.26 L 1041.27 25.38 L 1041.05 22.31 L 1041.27 19.23 L 1041.84 16.35 L 1042.77 13.65 L 1044.04 11.09 L 1046.22 7.97 L 1048.83 5.33 L 1051.90 3.13 L 1054.43 1.83 L 1057.10 0.90 L 1059.93 0.31 L 1062.97 0.09 L 1066.00 0.31 L 1068.83 0.90 L 1071.50 1.83 L 1074.03 3.13 L 1077.10 5.33 L 1079.71 7.97 L 1081.89 11.09 L 1083.16 13.65 L 1084.09 16.35 L 1084.66 19.23 L 1084.88 22.31 Z']`
    );
  });
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#svg {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
svg {
  width: 100% !important;
  height: 100% !important;
  user-select: none;
}
</style>
