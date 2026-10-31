// Renders content.js into whichever page is open. Each block only runs if its
// container is on the page. You shouldn't need to edit this file to change any words.

(function () {
  const C = window.CONTENT;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const get = (path) => path.split('.').reduce((o, k) => (o ? o[k] : undefined), C);

  function h(tag, attrs = {}, html) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) if (v !== undefined) el.setAttribute(k, v);
    if (html !== undefined) setHTML(el, html);
    return el;
  }
  function setHTML(el, str) {
    el.innerHTML = str;
    if (/^TODO/.test(str)) el.classList.add('todo');
  }
  function link(label, href) {
    const external = /^https?:/.test(href);
    return h('a', external ? { href, target: '_blank', rel: 'noopener' } : { href }, label);
  }
  function linkList(links) {
    const ul = h('ul', { class: 'links' });
    for (const l of links) {
      const li = h('li');
      li.append(link(l.label, l.href));
      ul.append(li);
    }
    return ul;
  }
  // Runs `fn` with the container if the current page has it.
  const fill = (sel, fn) => { const el = $(sel); if (el) fn(el); };

  // Detail-page header: "gabriela yaulli > projects" (the name links home), then a subtitle.
  $$('[data-header]').forEach((el) => {
    const cfg = C.headers[el.dataset.header];
    const h1 = h('h1');
    h1.append(h('a', { href: 'index.html', class: 'home' }, C.name.toLowerCase()), h('span', { class: 'sep' }, ' > '), document.createTextNode(cfg.label));
    el.append(h1, h('p', { class: 'subtitle' }, cfg.subtitle));
  });

  $$('[data-text]').forEach((el) => setHTML(el, get(el.dataset.text)));

  $$('[data-contact]').forEach((ul) => {
    for (const [label, href] of [[C.email, `mailto:${C.email}`], ['LinkedIn', C.linkedin], ['GitHub', C.github]]) {
      const li = h('li');
      li.append(link(label, href));
      ul.append(li);
    }
  });

  // Until a photo is added, show a placeholder box with the caption.
  fill('[data-photo]', (el) => {
    const p = C.photo;
    el.append(p.src ? h('img', { src: p.src, alt: p.alt, width: 720, height: 900 }) : h('div', { class: 'photo-placeholder todo' }, 'TODO: photo'));
    el.append(h('figcaption', {}, p.caption));
  });

  fill('[data-intro]', (el) => C.intro.forEach((t) => el.append(h('p', {}, t))));

  fill('[data-pages]', (el) => C.pages.forEach((p) => {
    const li = h('li');
    li.append(h('a', { href: p.href }, p.title));
    el.append(li);
  }));

  fill('[data-about]', (el) => C.about.forEach((p) => el.append(h('p', {}, p))));
  fill('[data-outside]', (el) => C.outside.forEach((p) => el.append(h('p', {}, p))));

  // Sohan-style entry: bold title with the place beside it, an italic context
  // line, then a short paragraph and links.
  function projectItem(p) {
    const li = h('li', { id: p.id });
    const head = h('p', { class: 'entry-head' });
    head.append(h('span', { class: 't' }, p.title));
    if (p.place) head.append(document.createTextNode(' '), h('span', { class: 'place' }, p.place));
    li.append(head, h('p', { class: 'context' }, p.context));
    li.append(h('p', {}, p.outcome ? `${p.description} ${p.outcome}` : p.description));
    if (p.links && p.links.length) li.append(linkList(p.links));
    return li;
  }
  fill('[data-projects]', (el) => C.projects.forEach((p) => el.append(projectItem(p))));

  fill('[data-work]', (el) => C.work.forEach((w) => {
    const d = h('details', { id: w.id });
    const s = h('summary');
    const head = h('div');
    head.append(h('span', { class: 'org' }, w.org), document.createTextNode(' · '), h('span', { class: 'role' }, w.role));
    s.append(head, h('span', { class: 'when' }, `${w.when} · ${w.place}`), h('p', { class: 'summary' }, w.summary));
    d.append(s);
    if (w.details && w.details.length) {
      const ul = h('ul');
      w.details.forEach((t) => ul.append(h('li', {}, t)));
      d.append(ul);
    } else {
      d.classList.add('static');
      s.addEventListener('click', (e) => e.preventDefault());
    }
    el.append(d);
  }));

  fill('[data-talks]', (el) => C.talks.forEach((t) => {
    const li = h('li');
    li.append(h('span', { class: 't' }, t.title));
    const meta = h('p', { class: 'context' }, t.where + (t.when ? ` · ${t.when}` : ''));
    if (t.link) { meta.append(document.createTextNode(' · ')); meta.append(link(t.link.label, t.link.href)); }
    li.append(meta);
    if (t.description) li.append(h('p', {}, t.description));
    el.append(li);
  }));

  fill('[data-edu]', (el) => C.education.forEach((e) => {
    const li = h('li');
    li.append(h('span', { class: 'school' }, e.school), h('span', { class: 'when' }, e.when), h('span', { class: 'degree' }, e.degree));
    if (e.activities) li.append(h('span', { class: 'degree' }, e.activities));
    el.append(li);
  }));

  fill('[data-currently]', (el) => C.currently.forEach((t) => el.append(h('li', {}, t))));
  fill('[data-next]', (el) => C.next.items.forEach((t) => el.append(h('li', {}, t))));

  // Arriving from a map pin (on load or within the page): open the linked
  // work row, bring it into view and mark it.
  function showTarget(smooth) {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (!target) return;
    if (target.tagName === 'DETAILS') target.open = true;
    target.classList.remove('flash');
    void target.offsetWidth;
    target.classList.add('flash');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ block: 'center', behavior: smooth && !calm ? 'smooth' : 'auto' });
  }
  showTarget(false);
  window.addEventListener('hashchange', () => showTarget(true));
})();
