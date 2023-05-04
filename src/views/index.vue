<template>
  <div id="svg" v-html="svgString" v-svgWheel v-svgDrag></div>
</template>
<script setup lang="ts">
import { svgText } from "./svg";
/** 创建 animate 元素，从而设置svg指定节点的设置闪络动画 */
const setBling = (id: string) => {
  const doms = document.querySelectorAll(id);
  console.log("需要闪烁的svg节点", doms);
  if (doms.length > 0) {
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
  }
};

// 业务中我是请求后端，获取svg字符串，再用v-html渲染出来
// 这样的话，我们先定义一个空字符串
const svgString = ref("");
// 在onMounted里面再设置svg字符串的值，达到一个模拟的效果
onMounted(() => {
  svgString.value = svgText;

  nextTick(() => {
    // 设置整体闪烁
    // setBling("svg");
    // 若要在 document.querySelectorAll() 中选择多个属性的值，可以使用 , 将这些属性值分隔开来。
    // 设置指定节点闪烁：眼睛
    // setBling(
    //   "rect[fill='black'],rect[fill='url(#paint8_linear_469_2376)'],rect[fill='url(#paint5_linear_469_2376)'],rect[stroke='url(#paint6_linear_469_2376)'],rect[stroke='url(#paint9_linear_469_2376)'],circle[fill='white']"
    // );
    // 设置指定节点闪烁：嘴巴
    // setBling("path[stroke-linejoin='round']");
    // 设置指定节点闪烁：腮红
    setBling(
      "g[filter='url(#filter5_f_469_2376)'],g[filter='url(#filter6_f_469_2376)']"
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
  background-color: skyblue;
  overflow: hidden;
}
svg {
  width: 100% !important;
  height: 100% !important;
}
</style>
