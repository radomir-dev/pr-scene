import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";function t(e){return n.replace(/<!-- slot:docs -->[\s\S]*?<!-- \/slot:docs -->/,`<!-- slot:docs -->\n\n${r[e]}\n\n<!-- /slot:docs -->`)}var n,r,i;function a(){return(a=e((()=>{n=`<!-- pr-slots -->

<table>
<thead>
<tr><th>Enabled</th><th>Check</th><th>Status</th></tr>
</thead>
<tbody>
<tr>
<td>

- [x] <!-- toggle:docs -->

</td>
<td>

**Preview API docs** · ~4 min

</td>
<td>

<!-- slot:docs -->

Waiting for the workflow to run.

<!-- /slot:docs -->

</td>
</tr>
<tr>
<td>

- [ ] <!-- toggle:mutation -->

</td>
<td>

**Mutation tests** · ~18 min

</td>
<td>

Run when the diff touches core logic.

</td>
</tr>
<tr>
<td>

- [ ] <!-- toggle:visual -->

</td>
<td>

**Visual regression tests** · ~9 min

</td>
<td>

Run when the diff touches UI.

</td>
</tr>
</tbody>
</table>

<!-- slot:footer -->

<!-- /slot:footer -->`,r={running:`🟡 Building preview…`,passed:`[API docs for this PR](https://pr-482.docs.internal) ✅`,failed:`❌ Build failed, no preview`,merged:`🎉 Merged and deployed ✅`},i=`### CI summary

<!-- slot:status -->

Waiting for the workflow to run.

<!-- /slot:status -->

- [x] OpenAPI validated
- [ ] E2E smoke completed

<!-- slot:footer -->

<!-- /slot:footer -->`})))()}function o(e){let t=e===`merged`;return{pr:{...u,state:t?`merged`:`open`,commits:3},timeline:s(e,t),checks:d[e],mergeable:!0}}function s(e,t){let n=[{kind:`comment`,comment:c(e)},{kind:`checks`}];return t&&n.push({kind:`merged`,actor:`alex-dev`,sha:`a8f92c1`,at:new Date(Date.now()-3e5).toISOString()}),n}function c(e){return{author:`github-actions`,bot:!0,createdAt:new Date(Date.now()-72e4).toISOString(),body:t(e)}}function l(){return{pr:{title:`feat: show a release checklist on every pull request`,number:42,author:`mira-chen`,base:`main`,head:`feat/release-checklist`,state:`open`},timeline:[{kind:`comment`,comment:{author:`github-actions`,bot:!0,createdAt:new Date(Date.now()-24e4).toISOString(),body:i}},{kind:`checks`}],checks:[{name:`Lint & typecheck`,status:`passed`,workflow:`CI`,duration:`14s`},{name:`Unit & integration`,status:`running`,workflow:`CI`,duration:`32s`}],mergeable:!0}}var u,d;function f(){return(f=e((()=>{a(),u={title:`feat(api): add sliding-window rate limiter middleware`,number:482,author:`alex-dev`,base:`main`,head:`feat/rate-limiter`},d={running:[{name:`Lint & typecheck`,status:`passed`,workflow:`CI`,duration:`14s`},{name:`Unit & integration`,status:`running`,workflow:`CI`,duration:`32s`},{name:`Docker build`,status:`queued`,workflow:`Deploy`},{name:`Preview API docs`,status:`running`,workflow:`Docs`},{name:`Mutation tests`,status:`skipped`,workflow:`Mutation`},{name:`Visual regression tests`,status:`skipped`,workflow:`Visual`}],passed:[{name:`Lint & typecheck`,status:`passed`,workflow:`CI`,duration:`14s`},{name:`Unit & integration`,status:`passed`,workflow:`CI`,duration:`1m 12s`},{name:`Docker build`,status:`passed`,workflow:`Deploy`,duration:`48s`},{name:`Preview API docs`,status:`passed`,workflow:`Docs`,duration:`1m 4s`},{name:`Mutation tests`,status:`skipped`,workflow:`Mutation`},{name:`Visual regression tests`,status:`skipped`,workflow:`Visual`}],failed:[{name:`Lint & typecheck`,status:`passed`,workflow:`CI`,duration:`14s`},{name:`Unit & integration`,status:`failed`,workflow:`CI`,duration:`38s`},{name:`Docker build`,status:`passed`,workflow:`Deploy`,duration:`48s`},{name:`Preview API docs`,status:`failed`,workflow:`Docs`,duration:`24s`},{name:`Mutation tests`,status:`skipped`,workflow:`Mutation`},{name:`Visual regression tests`,status:`skipped`,workflow:`Visual`}],merged:[{name:`Lint & typecheck`,status:`passed`,workflow:`CI`,duration:`14s`},{name:`Unit & integration`,status:`passed`,workflow:`CI`,duration:`1m 12s`},{name:`Docker build`,status:`passed`,workflow:`Deploy`,duration:`48s`},{name:`Preview API docs`,status:`passed`,workflow:`Docs`,duration:`1m 4s`},{name:`Mutation tests`,status:`skipped`,workflow:`Mutation`},{name:`Visual regression tests`,status:`skipped`,workflow:`Visual`}]}})))()}export{f as n,l as r,o as t};