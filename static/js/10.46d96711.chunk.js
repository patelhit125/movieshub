(this.webpackJsonpmovieshub=this.webpackJsonpmovieshub||[]).push([[10],{64:function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(31),r=a(35),i=a(37),l=a.n(i),n=a(32),A=a.n(n),b=a(34),o=a(1);t.default=e=>{const{id:t,name:a}=e,[i,n]=Object(s.useState)([]),[d,S]=Object(s.useState)(!0),[m,j]=Object(s.useState)(!0),u=Object(s.useRef)(null);let h;switch(a){case"movie":h=c.c;break;case"tv":h=c.g}return Object(s.useEffect)((()=>{(async()=>{A.a.get(h+t+"/reviews?api_key="+c.a).then((e=>{n(e.data.results)})).catch((e=>{console.error(e)}))})();(()=>{if(u.current){const e=u.current.classList.contains("clamp");e||u.current.classList.add("clamp"),j((e=>{const{clientHeight:t,scrollHeight:a}=e;return t!==a})(u.current)),e||u.current.classList.remove("clamp")}})()}),[h,t,u]),Object(o.jsx)("div",{children:i.length>0&&Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h2",{className:"mt-5 fw-bold mb-3",children:"REVIEWS"}),Object(o.jsx)("div",{className:d?"clamp":"long-text",ref:u,children:i.map(((e,t)=>{var a;return Object(o.jsx)("div",{children:Object(o.jsxs)("div",{className:"row mb-5",children:[Object(o.jsx)("div",{className:"col-lg-auto col-12 mt-3",children:Object(o.jsx)(r.LazyLoadImage,{className:"rounded-circle",src:e.author_details.avatar_path&&(null===(a=e.author_details.avatar_path)||void 0===a?void 0:a.substring(1)),effect:"opacity",alt:e.author,onError:e=>{e.target.onerror=null,e.target.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL9SURBVHgB7ZtNTxNhFIXvQPkSbQ3r8gcKP0BwbWGtAfYQ4tIQ4hqIa+AHEOKe4J6PPVXXbXFfGhPjpq2CpbTac8sMTSMEPaOr8ySTvnPf+05mnp6ZdjNBuVz+aeKv6TNBIYEkEkgigSQSSCKBJBJIIoEkEkgigSQSSCKBJBJIIoEkEkgigSQSSCKBJBJIIoEkEkgigSQSSCKBJBJIIoEkEkgigSQSSCKBJBJIIoEkEkgigSQSSCKBJLEILJVKls1mrVqtRrW1tTXb2dm59zGwdmVl5d79I9+Pbbi93bbfy+Mvr+1fEFsCK5VKJAxCDw4OIqH43Nvb8xrmQKFQiNbm83lfPzc3F9XQ290fHuPk5MT3g1bV+po3X1j3fqJe7Fxcu9bfOOvUGmUbvHhvI7V3US0OYhM4PT1tuVzOL3Rra8tWV1ejucXFRRcUpqw7bRCEftTW19e9hvQWi0ULgsCWlpaiY6RSKTs6Oork91+duRRsA9fSUHtYeevjRP3UHrSFdcZFG7r4YM1E2tMIuXGQsBiZmZnxFCaTSUun0y4HiRkfH7fl5WXvgUgkC70Qjp7Z2VmbmJjwdeDw8NCmpqZ8Dv34xBySmslkvNdqnyJpAKlqDGZuPberoYzVxl75uD76zIa/Hdt58oWxxCpwYWHBk7KxseEXDiAvHAMka35+3uvhLYr+biBre3vbx5CG5CHRqO/u7vq650/NfoxmIwmetDteGQpaN+eQuDy180e8PD+WxQgucH9/38fhswqiJicn/ZYNE4Z0gc3NTa+hpxsIDvuxQR5ua6yD0M5t/fG354BbFGkc+/zSmgNpa/Ulr2cCS31946NEe/5y5InFQfC/XvXCMw5J7JX1J/1IK9IYfhF3AYkQ2A2ee0H7h6a3zhDoXTkO/ZEmkUASCSSRQBIJJJFAEgkkkUASCSSRQBIJJJFAEgkkkUASCSSRQBIJJJFAEgkkkUASCSSRQBIJJJFAEgkkkUASCSSRQBIJJJFAEgkkkUASCSSRQBIJJPkF0hE0Fe+oOk4AAAAASUVORK5CYII="}},t)}),Object(o.jsxs)("div",{className:"col-lg-10 col-12 mt-3",children:[Object(o.jsxs)("h5",{className:"text-bold",children:["A review by ",e.author]}),Object(o.jsx)("div",{className:"text-secondary",children:Object(c.q)(e.created_at)}),Object(o.jsx)("div",{className:"mt-1",children:e.author_details.rating?Object(o.jsx)("span",{className:"stars",style:{"--rating":e.author_details.rating&&Object(c.m)(e.author_details.rating)}}):null}),Object(o.jsx)("div",{className:"mt-3 text-preline text-muted",children:Object(o.jsx)(l.a,{text:e.content,ideal:200,readMoreText:"Read more"})})]})]})},t)}))}),Object(o.jsx)("div",{className:"text-center mt-4",children:m&&Object(o.jsx)("button",{className:"btn btn-outline-dark text-light",onClick:()=>S(!d),children:d?Object(o.jsx)(b.b,{}):Object(o.jsx)(b.e,{})})})]})})}}}]);
//# sourceMappingURL=10.46d96711.chunk.js.map