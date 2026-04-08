import{f as i,c8 as E,k as w,l as X,d as A,bx as D,ch as B,cg as U,g as $,h as m,_ as P,au as k,cu as J,bS as L,i as F,a as K,aS as Y,eT as q,m as z,n as G}from"./index-BV-nTkrj.js";import{P as H,p as Q}from"./fake-arrow-d4ZeIY6w.js";/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var W={delay:{type:Number},destroyOnClose:{type:Boolean,default:!0},duration:{type:Number},placement:{type:String,default:"top"},showArrow:{type:Boolean,default:!0},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","success","danger","warning","light"].includes(e):!0}}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var Z=function(){var e=i(0),n=i(0),t=function(v){e.value=v.clientX,n.value=v.clientY};return E||(w(function(){window.addEventListener("mousemove",t,{passive:!0})}),X(function(){window.removeEventListener("mousemove",t)})),{x:e,y:n}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */function h(o,e){var n=Object.keys(o);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(o);e&&(t=t.filter(function(s){return Object.getOwnPropertyDescriptor(o,s).enumerable})),n.push.apply(n,t)}return n}function l(o){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?h(Object(n),!0).forEach(function(t){P(o,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach(function(t){Object.defineProperty(o,t,Object.getOwnPropertyDescriptor(n,t))})}return o}var ee=A({name:"TTooltip",props:l(l({},Q),W),setup:function(e,n){var t=i(null),s=i(null),v=D(e),O=v.visible,S=v.modelValue,T=B(O,S,e.defaultVisible,e.onVisibleChange,"visible"),p=U(T,2),V=p[0],y=p[1],c=k(),f=i(e.visible||e.defaultVisible),b=$(),C=F(),_=z(),j=Z(),g=j.x,d=i(g.value);w(function(){e.duration&&f.value&&(t.value=setTimeout(function(){y(!1,{}),clearTimeout(t.value),t.value=null},e.duration))});var M=function(a,r){t.value&&(r==null?void 0:r.trigger)!=="document"||(a&&(d.value=g.value),y(a,r))},I=m(function(){return["".concat(b.value,"-tooltip"),P({},"".concat(b.value,"-tooltip--").concat(e.theme),e.theme),e.overlayClassName]}),N=m(function(){return l(l({},(c==null?void 0:c.vnode.props)||{}),{},{placement:e.placement==="mouse"?"bottom-left":e.placement,showArrow:e.placement==="mouse"?!1:e.showArrow,overlayClassName:I.value,onVisibleChange:M,disabled:e.disabled})}),x=m(function(){if(e.placement!=="mouse"||d.value===0)return e.overlayInnerStyle;var u=function(r){return{transform:"translateX(".concat(d.value-r.getBoundingClientRect().left,"px)")}};return e.overlayInnerStyle?function(a,r){return l(l({},u(a)),J(e.overlayInnerStyle)?e.overlayInnerStyle(a,r):e.overlayInnerStyle)}:u});L(function(){return f.value},function(){t.value&&!f.value&&(clearTimeout(t.value),t.value=null)});var R=function(){var a,r;(a=s.value)===null||a===void 0||(r=a.update)===null||r===void 0||r.call(a)};return n.expose({updatePopper:R}),function(){var u=C("content");return K(H,Y(q(N.value,["content","default"]),{ref:s,hideEmptyPopup:!0,overlayInnerStyle:x.value,visible:V.value}),l({default:function(){return[_("default","triggerElement")]}},!u&&!e.content?{}:{content:function(){return u}}))}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ae=G(ee);export{ae as T};
