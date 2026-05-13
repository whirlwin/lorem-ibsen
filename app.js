import { SENTENCES, WORDS } from "./corpus.js?p=1";

const $ = (sel) => document.querySelector(sel);

const out = $("#out");
const status = $("#status");
const countInput = $("#count");
const modeInputs = document.querySelectorAll('input[name="mode"]');
const generateBtn = $("#generate");
const copyBtn = $("#copy");

const rand = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rand(arr.length)];

function pickN(arr, n) {
  const pool = arr.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}

function paragraphs(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const len = 3 + rand(5); // 3..7 sentences
    out.push(pickN(SENTENCES, len).join(" "));
  }
  return out.join("\n\n");
}

function sentences(n) {
  return pickN(SENTENCES, n).join(" ");
}

function words(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(pick(WORDS));
  // Capitalise first, end with a period.
  out[0] = out[0].charAt(0).toUpperCase() + out[0].slice(1);
  return out.join(" ") + ".";
}

function currentMode() {
  for (const m of modeInputs) if (m.checked) return m.value;
  return "paragraphs";
}

function generate() {
  const mode = currentMode();
  const raw = parseInt(countInput.value, 10);
  const n = Number.isFinite(raw) ? Math.max(1, Math.min(50, raw)) : 3;
  countInput.value = n;

  let text;
  if (mode === "sentences") text = sentences(n);
  else if (mode === "words") text = words(n);
  else text = paragraphs(n);

  out.textContent = text;
  status.textContent = "";
  copyBtn.disabled = false;
}

async function copy() {
  if (!out.textContent) return;
  try {
    await navigator.clipboard.writeText(out.textContent);
    status.textContent = "Kopiert.";
  } catch {
    // Fallback for browsers without clipboard API.
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(out);
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    status.textContent = "Kopiert.";
  }
  clearTimeout(copy._t);
  copy._t = setTimeout(() => { status.textContent = ""; }, 1600);
}

generateBtn.addEventListener("click", generate);
copyBtn.addEventListener("click", copy);
modeInputs.forEach(m => m.addEventListener("change", () => {
  // Adjust the default count when switching modes.
  const defaults = { paragraphs: 3, sentences: 8, words: 40 };
  countInput.value = defaults[currentMode()] ?? 3;
}));

// Generate on load so the page is never empty.
generate();
