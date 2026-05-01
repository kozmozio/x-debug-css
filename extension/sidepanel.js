async function getActiveTabId() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.id ?? null;
}

function updateUI(state) {
  document.getElementById('btn-blueprint').classList.toggle('active', !!state.blueprint);
  document.getElementById('btn-outlined').classList.toggle('active', !!state.outlined);
  document.getElementById('btn-depth').classList.toggle('active', !!state.depth);
  document.getElementById('error-banner').classList.add('hidden');
}

function showError() {
  document.getElementById('error-banner').classList.remove('hidden');
}

async function handleToggle(mode) {
  const tabId = await getActiveTabId();
  if (!tabId) return;
  try {
    const res = await chrome.tabs.sendMessage(tabId, { action: 'toggle', mode });
    if (res?.state) updateUI(res.state);
  } catch {
    showError();
  }
}

// Button clicks
document.querySelectorAll('.mode-btn').forEach((btn) => {
  btn.addEventListener('click', () => handleToggle(btn.dataset.mode));
});

// Reflect keyboard-triggered state changes (fired by content.js)
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'stateUpdate' && msg.state) updateUI(msg.state);
});

// Sync state when the panel first opens
(async () => {
  const tabId = await getActiveTabId();
  if (!tabId) return;
  try {
    const res = await chrome.tabs.sendMessage(tabId, { action: 'getState' });
    if (res?.state) updateUI(res.state);
  } catch {
    // Content script not yet active on this page – silently ignore
  }
})();
