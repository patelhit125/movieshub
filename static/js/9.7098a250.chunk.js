(this.webpackJsonpmovieshub=this.webpackJsonpmovieshub||[]).push([[9],{59:function(e,s,t){"use strict";t.r(s);var c=t(0),a=t(10),i=t(31),d=t(32),r=t.n(d),n=t(1);s.default=e=>{const{id:s,name:t}=e,[d,o]=Object(c.useState)([]);let b,h;switch(t){case"movie":b=i.c,h="keywords";break;case"tv":b=i.g,h="results"}return Object(c.useEffect)((()=>{(async()=>{r.a.get(b+s+"/keywords?api_key="+i.a).then((e=>{o(e.data[h])})).catch((e=>{console.error(e)}))})()}),[b,s,h]),Object(n.jsx)("div",{children:Object(n.jsx)("div",{children:d.length>0&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("div",{className:"text-bold mt-4",children:"Keyword Cloud"}),Object(n.jsx)("div",{className:"mt-2",children:d.map(((e,s)=>Object(n.jsx)(a.b,{to:"/movieshub/keyword/"+e.id,className:"badge",children:e.name},s)))})]})})})}}}]);
//# sourceMappingURL=9.7098a250.chunk.js.map