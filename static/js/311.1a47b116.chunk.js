(self.webpackChunki_200760_s_application_2=self.webpackChunki_200760_s_application_2||[]).push([[311],{76299:(e,t,n)=>{"use strict";n.d(t,{UD:()=>x});var r=n(92447),i=n(15775),o=n(65202),a=n(50006);var s=n(50333),c=n(32724),f=n(56791),u=n(37037),p=n(44473);function d(e,t,n){void 0===n&&(n=!1);var d=(0,a.sb)(t),l=(0,a.sb)(t)&&function(e){var t=e.getBoundingClientRect(),n=(0,p.LI)(t.width)/e.offsetWidth||1,r=(0,p.LI)(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(t),v=(0,f.A)(t),h=(0,r.A)(e,l,n),m={scrollLeft:0,scrollTop:0},A={x:0,y:0};return(d||!d&&!n)&&(("body"!==(0,s.A)(t)||(0,u.A)(v))&&(m=function(e){return e!==(0,o.A)(e)&&(0,a.sb)(e)?{scrollLeft:(t=e).scrollLeft,scrollTop:t.scrollTop}:(0,i.A)(e);var t}(t)),(0,a.sb)(t)?((A=(0,r.A)(t,!0)).x+=t.clientLeft,A.y+=t.clientTop):v&&(A.x=(0,c.A)(v))),{x:h.left+m.scrollLeft-A.x,y:h.top+m.scrollTop-A.y,width:h.width,height:h.height}}var l=n(27790),v=n(84699),h=n(76493),m=n(45463);function A(e){var t=new Map,n=new Set,r=[];function i(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&i(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||i(e)})),r}function g(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var b={placement:"bottom",modifiers:[],strategy:"absolute"};function y(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"===typeof e.getBoundingClientRect)}))}function x(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,i=t.defaultOptions,o=void 0===i?b:i;return function(e,t,n){void 0===n&&(n=o);var i={placement:"bottom",orderedModifiers:[],options:Object.assign({},b,o),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},s=[],c=!1,f={state:i,setOptions:function(n){var c="function"===typeof n?n(i.options):n;u(),i.options=Object.assign({},o,i.options,c),i.scrollParents={reference:(0,a.vq)(e)?(0,v.A)(e):e.contextElement?(0,v.A)(e.contextElement):[],popper:(0,v.A)(t)};var p=function(e){var t=A(e);return m.GM.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,i.options.modifiers)));return i.orderedModifiers=p.filter((function(e){return e.enabled})),i.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"===typeof o){var a=o({state:i,name:t,instance:f,options:r}),c=function(){};s.push(a||c)}})),f.update()},forceUpdate:function(){if(!c){var e=i.elements,t=e.reference,n=e.popper;if(y(t,n)){i.rects={reference:d(t,(0,h.A)(n),"fixed"===i.options.strategy),popper:(0,l.A)(n)},i.reset=!1,i.placement=i.options.placement,i.orderedModifiers.forEach((function(e){return i.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<i.orderedModifiers.length;r++)if(!0!==i.reset){var o=i.orderedModifiers[r],a=o.fn,s=o.options,u=void 0===s?{}:s,p=o.name;"function"===typeof a&&(i=a({state:i,options:u,name:p,instance:f})||i)}else i.reset=!1,r=-1}}},update:g((function(){return new Promise((function(e){f.forceUpdate(),e(i)}))})),destroy:function(){u(),c=!0}};if(!y(e,t))return f;function u(){s.forEach((function(e){return e()})),s=[]}return f.setOptions(n).then((function(e){!c&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}},86025:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(50006);function i(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&(0,r.Ng)(n)){var i=t;do{if(i&&e.isSameNode(i))return!0;i=i.parentNode||i.host}while(i)}return!1}},92447:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var r=n(50006),i=n(44473),o=n(65202),a=n(74876);function s(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var s=e.getBoundingClientRect(),c=1,f=1;t&&(0,r.sb)(e)&&(c=e.offsetWidth>0&&(0,i.LI)(s.width)/e.offsetWidth||1,f=e.offsetHeight>0&&(0,i.LI)(s.height)/e.offsetHeight||1);var u=((0,r.vq)(e)?(0,o.A)(e):window).visualViewport,p=!(0,a.A)()&&n,d=(s.left+(p&&u?u.offsetLeft:0))/c,l=(s.top+(p&&u?u.offsetTop:0))/f,v=s.width/c,h=s.height/f;return{width:v,height:h,top:l,right:d+v,bottom:l+h,left:d,x:d,y:l}}},78976:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(65202);function i(e){return(0,r.A)(e).getComputedStyle(e)}},56791:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(50006);function i(e){return(((0,r.vq)(e)?e.ownerDocument:e.document)||window.document).documentElement}},27790:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(92447);function i(e){var t=(0,r.A)(e),n=e.offsetWidth,i=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-i)<=1&&(i=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:i}}},50333:(e,t,n)=>{"use strict";function r(e){return e?(e.nodeName||"").toLowerCase():null}n.d(t,{A:()=>r})},76493:(e,t,n)=>{"use strict";n.d(t,{A:()=>p});var r=n(65202),i=n(50333),o=n(78976),a=n(50006);function s(e){return["table","td","th"].indexOf((0,i.A)(e))>=0}var c=n(86650),f=n(21415);function u(e){return(0,a.sb)(e)&&"fixed"!==(0,o.A)(e).position?e.offsetParent:null}function p(e){for(var t=(0,r.A)(e),n=u(e);n&&s(n)&&"static"===(0,o.A)(n).position;)n=u(n);return n&&("html"===(0,i.A)(n)||"body"===(0,i.A)(n)&&"static"===(0,o.A)(n).position)?t:n||function(e){var t=/firefox/i.test((0,f.A)());if(/Trident/i.test((0,f.A)())&&(0,a.sb)(e)&&"fixed"===(0,o.A)(e).position)return null;var n=(0,c.A)(e);for((0,a.Ng)(n)&&(n=n.host);(0,a.sb)(n)&&["html","body"].indexOf((0,i.A)(n))<0;){var r=(0,o.A)(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}},86650:(e,t,n)=>{"use strict";n.d(t,{A:()=>a});var r=n(50333),i=n(56791),o=n(50006);function a(e){return"html"===(0,r.A)(e)?e:e.assignedSlot||e.parentNode||((0,o.Ng)(e)?e.host:null)||(0,i.A)(e)}},65202:(e,t,n)=>{"use strict";function r(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}n.d(t,{A:()=>r})},15775:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(65202);function i(e){var t=(0,r.A)(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}},32724:(e,t,n)=>{"use strict";n.d(t,{A:()=>a});var r=n(92447),i=n(56791),o=n(15775);function a(e){return(0,r.A)((0,i.A)(e)).left+(0,o.A)(e).scrollLeft}},50006:(e,t,n)=>{"use strict";n.d(t,{Ng:()=>a,sb:()=>o,vq:()=>i});var r=n(65202);function i(e){return e instanceof(0,r.A)(e).Element||e instanceof Element}function o(e){return e instanceof(0,r.A)(e).HTMLElement||e instanceof HTMLElement}function a(e){return"undefined"!==typeof ShadowRoot&&(e instanceof(0,r.A)(e).ShadowRoot||e instanceof ShadowRoot)}},74876:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(21415);function i(){return!/^((?!chrome|android).)*safari/i.test((0,r.A)())}},37037:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(78976);function i(e){var t=(0,r.A)(e),n=t.overflow,i=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+i)}},84699:(e,t,n)=>{"use strict";n.d(t,{A:()=>f});var r=n(86650),i=n(37037),o=n(50333),a=n(50006);function s(e){return["html","body","#document"].indexOf((0,o.A)(e))>=0?e.ownerDocument.body:(0,a.sb)(e)&&(0,i.A)(e)?e:s((0,r.A)(e))}var c=n(65202);function f(e,t){var n;void 0===t&&(t=[]);var o=s(e),a=o===(null==(n=e.ownerDocument)?void 0:n.body),u=(0,c.A)(o),p=a?[u].concat(u.visualViewport||[],(0,i.A)(o)?o:[]):o,d=t.concat(p);return a?d:d.concat(f((0,r.A)(p)))}},45463:(e,t,n)=>{"use strict";n.d(t,{DD:()=>m,GM:()=>A,Mn:()=>r,OM:()=>c,Ol:()=>h,R9:()=>d,WY:()=>p,_N:()=>u,ir:()=>v,kb:()=>a,ni:()=>f,pG:()=>o,qZ:()=>s,sQ:()=>i,xf:()=>l});var r="top",i="bottom",o="right",a="left",s="auto",c=[r,i,o,a],f="start",u="end",p="clippingParents",d="viewport",l="popper",v="reference",h=c.reduce((function(e,t){return e.concat([t+"-"+f,t+"-"+u])}),[]),m=[].concat(c,[s]).reduce((function(e,t){return e.concat([t,t+"-"+f,t+"-"+u])}),[]),A=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"]},57013:(e,t,n)=>{"use strict";n.d(t,{A:()=>d});var r=n(13651),i=n(27790),o=n(86025),a=n(76493),s=n(63436),c=n(41564),f=n(6201),u=n(32442),p=n(45463);const d={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,o=e.name,d=e.options,l=n.elements.arrow,v=n.modifiersData.popperOffsets,h=(0,r.A)(n.placement),m=(0,s.A)(h),A=[p.kb,p.pG].indexOf(h)>=0?"height":"width";if(l&&v){var g=function(e,t){return e="function"===typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e,(0,f.A)("number"!==typeof e?e:(0,u.A)(e,p.OM))}(d.padding,n),b=(0,i.A)(l),y="y"===m?p.Mn:p.kb,x="y"===m?p.sQ:p.pG,w=n.rects.reference[A]+n.rects.reference[m]-v[m]-n.rects.popper[A],O=v[m]-n.rects.reference[m],k=(0,a.A)(l),D=k?"y"===m?k.clientHeight||0:k.clientWidth||0:0,M=w/2-O/2,L=g[y],j=D-b[A]-g[x],E=D/2-b[A]/2+M,T=(0,c.u)(L,E,j),N=m;n.modifiersData[o]=((t={})[N]=T,t.centerOffset=T-E,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!==typeof r||(r=t.elements.popper.querySelector(r)))&&(0,o.A)(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}},77103:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});var r=n(45463),i=n(76493),o=n(65202),a=n(56791),s=n(78976),c=n(13651),f=n(71594),u=n(44473),p={top:"auto",right:"auto",bottom:"auto",left:"auto"};function d(e){var t,n=e.popper,c=e.popperRect,f=e.placement,d=e.variation,l=e.offsets,v=e.position,h=e.gpuAcceleration,m=e.adaptive,A=e.roundOffsets,g=e.isFixed,b=l.x,y=void 0===b?0:b,x=l.y,w=void 0===x?0:x,O="function"===typeof A?A({x:y,y:w}):{x:y,y:w};y=O.x,w=O.y;var k=l.hasOwnProperty("x"),D=l.hasOwnProperty("y"),M=r.kb,L=r.Mn,j=window;if(m){var E=(0,i.A)(n),T="clientHeight",N="clientWidth";if(E===(0,o.A)(n)&&(E=(0,a.A)(n),"static"!==(0,s.A)(E).position&&"absolute"===v&&(T="scrollHeight",N="scrollWidth")),f===r.Mn||(f===r.kb||f===r.pG)&&d===r._N)L=r.sQ,w-=(g&&E===j&&j.visualViewport?j.visualViewport.height:E[T])-c.height,w*=h?1:-1;if(f===r.kb||(f===r.Mn||f===r.sQ)&&d===r._N)M=r.pG,y-=(g&&E===j&&j.visualViewport?j.visualViewport.width:E[N])-c.width,y*=h?1:-1}var P,W=Object.assign({position:v},m&&p),R=!0===A?function(e,t){var n=e.x,r=e.y,i=t.devicePixelRatio||1;return{x:(0,u.LI)(n*i)/i||0,y:(0,u.LI)(r*i)/i||0}}({x:y,y:w},(0,o.A)(n)):{x:y,y:w};return y=R.x,w=R.y,h?Object.assign({},W,((P={})[L]=D?"0":"",P[M]=k?"0":"",P.transform=(j.devicePixelRatio||1)<=1?"translate("+y+"px, "+w+"px)":"translate3d("+y+"px, "+w+"px, 0)",P)):Object.assign({},W,((t={})[L]=D?w+"px":"",t[M]=k?y+"px":"",t.transform="",t))}const l={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,i=void 0===r||r,o=n.adaptive,a=void 0===o||o,s=n.roundOffsets,u=void 0===s||s,p={placement:(0,c.A)(t.placement),variation:(0,f.A)(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,d(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:u})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,d(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}}},77471:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(65202),i={passive:!0};const o={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,o=e.options,a=o.scroll,s=void 0===a||a,c=o.resize,f=void 0===c||c,u=(0,r.A)(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&p.forEach((function(e){e.addEventListener("scroll",n.update,i)})),f&&u.addEventListener("resize",n.update,i),function(){s&&p.forEach((function(e){e.removeEventListener("scroll",n.update,i)})),f&&u.removeEventListener("resize",n.update,i)}},data:{}}},20246:(e,t,n)=>{"use strict";n.d(t,{A:()=>p});var r={left:"right",right:"left",bottom:"top",top:"bottom"};function i(e){return e.replace(/left|right|bottom|top/g,(function(e){return r[e]}))}var o=n(13651),a={start:"end",end:"start"};function s(e){return e.replace(/start|end/g,(function(e){return a[e]}))}var c=n(26785),f=n(71594),u=n(45463);const p={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var a=n.mainAxis,p=void 0===a||a,d=n.altAxis,l=void 0===d||d,v=n.fallbackPlacements,h=n.padding,m=n.boundary,A=n.rootBoundary,g=n.altBoundary,b=n.flipVariations,y=void 0===b||b,x=n.allowedAutoPlacements,w=t.options.placement,O=(0,o.A)(w),k=v||(O===w||!y?[i(w)]:function(e){if((0,o.A)(e)===u.qZ)return[];var t=i(e);return[s(e),t,s(t)]}(w)),D=[w].concat(k).reduce((function(e,n){return e.concat((0,o.A)(n)===u.qZ?function(e,t){void 0===t&&(t={});var n=t,r=n.placement,i=n.boundary,a=n.rootBoundary,s=n.padding,p=n.flipVariations,d=n.allowedAutoPlacements,l=void 0===d?u.DD:d,v=(0,f.A)(r),h=v?p?u.Ol:u.Ol.filter((function(e){return(0,f.A)(e)===v})):u.OM,m=h.filter((function(e){return l.indexOf(e)>=0}));0===m.length&&(m=h);var A=m.reduce((function(t,n){return t[n]=(0,c.A)(e,{placement:n,boundary:i,rootBoundary:a,padding:s})[(0,o.A)(n)],t}),{});return Object.keys(A).sort((function(e,t){return A[e]-A[t]}))}(t,{placement:n,boundary:m,rootBoundary:A,padding:h,flipVariations:y,allowedAutoPlacements:x}):n)}),[]),M=t.rects.reference,L=t.rects.popper,j=new Map,E=!0,T=D[0],N=0;N<D.length;N++){var P=D[N],W=(0,o.A)(P),R=(0,f.A)(P)===u.ni,_=[u.Mn,u.sQ].indexOf(W)>=0,q=_?"width":"height",B=(0,c.A)(t,{placement:P,boundary:m,rootBoundary:A,altBoundary:g,padding:h}),H=_?R?u.pG:u.kb:R?u.sQ:u.Mn;M[q]>L[q]&&(H=i(H));var C=i(H),I=[];if(p&&I.push(B[W]<=0),l&&I.push(B[H]<=0,B[C]<=0),I.every((function(e){return e}))){T=P,E=!1;break}j.set(P,I)}if(E)for(var V=function(e){var t=D.find((function(t){var n=j.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return T=t,"break"},G=y?3:1;G>0;G--){if("break"===V(G))break}t.placement!==T&&(t.modifiersData[r]._skip=!0,t.placement=T,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}},31890:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var r=n(45463),i=n(26785);function o(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function a(e){return[r.Mn,r.pG,r.sQ,r.kb].some((function(t){return e[t]>=0}))}const s={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,s=t.rects.popper,c=t.modifiersData.preventOverflow,f=(0,i.A)(t,{elementContext:"reference"}),u=(0,i.A)(t,{altBoundary:!0}),p=o(f,r),d=o(u,s,c),l=a(p),v=a(d);t.modifiersData[n]={referenceClippingOffsets:p,popperEscapeOffsets:d,isReferenceHidden:l,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":l,"data-popper-escaped":v})}}},12993:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(13651),i=n(45463);const o={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,a=n.offset,s=void 0===a?[0,0]:a,c=i.DD.reduce((function(e,n){return e[n]=function(e,t,n){var o=(0,r.A)(e),a=[i.kb,i.Mn].indexOf(o)>=0?-1:1,s="function"===typeof n?n(Object.assign({},t,{placement:e})):n,c=s[0],f=s[1];return c=c||0,f=(f||0)*a,[i.kb,i.pG].indexOf(o)>=0?{x:f,y:c}:{x:c,y:f}}(n,t.rects,s),e}),{}),f=c[t.placement],u=f.x,p=f.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=u,t.modifiersData.popperOffsets.y+=p),t.modifiersData[o]=c}}},84770:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(74396);const i={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=(0,r.A)({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}}},53380:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});var r=n(45463),i=n(13651),o=n(63436);var a=n(41564),s=n(27790),c=n(76493),f=n(26785),u=n(71594),p=n(87111),d=n(44473);const l={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,l=e.name,v=n.mainAxis,h=void 0===v||v,m=n.altAxis,A=void 0!==m&&m,g=n.boundary,b=n.rootBoundary,y=n.altBoundary,x=n.padding,w=n.tether,O=void 0===w||w,k=n.tetherOffset,D=void 0===k?0:k,M=(0,f.A)(t,{boundary:g,rootBoundary:b,padding:x,altBoundary:y}),L=(0,i.A)(t.placement),j=(0,u.A)(t.placement),E=!j,T=(0,o.A)(L),N="x"===T?"y":"x",P=t.modifiersData.popperOffsets,W=t.rects.reference,R=t.rects.popper,_="function"===typeof D?D(Object.assign({},t.rects,{placement:t.placement})):D,q="number"===typeof _?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),B=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,H={x:0,y:0};if(P){if(h){var C,I="y"===T?r.Mn:r.kb,V="y"===T?r.sQ:r.pG,G="y"===T?"height":"width",S=P[T],Q=S+M[I],U=S-M[V],F=O?-R[G]/2:0,Y=j===r.ni?W[G]:R[G],z=j===r.ni?-R[G]:-W[G],Z=t.elements.arrow,$=O&&Z?(0,s.A)(Z):{width:0,height:0},X=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:(0,p.A)(),J=X[I],K=X[V],ee=(0,a.u)(0,W[G],$[G]),te=E?W[G]/2-F-ee-J-q.mainAxis:Y-ee-J-q.mainAxis,ne=E?-W[G]/2+F+ee+K+q.mainAxis:z+ee+K+q.mainAxis,re=t.elements.arrow&&(0,c.A)(t.elements.arrow),ie=re?"y"===T?re.clientTop||0:re.clientLeft||0:0,oe=null!=(C=null==B?void 0:B[T])?C:0,ae=S+te-oe-ie,se=S+ne-oe,ce=(0,a.u)(O?(0,d.jk)(Q,ae):Q,S,O?(0,d.T9)(U,se):U);P[T]=ce,H[T]=ce-S}if(A){var fe,ue="x"===T?r.Mn:r.kb,pe="x"===T?r.sQ:r.pG,de=P[N],le="y"===N?"height":"width",ve=de+M[ue],he=de-M[pe],me=-1!==[r.Mn,r.kb].indexOf(L),Ae=null!=(fe=null==B?void 0:B[N])?fe:0,ge=me?ve:de-W[le]-R[le]-Ae+q.altAxis,be=me?de+W[le]+R[le]-Ae-q.altAxis:he,ye=O&&me?(0,a.P)(ge,de,be):(0,a.u)(O?ge:ve,de,O?be:he);P[N]=ye,H[N]=ye-de}t.modifiersData[l]=H}},requiresIfExists:["offset"]}},74396:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var r=n(13651),i=n(71594),o=n(63436),a=n(45463);function s(e){var t,n=e.reference,s=e.element,c=e.placement,f=c?(0,r.A)(c):null,u=c?(0,i.A)(c):null,p=n.x+n.width/2-s.width/2,d=n.y+n.height/2-s.height/2;switch(f){case a.Mn:t={x:p,y:n.y-s.height};break;case a.sQ:t={x:p,y:n.y+n.height};break;case a.pG:t={x:n.x+n.width,y:d};break;case a.kb:t={x:n.x-s.width,y:d};break;default:t={x:n.x,y:n.y}}var l=f?(0,o.A)(f):null;if(null!=l){var v="y"===l?"height":"width";switch(u){case a.ni:t[l]=t[l]-(n[v]/2-s[v]/2);break;case a._N:t[l]=t[l]+(n[v]/2-s[v]/2)}}return t}},26785:(e,t,n)=>{"use strict";n.d(t,{A:()=>k});var r=n(45463),i=n(65202),o=n(56791),a=n(32724),s=n(74876);var c=n(78976),f=n(15775),u=n(44473);var p=n(84699),d=n(76493),l=n(50006),v=n(92447),h=n(86650),m=n(86025),A=n(50333);function g(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function b(e,t,n){return t===r.R9?g(function(e,t){var n=(0,i.A)(e),r=(0,o.A)(e),c=n.visualViewport,f=r.clientWidth,u=r.clientHeight,p=0,d=0;if(c){f=c.width,u=c.height;var l=(0,s.A)();(l||!l&&"fixed"===t)&&(p=c.offsetLeft,d=c.offsetTop)}return{width:f,height:u,x:p+(0,a.A)(e),y:d}}(e,n)):(0,l.vq)(t)?function(e,t){var n=(0,v.A)(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):g(function(e){var t,n=(0,o.A)(e),r=(0,f.A)(e),i=null==(t=e.ownerDocument)?void 0:t.body,s=(0,u.T9)(n.scrollWidth,n.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),p=(0,u.T9)(n.scrollHeight,n.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),d=-r.scrollLeft+(0,a.A)(e),l=-r.scrollTop;return"rtl"===(0,c.A)(i||n).direction&&(d+=(0,u.T9)(n.clientWidth,i?i.clientWidth:0)-s),{width:s,height:p,x:d,y:l}}((0,o.A)(e)))}function y(e,t,n,r){var i="clippingParents"===t?function(e){var t=(0,p.A)((0,h.A)(e)),n=["absolute","fixed"].indexOf((0,c.A)(e).position)>=0&&(0,l.sb)(e)?(0,d.A)(e):e;return(0,l.vq)(n)?t.filter((function(e){return(0,l.vq)(e)&&(0,m.A)(e,n)&&"body"!==(0,A.A)(e)})):[]}(e):[].concat(t),o=[].concat(i,[n]),a=o[0],s=o.reduce((function(t,n){var i=b(e,n,r);return t.top=(0,u.T9)(i.top,t.top),t.right=(0,u.jk)(i.right,t.right),t.bottom=(0,u.jk)(i.bottom,t.bottom),t.left=(0,u.T9)(i.left,t.left),t}),b(e,a,r));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}var x=n(74396),w=n(6201),O=n(32442);function k(e,t){void 0===t&&(t={});var n=t,i=n.placement,a=void 0===i?e.placement:i,s=n.strategy,c=void 0===s?e.strategy:s,f=n.boundary,u=void 0===f?r.WY:f,p=n.rootBoundary,d=void 0===p?r.R9:p,h=n.elementContext,m=void 0===h?r.xf:h,A=n.altBoundary,b=void 0!==A&&A,k=n.padding,D=void 0===k?0:k,M=(0,w.A)("number"!==typeof D?D:(0,O.A)(D,r.OM)),L=m===r.xf?r.ir:r.xf,j=e.rects.popper,E=e.elements[b?L:m],T=y((0,l.vq)(E)?E:E.contextElement||(0,o.A)(e.elements.popper),u,d,c),N=(0,v.A)(e.elements.reference),P=(0,x.A)({reference:N,element:j,strategy:"absolute",placement:a}),W=g(Object.assign({},j,P)),R=m===r.xf?W:N,_={top:T.top-R.top+M.top,bottom:R.bottom-T.bottom+M.bottom,left:T.left-R.left+M.left,right:R.right-T.right+M.right},q=e.modifiersData.offset;if(m===r.xf&&q){var B=q[a];Object.keys(_).forEach((function(e){var t=[r.pG,r.sQ].indexOf(e)>=0?1:-1,n=[r.Mn,r.sQ].indexOf(e)>=0?"y":"x";_[e]+=B[n]*t}))}return _}},32442:(e,t,n)=>{"use strict";function r(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}n.d(t,{A:()=>r})},13651:(e,t,n)=>{"use strict";function r(e){return e.split("-")[0]}n.d(t,{A:()=>r})},87111:(e,t,n)=>{"use strict";function r(){return{top:0,right:0,bottom:0,left:0}}n.d(t,{A:()=>r})},63436:(e,t,n)=>{"use strict";function r(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}n.d(t,{A:()=>r})},71594:(e,t,n)=>{"use strict";function r(e){return e.split("-")[1]}n.d(t,{A:()=>r})},44473:(e,t,n)=>{"use strict";n.d(t,{LI:()=>o,T9:()=>r,jk:()=>i});var r=Math.max,i=Math.min,o=Math.round},6201:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(87111);function i(e){return Object.assign({},(0,r.A)(),e)}},21415:(e,t,n)=>{"use strict";function r(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}n.d(t,{A:()=>r})},41564:(e,t,n)=>{"use strict";n.d(t,{P:()=>o,u:()=>i});var r=n(44473);function i(e,t,n){return(0,r.T9)(e,(0,r.jk)(t,n))}function o(e,t,n){var r=i(e,t,n);return r>n?n:r}},30346:(e,t,n)=>{"use strict";function r(e,t){e.classList?e.classList.add(t):function(e,t){return e.classList?!!t&&e.classList.contains(t):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")}(e,t)||("string"===typeof e.className?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}n.d(t,{A:()=>r})},77068:(e,t,n)=>{"use strict";function r(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function i(e,t){e.classList?e.classList.remove(t):"string"===typeof e.className?e.className=r(e.className,t):e.setAttribute("class",r(e.className&&e.className.baseVal||"",t))}n.d(t,{A:()=>i})},41497:(e,t,n)=>{"use strict";var r=n(13218);function i(){}function o(){}o.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,o,a){if(a!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:i};return n.PropTypes=n,n}},65173:(e,t,n)=>{e.exports=n(41497)()},13218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=311.1a47b116.chunk.js.map