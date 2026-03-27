import { descriptiveData } from './data/descriptiveData.js';
import { inferentialData } from './data/inferentialData.js';
import { predictiveData } from './data/predictiveData.js';

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const formatMetaValue = (value, fallback = 'NA') => String(value || fallback).toUpperCase();

const generateCodeBlockHTML = (label, code) => {
  const safeCode = code || '# Not available';
  const codeAttr = escapeAttr(safeCode);
  return `
    <div class="code-snippet group/code relative bg-slate-100/50 rounded-lg border border-slate-200/20">
      <div class="flex items-center justify-between px-2 pt-2">
        <span class="text-[10px] font-bold uppercase tracking-tight text-slate-400">${label}</span>
      </div>
      <code class="block p-2 pt-1 text-[11px] font-mono text-blue-700 overflow-x-auto selection:bg-blue-100">${safeCode}</code>
      <button data-copy="${codeAttr}" class="btn-copy absolute top-1.5 right-1.5 p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-white transition-all opacity-0 group-hover/code:opacity-100 shadow-sm" title="Copy Code">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
      </button>
    </div>
  `;
};

const generateDescriptiveCardHTML = (item) => `
  <div class="kanban-card aws-card h-full flex flex-col p-6 relative overflow-visible group cursor-default">
    <div class="relative z-10 flex flex-wrap gap-1.5 mb-1">
      <div class="inline-block bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 rounded border border-blue-100 uppercase tracking-tight">${formatMetaValue(item.type)}</div>
    </div>

    <div class="mb-2 min-w-0 relative z-10">
      <h4 class="text-xl font-bold text-slate-900 truncate leading-tight tracking-tight" title="${item.method}">
        ${item.method}
      </h4>
    </div>

    <div class="flex-grow text-[14px] leading-relaxed text-slate-600 relative z-10">
      <div class="mb-3 font-normal">
        ${item.function}
      </div>
      <div class="mb-4 pl-3 border-l-2 border-slate-200/60 py-1">
        <p class="italic text-slate-400 text-[13px]">"${item.example}"</p>
      </div>
    </div>

    <div class="mt-1 relative z-10 space-y-3">
      ${generateCodeBlockHTML('R', item.codeR)}
    </div>
  </div>
`;

const generateInferentialCardHTML = (item) => `
  <div class="kanban-card aws-card h-full flex flex-col p-6 relative overflow-visible group cursor-default">
    <div class="relative z-10 flex flex-wrap gap-1.5 mb-1">
      <div class="inline-block bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 rounded border border-blue-100 uppercase tracking-tight">${formatMetaValue(item.type)}</div>
      <div class="inline-block bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded border border-slate-100 uppercase tracking-tight">${formatMetaValue(item.sampleN)}</div>
      <div class="inline-block bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded border border-slate-100 uppercase tracking-tight">${formatMetaValue(item.sampleR)}</div>
    </div>

    <div class="mb-2 min-w-0 relative z-10">
      <h4 class="text-xl font-bold text-slate-900 truncate leading-tight tracking-tight" title="${item.method}">
        ${item.method}
      </h4>
    </div>

    <div class="flex-grow text-[14px] leading-relaxed text-slate-600 relative z-10">
      <div class="mb-3 font-normal">
        ${item.function}
      </div>
      <div class="mb-4 pl-3 border-l-2 border-slate-200/60 py-1">
        <p class="italic text-slate-400 text-[13px]">"${item.example}"</p>
      </div>
    </div>

    <div class="mt-1 relative z-10 space-y-3">
      ${generateCodeBlockHTML('R', item.codeR)}
    </div>
  </div>
`;

const generatePredictiveCardHTML = (item) => `
  <div class="kanban-card aws-card h-full flex flex-col p-6 relative overflow-visible group cursor-default">
    <div class="relative z-10 flex flex-wrap gap-1.5 mb-1">
      <div class="inline-block bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 rounded border border-blue-100 uppercase tracking-tight">${formatMetaValue(item.type)}</div>
    </div>

    <div class="mb-2 min-w-0 relative z-10">
      <h4 class="text-xl font-bold text-slate-900 truncate leading-tight tracking-tight" title="${item.method}">
        ${item.method}
      </h4>
    </div>

    <div class="flex-grow text-[14px] leading-relaxed text-slate-600 relative z-10">
      <div class="mb-3 font-normal">
        ${item.function}
      </div>
      <div class="mb-4 pl-3 border-l-2 border-slate-200/60 py-1">
        <p class="italic text-slate-400 text-[13px]">"${item.example}"</p>
      </div>
    </div>

    <div class="mt-1 relative z-10 space-y-3">
      ${generateCodeBlockHTML('R', item.codeR)}
    </div>
  </div>
`;

const copyToClipboard = async (text, btnElement) => {
  const originalHTML = btnElement.innerHTML;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const input = document.createElement('textarea');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    btnElement.innerHTML = '<span class="text-green-400 text-xs">Copied!</span>';
    setTimeout(() => { btnElement.innerHTML = originalHTML; }, 2000);
  } catch (e) {
    console.error('Copy failed', e);
  }
};

const renderResults = (container, dataArray) => {
  if (!container) return;
  if (dataArray.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        <span class="text-4xl block mb-2 text-slate-300">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </span>
        <p class="text-lg font-medium">No methods match this combination.</p>
        <p class="text-sm mt-1">Try resetting filters or broadening your search.</p>
      </div>`;
  } else {
    container.innerHTML = dataArray.map(generateInferentialCardHTML).join('');
  }
};

const renderDescriptive = (container, dataArray) => {
  if (!container) return;
  container.innerHTML = dataArray.map(generateDescriptiveCardHTML).join('');
};

const renderPredictive = (container, dataArray, countEl) => {
  if (!container) return;
  container.innerHTML = dataArray.map(generatePredictiveCardHTML).join('');
  if (countEl) countEl.innerText = `Showing ${dataArray.length} predictive method(s)`;
};

const main = () => {
  const finderContainer = document.getElementById('finder-results');
  const resultCount = document.getElementById('result-count');
  const descriptiveGrid = document.getElementById('descriptive-grid');
  const predictiveGrid = document.getElementById('predictive-grid');
  const predictiveCount = document.getElementById('predictive-count');

  // Page Switcher Logic
  const switchPage = (targetId) => {
      // Hide all pages
      document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));
      
      // Show Target
      const targetPage = document.getElementById(`page-${targetId}`);
      if(targetPage) {
          targetPage.classList.remove('hidden');
      }

      // Update Nav Buttons State
      document.querySelectorAll('#main-nav-container button').forEach(btn => {
          if(btn.id === `nav-${targetId}`) {
              btn.classList.add('bg-white', 'shadow-sm', 'text-black');
              btn.classList.remove('text-[#8E8E93]');
          } else {
              btn.classList.remove('bg-white', 'shadow-sm', 'text-black');
              btn.classList.add('text-[#8E8E93]');
          }
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Expose to window for inline onclick handlers (if any)
  window.switchPage = switchPage;

  // Bind Nav Buttons
  ['descriptive', 'inferential', 'predictive'].forEach(page => {
      const btn = document.getElementById(`nav-${page}`);
      if(btn) {
          btn.addEventListener('click', (e) => {
              e.preventDefault();
              switchPage(page);
          });
      }
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('.btn-copy');
    if (!btn) return;
    const code = btn.getAttribute('data-copy') || '';
    copyToClipboard(code, btn);
  });

  // Initial render
  renderResults(finderContainer, inferentialData);
  if (resultCount) resultCount.innerText = `Showing ${inferentialData.length} inferential method(s)`;
  renderDescriptive(descriptiveGrid, descriptiveData);
  renderPredictive(predictiveGrid, predictiveData, predictiveCount);

  // Default view
  switchPage('inferential');
};

document.addEventListener('DOMContentLoaded', main);
