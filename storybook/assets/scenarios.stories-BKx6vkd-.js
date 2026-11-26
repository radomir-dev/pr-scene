import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{i as t,n,r}from"./theme-BH8Ju9No.js";import{n as i,r as a,t as o}from"./scenes-Cwlkq6v7.js";function s(e){let t=c.find(t=>t.id===e);return t?{scenario:t,unknown:null}:{scenario:c[0],unknown:e}}var c;function l(){return(l=e((()=>{i(),c=[{id:`actions-running`,title:`Actions · checks running`,scene:o(`running`)},{id:`actions-passed`,title:`Actions · all passed`,scene:o(`passed`)},{id:`actions-failed`,title:`Actions · failed`,scene:o(`failed`)},{id:`actions-merged`,title:`Actions · merged`,scene:o(`merged`)},{id:`release-checklist`,title:`Release checklist · running`,scene:a()}]})))()}function u(e){d(e.querySelector(`.ps-header`)).toBeTruthy(),d(e.querySelector(`.ps-checks`)).toBeTruthy()}var d;function f(){return(f=e((()=>{({expect:d}=__STORYBOOK_MODULE_TEST__)})))()}function p(e,n){return t(s(e).scenario.scene,{theme:n})}var m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{r(),l(),f(),m={title:`Scenarios`},h=({canvasElement:e})=>{u(e)},g={name:`Actions · running`,render:(e,t)=>p(`actions-running`,n(t)),play:h},_={name:`Actions · passed`,render:(e,t)=>p(`actions-passed`,n(t)),play:h},v={name:`Actions · failed`,render:(e,t)=>p(`actions-failed`,n(t)),play:h},y={name:`Actions · merged`,render:(e,t)=>p(`actions-merged`,n(t)),play:h},b={name:`Release checklist`,render:(e,t)=>p(`release-checklist`,n(t)),play:h},x=[`ActionsRunning`,`ActionsPassed`,`ActionsFailed`,`ActionsMerged`,`ReleaseChecklist`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "Actions · running",
  render: (_args, context) => render("actions-running", themeFrom(context)),
  play
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: "Actions · passed",
  render: (_args, context) => render("actions-passed", themeFrom(context)),
  play
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: "Actions · failed",
  render: (_args, context) => render("actions-failed", themeFrom(context)),
  play
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Actions · merged",
  render: (_args, context) => render("actions-merged", themeFrom(context)),
  play
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: "Release checklist",
  render: (_args, context) => render("release-checklist", themeFrom(context)),
  play
}`,...b.parameters?.docs?.source}}}})))()}S();export{v as ActionsFailed,y as ActionsMerged,_ as ActionsPassed,g as ActionsRunning,b as ReleaseChecklist,x as __namedExportsOrder,m as default};