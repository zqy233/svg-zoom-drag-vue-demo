import { App } from "vue";

/** 控制svg图片放大缩小，原理在于设置svg的viewbox属性，viewbox的第三个参数控制左右大小，第四个参数设置上下大小 */
export function svgWheel(app: App) {
  app.directive("svgWheel", (el: HTMLElement) => {
    if (el) {
      el.onwheel = (e: WheelEvent) => {
        // 因为使用v-html渲染svg，所以绑定命令的dom的子元素才是svg元素
        const svgDom = el.firstChild as SVGSVGElement;
        const viewBox = svgDom.getAttribute("viewBox") as string;
        const [x, y, width, height] = viewBox.split(/\s+/).map(parseFloat);
        // event.wheelDelta废弃了，使用event.deltaY代替
        // event.deltaY属性在向下滚动时返回正值，向上滚动时返回负值 ，否则为 0，event.wheelDelta则相反
        const scaleDelta = e.deltaY > 0 ? 0.9 : 1.1; // 缩放比例
        const newWidth = width * scaleDelta;
        const newHeight = height * scaleDelta;
        // 计算居中偏移量
        const dx = (width - newWidth) / 2;
        const dy = (height - newHeight) / 2;
        const newViewBox = `${x + dx} ${y + dy} ${newWidth} ${newHeight}`;
        svgDom.setAttribute("viewBox", newViewBox);
      };
    }
  });
}

/** 控制svg图片拖动，原理在于设置svg的viewbox属性，viewbox的第一个参数控制左右位置，第二个参数设置上下位置  */
export function svgDrag(app: App) {
  app.directive("svgDrag", (el: HTMLElement) => {
    let clientX = 0; // 上一次点的x轴的位置
    let clientY = 0; // 上一次点的y轴的位置
    let debounce = true; // 节流是必要的，否则拖拽效果会显得卡顿
    let isStartMoveSvg = false; // 是否开始拖拽
    let ratio = 1; // 拖动速度与大小的比例
    let sgvDom: SVGAElement; // svg元素
    let viewBox: string; // svg的viewbox属性
    let arrPoint: number[]; // svg的viewbox属性的值
    // 鼠标按下表示开始移动
    el.onmousedown = () => {
      isStartMoveSvg = true;
      const width = el.getBoundingClientRect().width;
      // 因为使用v-html渲染svg，所以绑定命令的dom的子元素才是svg元素
      sgvDom = el.firstChild as SVGAElement;
      viewBox = sgvDom.getAttribute("viewBox") as string;
      arrPoint = viewBox.split(/\s+/).map(parseFloat);
      // 根据大小动态调整拖动速度，不然越小越难拖动
      ratio = arrPoint[2] / width;
      if (ratio < 1) ratio = 1;
    };
    // 鼠标松开表示结束移动
    el.onmouseup = () => {
      isStartMoveSvg = false;
      clientX = 0;
      clientY = 0;
    };
    // 移动时动态设置viewbox
    el.onmousemove = (e: MouseEvent) => {
      if (debounce) {
        debounce = false;
        if (isStartMoveSvg) {
          if (clientX !== 0 && clientY !== 0) {
            arrPoint[0] = arrPoint[0] - (e.clientX - clientX) * ratio;
            arrPoint[1] = arrPoint[1] - (e.clientY - clientY) * ratio;
            sgvDom.setAttribute("viewBox", arrPoint.join(" "));
          }
          clientX = e.clientX;
          clientY = e.clientY;
        }
        setTimeout(() => {
          debounce = true;
        }, 50);
      }
    };
  });
}
