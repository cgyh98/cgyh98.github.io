// Places the dots, routes and labels from CONTENT.map on the home-page map.
// The land drawing is pre-generated; its projection (Natural Earth) is stored on
// the <svg> as data-k / data-tx / data-ty, so no mapping library is needed.

(function () {
  const svg = document.querySelector('svg.map');
  if (!svg) return;
  const M = window.CONTENT.map;
  const NS = 'http://www.w3.org/2000/svg';
  const W = svg.viewBox.baseVal.width;
  const { k, tx, ty } = Object.fromEntries(['k', 'tx', 'ty'].map((a) => [a, +svg.dataset[a]]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Same math as d3.geoNaturalEarth1, so pins line up with the drawing.
  function project([lon, lat]) {
    const l = (lon * Math.PI) / 180, p = (lat * Math.PI) / 180, p2 = p * p, p4 = p2 * p2;
    const x = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
    const y = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
    return [tx + k * x, ty - k * y];
  }

  // Where each label sits. The northeast US is crowded, so labels fan out.
  const LABELS = {
    Arequipa: [9, 18, 'start'], Lima: [-10, 5, 'end'], Toronto: [-10, -4, 'end'], 'New York': [9, 20, 'start'],
    Andorra: [0, -12, 'middle'], Boston: [10, 6, 'start'], Montreal: [9, -9, 'start'],
  };

  function el(name, attrs, parent) {
    const n = document.createElementNS(NS, name);
    for (const [a, v] of Object.entries(attrs)) n.setAttribute(a, v);
    parent.appendChild(n);
    return n;
  }
  function curve([x1, y1], [x2, y2], bend) {
    const cx = (x1 + x2) / 2 - (y2 - y1) * bend, cy = (y1 + y2) / 2 + (x2 - x1) * bend;
    return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }

  const marks = svg.querySelector('[data-map-marks]');
  const defs = el('defs', {}, svg);
  const routes = el('g', { 'aria-hidden': 'true' }, marks);
  const pins = el('g', {}, marks);
  const at = Object.fromEntries(M.lived.map((p) => [p.name, project(p.coords)]));

  // Lines draw in through a mask, so dashes stay intact while they animate.
  let n = 0;
  function line(d, cls, delay) {
    const id = `reveal-${n++}`;
    const mask = el('mask', { id, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: W, height: svg.viewBox.baseVal.height }, defs);
    const r = el('path', { d, class: 'reveal', pathLength: 1 }, mask);
    r.style.animationDelay = `${delay}s`;
    if (reduceMotion) r.style.strokeDashoffset = 0;
    el('path', { d, class: cls, mask: `url(#${id})` }, routes);
  }

  M.lived.slice(1).forEach((p, i) => line(curve(at[M.lived[i].name], at[p.name], i % 2 ? -0.18 : 0.18), 'route', 0.3 + i * 0.5));
  // Off-map places (remote work) get an arrow at the edge instead of a line.
  M.trips.filter((t) => !t.offMap).forEach((t, i) => line(curve(at[t.from], project(t.coords), -0.22), 'trip', 1.6 + i * 0.25));

  function pin(p, kind) {
    const a = p.href ? el('a', { href: p.href, class: `pin ${kind}` }, pins) : el('g', { class: `pin ${kind}` }, pins);
    const label = `${p.name}${p.note ? `, ${p.note}` : ''}`;
    a.setAttribute('aria-label', label);
    if (p.offMap) {
      const y = project([12, p.coords[1]])[1];
      el('path', { d: `M${W - 44},${y} L${W - 6},${y}`, class: 'trip' }, a);
      el('path', { d: `M${W - 13},${y - 5} L${W - 6},${y} L${W - 13},${y + 5}`, class: 'arrow' }, a);
      const t = el('text', { x: W - 6, y: y - 10, 'text-anchor': 'end', class: 'label' }, a);
      t.textContent = p.name;
      const s = el('text', { x: W - 6, y: y + 20, 'text-anchor': 'end', class: 'note' }, a);
      s.textContent = p.note;
      return;
    }
    const [x, y] = project(p.coords);
    const [dx, dy, anchor] = LABELS[p.name] || [8, 4, 'start'];
    if (p.now) el('circle', { cx: x, cy: y, r: 4, class: 'pulse' }, a);
    el('circle', { cx: x, cy: y, r: 12, class: 'hit' }, a);
    el('circle', { cx: x, cy: y, r: kind === 'lived' ? 3.6 : 3, class: 'dot' }, a);
    const t = el('text', { x: x + dx, y: y + dy, 'text-anchor': anchor, class: 'label' }, a);
    t.textContent = p.name;
    if (p.note) {
      const s = el('tspan', { class: 'note', dx: 4 }, t);
      s.textContent = p.note;
    }
  }

  M.trips.forEach((t) => pin(t, 'trip'));
  M.lived.forEach((p) => pin(p, 'lived'));

  // Hovering a project makes the pins that link to it bounce.
  document.querySelectorAll('.entries li[id]').forEach((item) => {
    const linked = [...pins.querySelectorAll('a.pin')].filter((a) => a.getAttribute('href').endsWith(`#${item.id}`));
    item.addEventListener('mouseenter', () => linked.forEach((a) => a.classList.add('is-hot')));
    item.addEventListener('mouseleave', () => linked.forEach((a) => a.classList.remove('is-hot')));
  });
})();
