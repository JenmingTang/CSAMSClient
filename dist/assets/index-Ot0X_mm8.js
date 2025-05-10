import{Y as pe,Z as me,a0 as T,a1 as N,a2 as z,a3 as $,a4 as L,a5 as fe,a6 as M,d as P,a7 as Q,a8 as j,a9 as ge,a as q,aa as _e,ab as w,ac as ee,r as W,X as h,ad as he,ae as ve,af as be,ag as Ce,ah as ye,ai as ze,aj as $e,ak as we,al as Se,am as xe,an as ke,ao as Re,ap as Ie,aq as Te,ar as Ne,as as Pe,T as Be,$ as x,o as b,c as C,w as f,f as u,h as g,e as E,g as k,t as y,q as qe,s as Ae,B as V,at as oe,b as ne,P as D,J as Ee}from"./index-D6W6_zXP.js";import{u as He,a as O,s as Le,b as We,v as Ve,c as G,d as K,e as Fe}from"./auth-B8TiMeOF.js";import{u as je,a as Oe,_ as Me,b as De}from"./form-a8uLA4Rd.js";import{_ as F}from"./Space-zKntJrGG.js";import"./get-slot-Bk_rJcZu.js";function Ge(n){const{lineHeight:o,borderRadius:e,fontWeightStrong:t,baseColor:l,dividerColor:i,actionColor:a,textColor1:c,textColor2:s,closeColorHover:p,closeColorPressed:_,closeIconColor:v,closeIconColorHover:m,closeIconColorPressed:r,infoColor:d,successColor:R,warningColor:I,errorColor:B,fontSize:H}=n;return Object.assign(Object.assign({},me),{fontSize:H,lineHeight:o,titleFontWeight:t,borderRadius:e,border:`1px solid ${i}`,color:a,titleTextColor:c,iconColor:s,contentTextColor:s,closeBorderRadius:e,closeColorHover:p,closeColorPressed:_,closeIconColor:v,closeIconColorHover:m,closeIconColorPressed:r,borderInfo:`1px solid ${T(l,N(d,{alpha:.25}))}`,colorInfo:T(l,N(d,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:d,contentTextColorInfo:s,closeColorHoverInfo:p,closeColorPressedInfo:_,closeIconColorInfo:v,closeIconColorHoverInfo:m,closeIconColorPressedInfo:r,borderSuccess:`1px solid ${T(l,N(R,{alpha:.25}))}`,colorSuccess:T(l,N(R,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:R,contentTextColorSuccess:s,closeColorHoverSuccess:p,closeColorPressedSuccess:_,closeIconColorSuccess:v,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:r,borderWarning:`1px solid ${T(l,N(I,{alpha:.33}))}`,colorWarning:T(l,N(I,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:I,contentTextColorWarning:s,closeColorHoverWarning:p,closeColorPressedWarning:_,closeIconColorWarning:v,closeIconColorHoverWarning:m,closeIconColorPressedWarning:r,borderError:`1px solid ${T(l,N(B,{alpha:.25}))}`,colorError:T(l,N(B,{alpha:.08})),titleTextColorError:c,iconColorError:B,contentTextColorError:s,closeColorHoverError:p,closeColorPressedError:_,closeIconColorError:v,closeIconColorHoverError:m,closeIconColorPressedError:r})}const Ke={name:"Alert",common:pe,self:Ge},Ue=z("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[$("border",`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),L("closable",[z("alert-body",[$("title",`
 padding-right: 24px;
 `)])]),$("icon",{color:"var(--n-icon-color)"}),z("alert-body",{padding:"var(--n-padding)"},[$("title",{color:"var(--n-title-text-color)"}),$("content",{color:"var(--n-content-text-color)"})]),fe({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),$("icon",`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),$("close",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),L("show-icon",[z("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),L("right-adjust",[z("alert-body",{paddingRight:"calc(var(--n-close-size) + var(--n-padding) + 2px)"})]),z("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[$("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[M("& +",[$("content",{marginTop:"9px"})])]),$("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),$("icon",{transition:"color .3s var(--n-bezier)"})]),Xe=Object.assign(Object.assign({},j.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),U=P({name:"Alert",inheritAttrs:!1,props:Xe,slots:Object,setup(n){const{mergedClsPrefixRef:o,mergedBorderedRef:e,inlineThemeDisabled:t,mergedRtlRef:l}=Q(n),i=j("Alert","-alert",Ue,Ke,n,o),a=ge("Alert",l,o),c=q(()=>{const{common:{cubicBezierEaseInOut:r},self:d}=i.value,{fontSize:R,borderRadius:I,titleFontWeight:B,lineHeight:H,iconSize:A,iconMargin:J,iconMarginRtl:te,closeIconSize:se,closeBorderRadius:ae,closeSize:re,closeMargin:le,closeMarginRtl:ie,padding:ce}=d,{type:S}=n,{left:de,right:ue}=_e(J);return{"--n-bezier":r,"--n-color":d[w("color",S)],"--n-close-icon-size":se,"--n-close-border-radius":ae,"--n-close-color-hover":d[w("closeColorHover",S)],"--n-close-color-pressed":d[w("closeColorPressed",S)],"--n-close-icon-color":d[w("closeIconColor",S)],"--n-close-icon-color-hover":d[w("closeIconColorHover",S)],"--n-close-icon-color-pressed":d[w("closeIconColorPressed",S)],"--n-icon-color":d[w("iconColor",S)],"--n-border":d[w("border",S)],"--n-title-text-color":d[w("titleTextColor",S)],"--n-content-text-color":d[w("contentTextColor",S)],"--n-line-height":H,"--n-border-radius":I,"--n-font-size":R,"--n-title-font-weight":B,"--n-icon-size":A,"--n-icon-margin":J,"--n-icon-margin-rtl":te,"--n-close-size":re,"--n-close-margin":le,"--n-close-margin-rtl":ie,"--n-padding":ce,"--n-icon-margin-left":de,"--n-icon-margin-right":ue}}),s=t?ee("alert",q(()=>n.type[0]),c,n):void 0,p=W(!0),_=()=>{const{onAfterLeave:r,onAfterHide:d}=n;r&&r(),d&&d()};return{rtlEnabled:a,mergedClsPrefix:o,mergedBordered:e,visible:p,handleCloseClick:()=>{var r;Promise.resolve((r=n.onClose)===null||r===void 0?void 0:r.call(n)).then(d=>{d!==!1&&(p.value=!1)})},handleAfterLeave:()=>{_()},mergedTheme:i,cssVars:t?void 0:c,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var n;return(n=this.onRender)===null||n===void 0||n.call(this),h(ye,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:o,$slots:e}=this,t={class:[`${o}-alert`,this.themeClass,this.closable&&`${o}-alert--closable`,this.showIcon&&`${o}-alert--show-icon`,!this.title&&this.closable&&`${o}-alert--right-adjust`,this.rtlEnabled&&`${o}-alert--rtl`],style:this.cssVars,role:"alert"};return this.visible?h("div",Object.assign({},he(this.$attrs,t)),this.closable&&h(ve,{clsPrefix:o,class:`${o}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&h("div",{class:`${o}-alert__border`}),this.showIcon&&h("div",{class:`${o}-alert__icon`,"aria-hidden":"true"},be(e.icon,()=>[h(ze,{clsPrefix:o},{default:()=>{switch(this.type){case"success":return h(xe,null);case"info":return h(Se,null);case"warning":return h(we,null);case"error":return h($e,null);default:return null}}})])),h("div",{class:[`${o}-alert-body`,this.mergedBordered&&`${o}-alert-body--bordered`]},Ce(e.header,l=>{const i=l||this.title;return i?h("div",{class:`${o}-alert-body__title`},i):null}),e.default&&h("div",{class:`${o}-alert-body__content`},e))):null}})}}),Ye=M([M("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),z("spin-container",`
 position: relative;
 `,[z("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[ke()])]),z("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),z("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[L("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),z("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),z("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[L("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Ze={small:20,medium:18,large:16},Je=Object.assign(Object.assign({},j.props),{contentClass:String,contentStyle:[Object,String],description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),X=P({name:"Spin",props:Je,slots:Object,setup(n){const{mergedClsPrefixRef:o,inlineThemeDisabled:e}=Q(n),t=j("Spin","-spin",Ye,Re,n,o),l=q(()=>{const{size:s}=n,{common:{cubicBezierEaseInOut:p},self:_}=t.value,{opacitySpinning:v,color:m,textColor:r}=_,d=typeof s=="number"?Ie(s):_[w("size",s)];return{"--n-bezier":p,"--n-opacity-spinning":v,"--n-size":d,"--n-color":m,"--n-text-color":r}}),i=e?ee("spin",q(()=>{const{size:s}=n;return typeof s=="number"?String(s):s[0]}),l,n):void 0,a=Te(n,["spinning","show"]),c=W(!1);return Ne(s=>{let p;if(a.value){const{delay:_}=n;if(_){p=window.setTimeout(()=>{c.value=!0},_),s(()=>{clearTimeout(p)});return}}c.value=a.value}),{mergedClsPrefix:o,active:c,mergedStrokeWidth:q(()=>{const{strokeWidth:s}=n;if(s!==void 0)return s;const{size:p}=n;return Ze[typeof p=="number"?"medium":p]}),cssVars:e?void 0:l,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var n,o;const{$slots:e,mergedClsPrefix:t,description:l}=this,i=e.icon&&this.rotate,a=(l||e.description)&&h("div",{class:`${t}-spin-description`},l||((n=e.description)===null||n===void 0?void 0:n.call(e))),c=e.icon?h("div",{class:[`${t}-spin-body`,this.themeClass]},h("div",{class:[`${t}-spin`,i&&`${t}-spin--rotate`],style:e.default?"":this.cssVars},e.icon()),a):h("div",{class:[`${t}-spin-body`,this.themeClass]},h(Pe,{clsPrefix:t,style:e.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${t}-spin`}),a);return(o=this.onRender)===null||o===void 0||o.call(this),e.default?h("div",{class:[`${t}-spin-container`,this.themeClass],style:this.cssVars},h("div",{class:[`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass],style:this.contentStyle},e),h(Be,{name:"fade-in-transition"},{default:()=>this.active?c:null})):c}}),Qe={class:"w-full flex-y-center gap-16px"},eo=P({name:"CaptchaVerification",__name:"captcha-verification",setup(n){const{loading:o,send:e,countdown:t}=He(Le,{middleware:O("captcha:send")}),l=q(()=>t.value>0?x("page.login.codeLogin.reGetCode",{time:t.value}):x("page.login.codeLogin.getCode")),{form:i,loading:a,send:c}=We(m=>Ve(m.phone,m.code),{initialForm:{phone:"",code:""}}),{formRef:s,validate:p}=je(),_=q(()=>{const{formRules:m}=Oe();return{phone:m.phone,code:m.code}});async function v(){var m;await p(),await c(),(m=window.$message)==null||m.success(x("page.login.common.validateSuccess"))}return(m,r)=>{const d=Ae,R=Me,I=V,B=F,H=De;return b(),C(H,{ref_key:"formRef",ref:s,model:g(i),rules:_.value,size:"large","show-label":!1,onKeyup:qe(v,["enter"])},{default:f(()=>[u(R,{path:"phone"},{default:f(()=>[u(d,{value:g(i).phone,"onUpdate:value":r[0]||(r[0]=A=>g(i).phone=A),placeholder:g(x)("page.login.common.phonePlaceholder"),maxlength:11},null,8,["value","placeholder"])]),_:1}),u(R,{path:"code"},{default:f(()=>[E("div",Qe,[u(d,{value:g(i).code,"onUpdate:value":r[1]||(r[1]=A=>g(i).code=A),placeholder:g(x)("page.login.common.codePlaceholder")},null,8,["value","placeholder"]),u(I,{size:"large",disabled:g(t)>0,loading:g(o),onClick:r[2]||(r[2]=A=>g(e)(g(i).phone))},{default:f(()=>[k(y(l.value),1)]),_:1},8,["disabled","loading"])])]),_:1}),u(B,{vertical:"",size:18,class:"w-full"},{default:f(()=>[u(I,{type:"primary",size:"large",round:"",block:"",loading:g(a),onClick:v},{default:f(()=>[k(y(g(x)("common.confirm")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"])}}}),oo={class:"inline-block",viewBox:"0 0 32 32",width:"1em",height:"1em"};function no(n,o){return b(),ne("svg",oo,o[0]||(o[0]=[E("path",{fill:"currentColor",d:"M24 8v16H8V8zm0-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"},null,-1)]))}const Y=oe({name:"carbon-stop",render:no}),to={class:"inline-block",viewBox:"0 0 32 32",width:"1em",height:"1em"};function so(n,o){return b(),ne("svg",to,o[0]||(o[0]=[E("path",{fill:"currentColor",d:"M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28M8 6.69v18.62L24.925 16Z"},null,-1)]))}const Z=oe({name:"carbon-play",render:so}),ao=P({__name:"browser-visibility-request",setup(n){const o=G.Get("/mock/getLastTime",{cacheFor:null}),e=W(!1),{loading:t,data:l}=K(o,{enableVisibility:!0,enableNetwork:!1,enableFocus:!1,initialData:{time:""},async middleware(a,c){await O("autoRequest:1")(a,()=>Promise.resolve()),e.value||c()}}),i=()=>{e.value=!e.value};return(a,c)=>{const s=U,p=Z,_=Y,v=V,m=X,r=F;return b(),C(r,{vertical:""},{default:f(()=>[u(s,{type:"info"},{default:f(()=>[k(y(a.$t("page.alova.scenes.visibilityRequestTips")),1)]),_:1}),u(v,{type:"primary",onClick:i},{default:f(()=>[e.value?(b(),C(p,{key:0,class:"mr-2"})):(b(),C(_,{key:1,class:"mr-2"})),k(" "+y(e.value?a.$t("page.alova.scenes.startRequest"):a.$t("page.alova.scenes.stopRequest")),1)]),_:1}),u(r,{align:"center"},{default:f(()=>[E("span",null,y(a.$t("page.alova.scenes.refreshTime"))+": "+y(g(l).time||"--"),1),g(t)?(b(),C(m,{key:0,size:12})):D("",!0)]),_:1})]),_:1})}}}),ro=P({__name:"polling-request",setup(n){const o=G.Get("/mock/getLastTime",{cacheFor:null}),e=W(!1),{loading:t,data:l}=K(o,{pollingTime:3e3,initialData:{time:""},async middleware(a,c){await O("autoRequest:3")(a,()=>Promise.resolve()),e.value||c()}}),i=()=>{e.value=!e.value};return(a,c)=>{const s=U,p=Z,_=Y,v=V,m=X,r=F;return b(),C(r,{vertical:""},{default:f(()=>[u(s,{type:"info"},{default:f(()=>[k(y(a.$t("page.alova.scenes.pollingRequestTips")),1)]),_:1}),u(v,{type:"primary",onClick:i},{default:f(()=>[e.value?(b(),C(p,{key:0,class:"mr-2"})):(b(),C(_,{key:1,class:"mr-2"})),k(" "+y(e.value?a.$t("page.alova.scenes.startRequest"):a.$t("page.alova.scenes.stopRequest")),1)]),_:1}),u(r,{align:"center"},{default:f(()=>[E("span",null,y(a.$t("page.alova.scenes.refreshTime"))+": "+y(g(l).time||"--"),1),g(t)?(b(),C(m,{key:0,size:12})):D("",!0)]),_:1})]),_:1})}}}),lo=P({__name:"network-toggle-request",setup(n){const o=G.Get("/mock/getLastTime",{cacheFor:null}),e=W(!1),{loading:t,data:l}=K(o,{enableVisibility:!1,enableNetwork:!0,enableFocus:!1,initialData:{time:""},async middleware(a,c){await O("autoRequest:2")(a,()=>Promise.resolve()),e.value||c()}}),i=()=>{e.value=!e.value};return(a,c)=>{const s=U,p=Z,_=Y,v=V,m=X,r=F;return b(),C(r,{vertical:""},{default:f(()=>[u(s,{type:"info"},{default:f(()=>[k(y(a.$t("page.alova.scenes.networkRequestTips")),1)]),_:1}),u(v,{type:"primary",onClick:i},{default:f(()=>[e.value?(b(),C(p,{key:0,class:"mr-2"})):(b(),C(_,{key:1,class:"mr-2"})),k(" "+y(e.value?a.$t("page.alova.scenes.startRequest"):a.$t("page.alova.scenes.stopRequest")),1)]),_:1}),u(r,{align:"center"},{default:f(()=>[E("span",null,y(a.$t("page.alova.scenes.refreshTime"))+": "+y(g(l).time||"--"),1),g(t)?(b(),C(m,{key:0,size:12})):D("",!0)]),_:1})]),_:1})}}}),io=P({__name:"cross-component-request",setup(n){const o=async()=>{Fe(/^autoRequest/,async({send:e})=>{await e()})};return(e,t)=>{const l=V;return b(),C(l,{onClick:o},{default:f(()=>[k(y(e.$t("page.alova.scenes.triggerAllRequest")),1)]),_:1})}}}),go=P({name:"alova_scenes",__name:"index",setup(n){return(o,e)=>{const t=Ee,l=F;return b(),C(l,{vertical:"",size:16},{default:f(()=>[u(t,{title:g(x)("page.alova.scenes.captchaSend"),bordered:!1,size:"small",segmented:"",class:"card-wrapper"},{default:f(()=>[u(eo,{class:"w-1/3"})]),_:1},8,["title"]),u(t,{title:g(x)("page.alova.scenes.autoRequest"),bordered:!1,size:"small",segmented:"",class:"card-wrapper"},{default:f(()=>[u(l,{wrap:!1},{default:f(()=>[u(ao),u(ro),u(lo)]),_:1})]),_:1},8,["title"]),u(t,{title:g(x)("page.alova.scenes.requestCrossComponent"),bordered:!1,size:"small",segmented:"",class:"card-wrapper"},{default:f(()=>[u(io)]),_:1},8,["title"])]),_:1})}}});export{go as default};
