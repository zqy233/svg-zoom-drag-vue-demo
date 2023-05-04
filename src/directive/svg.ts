import { App } from "vue";

/** 控制svg图片放大缩小，原理在于设置svg的viewbox属性，viewbox的第三个参数控制左右大小，第四个参数设置上下大小 */
export function svgWheel(app: App) {
  app.directive("svgWheel", (el: HTMLElement) => {
    if (el) {
      el.onwheel = (e: WheelEvent) => {
        // 因为使用v-html渲染svg，所以绑定命令的dom的子元素才是svg元素
        const sgvDom = el.firstChild as SVGAElement;
        // 获取svg的viewbox属性
        const viewBox = sgvDom.getAttribute("viewBox") as string;
        const arrPoint = viewBox.split(/\s+/);
        // event.wheelDelta废弃了，使用event.deltaY代替
        // 正数表示向上滚动，负数表示向下滚动
        if (e.deltaY > 0) {
          arrPoint[2] = parseInt(arrPoint[2]) * 0.9 + "";
          arrPoint[3] = parseInt(arrPoint[3]) * 0.9 + "";
        } else {
          arrPoint[2] = parseInt(arrPoint[2]) / 0.9 + "";
          arrPoint[3] = parseInt(arrPoint[3]) / 0.9 + "";
        }
        sgvDom.setAttribute("viewBox", arrPoint.join(" "));
      };
    }
  });
}

/** 控制svg图片拖动，原理在于设置svg的viewbox属性，viewbox的第一个参数控制左右位置，第二个参数设置上下位置  */
export function svgDrag(app: App) {
  app.directive("svgDrag", (el: HTMLElement) => {
    let clientX = 0; // 上一次点的x轴的位置
    let clientY = 0; // 上一次点的y轴的位置
    let debounce = true; // 节流
    let isStartMoveSvg = false; // 是否开始了移动
    // 鼠标按下表示开始移动
    el.onmousedown = () => {
      isStartMoveSvg = true;
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
        const sgvDom = el.firstChild as SVGAElement;
        if (isStartMoveSvg) {
          // 因为使用v-html渲染svg，所以绑定命令的dom的子元素才是svg元素
          const viewBox = sgvDom.getAttribute("viewBox") as string;
          const arrPoint = viewBox.split(/\s+/);
          if (clientX !== 0 && clientY !== 0) {
            // 乘以3用于加快拖动的速度
            arrPoint[0] = String(
              Number(arrPoint[0]) - (e.clientX - clientX) * 3
            );
            arrPoint[1] = String(
              Number(arrPoint[1]) - (e.clientY - clientY) * 3
            );
            const svg = sgvDom as SVGAElement;
            svg.setAttribute("viewBox", arrPoint.join(" "));
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
