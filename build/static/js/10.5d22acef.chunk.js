/*! For license information please see 10.5d22acef.chunk.js.LICENSE.txt */
(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{153:function(e,t,n){"use strict";n.r(t);var r=n(26),a=n(0),c=n.n(a),o=n(76),i=n.n(o),u=n(9),s=n(85),l=n(56),f=n(67),m=n(23),d=n(83),h=n(84),p=n(53),v=n(48);t.default=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.user})),n=t.users,o=t.userLoading,b=t.userErrorMsg,g=Object(u.c)((function(e){return e.auth})).userId,y=Object(u.c)((function(e){return e.modal})),E=y.modalErrorMsg,j=y.showErrorToast,O=Object(s.a)(),w=Object(r.a)(O,6),x=w[0],N=w[1],S=w[2],k=w[3],L=w[4],_=w[5];return Object(a.useEffect)((function(){e(Object(p.a)("/user/".concat(g)))}),[g,e]),Object(a.useEffect)((function(){i()("http://54.235.27.55:8080/test").on("users",(function(t){"ConnectOrBlockUser"===t.action&&e(Object(p.c)(t.user))}))}),[e]),Object(a.useEffect)((function(){var t=setTimeout((function(){E&&e(Object(v.b)("")),!j&&e(Object(v.d)(!0))}),2e3);return function(){clearTimeout(t)}}),[e,E,j]),c.a.createElement(c.a.Fragment,null,c.a.createElement(f.a,null),E&&j&&c.a.createElement(l.a,{msg:E}),c.a.createElement("div",{className:"pt-5"}),c.a.createElement("div",{className:"container search-and-suggested-users my-5"},o&&c.a.createElement("div",{className:"text-center"},c.a.createElement(m.a,null)),b&&!o&&c.a.createElement("div",{className:"text-center"},b),!b&&!o&&n.length>0&&c.a.createElement("div",{className:"suggested-users shadow p-2 p-sm-3 rounded-lg"},c.a.createElement(h.a,{users:n,userId:g,searchUser:S,setSearchUser:k,setUserFound:L,showSearchUserHandler:_}),c.a.createElement(c.a.Fragment,null,c.a.createElement(d.a,{users:n,userId:g,userFound:x,searchUser:S,searchResults:N})))),c.a.createElement("div",{className:"pt-4"}))}},51:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(9),o=n(49);t.a=function(){var e=Object(c.c)((function(e){return e.user})).user;return a.a.createElement(a.a.Fragment,null,a.a.createElement(o.a,{src:e.image,width:"30",height:"30",classes:"rounded-circle mr-1"})," ",a.a.createElement("span",null,e.username))}},53:function(e,t,n){"use strict";n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return m})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return h}));var r=n(1),a=n(27),c=n(11);function o(){o=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",c=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function u(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(k){u=function(e,t,n){return e[t]=n}}function s(e,t,n,r){var a=t&&t.prototype instanceof m?t:m,c=Object.create(a.prototype),o=new x(r||[]);return c._invoke=function(e,t,n){var r="suspendedStart";return function(a,c){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw c;return S()}for(n.method=a,n.arg=c;;){var o=n.delegate;if(o){var i=j(o,n);if(i){if(i===f)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=l(e,t,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(e,n,o),c}function l(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(k){return{type:"throw",arg:k}}}e.wrap=s;var f={};function m(){}function d(){}function h(){}var p={};u(p,a,(function(){return this}));var v=Object.getPrototypeOf,b=v&&v(v(N([])));b&&b!==t&&n.call(b,a)&&(p=b);var g=h.prototype=m.prototype=Object.create(p);function y(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){var r;this._invoke=function(a,c){function o(){return new t((function(r,o){!function r(a,c,o,i){var u=l(e[a],e,c);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,o,i)}),(function(e){r("throw",e,o,i)})):t.resolve(f).then((function(e){s.value=e,o(s)}),(function(e){return r("throw",e,o,i)}))}i(u.arg)}(a,c,r,o)}))}return r=r?r.then(o,o):o()}}function j(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,j(e,t),"throw"===t.method))return f;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=l(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,f;var a=r.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function w(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function x(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function N(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,c=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return c.next=c}}return{next:S}}function S(){return{value:void 0,done:!0}}return d.prototype=h,u(g,"constructor",h),u(h,"constructor",d),d.displayName=u(h,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,u(e,i,"GeneratorFunction")),e.prototype=Object.create(g),e},e.awrap=function(e){return{__await:e}},y(E.prototype),u(E.prototype,c,(function(){return this})),e.AsyncIterator=E,e.async=function(t,n,r,a,c){void 0===c&&(c=Promise);var o=new E(s(t,n,r,a),c);return e.isGeneratorFunction(n)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},y(g),u(g,i,"Generator"),u(g,a,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=N,x.prototype={constructor:x,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return o.type="throw",o.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var c=this.tryEntries[a],o=c.completion;if("root"===c.tryLoc)return r("end");if(c.tryLoc<=this.prev){var i=n.call(c,"catchLoc"),u=n.call(c,"finallyLoc");if(i&&u){if(this.prev<c.catchLoc)return r(c.catchLoc,!0);if(this.prev<c.finallyLoc)return r(c.finallyLoc)}else if(i){if(this.prev<c.catchLoc)return r(c.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return r(c.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var c=a;break}}c&&("break"===e||"continue"===e)&&c.tryLoc<=t&&t<=c.finallyLoc&&(c=null);var o=c?c.completion:{};return o.type=e,o.arg=t,c?(this.method="next",this.next=c.finallyLoc,f):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),w(n),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;w(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:N(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},e}var i=function(e){return{type:c.f,payload:e}},u=function(e){return{type:c.e,payload:e}},s=function(e){return{type:c.g,payload:e}},l=function(e){return{type:c.b,payload:e}},f=function(e){return{type:c.a,payload:e}},m=function(e){return{type:c.d,payload:e}},d=function(e){return{type:c.c,payload:e}},h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,c=arguments.length>3?arguments[3]:void 0;return function(){var m=Object(a.a)(o().mark((function a(m){var d,h,p,v,b,g;return o().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return"GET"===t&&m(i(!0)),a.prev=1,d=localStorage.getItem("jwtToken"),a.next=5,fetch("http://54.235.27.55:8080/test"+e,{method:t,body:n,headers:Object(r.a)(Object(r.a)({},c),{},{Authorization:"Bearer "+d})});case 5:return h=a.sent,a.next=8,h.json();case 8:if(p=a.sent,h.ok){a.next=11;break}throw new Error(p.message);case 11:m(i(!1)),v=p.users,b=p.user,g=p.msg,v&&m(l(v)),b&&m(f(b)),b||v||!g||m(s(g)),a.next=22;break;case 18:a.prev=18,a.t0=a.catch(1),m(i(!1)),a.t0.message?m(u(a.t0.message)):m(u(a.t0));case 22:case"end":return a.stop()}}),a,null,[[1,18]])})));return function(e){return m.apply(this,arguments)}}()}},58:function(e,t,n){"use strict";var r=n(0),a=n.n(r);t.a=function(e){var t=e.mediaFile,n=e.fileHandler,c=e.disable,o=Object(r.createRef)();return a.a.createElement("div",{className:"file-upload my-2 my-sm-3"},a.a.createElement("span",{className:"text-muted text-center px-2"},t?t.name:"Select any image file"),a.a.createElement("input",{type:"file",ref:o,style:{display:"none"},accept:".jpg,.jpeg,.png",onChange:n}),a.a.createElement("button",{type:"button",disabled:c,onClick:function(){o.current.click()},className:"btn btn-secondary btn-sm my-2"},"Upload"))}},59:function(e,t,n){"use strict";var r=n(26),a=n(0),c=n.n(a),o=n(9),i=n(48),u=n(58),s=n(23),l=n(52);t.a=function(e){var t=e.userId,n=e.parent,f=Object(a.createRef)(),m=Object(o.b)(),d=Object(o.c)((function(e){return e.modal})),h=d.modalLoading,p=d.modalErrorMsg,v=d.modalSuccessMsg,b=Object(a.useState)(0),g=Object(r.a)(b,2),y=g[0],E=g[1],j=Object(a.useState)(""),O=Object(r.a)(j,2),w=O[0],x=O[1],N=Object(a.useState)(null),S=Object(r.a)(N,2),k=S[0],L=S[1],_=Object(a.useState)(""),T=Object(r.a)(_,2),F=T[0],I=T[1],U=Object(a.useState)(""),P=Object(r.a)(U,2),C=P[0],H=P[1],G=Object(a.useState)(""),B=Object(r.a)(G,2),M=B[0],R=B[1],A=Object(a.useState)(!1),J=Object(r.a)(A,2),q=J[0],D=J[1];return Object(a.useEffect)((function(){var e;e="modal"===n?document.querySelector(".modal-body").clientHeight:document.querySelector("form").clientHeight,E(e)}),[n]),Object(a.useEffect)((function(){""===p&&""!==v&&(x(""),L(null))}),[p,v]),h?c.a.createElement("div",{className:"d-flex flex-column justify-content-center align-items-center",style:{height:"".concat(y,"px")}},c.a.createElement(s.a,null),c.a.createElement("span",{className:"my-2"},"Please wait...")):c.a.createElement("form",{className:"form p-0 p-sm-2 text-center",ref:f,onSubmit:function(e){e.preventDefault(),m(Object(i.d)(!1)),m(Object(i.e)(!0));var n=JSON.stringify({caption:w,mediaFile:{mediaId:C,fileName:M,filePath:F},creator:t});m(Object(i.a)("/post/create","POST",n,{"Content-Type":"application/json"}))}},c.a.createElement(l.a,{inputName:"caption",inputText:"Caption",inputType:"text",inputValue:w,onChangeHandler:function(e){return x(e.target.value)},classes:"form-control",minLength:"5",maxLength:"200",checkText:!0}),c.a.createElement(u.a,{mediaFile:k,fileHandler:function(e){if(e.target.files&&1===e.target.files.length){L(e.target.files[0]);var t=e.target.files[0];if("image/jpg"!==t.type&&"image/png"!==t.type&&"image/jpeg"!==t.type)return void m(Object(i.b)("Invalid file type"));D(!0);var n=new FormData;n.append("file",t),n.append("upload_preset","uconnect"),n.append("cloud_name","willson-cloud"),fetch("".concat("https://api.cloudinary.com/v1_1","/").concat("willson-cloud","/image/upload"),{method:"post",body:n}).then((function(e){return e.json()})).then((function(e){I(e.secure_url),H(e.public_id),R(t.name),D(!1),m(Object(i.b)(""))})).catch((function(e){m(Object(i.b)("Something went wrong"))}))}},disable:q}),p&&c.a.createElement("span",{className:"text-danger my-2"},"Invalid value"===p?"Please provide both fields":p),c.a.createElement("button",{type:"submit",disabled:q,className:"btn btn-secondary btn-block mt-2 mt-sm-3"},q?"Please wait...":"Create Post"))}},64:function(e,t,n){"use strict";var r=n(57),a=n(26),c=n(0),o=n.n(c),i=n(9),u=n(12),s=n(48),l=n(49);t.a=function(e){var t=e.usr,n=e.showOption,f=Object(i.c)((function(e){return e.user})).user,m=Object(i.c)((function(e){return e.auth})).userId,d=Object(i.b)(),h=Object(c.useState)(!1),p=Object(a.a)(h,2),v=p[0],b=p[1];return Object(c.useEffect)((function(){if(f.connections){var e=!1;if(f.connections.length>0){var n,a=Object(r.a)(f.connections);try{for(a.s();!(n=a.n()).done;){if(n.value===t._id){e=!0;break}}}catch(c){a.e(c)}finally{a.f()}}b(!e)}}),[f.connections,t]),o.a.createElement("div",{className:"row no-gutters d-flex justify-content-between align-items-center my-3"},o.a.createElement(u.b,{to:"/profile/".concat(t._id),className:"post-user pointer text-dark text-decoration-none"},o.a.createElement(l.a,{src:t.image,width:"30",height:"30",classes:"rounded-circle mr-1"}),o.a.createElement("span",null,t.username)),n&&t._id!==m&&o.a.createElement(o.a.Fragment,null,o.a.createElement("small",{className:"text-info mr-2 pointer",onClick:function(){d(Object(s.e)(!1)),d(v?Object(s.a)("/user/".concat(t._id,"/connect/").concat(m),"POST"):Object(s.a)("/user/".concat(t._id,"/block/").concat(m),"POST"))}},v?"Connect":"Block")))}},67:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(26),o=n(12),i=n(9),u=n(159),s=n(51),l=n(59),f=n(48);var m=function(e){var t=e.show,n=e.onHide,c=Object(i.b)(),o=Object(i.c)((function(e){return e.auth})).userId;return Object(r.useEffect)((function(){t?(c(Object(f.d)(!1)),c(Object(f.e)(!0))):(c(Object(f.d)(!0)),c(Object(f.e)(!1)))}),[t,c]),a.a.createElement(a.a.Fragment,null,a.a.createElement(u.a,{show:t,onHide:n,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},a.a.createElement(u.a.Header,{closeButton:!0},a.a.createElement(u.a.Title,{className:"h6",id:"contained-modal-title-vcenter"},a.a.createElement(s.a,null))),a.a.createElement(u.a.Body,null,a.a.createElement(l.a,{userId:o,parent:"modal"}))))},d=n(18);var h=function(){var e=Object(i.b)(),t=Object(r.useState)(!1),n=Object(c.a)(t,2),u=n[0],s=n[1],l=Object(i.c)((function(e){return e.auth})).userId;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNav"},a.a.createElement("ul",{className:"navbar-nav ml-auto"},a.a.createElement("div",{className:"d-none d-lg-flex"},a.a.createElement("li",{className:"nav-item"},a.a.createElement("span",{className:"nav-link icon mx-2 btn"},a.a.createElement("i",{className:"fas fa-upload fa-1x",onClick:function(){return s(!0)}}))),a.a.createElement("li",{className:"nav-item"},a.a.createElement(o.c,{to:"/profile/".concat(l),className:"nav-link icon mx-2"},a.a.createElement("i",{className:"far fa-user fa-1x"})))),a.a.createElement("li",{className:"nav-item align-self-center"},a.a.createElement("span",{className:"nav-link mx-2 pointer",onClick:function(){e(Object(d.d)()),fetch("/auth/logout")}},"Logout")))),a.a.createElement(m,{show:u,onHide:function(){return s(!1)}}))};t.a=function(){return a.a.createElement("header",{className:"shadow-sm"},a.a.createElement("nav",{className:"navbar navbar-expand navbar-light container-fluid container-md"},a.a.createElement("a",{className:"navbar-brand font-weight-bold",href:"/"},"UConnect "),a.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},a.a.createElement("span",{className:"navbar-toggler-icon"})),a.a.createElement(h,null)))}},82:function(e,t){},83:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(64);t.a=function(e){var t=e.users,n=e.userId,r=e.userFound,o=e.searchResults,i=e.searchUser,u=e.showOption;return a.a.createElement(a.a.Fragment,null,t.length>0&&!i?t.map((function(e){return e._id!==n&&a.a.createElement(c.a,{key:e._id,usr:e,showOption:u})})):o.length>0&&o.map((function(e){return e._id!==n&&a.a.createElement(c.a,{key:e._id,usr:e,showOption:u})})),r?"":a.a.createElement("div",{className:"text-center"},a.a.createElement("span",null,"No User Found")))}},84:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(52);t.a=function(e){var t=e.users,n=e.userId,r=e.searchUser,o=e.setSearchUser,i=e.setUserFound,u=e.showSearchUserHandler;return 1===t.length&&t[0]._id===n?a.a.createElement("div",{className:"text-center"},a.a.createElement("span",null,"No User Found")):a.a.createElement(c.a,{inputType:"text",inputName:"search",inputValue:r,onChangeHandler:function(e){o(e.target.value),i(!0)},checkText:!1,onKeyPressHandler:function(e){return u(e)},classes:"border-top-0 border-left-0 border-right-0  w-100 my-2 custom-input",inputText:"Search Users... "})}},85:function(e,t,n){"use strict";var r=n(19),a=n(26),c=n(0),o=n(9),i=n(53);t.a=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.user})).users,n=Object(c.useState)(""),u=Object(a.a)(n,2),s=u[0],l=u[1],f=Object(c.useState)([]),m=Object(a.a)(f,2),d=m[0],h=m[1],p=Object(c.useState)(!0),v=Object(a.a)(p,2),b=v[0],g=v[1];return Object(c.useEffect)((function(){e(Object(i.a)("/user"))}),[e]),[b,d,s,l,g,function(e){h([]),g(!1),t.filter((function(e){return e.username===s&&(h((function(t){return[].concat(Object(r.a)(t),[e])})),g(!0)),!1}))}]}}}]);
//# sourceMappingURL=10.5d22acef.chunk.js.map