import{d as i,f as N,g as _,h as C,i as J,a as t,j as m,p as L,k as X,l as D,m as I,n as V,q as v,s as $,t as y,w as n,v as r,c as g,x as q,e as H,y as R,z as k,F as G,b as h,A as U,C as E,D as O,r as A,E as K,G as Q,u as W,o as l,_ as Y}from"./index-CuXGMC7J.js";import{l as Z}from"./logo-xT16d_ga.js";import{M as ee,a as te}from"./index-C4hzdBU3.js";import"./index-BpZMPKcx.js";import"./fake-arrow-Bcd-zNkw.js";import"./toFinite-RQAUjs5I.js";import"./index-CaHpByW1.js";/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ne=i({name:"TLayout",setup:function(){var e=N(!1),o=m(),a=_("layout"),d=C(function(){return[a.value,J({},"".concat(a.value,"--with-sider"),e.value)]});return L("layout",{hasSide:e}),function(){return t("section",{class:d.value},[o("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ae={height:{type:String,default:""}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var oe=i({name:"THeader",props:ae,setup:function(e){var o=_("layout__header"),a=m();return function(){return t("header",{class:o.value,style:e.height?{height:e.height}:{}},[a("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var se={height:{type:String,default:""}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var re=i({name:"TFooter",props:se,setup:function(e){var o=_("layout__footer"),a=m();return function(){return t("footer",{class:o.value,style:e.height?{height:e.height}:{}},[a("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ue={width:{type:String,default:""}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var le=i({name:"TAside",props:ue,setup:function(e){var o=X("layout",Object.create(null)),a=o.hasSide,d=_("layout__sider"),f=m();if(a)return D(function(){a.value=!0}),I(function(){a.value=!1}),function(){var s=e.width?{width:e.width}:{};return t("aside",{class:d.value,style:s},[f("default")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ie={content:{type:[String,Function]},default:{type:[String,Function]}};/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var ce=i({name:"TContent",props:ie,setup:function(){var e=_("layout__content"),o=V();return function(){return t("main",{class:e.value},[o("default","content")])}}});/**
 * tdesign v1.18.2
 * (c) 2026 tdesign
 * @license MIT
 */var de=v(le),pe=v(ne);v(oe);v(re);var _e=v(ce);const ve={class:"sidebarTitle"},fe={class:"menuOps fc"},he={key:0},me={key:0},ye=i({__name:"index",setup(c){const e=[{path:"/project",label:"我的项目",icon:"i-folder-open"}],o=C(()=>s.value?"i-right":"i-left"),a=W(),d=$(),f=N(d.path),s=N(!0);function S(w){const u=String(w);a.push(u),f.value=u}const T=C(()=>({display:s.value?"inline-flex":"block"}));return(w,u)=>{const b=te,M=U,P=A("i-setting-two"),F=ee,j=de,z=A("router-view"),B=_e,x=pe;return l(),y(x,{class:"main"},{default:n(()=>[t(j,{class:"shellAside",width:r(s)?"72px":"248px"},{default:n(()=>[t(F,{class:"shellMenu",theme:"dark",value:r(f),collapsed:r(s),onChange:S},{logo:n(()=>[h("h1",ve,[u[2]||(u[2]=h("img",{class:"logo",src:Z},null,-1)),K(h("span",null,"Toonflow",512),[[Q,!r(s)]])])]),operations:n(()=>[h("div",fe,[t(M,{variant:"text",shape:"square",onClick:u[0]||(u[0]=p=>s.value=!r(s)),style:E(r(T))},{icon:n(()=>[(l(),y(k(r(o)),{size:18}))]),default:n(()=>[r(s)?O("",!0):(l(),g("span",he,"收起"))]),_:1},8,["style"]),t(M,{variant:"text",shape:"square",onClick:u[1]||(u[1]=()=>S("/setting")),style:E(r(T))},{icon:n(()=>[t(P,{size:18})]),default:n(()=>[r(s)?O("",!0):(l(),g("span",me,"设置"))]),_:1},8,["style"])])]),default:n(()=>[(l(),g(G,null,q(e,p=>t(b,{key:p.path,value:p.path},{icon:n(()=>[(l(),y(k(p.icon),{size:18}))]),default:n(()=>[H(" "+R(p.label),1)]),_:2},1032,["value"])),64))]),_:1},8,["value","collapsed"])]),_:1},8,["width"]),t(x,null,{default:n(()=>[t(B,{class:"content"},{default:n(()=>[t(z)]),_:1})]),_:1})]),_:1})}}}),xe=Y(ye,[["__scopeId","data-v-ecdb1683"]]);export{xe as default};
