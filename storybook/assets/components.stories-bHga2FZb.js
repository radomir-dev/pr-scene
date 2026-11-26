import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{a as t,i as n,n as r,o as i,r as a}from"./theme-BH8Ju9No.js";import{n as o,t as s}from"./scenes-Cwlkq6v7.js";var c,l,u,d;function f(){return(f=e((()=>{t(),a(),o(),c={title:`Components`},l={name:`Comment card`,args:{comment:{author:`github-actions`,bot:!0,createdAt:`2026-11-26T11:58:00Z`,body:`### CI summary

| Check | Status |
| :--- | :---: |
| **Lint** | ✅ Passed |
| **Tests** | 🟡 Running |

- [x] OpenAPI validated
- [ ] E2E smoke completed`}},render:({comment:e})=>i(e,{now:Date.parse(`2026-11-26T12:00:00Z`)})},u={name:`Timeline`,render:(e,t)=>n(s(`merged`),{theme:r(t)})},d=[`Comment`,`Timeline`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: "Comment card",
  args: {
    comment: {
      author: "github-actions",
      bot: true,
      createdAt: "2026-11-26T11:58:00Z",
      body: "### CI summary\\n\\n| Check | Status |\\n| :--- | :---: |\\n| **Lint** | ✅ Passed |\\n| **Tests** | 🟡 Running |\\n\\n- [x] OpenAPI validated\\n- [ ] E2E smoke completed"
    }
  },
  render: ({
    comment
  }) => renderComment(comment, {
    now: Date.parse("2026-11-26T12:00:00Z")
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Timeline",
  render: (_args, context) => renderScene(actionsScene("merged"), {
    theme: themeFrom(context)
  })
}`,...u.parameters?.docs?.source}}}})))()}f();export{l as Comment,u as Timeline,d as __namedExportsOrder,c as default};