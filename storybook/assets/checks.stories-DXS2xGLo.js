import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{i as t,n,r}from"./theme-BH8Ju9No.js";import{i,r as a}from"./fixtures-8pWTdAfc.js";function o(e,n){return t(i({timeline:[{kind:`checks`}],checks:e}),{theme:n})}var s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{r(),a(),s={title:`Components/Checks`},c=[{name:`Lint & typecheck`,status:`passed`,workflow:`CI`,duration:`14s`},{name:`Unit & integration`,status:`running`,workflow:`CI`,duration:`32s`},{name:`Docker build`,status:`queued`,workflow:`Deploy`}],l=[{name:`Lint & typecheck`,status:`passed`,workflow:`CI`,duration:`14s`},{name:`Unit & integration`,status:`failed`,workflow:`CI`,duration:`38s`},{name:`Docker build`,status:`passed`,workflow:`Deploy`,duration:`48s`}],u={name:`Running`,render:(e,t)=>o(c,n(t))},d={name:`Failed`,render:(e,t)=>o(l,n(t))},f={name:`Skipped`,render:(e,t)=>o([{name:`Preview API docs`,status:`passed`,workflow:`Docs`,duration:`1m 4s`},{name:`Mutation tests`,status:`skipped`,workflow:`Mutation`},{name:`Visual regression tests`,status:`skipped`,workflow:`Visual`}],n(t))},p={name:`No runs reported`,render:(e,t)=>o([],n(t))},m=[`Running`,`Failed`,`Skipped`,`Empty`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Running",
  render: (_args, context) => checks(RUNNING, themeFrom(context))
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "Failed",
  render: (_args, context) => checks(FAILED, themeFrom(context))
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "Skipped",
  render: (_args, context) => checks([{
    name: "Preview API docs",
    status: "passed",
    workflow: "Docs",
    duration: "1m 4s"
  }, {
    name: "Mutation tests",
    status: "skipped",
    workflow: "Mutation"
  }, {
    name: "Visual regression tests",
    status: "skipped",
    workflow: "Visual"
  }], themeFrom(context))
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: "No runs reported",
  render: (_args, context) => checks([], themeFrom(context))
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as Empty,d as Failed,u as Running,f as Skipped,m as __namedExportsOrder,s as default};