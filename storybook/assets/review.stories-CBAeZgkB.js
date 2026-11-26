import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{i as t,n,r}from"./theme-BH8Ju9No.js";import{i,r as a}from"./fixtures-8pWTdAfc.js";function o(e,n){return t(i({timeline:[{kind:`review`,review:e}]}),{theme:n,now:c})}var s,c,l,u,d,f;function p(){return(p=e((()=>{r(),a(),s={title:`Components/Review`},c=Date.parse(`2026-11-26T12:00:00Z`),l={name:`Approved`,render:(e,t)=>o({author:`mira-chen`,state:`approved`,at:`2026-11-26T11:52:00Z`,body:`The sliding window reads well and the boundary tests cover the off-by-one.`},n(t))},u={name:`Changes requested`,render:(e,t)=>o({author:`sam-ito`,state:`changes-requested`,at:`2026-11-26T11:48:00Z`,body:`Limit should be configurable per route, not global.`},n(t))},d={name:`Commented`,render:(e,t)=>o({author:`alex-dev`,state:`commented`,at:`2026-11-26T11:55:00Z`},n(t))},f=[`Approved`,`ChangesRequested`,`Commented`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: "Approved",
  render: (_args, context) => review({
    author: "mira-chen",
    state: "approved",
    at: "2026-11-26T11:52:00Z",
    body: "The sliding window reads well and the boundary tests cover the off-by-one."
  }, themeFrom(context))
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Changes requested",
  render: (_args, context) => review({
    author: "sam-ito",
    state: "changes-requested",
    at: "2026-11-26T11:48:00Z",
    body: "Limit should be configurable per route, not global."
  }, themeFrom(context))
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "Commented",
  render: (_args, context) => review({
    author: "alex-dev",
    state: "commented",
    at: "2026-11-26T11:55:00Z"
  }, themeFrom(context))
}`,...d.parameters?.docs?.source}}}})))()}p();export{l as Approved,u as ChangesRequested,d as Commented,f as __namedExportsOrder,s as default};