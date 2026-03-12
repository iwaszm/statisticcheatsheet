import { statsData } from './data/statsData.js';

// NOTE: apiKey is intentionally empty for GitHub Pages.
const apiKey = "";

const getBadgeColor = (nature) => {
  if (nature.includes("Interval & Normal")) return "bg-teal-100 text-teal-800 border-teal-200";
  if (nature.includes("Ordinal")) return "bg-amber-100 text-amber-800 border-amber-200";
  if (nature.includes("Categorical")) return "bg-indigo-100 text-indigo-800 border-indigo-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

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
      <div class="card-subtitle">${item.nature.split(' ')[0]}</div>
      
      <div class="card-body flex-grow">
        <p class="mb-2"><strong class="text-slate-700">Design:</strong> ${item.iv}</p>
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

const main = () => {
  // State for filters
  const state = {
    dv: 'all',
    iv: 'all',
    nature: 'all' 
  };

  const finderContainer = document.getElementById('finder-results');
  const resultCount = document.getElementById('result-count');
  const fullGlossaryContainer = document.getElementById('full-glossary-grid');
  const searchInput = document.getElementById('search-input');
  const btnReset = document.getElementById('btn-reset');

  // AI Elements
  const btnAi = document.getElementById('btn-ai');
  const aiDescription = document.getElementById('ai-description');
  const aiSpinner = document.getElementById('ai-spinner');
  const aiReasoningContainer = document.getElementById('ai-reasoning-container');
  const aiReasoning = document.getElementById('ai-reasoning');
  const aiError = document.getElementById('ai-error');

  const filterFinder = () => {
    const filtered = statsData.filter(item => {
      const matchDv = state.dv === 'all' || item.dv === state.dv;
      const matchIv = state.iv === 'all' || item.iv === state.iv;
      const matchNature = state.nature === 'all' || item.nature.includes(state.nature) || (state.nature === 'Categorical' && item.nature.includes('Categorical'));
      return matchDv && matchIv && matchNature;
    });

    renderResults(finderContainer, filtered);
    resultCount.innerText = `Showing ${filtered.length} matching method(s)`;
  };

  // Setup Pill Click Handlers
  const setupPillGroup = (groupId, type) => {
    const groupEl = document.getElementById(groupId);
    if (!groupEl) return;
    
    groupEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill-filter');
        if (!btn) return;
        
        groupEl.querySelectorAll('.pill-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        state[type] = btn.dataset.value;
        filterFinder();
    });
  };

  setupPillGroup('filter-dv', 'dv');
  setupPillGroup('filter-iv', 'iv');

  btnReset.addEventListener('click', () => {
    state.dv = 'all';
    state.iv = 'all';
    state.nature = 'all';

    document.querySelectorAll('.pill-filter').forEach(btn => {
        if (btn.dataset.value === 'all' || btn.dataset.value.startsWith('All')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    aiDescription.value = '';
    aiReasoningContainer.classList.add('hidden');
    aiError.classList.add('hidden');
    filterFinder();
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = statsData.filter(item =>
      item.method.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.example.toLowerCase().includes(query) ||
      item.assumptions.toLowerCase().includes(query)
    );
    renderResults(fullGlossaryContainer, filtered);
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('.btn-copy');
    if (!btn) return;
    const code = btn.getAttribute('data-copy') || '';
    copyToClipboard(code, btn);
  });

  async function analyzeWithAI() {
    const text = aiDescription.value.trim();
    if (!text) return;

    btnAi.disabled = true;
    aiSpinner.classList.remove('hidden');
    aiReasoningContainer.classList.add('hidden');
    aiError.classList.add('hidden');

    if (!apiKey) {
      aiError.innerText = 'AI is disabled (no API key configured).';
      aiError.classList.remove('hidden');
      btnAi.disabled = false;
      aiSpinner.classList.add('hidden');
      return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = `You are a statistics expert assistant.
Analyze the study description provided by the user. Map the design to exactly ONE option from each of the following lists:
- dv (Dependent Variables): '1', '2+', '0'
- iv (Independent Variables): '0 IVs', '1 IV, 2 levels (Independent)', '1 IV, 2+ levels (Independent)', '1 IV, 2 levels (Dependent)', '1 IV, 2+ levels (Dependent)', '2+ IVs (Independent)', 'Regression', 'Mixed'
- nature (Nature of Dependent Variable): 'Interval & Normal', 'Ordinal/Interval', 'Categorical (2)', 'Categorical'

Respond with a strictly formatted JSON object.
The "reasoning" key should contain a brief 1-2 sentence explanation explaining why these options were chosen based on their study design.`;

    const payload = {
      contents: [{ parts: [{ text }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            dv: { type: 'STRING' },
            iv: { type: 'STRING' },
            nature: { type: 'STRING' },
            reasoning: { type: 'STRING' },
          },
          required: ['dv', 'iv', 'nature', 'reasoning'],
        },
      },
    };

    try {
      let response;
      let retries = 5;
      let delay = 1000;

      for (let i = 0; i < retries; i++) {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) break;
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }

      if (!response.ok) throw new Error('API call failed after retries.');

      const result = await response.json();
      let jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (jsonText) {
        jsonText = jsonText.replace(/^```json/i, '').replace(/```$/, '').trim();
        const parsed = JSON.parse(jsonText);

        const clickPill = (groupId, val) => {
            const container = document.getElementById(groupId);
            if(!container) return;
            const btn = container.querySelector(`.pill-filter[data-value="${val}"]`);
            if(btn) btn.click();
        };

        if (parsed.dv) clickPill('filter-dv', parsed.dv);
        if (parsed.iv) clickPill('filter-iv', parsed.iv);
        if (parsed.nature) state.nature = parsed.nature;

        filterFinder();

        aiReasoning.innerHTML = `<strong>AI Analysis:</strong> ${parsed.reasoning}`;
        aiReasoningContainer.classList.remove('hidden');
      }
    } catch (err) {
      console.error('AI Error:', err);
      aiError.innerText = 'Sorry, AI analysis failed. Please try submitting again or select manually.';
      aiError.classList.remove('hidden');
    } finally {
      btnAi.disabled = false;
      aiSpinner.classList.add('hidden');
    }
  }

  btnAi.addEventListener('click', analyzeWithAI);

  // Initial render
  renderResults(finderContainer, statsData);
  renderResults(fullGlossaryContainer, statsData);
};

document.addEventListener('DOMContentLoaded', main);
