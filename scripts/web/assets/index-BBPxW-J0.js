import{f as i,ce as X,l as P,m as A,d as D,bD as E,cn as B,cm as U,g as $,h as m,i as h,az as J,cA as L,bY as Y,j as k,a as q,aX as z,f3 as F,n as K,q as G}from"./index-DdxaggXs.js";import{P as H,p as Q}from"./fake-arrow-BaCEKLFX.js";/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var W={delay:{type:Number},destroyOnClose:{type:Boolean,default:!0},duration:{type:Number},placement:{type:String,default:"top"},showArrow:{type:Boolean,default:!0},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","success","danger","warning","light"].includes(e):!0}}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var Z=function(){var e=i(0),n=i(0),t=function(v){e.value=v.clientX,n.value=v.clientY};return X||(P(function(){window.addEventListener("mousemove",t,{passive:!0})}),A(function(){window.removeEventListener("mousemove",t)})),{x:e,y:n}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */function w(o,e){var n=Object.keys(o);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(o);e&&(t=t.filter(function(s){return Object.getOwnPropertyDescriptor(o,s).enumerable})),n.push.apply(n,t)}return n}function l(o){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?w(Object(n),!0).forEach(function(t){h(o,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach(function(t){Object.defineProperty(o,t,Object.getOwnPropertyDescriptor(n,t))})}return o}var ee=D({name:"TTooltip",props:l(l({},Q),W),setup:function(e,n){var t=i(null),s=i(null),v=E(e),O=v.visible,S=v.modelValue,V=B(O,S,e.defaultVisible,e.onVisibleChange,"visible"),p=U(V,2),C=p[0],y=p[1],c=J(),f=i(e.visible||e.defaultVisible),b=$(),T=k(),j=K(),_=Z(),g=_.x,d=i(g.value);P(function(){e.duration&&f.value&&(t.value=setTimeout(function(){y(!1,{}),clearTimeout(t.value),t.value=null},e.duration))});var M=function(a,r){t.value&&(r==null?void 0:r.trigger)!=="document"||(a&&(d.value=g.value),y(a,r))},I=m(function(){return["".concat(b.value,"-tooltip"),h({},"".concat(b.value,"-tooltip--").concat(e.theme),e.theme),e.overlayClassName]}),N=m(function(){return l(l({},(c==null?void 0:c.vnode.props)||{}),{},{placement:e.placement==="mouse"?"bottom-left":e.placement,showArrow:e.placement==="mouse"?!1:e.showArrow,overlayClassName:I.value,onVisibleChange:M,disabled:e.disabled})}),x=m(function(){if(e.placement!=="mouse"||d.value===0)return e.overlayInnerStyle;var u=function(r){return{transform:"translateX(".concat(d.value-r.getBoundingClientRect().left,"px)")}};return e.overlayInnerStyle?function(a,r){return l(l({},u(a)),L(e.overlayInnerStyle)?e.overlayInnerStyle(a,r):e.overlayInnerStyle)}:u});Y(function(){return f.value},function(){t.value&&!f.value&&(clearTimeout(t.value),t.value=null)});var R=function(){var a,r;(a=s.value)===null||a===void 0||(r=a.update)===null||r===void 0||r.call(a)};return n.expose({updatePopper:R}),function(){var u=T("content");return q(H,z(F(N.value,["content","default"]),{ref:s,hideEmptyPopup:!0,overlayInnerStyle:x.value,visible:C.value}),l({default:function(){return[j("default","triggerElement")]}},!u&&!e.content?{}:{content:function(){return u}}))}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ae=G(ee);export{ae as T};
