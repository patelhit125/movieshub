(this.webpackJsonpmovieshub=this.webpackJsonpmovieshub||[]).push([[8,25],{44:function(e,t,r){"use strict";r.r(t);var s=r(0),a=r(31),c=r(34),i=r(32),n=r.n(i),b=r(1);t.default=e=>{const{id:t,name:r}=e,[i,m]=Object(s.useState)([]);let o,h;switch(r){case"movie":o=a.c,h="https://www.imdb.com/title/";break;case"tv":o=a.g,h="https://www.imdb.com/title/";break;case"person":o=a.e,h="https://www.imdb.com/name/"}return Object(s.useEffect)((()=>{(async()=>{n.a.get(o+t+"/external_ids?api_key="+a.a).then((e=>{m(e.data)})).catch((e=>{console.error(e)}))})()}),[o,t]),Object(b.jsxs)("div",{className:"mt-3",children:[i.imdb_id&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"mb-4",children:Object(b.jsxs)("a",{href:h+i.imdb_id,target:"_blank",rel:"noreferrer",children:["More on IMDB ",Object(b.jsx)(c.f,{className:"ms-2 mb-1"})]})})}),i.instagram_id&&Object(b.jsx)("a",{className:"h4 me-3",href:"https://www.instagram.com/"+i.instagram_id,target:"_blank",rel:"noreferrer",children:Object(b.jsx)(c.i,{})}),i.facebook_id&&Object(b.jsx)("a",{className:"h4 me-3",href:"https://www.facebook.com/"+i.facebook_id,target:"_blank",rel:"noreferrer",children:Object(b.jsx)(c.g,{})}),i.twitter_id&&Object(b.jsx)("a",{className:"h4 me-3",href:"https://twitter.com/"+i.twitter_id,target:"_blank",rel:"noreferrer",children:Object(b.jsx)(c.l,{})})]})}}}]);
//# sourceMappingURL=8.ff4b9033.chunk.js.map