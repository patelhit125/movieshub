(this.webpackJsonpmovieshub=this.webpackJsonpmovieshub||[]).push([[31,30],{61:function(e,t,s){"use strict";s.r(t);var c=s(0),i=s(34),d=s(47),m=s(31),n=s(1);t.default=e=>{const{title:t,name:s,id:a,season:l,episode:r,play:o}=e,b=Object(c.useRef)(null);return Object(n.jsx)("div",{className:"btn-overlay",children:t&&Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"btn-play",onClick:()=>{b.current.classList.contains("hide")&&(b.current.classList.remove("hide"),document.getElementById("body").classList.add("overflow"),document.getElementById("iframe").src=`${m.h}${"movie"===s?`embed/${a}`:"tv"===s?`embedtv/${a}&s=${l}&e=${r}`:`https://2anime.xyz/embed/${t}${r}`}`,document.getElementById("iframe").src=document.getElementById("iframe").src)},children:[Object(n.jsx)(d.a,{})," ",o]}),Object(n.jsxs)("div",{className:"overlay hide",ref:b,children:[Object(n.jsx)("div",{className:"close",onClick:()=>{b.current.classList.contains("hide")||(b.current.classList.add("hide"),document.getElementById("body").classList.remove("overflow"),document.getElementById("iframe").src="",document.getElementById("iframe").src=document.getElementById("iframe").src)},children:Object(n.jsx)(i.m,{})}),Object(n.jsx)("iframe",{id:"iframe",className:"w-100 h-100",title:t,frameBorder:"0",allowFullScreen:!0,width:"100%",height:"100%",loading:"lazy",src:`${m.h}${"movie"===s?`embed/${a}`:"tv"===s?`embedtv/${a}&s=${l}&e=${r}`:`https://2anime.xyz/embed/${t}${r}`}`})]})]})})}}}]);
//# sourceMappingURL=31.add54ed8.chunk.js.map