(this["webpackJsonprestaurant-table"]=this["webpackJsonprestaurant-table"]||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(6),c=a.n(l),o=a(8),u=a(4),s=a.n(u),i=a(7),m=a(2);a(15);var p=function(e){var t=e.restaurantData;return e.loading&&console.log("loading"),r.a.createElement(r.a.Fragment,null,t.map((function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.city),r.a.createElement("td",null,e.state),r.a.createElement("td",null,e.telephone),r.a.createElement("td",null,e.genre.split(",").sort().join()))})))};var f=function(e){for(var t=e.postsPerPage,a=e.totalPosts,n=e.paginate,l=[],c=1;c<=Math.ceil(a/t);c++)l.push(c);return r.a.createElement("div",null,r.a.createElement("ul",{className:"pagination"},l.map((function(e){return r.a.createElement("li",{key:e,className:"page-item"},r.a.createElement("a",{onClick:function(){return n(e)},href:"!#",className:"page-link"},e))}))))};var E=function(){var e=Object(n.useState)([]),t=Object(m.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(1),u=Object(m.a)(c,2),E=u[0],h=u[1],d=Object(n.useState)(10),b=Object(m.a)(d,1)[0],g=Object(n.useState)(""),v=Object(m.a)(g,2),C=v[0],w=v[1];Object(n.useEffect)((function(){(function(){var e=Object(i.a)(s.a.mark((function e(){var t,a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants/",{headers:{Authorization:"Api-Key q3MNxtfep8Gt"}});case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,n=a.sort((function(e,t){var a=e.name.toLowerCase(),n=t.name.toLowerCase();return a<n?-1:a>n?1:0})),l(n),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var O,j=function(e){if(null!==e){var t=Object(o.a)(a).sort((function(t,a){var n=t[e].toLowerCase(),r=a[e].toLowerCase();return n<r?-1:n>r?1:0}));l(t)}},x=E*b,y=x-b,L=a.slice(y,x);return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Restaurant App"),r.a.createElement("br",null),r.a.createElement("input",{placeholder:"type name, city, or genre",type:"text",value:C,onChange:function(e){return w(e.target.value)}}),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"City"),r.a.createElement("th",null,r.a.createElement("button",{onClick:function(){return j("state")}},"State")),r.a.createElement("th",null,"Phone"),r.a.createElement("th",null,r.a.createElement("button",{onClick:function(){return j("genre")}},"Genre")))),r.a.createElement("tbody",{id:"tableData"},r.a.createElement(p,{restaurantData:(O=L,O.filter((function(e){return e.name.toLowerCase().indexOf(C.toLowerCase())>-1||e.city.toLowerCase().indexOf(C.toLowerCase())>-1||e.genre.toLowerCase().indexOf(C.toLowerCase())>-1||e.state.toLowerCase().indexOf(C.toLowerCase())>-1})))}))),r.a.createElement(f,{postsPerPage:b,totalPosts:a.length,paginate:function(e){h(e)}}))};c.a.render(r.a.createElement(E,null),document.getElementById("root"))},9:function(e,t,a){e.exports=a(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.7cb235aa.chunk.js.map