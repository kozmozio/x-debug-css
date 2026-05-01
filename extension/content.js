(function () {
  if (document.getElementById('x-debug-css-styles')) return;

  const DEPTH_COUNT = 12;
  const depthRules = Array.from({ length: DEPTH_COUNT }, (_, i) => {
    const hue = Math.round((i * 360) / DEPTH_COUNT);
    return `.x-debug-depth [data-xd="${i + 1}"] { outline: 2px solid hsl(${hue}, 90%, 55%) !important; box-shadow: none !important; }`;
  }).join('\n');

  const style = document.createElement('style');
  style.id = 'x-debug-css-styles';
  style.textContent = `
    .x-debug-css *:not(svg *):not(path) {
      color: hsla(210, 100%, 100%, 0.9) !important;
      background: hsla(210, 100%, 50%, 0.5) !important;
      outline: solid 0.15rem hsla(210, 100%, 100%, 0.5) !important;
      box-shadow: none !important;
      filter: none !important;
    }
    .x-debug-css-outlined *:not(svg *):not(path) {
      outline: 1px solid red !important;
      box-shadow: none !important;
      filter: none !important;
    }
    ${depthRules}
  `;
  document.head.appendChild(style);

  const state = { blueprint: false, outlined: false, depth: false };

  function assignDepths() {
    const walk = (el, d) => {
      el.setAttribute('data-xd', Math.min(d, DEPTH_COUNT));
      for (const child of el.children) walk(child, d + 1);
    };
    walk(document.documentElement, 1);
  }

  function applyState() {
    document.documentElement.classList.toggle('x-debug-css', state.blueprint);
    document.documentElement.classList.toggle('x-debug-css-outlined', state.outlined);
    document.documentElement.classList.toggle('x-debug-depth', state.depth);
    if (state.depth) assignDepths();
  }

  function toggle(mode) {
    state[mode] = !state[mode];
    applyState();
    chrome.runtime.sendMessage({ action: 'stateUpdate', state }).catch(() => {});
  }

  document.addEventListener('keydown', (e) => {
    if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.target.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (e.code === 'KeyD') toggle('blueprint');
    else if (e.code === 'KeyX') toggle('outlined');
    else if (e.code === 'KeyC') toggle('depth');
  });

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === 'toggle') {
      toggle(msg.mode);
      sendResponse({ ok: true, state });
    } else if (msg.action === 'getState') {
      sendResponse({ ok: true, state });
    }
    return true;
  });
})();
