import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{a as t,n,o as r,r as i,s as a,t as o}from"./markdown-fCUXEdHy.js";function s(e){let t=c(e.avatarUrl);return`<div class="ps-avatar">${t?`<img class="ps-avatar-image" src="${i(t)}" alt="" width="40" height="40">`:`<span class="ps-avatar-initials" aria-hidden="true">${i(l(e.author))}</span>`}</div>`}function c(e){if(!e)return null;try{let t=new URL(e);return t.protocol===`https:`||t.protocol===`http:`?t.href:null}catch{return null}}function l(e){return e.split(/[-_\s.]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()??``).join(``)}function u(){return(u=e((()=>{})))()}function d(e,t=Date.now()){let n=new Date(e).getTime();if(Number.isNaN(n))return``;let r=n-t;for(let[e,t]of p)if(Math.abs(r)>=t)return f.format(Math.round(r/t),e);return`just now`}var f,p;function m(){return(m=e((()=>{f=new Intl.RelativeTimeFormat(`en`,{numeric:`auto`}),p=[[`year`,31536e6],[`month`,2592e6],[`week`,6048e5],[`day`,864e5],[`hour`,36e5],[`minute`,6e4]]})))()}function h(e,t={}){let r=e.createdAt?d(e.createdAt,t.now):`just now`,a=e.createdAt?` datetime="${i(e.createdAt)}"`:``;return`<div class="ps-comment-row">
    ${s(e)}
    <article class="ps-comment">
      <header class="ps-comment-header">
        <span class="ps-comment-author">${i(e.author)}</span>
        ${e.bot?`<span class="ps-comment-bot">bot</span>`:``}
        <span class="ps-comment-meta">commented <time${a}>${i(r)}</time></span>
        ${e.edited?`<span class="ps-comment-edited">edited</span>`:``}
      </header>
      <div class="ps-comment-body">${n(e.body)}</div>
    </article>
  </div>`}function g(){return(g=e((()=>{o(),u(),m()})))()}function _(e,t,n=!1){let r=ee(e),a=v(r,e.length);return`<section class="ps-checks" aria-label="Checks">
    <header class="ps-checks-heading">
      <h2 class="ps-checks-title">${i(a)}</h2>
      <p class="ps-checks-summary">${i(te(r))}</p>
    </header>
    <ul class="ps-check-list">${e.map(b).join(``)}</ul>
    ${x(e,r,t,n)}
  </section>`}function v(e,t){return t===0?`Waiting for status to be reported`:e.failed>0?`Some checks were not successful`:e.pending>0?`Some checks haven’t completed yet`:`All checks have passed`}function ee(e){return e.reduce((e,t)=>(t.status===`passed`&&(e.passed+=1),t.status===`failed`&&(e.failed+=1),(t.status===`running`||t.status===`queued`)&&(e.pending+=1),t.status===`skipped`&&(e.skipped+=1),e),{passed:0,failed:0,pending:0,skipped:0})}function te(e){let t=e.passed===1?`successful check`:`successful checks`;return[y(e.failed,`failing`),y(e.passed,t),y(e.pending,`in progress`),y(e.skipped,`skipped`)].filter(Boolean).join(`, `)||`No checks reported`}function y(e,t){return e===0?``:`${e} ${t}`}function b(e){return`<li class="ps-check-row">
    ${a(e.status)}
    <span class="ps-check-workflow">${i(e.workflow??`Checks`)}</span>
    <span class="ps-check-name">${i(e.name)}</span>
    <span class="ps-check-duration">${i(e.duration??`—`)}</span>
    <details class="ps-check-details">
      <summary>Details</summary>
      <pre class="ps-check-log">${i(e.details??C[e.status])}</pre>
    </details>
  </li>`}function x(e,t,n,r=!1){let a=!r&&n!==!1&&t.failed===0&&t.pending===0&&e.length>0,o=S(e.length,t,n,r,a),s=r?`ps-merge-button ps-merge-button--merged`:`ps-merge-button`,c=r?`Merged`:`Merge pull request`;return`<footer class="ps-merge-footer">
    <p class="ps-merge-copy">${i(o)}</p>
    <button class="${i(s)}" type="button"${a?``:` disabled`}>${i(c)}</button>
  </footer>`}function S(e,t,n,r,i){return r?`Pull request successfully merged and closed`:t.failed>0?`Merging is blocked`:t.pending>0||e===0?`Some checks haven’t completed yet`:n===!1?`Merging is blocked`:i?`This branch has no conflicts with the base branch`:`Merging is blocked`}var C;function w(){return(w=e((()=>{t(),C={passed:`Check completed successfully.`,failed:`Check failed. Review the output below.`,running:`Check is still running.`,queued:`Check is queued.`,skipped:`Skipped: the changed files did not match this job’s filter.`}})))()}function T(e,t={}){return`<div class="ps-timeline" data-slot="timeline">${(e.timeline??[{kind:`checks`}]).map(n=>E(n,e,t)).join(``)}</div>`}function E(e,t,n){return e.kind===`comment`?h(e.comment,n):e.kind===`checks`?D(t):e.kind===`review`?ie(e.review,n):re(e,t,n)}function D(e){let t=e.checks??[];return`<div class="ps-timeline-item ps-timeline-item--badge">
    <span class="ps-event-badge ps-event-badge--checks">${a(ne(t))}</span>
    <div class="ps-timeline-content">${_(t,e.mergeable,e.pr.state===`merged`)}</div>
  </div>`}function ne(e){return e.some(e=>e.status===`failed`)?`failed`:e.some(e=>e.status===`running`||e.status===`queued`)?`running`:e.length>0?`passed`:`queued`}function re(e,t,n){let a=i(e.actor??t.pr.author),o=e.sha?` commit <code>${i(e.sha)}</code>`:``,s=e.at?` <span class="ps-event-time">${i(d(e.at,n.now))}</span>`:``,c=`<code>${i(t.pr.base)}</code>`;return`<div class="ps-timeline-item ps-timeline-item--badge">
    <span class="ps-event-badge ps-event-badge--merged">${r(`git-merge`)}</span>
    <p class="ps-event-copy"><strong>${a}</strong> merged${o} into ${c}${s}</p>
  </div>`}function ie(e,t){let n=e.at?` <span class="ps-event-time">${i(d(e.at,t.now))}</span>`:``,r=e.body?`<div class="ps-review-body ps-markdown markdown-body">${i(e.body)}</div>`:``;return`<div class="ps-timeline-item">
    ${s(e)}
    <article class="ps-review ps-review--${e.state}">
      <header class="ps-review-header">
        <strong>${i(e.author)}</strong>
        <span class="ps-review-state">${O[e.state]}</span>${n}
      </header>
      ${r}
    </article>
  </div>`}var O;function k(){return(k=e((()=>{t(),w(),u(),g(),m(),O={approved:`approved these changes`,"changes-requested":`requested changes`,commented:`reviewed`}})))()}var A,j,M,N,P;function F(){return(F=e((()=>{A={type:`object`,required:[`author`,`body`],additionalProperties:!1,properties:{author:{type:`string`},body:{type:`string`},bot:{type:`boolean`},avatarUrl:{type:`string`},createdAt:{type:`string`},edited:{type:`boolean`}}},j={type:`object`,required:[`author`,`state`],additionalProperties:!1,properties:{author:{type:`string`},state:{enum:[`approved`,`changes-requested`,`commented`]},body:{type:`string`},avatarUrl:{type:`string`},at:{type:`string`}}},M={type:`object`,required:[`name`,`status`],additionalProperties:!1,properties:{name:{type:`string`},status:{enum:[`passed`,`failed`,`running`,`queued`,`skipped`]},workflow:{type:`string`},duration:{type:`string`},details:{type:`string`}}},N={anyOf:[{type:`object`,required:[`kind`,`comment`],properties:{kind:{const:`comment`},comment:A}},{type:`object`,required:[`kind`],properties:{kind:{const:`checks`}}},{type:`object`,required:[`kind`,`review`],properties:{kind:{const:`review`},review:j}},{type:`object`,required:[`kind`],properties:{kind:{const:`merged`},actor:{type:`string`},sha:{type:`string`},at:{type:`string`}}}]},P={$schema:`https://json-schema.org/draft/2020-12/schema`,$id:`https://radomir.dev/pr-scene/scene.schema.json`,title:`pr-scene scene`,type:`object`,required:[`pr`],additionalProperties:!1,properties:{pr:{type:`object`,required:[`title`,`number`,`author`,`base`,`head`,`state`],additionalProperties:!1,properties:{title:{type:`string`},number:{type:`integer`},author:{type:`string`},base:{type:`string`},head:{type:`string`},state:{enum:[`open`,`merged`,`closed`]},commits:{type:`integer`}}},timeline:{type:`array`,items:N},checks:{type:`array`,items:M},mergeable:{type:`boolean`},view:{type:`object`,additionalProperties:!1,properties:{theme:{enum:[`light`,`dark`]}}}}}})))()}function I(e){return L(e,P,`scene`)}function L(e,t,n){return t.const===void 0?t.anyOf?z(e,t.anyOf,n):t.enum?B(e,t.enum,n):t.type?V(e,t,n):[]:R(e,t.const,n)}function R(e,t,n){return e===t?[]:[`${n}: expected ${JSON.stringify(t)}`]}function z(e,t,n){return t.some(t=>L(e,t,n).length===0)?[]:[`${n}: does not match any allowed shape`]}function B(e,t,n){return t.includes(e)?[]:[`${n}: expected one of ${t.join(`, `)}`]}function V(e,t,n){return H(e,t.type)?t.type===`array`?U(e,t,n):t.type===`object`?W(e,t,n):[]:[`${n}: expected ${t.type}`]}function H(e,t){return t===`array`?Array.isArray(e):t===`integer`?Number.isInteger(e):t===`object`?typeof e==`object`&&!!e&&!Array.isArray(e):typeof e===t}function U(e,t,n){return t.items?e.flatMap((e,r)=>L(e,t.items,`${n}[${r}]`)):[]}function W(e,t,n){let r=(t.required??[]).filter(t=>!(t in e)).map(e=>`${n}.${e}: required`);for(let[i,a]of Object.entries(t.properties??{}))i in e&&r.push(...L(e[i],a,`${n}.${i}`));return t.additionalProperties===!1&&r.push(...G(e,t,n)),r}function G(e,t,n){return Object.keys(e).filter(e=>!(e in(t.properties??{}))).map(e=>`${n}.${e}: unknown property`)}function K(e){let t=I(e);if(t.length>0)throw Error(`invalid scene: ${t.join(`; `)}`)}function q(){return(q=e((()=>{F()})))()}function J(e){let t=e.commits===void 0?``:`${i(ae(e.commits))} `;return`<header class="ps-header">
    <div class="ps-header-title">
      <h1 class="ps-title">${i(e.title)} <span class="ps-number">#${i(String(e.number))}</span></h1>
      <span class="ps-state ps-state--${i(e.state)}">${r(X[e.state])}<span>${i(Y[e.state])}</span></span>
    </div>
    <p class="ps-meta">
      <span><strong>${i(e.author)}</strong> wants to merge ${t}into <code>${i(e.base)}</code> from <code>${i(e.head)}</code></span>
    </p>
  </header>`}function ae(e){return`${e} ${e===1?`commit`:`commits`}`}var Y,X;function Z(){return(Z=e((()=>{t(),Y={open:`Open`,merged:`Merged`,closed:`Closed`},X={open:`git-pull-request`,merged:`git-merge`,closed:`git-pull-request-closed`}})))()}function oe(e,t={}){return K(e),`<div class="ps-root" data-theme="${i(t.theme??e.view?.theme??`light`)}">
  <article class="ps-page">
    ${J(e.pr)}
    ${T(e,{now:t.now})}
  </article>
</div>`}function Q(){return(Q=e((()=>{q(),Z(),k()})))()}function se(e){return e.globals.theme===`dark`?`dark`:`light`}function $(){return($=e((()=>{})))()}export{g as a,oe as i,se as n,h as o,Q as r,$ as t};