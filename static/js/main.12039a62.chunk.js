(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),c=n.n(o),i=(n(14),n(1)),u=n(6);n(15);function l(e){var t=e.list,n=e.done,a=e.remove,o=e.changeState,c=e.save;return r.a.createElement("ul",{className:"entries"},t.sort((function(e,t){return e.priority.charCodeAt(0)-t.priority.charCodeAt(0)})).reverse().filter((function(e){return e.done===n})).map((function(e,t){return r.a.createElement(s,{todoItem:e,remove:a,changeState:o,save:c,key:t})})))}function s(e){var t=e.todoItem,n=e.remove,a=e.changeState,o=e.save;return r.a.createElement("li",{id:t.priority},r.a.createElement("input",{checked:t.done,onChange:function(){return a(t)},type:"checkbox"}),r.a.createElement("input",{value:t.value,onChange:function(e){return o(t,e.target.value)},type:"text"}),r.a.createElement("button",{onClick:function(){return n(t)}},"remove"))}var m=n(2),h=n(3),f=function(){function e(t,n,a){Object(m.a)(this,e),this.value=t,this.done=n,this.priority=a}return Object(h.a)(e,[{key:"copy",value:function(){return new e(this.value,this.done,this.priority)}}]),e}();function v(e){return e instanceof f?new b(e.copy()):new d(e)}function d(e){var t=Object(i.a)(e);this.removeItem=function(e){return function(t){var n=e.indexOf(t);return e.splice(n,1),e}}(t),this.replace=function(e){return function(t){return new p(e,t)}}(t),this.get=function(){return t}}var p=function(){function e(t,n){Object(m.a)(this,e),this.list=t,this.first_obj=n}return Object(h.a)(e,[{key:"with",value:function(e){var t=this.list.indexOf(this.first_obj);return[].concat(Object(i.a)(this.list.slice(0,t)),[e],Object(i.a)(this.list.slice(t+1)))}}]),e}(),b=function(){function e(t){Object(m.a)(this,e),this.obj=t}return Object(h.a)(e,[{key:"change",value:function(e){return new E(this.obj,e)}}]),e}(),E=function(){function e(t,n){Object(m.a)(this,e),this.obj=t,this.property=n}return Object(h.a)(e,[{key:"to",value:function(e){return this.obj[this.property]=e,this.obj}}]),e}();function j(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)("a"),s=Object(u.a)(c,2),m=s[0],h=s[1];Object(a.useEffect)((function(){var e=JSON.parse(localStorage.getItem("todoList")).map((function(e){return new f((t=e).value,t.done,t.priority);var t}));o(e)}),[]),Object(a.useEffect)((function(){localStorage.setItem("todoList",JSON.stringify(n))}),[n]);var d=Object(a.useRef)(null),p=function(e){h(e.target.value)},b=function(e,t){var a=new f(e,!1,t);o([].concat(Object(i.a)(n),[a]))},E=function(e){if(window.confirm("Sure you wanna delete item?")){var t=v(n).removeItem(e);o(t)}},j=function(e){var t=v(e).change("done").to(!e.done),a=v(n).removeItem(e);o([].concat(Object(i.a)(a),[t]))},y=function(e,t){var a=v(e).change("value").to(t),r=v(n).replace(e).with(a);o(r)};return r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement("div",{className:"nav-container"},r.a.createElement("h1",null,r.a.createElement("a",{href:"/"},"Clever")))),r.a.createElement("div",{className:"main"},r.a.createElement("div",{className:"create",id:m},r.a.createElement("h1",null,"New To-do"),r.a.createElement("div",{className:"priority"},r.a.createElement("h4",null,"How important is this todo?"),r.a.createElement("form",null,["a","b","c"].map((function(e,t){return r.a.createElement("span",null,r.a.createElement("input",{type:"radio",name:"priority",id:e,value:e,onChange:p,key:t,checked:e===m,required:!0}),r.a.createElement("label",{htmlFor:"not"},e))})))),r.a.createElement("div",{className:"textbox"},r.a.createElement("input",{ref:d,name:"creationInput",placeholder:"What to do next?",required:!0})),r.a.createElement("button",{onClick:function(){var e=d.current;!function(e){return!function(e){return!e.value.trim()}(e)}(e)?alert("Do add something!"):(b(e.value,m),function(e){e.value=""}(e),h("a"))}},"Create")),r.a.createElement("div",null,r.a.createElement("h1",null,"To-Do's"),r.a.createElement(l,{done:!1,list:n,remove:E,changeState:j,save:y})),r.a.createElement("div",null,r.a.createElement("h1",null,"Done"),r.a.createElement(l,{done:!0,list:n,remove:E,changeState:j,save:y}))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.12039a62.chunk.js.map