import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{n as t,t as n}from"./markdown-fCUXEdHy.js";var r,i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),r={title:`Components/Markdown`},i=`### CI summary

| Check | Status |
| :--- | :---: |
| **Lint** | ✅ Passed |
| **Tests** | 🟡 Running |

- [x] OpenAPI validated
- [ ] E2E smoke completed

Read the [workflow run](https://github.com/acme/storefront/actions/runs/1234) for logs.`,a=`> [!WARNING]
> The preview build was skipped because the diff touched no UI files.`,o=`- [ ] <!-- toggle:docs -->

<!-- slot:footer -->

<!-- /slot:footer -->`,s={name:`Rendered`,render:()=>t(i)},c={name:`Alert`,render:()=>t(a)},l={name:`Source with slots`,render:()=>t(o,{mode:`source`})},u=[`Rendered`,`Alert`,`Source`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Rendered",
  render: () => renderMarkdown(GFM)
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Alert",
  render: () => renderMarkdown(ALERT)
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: "Source with slots",
  render: () => renderMarkdown(SOURCE, {
    mode: "source"
  })
}`,...l.parameters?.docs?.source}}}})))()}d();export{c as Alert,s as Rendered,l as Source,u as __namedExportsOrder,r as default};