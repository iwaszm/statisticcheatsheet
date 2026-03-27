import { descriptiveData } from './data/descriptiveData.js';
import { inferentialData } from './data/inferentialData.js';
import { predictiveData } from './data/predictiveData.js';

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const getObjectiveLabel = (objective) => {
  if (objective === 'SingleGroup') return 'Single Group';
  return objective || 'Method';
};

const getSamplePillText = (counts) => {
  if (counts === '1') return '1 Sample';
  return `${counts} Samples`;
};

const generateCardHTML = (item) => {
  const codeAttr = escapeAttr(item.code);
  const objectivePill = `<div class="inline-block bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 rounded border border-blue-100 mb-2 uppercase tracking-tight">${getObjectiveLabel(item.objective)}</div>`;
  const outcomePill = `<div class="inline-block bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded border border-slate-100 mb-2 uppercase tracking-tight">${item.outcome_type}</div>`;
  const countsPill = `<div class="inline-block bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded border border-slate-100 mb-2 uppercase tracking-tight">${getSamplePillText(item.counts)}</div>`;
  const relationshipText = item.relationship === 'Paired'
    ? 'Dependent'
    : item.relationship === 'Independent'
      ? 'Independent'
      : '';
  const relationshipPill = relationshipText
    ? `<div class="inline-block bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded border border-slate-100 mb-2 uppercase tracking-tight">${relationshipText}</div>`
    : '';
  const sampleDescriptor = item.counts === '1' ? 'single-sample' : `${item.counts}-sample`;
  const relationshipDescriptor = item.relationship === 'Paired'
    ? 'dependent'
    : item.relationship === 'Independent'
      ? 'independent'
      : '';
  const objectiveDescription = item.objective === 'SingleGroup'
    ? 'single-group inference'
    : `${getObjectiveLabel(item.objective).toLowerCase()} questions`;
  const descriptionText = `Use for ${objectiveDescription} in ${sampleDescriptor}${relationshipDescriptor ? ` ${relationshipDescriptor}` : ''} designs with ${item.nature.toLowerCase()} data; assumes ${item.assumptions.toLowerCase()}.`;
  
  return `
    <div class="kanban-card aws-card h-full flex flex-col p-6 relative overflow-visible group cursor-default">
      <div class="relative z-10 flex flex-wrap gap-1.5">
        ${objectivePill}
        ${outcomePill}
        ${countsPill}
        ${relationshipPill}
      </div>

      <div class="mb-2 min-w-0 relative z-10">
        <h4 class="text-xl font-bold text-slate-900 truncate leading-tight tracking-tight" title="${item.method}">
          ${item.method}
        </h4>
      </div>

      <div class="flex-grow text-[14px] leading-relaxed text-slate-600 relative z-10">
        <div class="mb-3 font-normal">
          ${descriptionText}
        </div>

        <div class="mb-4 pl-3 border-l-2 border-slate-200/60 py-1">
          <p class="italic text-slate-400 text-[13px]">"${item.example}"</p>
        </div>
      </div>

      <div class="mt-1 relative z-10">
        <div class="code-snippet group/code relative bg-slate-100/50 rounded-lg border border-slate-200/20">
            <code class="block p-2 text-[11px] font-mono text-blue-700 overflow-x-auto selection:bg-blue-100">${item.code}</code>
            <button data-copy="${codeAttr}" class="btn-copy absolute top-1.5 right-1.5 p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-white transition-all opacity-0 group-hover/code:opacity-100 shadow-sm" title="Copy Code">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </button>
        </div>
      </div>
    </div>
  `;
};

const getPredictiveTask = (item) => {
  const nature = String(item.nature || '').toLowerCase();
  const method = String(item.method || '').toLowerCase();
  if (nature.includes('time series') || method.includes('arima') || method.includes('prophet')) return 'Forecasting';
  if (nature.includes('time-to-event') || method.includes('cox')) return 'Survival';
  if (item.outcome_type === 'Binary' || item.outcome_type === 'Multinomial') return 'Classification';
  return 'Regression';
};

const generatePredictiveCardHTML = (item) => {
  const codeAttr = escapeAttr(item.code);
  const taskTag = getPredictiveTask(item);
  const taskPill = `<div class="inline-block bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 rounded border border-blue-100 mb-2 uppercase tracking-tight">${taskTag}</div>`;
  const descriptionText = `Predictive ${taskTag.toLowerCase()} model for ${item.nature.toLowerCase()} data; assumes ${item.assumptions.toLowerCase()}.`;

  return `
    <div class="kanban-card aws-card h-full flex flex-col p-6 relative overflow-visible group cursor-default">
      <div class="relative z-10 flex flex-wrap gap-1.5">
        ${taskPill}
      </div>

      <div class="mb-2 min-w-0 relative z-10">
        <h4 class="text-xl font-bold text-slate-900 truncate leading-tight tracking-tight" title="${item.method}">
          ${item.method}
        </h4>
      </div>

      <div class="flex-grow text-[14px] leading-relaxed text-slate-600 relative z-10">
        <div class="mb-3 font-normal">
          ${descriptionText}
        </div>

        <div class="mb-4 pl-3 border-l-2 border-slate-200/60 py-1">
          <p class="italic text-slate-400 text-[13px]">"${item.example}"</p>
        </div>
      </div>

      <div class="mt-1 relative z-10">
        <div class="code-snippet group/code relative bg-slate-100/50 rounded-lg border border-slate-200/20">
            <code class="block p-2 text-[11px] font-mono text-blue-700 overflow-x-auto selection:bg-blue-100">${item.code}</code>
            <button data-copy="${codeAttr}" class="btn-copy absolute top-1.5 right-1.5 p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-white transition-all opacity-0 group-hover/code:opacity-100 shadow-sm" title="Copy Code">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </button>
        </div>
      </div>
    </div>
  `;
};

const generateDescriptiveCardHTML = (item) => {
  const codeAttr = escapeAttr(item.code);
  const naturePill = `<div class="inline-block bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded border border-slate-100 mb-2 uppercase tracking-tight">${item.nature || 'General'}</div>`;

  return `
    <div class="kanban-card aws-card h-full flex flex-col p-6 relative overflow-visible group cursor-default">
      
      <!-- Tag above Title -->
      <div class="relative z-10">
        ${naturePill}
      </div>

      <!-- Title (Large, Bold, One line) -->
      <div class="mb-2 min-w-0 relative z-10">
        <h4 class="text-xl font-bold text-slate-900 truncate leading-tight tracking-tight" title="${item.method}">
            ${item.method}
        </h4>
      </div>

      <!-- Function (Directly below Title) -->
      <div class="flex-grow text-[14px] leading-relaxed text-slate-600 relative z-10">
        <div class="mb-3 font-normal">
            ${item.function}
        </div>
        
        <!-- Example (Italicized) -->
        <div class="mb-4 pl-3 border-l-2 border-slate-200/60 py-1">
            <p class="italic text-slate-400 text-[13px]">"${item.example}"</p>
        </div>
      </div>

      <!-- Code Snippet (Moved Up, No Divider) -->
      <div class="mt-1 relative z-10">
        <div class="code-snippet group/code relative bg-slate-100/50 rounded-lg border border-slate-200/20">
            <code class="block p-2 text-[11px] font-mono text-blue-700 overflow-x-auto selection:bg-blue-100">${item.code}</code>
            <button data-copy="${codeAttr}" class="btn-copy absolute top-1.5 right-1.5 p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-white transition-all opacity-0 group-hover/code:opacity-100 shadow-sm" title="Copy Code">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </button>
        </div>
      </div>
    </div>
  `;
};

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
    container.innerHTML = dataArray.map(generateCardHTML).join('');
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
  const state = {
    outcome_type: 'all',
    counts: 'all',
    relationship: 'all'
  };

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

  const filterFinder = () => {
    const filtered = inferentialData.filter(item => {
      const matchType = state.outcome_type === 'all' || item.outcome_type === state.outcome_type;
      const matchCount = state.counts === 'all' || item.counts === state.counts;
      
      let matchRel = true;
      if (state.relationship !== 'all') {
          matchRel = item.relationship === state.relationship;
      }

      return matchType && matchCount && matchRel;
    });

    renderResults(finderContainer, filtered);
    if (resultCount) resultCount.innerText = `Showing ${filtered.length} matching method(s)`;
  };

  const setupSegmentedGroup = (groupId, type) => {
    const groupEl = document.getElementById(groupId);
    if (!groupEl) return;
    
    groupEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.segmented-item');
        if (!btn) return;
        
        groupEl.querySelectorAll('.segmented-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        state[type] = btn.dataset.value;
        filterFinder();
    });
  };

  setupSegmentedGroup('filter-outcome', 'outcome_type');
  setupSegmentedGroup('filter-counts', 'counts');
  setupSegmentedGroup('filter-relationship', 'relationship');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('.btn-copy');
    if (!btn) return;
    const code = btn.getAttribute('data-copy') || '';
    copyToClipboard(code, btn);
  });

  // Initial render
  filterFinder();
  renderDescriptive(descriptiveGrid, descriptiveData);
  renderPredictive(predictiveGrid, predictiveData, predictiveCount);

  // Default view
  switchPage('inferential');
};

document.addEventListener('DOMContentLoaded', main);
