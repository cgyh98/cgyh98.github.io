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
      const a = link(l.label, l.href || l.image);
      if (l.preview || l.image) a.dataset.preview = l.preview || l.image;
      const video = videoEmbed(l.href);
      if (video) a.dataset.video = video;
      if (l.image) a.dataset.image = l.image;
      li.append(a);
      ul.append(li);
    }
    return ul;
  }

  // YouTube ("youtube.com/watch?v=ID", "youtu.be/ID?t=90") or a shared Google
  // Drive video ("drive.google.com/file/d/ID/...") -> an embed URL, else null.
  function videoEmbed(href) {
    const drive = href && href.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
    const m = href && href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    if (!m) return null;
    const t = href.match(/[?&]t=(\d+)/);
    return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0${t ? `&start=${t[1]}` : ''}`;
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

  // Hovering a link with a preview shows a small image card above it.
  // Only on devices with a real pointer; on phones the link just works as a link.
  if (window.matchMedia('(hover: hover)').matches) {
    const peek = h('div', { class: 'peek', 'aria-hidden': 'true' });
    const img = h('img', { alt: '' });
    peek.append(img);
    document.body.append(peek);
    $$('a[data-preview]').forEach((a) => {
      a.addEventListener('mouseenter', () => {
        img.src = a.dataset.preview;
        peek.classList.toggle('is-video', !!a.dataset.video);
        const r = a.getBoundingClientRect();
        const w = 260;
        const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
        peek.style.left = `${left + window.scrollX}px`;
        peek.style.top = `${r.top + window.scrollY - 10}px`;
        peek.classList.add('is-on');
      });
      a.addEventListener('mouseleave', () => peek.classList.remove('is-on'));
    });
  }

  // Videos and photos open in a pop-up on the page instead of a new tab.
  const viewer = h('dialog', { class: 'viewer' });
  const close = h('button', { class: 'viewer-close', 'aria-label': 'Close' }, '×');
  const stage = h('div', { class: 'viewer-stage' });
  viewer.append(close, stage);
  document.body.append(viewer);
  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => { stage.innerHTML = ''; });
  $$('a[data-video], a[data-image]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      stage.className = `viewer-stage ${a.dataset.video ? 'is-video' : 'is-image'}`;
      stage.append(a.dataset.video
        ? h('iframe', { src: a.dataset.video, title: a.textContent, allow: 'autoplay; encrypted-media; picture-in-picture', allowfullscreen: '' })
        : h('img', { src: a.dataset.image, alt: a.textContent }));
      viewer.showModal();
    });
  });

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
