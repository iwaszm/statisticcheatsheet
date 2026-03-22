import { statsData } from './data/statsData.js';
import { descriptiveData } from './data/descriptiveData.js';

// NOTE: apiKey is intentionally empty for GitHub Pages.
const apiKey = "";

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const generateCardHTML = (item) => {
  const codeAttr = escapeAttr(item.code);
  let icon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`;
  
  return `
    <div class="kanban-card h-full">
      <div class="card-icon">
        ${icon}
      </div>
      <h4 class="card-title">${item.method}</h4>
      <div class="card-subtitle">${item.outcome_type} Outcome</div>
      
      <div class="card-body flex-grow">
        <p class="mb-2"><strong class="text-slate-700">Objective:</strong> ${item.objective}</p>
        <p class="mb-2"><strong class="text-slate-700">Assumptions:</strong> ${item.assumptions}</p>
        <p class="italic text-slate-500 border-l-2 border-slate-200 pl-3 mt-3">"${item.example}"</p>
      </div>

      <div class="mt-4">
        <div class="code-snippet group relative">
            <code>${item.code}</code>
            <button data-copy="${codeAttr}" class="btn-copy absolute top-2 right-2 text-slate-400 hover:text-white transition-colors p-1" title="Copy Code">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </button>
        </div>
      </div>
    </div>
  `;
};

const generateDescriptiveCardHTML = (item) => {
  const codeAttr = escapeAttr(item.code);
  
  // Tag (Level) - Small, square white box above title
  const levelPill = `<div class="inline-block bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded border border-slate-100 mb-2 uppercase tracking-tight">Level ${item.level}</div>`;

  return `
    <div class="kanban-card aws-card h-full flex flex-col p-6 relative overflow-visible group cursor-default">
      
      <!-- Tag above Title -->
      <div class="relative z-10">
        ${levelPill}
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

const main = () => {
  const state = {
    objective: 'all',
    outcome_type: 'all',
    counts: 'all',
    relationship: 'all'
  };

  const finderContainer = document.getElementById('finder-results');
  const resultCount = document.getElementById('result-count');
  const relContainer = document.getElementById('container-relationship');
  const descriptiveGrid = document.getElementById('descriptive-grid');

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
    if (relContainer) {
        if (state.objective !== 'all' && state.objective !== 'Compare') {
            relContainer.style.opacity = '0.4';
            relContainer.style.pointerEvents = 'none';
        } else {
            relContainer.style.opacity = '1';
            relContainer.style.pointerEvents = 'auto';
        }
    }

    const filtered = statsData.filter(item => {
      const matchObj = state.objective === 'all' || item.objective === state.objective;
      const matchType = state.outcome_type === 'all' || item.outcome_type === state.outcome_type;
      const matchCount = state.counts === 'all' || item.counts === state.counts;
      
      let matchRel = true;
      if (state.relationship !== 'all') {
          matchRel = item.relationship === state.relationship;
      }

      return matchObj && matchType && matchCount && matchRel;
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

  setupSegmentedGroup('filter-objective', 'objective');
  setupSegmentedGroup('filter-outcome', 'outcome_type');
  setupSegmentedGroup('filter-counts', 'counts');
  setupSegmentedGroup('filter-relationship', 'relationship');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('.btn-copy');
    if (!btn) return;
    const code = btn.getAttribute('data-copy') || '';
    copyToClipboard(code, btn);
  });

  // AI Logic (keeping it for future use)
  const btnAi = document.getElementById('btn-ai');
  const aiDescription = document.getElementById('ai-description');
  const aiSpinner = document.getElementById('ai-spinner');
  const aiReasoningContainer = document.getElementById('ai-reasoning-container');
  const aiReasoning = document.getElementById('ai-reasoning');
  const aiError = document.getElementById('ai-error');

  async function analyzeWithAI() {
    const text = aiDescription.value.trim();
    if (!text) return;

    btnAi.disabled = true;
    aiSpinner.classList.remove('hidden');
    aiReasoningContainer.classList.add('hidden');
    aiError.classList.add('hidden');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const systemPrompt = `Analyze study design. Return JSON with objective, outcome_type, counts, relationship, reasoning.`;
    const payload = { contents: [{ parts: [{ text }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: 'application/json' } };

    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      let jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (jsonText) {
        const parsed = JSON.parse(jsonText.replace(/```json|```/gi, ''));
        const clickPill = (groupId, val) => {
            const container = document.getElementById(groupId);
            if(!container) return;
            const btn = container.querySelector(`.segmented-item[data-value="${val}"]`);
            if(btn) btn.click();
        };
        if (parsed.objective) clickPill('filter-objective', parsed.objective);
        if (parsed.outcome_type) clickPill('filter-outcome', parsed.outcome_type);
        if (parsed.counts) clickPill('filter-counts', parsed.counts);
        if (parsed.relationship) clickPill('filter-relationship', parsed.relationship);
        aiReasoning.innerHTML = `<strong>AI Analysis:</strong> ${parsed.reasoning}`;
        aiReasoningContainer.classList.remove('hidden');
      }
    } catch (err) {
      aiError.innerText = "AI Analysis failed.";
      aiError.classList.remove('hidden');
    } finally {
      btnAi.disabled = false;
      aiSpinner.classList.add('hidden');
    }
  }

  if (btnAi) btnAi.addEventListener('click', analyzeWithAI);

  // Initial render
  filterFinder();
  renderDescriptive(descriptiveGrid, descriptiveData);

  // Default view
  switchPage('inferential');
};

document.addEventListener('DOMContentLoaded', main);
