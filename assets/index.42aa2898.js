import{svgText as u}from"./svg.de830a8d.js";import{d as a,r as c,o as _,n as v,a as o,w as d,c as g,b as f}from"./index.f9e62019.js";const m=["innerHTML"],A=a({setup(p){const l=n=>{const t=document.querySelectorAll(n);if(console.log("\u9700\u8981\u95EA\u70C1\u7684svg\u8282\u70B9",t),t.length>0)for(let i=0;i<t.length;i++){const r=t[i],e=document.createElementNS("http://www.w3.org/2000/svg","animate");e.setAttribute("attributeName","visibility"),e.setAttribute("from","visible"),e.setAttribute("to","hidden"),e.setAttribute("dur","1s"),e.setAttribute("fill","freeze"),e.setAttribute("repeatCount","indefinite"),r.appendChild(e)}},s=c("");return _(()=>{s.value=u,v(()=>{l("g[filter='url(#filter5_f_469_2376)'],g[filter='url(#filter6_f_469_2376)']")})}),(n,t)=>{const i=o("svgWheel"),r=o("svgDrag");return d((f(),g("div",{id:"svg",innerHTML:s.value},null,8,m)),[[i],[r]])}}});export{A as default};