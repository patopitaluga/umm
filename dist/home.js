!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=10)}([function(e,t,n){var r=n(6);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n(3).default)("585d91bb",r,!0,{})},function(e,t,n){var r=n(8);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n(3).default)("e61a93e0",r,!0,{})},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(i=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),a=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(a).concat([o]).join("\n")}var i,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);r&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},o=0;o<t.length;o++){var a=t[o],i=a[0],s={id:e+":"+o,css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}n.r(t),n.d(t,"default",(function(){return m}));var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},i=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,u=!1,d=function(){},p=null,l="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(e,t,n,o){u=n,p=o||{};var i=r(e,t);return g(i),function(t){for(var n=[],o=0;o<i.length;o++){var s=i[o];(c=a[s.id]).refs--,n.push(c)}t?g(i=r(e,t)):i=[];for(o=0;o<n.length;o++){var c;if(0===(c=n[o]).refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete a[c.id]}}}}function g(e){for(var t=0;t<e.length;t++){var n=e[t],r=a[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(h(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var i=[];for(o=0;o<n.parts.length;o++)i.push(h(n.parts[o]));a[n.id]={id:n.id,refs:1,parts:i}}}}function f(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function h(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(u)return d;r.parentNode.removeChild(r)}if(l){var o=c++;r=s||(s=f()),t=_.bind(null,r,o,!1),n=_.bind(null,r,o,!0)}else r=f(),t=b.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var v,y=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function _(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function b(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),p.ssrId&&e.setAttribute("data-vue-ssr-id",t.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},function(e,t){const n=function(e){e=(e=e.replace(/^\s+|\s+$/g,"")).toLowerCase();for(let t=0,n="áéíóúöüñ".length;t<n;t++)e=e.replace(new RegExp("áéíóúöüñ".charAt(t),"g"),"aeiououn".charAt(t));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")};String.prototype.showMatching=function(e,t){for(var n=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),r=new RegExp(n,"ig"),o=this;null!=(match=r.exec(this));)o=[(o=[o.slice(0,match.index),"<span>",o.slice(match.index)].join("")).slice(0,match.index+t.length),"</span>",o.slice(match.index+t.length)].join("");return o},e.exports={mtdBlurSearchInput:function(){},mtdDisplaySuggestions:function(){this.vdInputSuggestionTerm.length},mtdSuggestSearchTermChanged:function(){const e=[];if(0!==this.vdInputSuggestionTerm.length){var t=this._data;this.vpMemeList.forEach((function(r){""!==r.img&&(n(r.name).indexOf(n(t.vdInputSuggestionTerm))>-1||n(String(r.year)).indexOf(n(t.vdInputSuggestionTerm))>-1||n(String(r.category)).indexOf(n(t.vdInputSuggestionTerm))>-1)&&e.push({img:r.img,name:r.name.showMatching(t.vdInputSuggestionTerm,"<span>"+t.vdInputSuggestionTerm+"</span>")})})),this.vdMatchingMemes=e}},mtdSuggestionSelected:function(e,t){},mtdMemeClicked:function(e){this.$emit("memeclicked",e)}}},function(e,t,n){"use strict";var r=n(0);n.n(r).a},function(e,t,n){(t=n(2)(!1)).push([e.i,"",""]),e.exports=t},function(e,t,n){"use strict";var r=n(1);n.n(r).a},function(e,t,n){(t=n(2)(!1)).push([e.i,".search__input{margin-top:10px;border:1px #666 solid;border-radius:5px;padding:10px 20px}.search__input:focus{border:1px #999 solid;outline:none}.search__results{display:flex;flex-wrap:wrap;list-style:none;margin:10px 0 0;padding:0}.search__results li{box-sizing:border-box;display:block;margin:0;padding:0 5px 10px;width:50%;text-align:center}.search__results li img{display:block;width:100%}.search__suggestion span{font-weight:bold}.search__suggestion__title{padding-top:10px;text-align:center;width:100%}.search__suggestion__link{font-size:16px;color:#666;display:block;padding:5px 0}.search__suggestion__btn{background:#aaa;border:0;border-radius:5px;color:#fff;cursor:pointer;display:block;margin:0 auto;padding:7px 12px}\n",""]),e.exports=t},function(e,t){e.exports=[{name:"Baby Yoda",img:"baby-yoda.png",year:2019,category:""},{name:"Me and the Boys",img:"me-and-the-boys.png",year:2019,category:""},{name:"Stonks",img:"stonks.png",year:2019,category:""},{name:"Woman Yelling at a Cat",img:"woman-yelling-at-a-cat.jpg",year:2019,category:""},{name:"Joker stairs",img:"joker-stairs.jpg",year:2019,category:""},{name:"Boomer vs Zoomer",img:"boomer-vs-zoomer.jpg",year:2019,category:""},{name:"American Chopper Argument",img:"american-chopper-argument.jpg",year:2018,category:""},{name:"Bongo Cat",img:"bongo-cat.jpg",year:2018,category:""},{name:"Bowsette",img:"bowsette.jpg",year:2018,category:""},{name:"Is This a Pigeon?",img:"is-this-a-pidgeon.jpg",year:2018,category:""},{name:"Kongchetumare",img:"kongchetumare.jpg",year:2018,category:""},{name:"Moth Lamp",img:"moth-lamp.jpg",year:2018,category:""},{name:"Steamed Hams / Hamburguejas al vapor",img:"steamed-hams.jpg",year:2018,category:"simpsons"},{name:"Surprised Pikachu",img:"surprised-pikachu.jpg",year:2018,category:""},{name:"Burns pero la concha de tu madre (blank)",img:"burns-pero-la-concha-de-tu-madre-blank.jpg",year:2019,category:"simpsons"},{name:"Burns pero la concha de tu madre",img:"burns-pero-la-concha-de-tu-madre.jpg",year:2019,category:"simpsons"},{name:"Rafa: Estoy feliz y enojado",img:"rafa-estoy-feliz-y-enojado.jpg",category:"simpsons"},{name:"Homero: Poder político",img:"homero-poder-politico.jpg",category:"simpsons"},{name:"Usted no aprende verdad",img:"usted-no-aprende-verdad.jpg",category:"simpsons"},{name:"Profesor Cocoon: Yo diría que sí",img:"yo-diria-que-si.jpg",category:"simpsons"},{name:"Skinner: no hay cuerpos",img:"skinner-no-hay-cuerpos.jpg",category:"simpsons"},{name:"Todo marcha bien Milhouse",img:"todo-marcha-bien-milhouse.jpg",category:"simpsons"},{name:"Lisa café",img:"lisa-cafe.jpg",category:"simpsons"},{name:"Lester",img:"lester.jpg",category:"simpsons"}]},function(e,t,n){"use strict";n.r(t);var r={props:{vpMemeList:{required:!0,type:Array}},methods:{mtdEditSelected:function(e){window.location.href="/edit/"+e}}};n(5);function o(e,t,n,r,o,a,i,s){var c,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),a&&(u._scopeId="data-v-"+a),i?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=c):o&&(c=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(u.functional){u._injectStyles=c;var d=u.render;u.render=function(e,t){return c.call(t),d(e,t)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,c):[c]}return{exports:e,options:u}}var a=o(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"search__results"},e._l(e.vpMemeList,(function(t,r){return n("li",{key:r,staticClass:"search__suggestion"},[n("img",{attrs:{src:"memes/"+t.img}}),e._v(" "),n("div",{staticClass:"search__suggestion__title",domProps:{innerHTML:e._s(t.name)}}),e._v(" "),n("a",{staticClass:"search__suggestion__link",attrs:{href:"/download/"+t.img},on:{click:function(n){return n.preventDefault(),e.$emit("memeclicked",t)}}},[e._v("\n      Download\n    ")]),e._v(" "),n("button",{staticClass:"search__suggestion__btn",on:{click:function(n){return e.mtdEditSelected(t.img)}}},[e._v("\n      Add text\n    ")])])})),0)}),[],!1,null,null,null).exports,i=n(4),s={components:{memelist:a},props:{vpMemeList:{required:!0,type:Array}},data:function(){return{vdInputSuggestionTerm:"",vdMatchingMemes:[]}},mounted:function(){this.$refs.searchinput.value=""},methods:i},c=(n(7),o(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("form",{attrs:{autocomplete:"off"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.vdInputSuggestionTerm,expression:"vdInputSuggestionTerm"}],ref:"searchinput",staticClass:"search__input",attrs:{type:"text",placeholder:"Search meme by name, year or category"},domProps:{value:e.vdInputSuggestionTerm},on:{blur:e.mtdBlurSearchInput,focus:e.mtdDisplaySuggestions,keyup:e.mtdSuggestSearchTermChanged,input:function(t){t.target.composing||(e.vdInputSuggestionTerm=t.target.value)}}})]),e._v(" "),""!==e.vdInputSuggestionTerm?n("memelist",{attrs:{"vp-meme-list":e.vpMemeList},on:{memeclicked:e.mtdMemeClicked}}):e._e()],1)}),[],!1,null,null,null).exports),u=n(9);let d=function(e){for(var t,n,r=e.length;0!==r;)n=Math.floor(Math.random()*r),t=e[r-=1],e[r]=e[n],e[n]=t;return e}(u);d=d.slice(0,8),new Vue({el:"#app",components:{memelist:a,search:c},data:function(){return{vdFrequent:[],vdMemeList:u,vdRandomMemes:d}},mounted:function(){var e=[],t=window.localStorage.getItem("memesd2_frequent");null===t&&(t="[]");try{e=JSON.parse(t)}catch(t){e=[]}this.vdFrequent=e},methods:{memeClicked:function(e){var t=[],n=window.localStorage.getItem("memesd2_frequent");null===n&&(n="[]");try{t=JSON.parse(n)}catch(e){t=[]}var r=!1;t.forEach((function(t){t.name===e.name&&(r=!0)})),r||(t.length>5&&(t=t.slice(1,4)),t.push({name:e.name,img:e.img}),window.localStorage.setItem("memesd2_frequent",JSON.stringify(t))),this.vdFrequent=t,window.location.href="/download/"+e.img}}})}]);
