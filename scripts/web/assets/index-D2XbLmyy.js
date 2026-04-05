import{d as l,f as N,g as p,h as C,i as I,a as e,j as m,p as j,k as B,l as J,m as L,n as X,q as _,s as V,t as $,w as n,v as r,c as g,x as q,e as D,y as z,I as H,F as R,b as f,z as U,A as E,C as O,D as G,E as K,r as Q,u as W,o as h,_ as Y}from"./index-DvSMH-Io.js";import{l as Z}from"./logo-CLTN4yCD.js";import{M as ee,a as te}from"./index-D_RplScx.js";import"./index-BruCqxq9.js";import"./fake-arrow-CfHGWFh_.js";import"./toFinite-DPO3PA0P.js";import"./index-C9p1jiRc.js";/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ne=l({name:"TLayout",setup:function(){var t=N(!1),o=m(),a=p("layout"),c=C(function(){return[a.value,I({},"".concat(a.value,"--with-sider"),t.value)]});return j("layout",{hasSide:t}),function(){return e("section",{class:c.value},[o("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ae={height:{type:String,default:""}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var oe=l({name:"THeader",props:ae,setup:function(t){var o=p("layout__header"),a=m();return function(){return e("header",{class:o.value,style:t.height?{height:t.height}:{}},[a("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var se={height:{type:String,default:""}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var re=l({name:"TFooter",props:se,setup:function(t){var o=p("layout__footer"),a=m();return function(){return e("footer",{class:o.value,style:t.height?{height:t.height}:{}},[a("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ue={width:{type:String,default:""}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var le=l({name:"TAside",props:ue,setup:function(t){var o=B("layout",Object.create(null)),a=o.hasSide,c=p("layout__sider"),v=m();if(a)return J(function(){a.value=!0}),L(function(){a.value=!1}),function(){var s=t.width?{width:t.width}:{};return e("aside",{class:c.value,style:s},[v("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ie={content:{type:[String,Function]},default:{type:[String,Function]}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ce=l({name:"TContent",props:ie,setup:function(){var t=p("layout__content"),o=X();return function(){return e("main",{class:t.value},[o("default","content")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var de=_(le),pe=_(ne);_(oe);_(re);var _e=_(ce);const ve={class:"sidebarTitle"},fe={class:"menuOps fc"},he={key:0},me={key:0},ye=l({__name:"index",setup(i){const t=[{path:"/project",label:"我的项目",icon:"folder-open"}],o=C(()=>s.value?"chevron-right":"chevron-left"),a=W(),c=V(),v=N(c.path),s=N(!0);function S(w){const u=String(w);a.push(u),v.value=u}const T=C(()=>({display:s.value?"inline-flex":"block"}));return(w,u)=>{const y=H,k=te,M=U,b=ee,A=de,P=Q("router-view"),F=_e,x=pe;return h(),$(x,{class:"main"},{default:n(()=>[e(A,{width:r(s)?"64px":"232px"},{default:n(()=>[e(b,{theme:"light",value:r(v),collapsed:r(s),onChange:S},{logo:n(()=>[f("h1",ve,[u[2]||(u[2]=f("img",{class:"logo",src:Z},null,-1)),G(f("span",null,"Toonflow",512),[[K,!r(s)]])])]),operations:n(()=>[f("div",fe,[e(M,{variant:"text",shape:"square",onClick:u[0]||(u[0]=d=>s.value=!r(s)),style:E(r(T))},{icon:n(()=>[e(y,{name:r(o)},null,8,["name"])]),default:n(()=>[r(s)?O("",!0):(h(),g("span",he,"收起"))]),_:1},8,["style"]),e(M,{variant:"text",shape:"square",onClick:u[1]||(u[1]=()=>S("/setting")),style:E(r(T))},{icon:n(()=>[e(y,{name:"setting"})]),default:n(()=>[r(s)?O("",!0):(h(),g("span",me,"设置"))]),_:1},8,["style"])])]),default:n(()=>[(h(),g(R,null,q(t,d=>e(k,{key:d.path,value:d.path},{icon:n(()=>[e(y,{name:d.icon},null,8,["name"])]),default:n(()=>[D(" "+z(d.label),1)]),_:2},1032,["value"])),64))]),_:1},8,["value","collapsed"])]),_:1},8,["width"]),e(x,null,{default:n(()=>[e(F,{class:"content"},{default:n(()=>[e(P)]),_:1})]),_:1})]),_:1})}}}),xe=Y(ye,[["__scopeId","data-v-b1dd0aa1"]]);export{xe as default};
