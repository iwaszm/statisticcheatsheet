import { statsData } from './data/statsData.js';

// NOTE: apiKey is intentionally empty for GitHub Pages.
// If you later want the AI analyzer, use a server-side proxy (never expose keys in client JS).
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
  return `
    <div class="glass-panel p-5 rounded-xl border interactive-card flex flex-col h-full">
      <div class="flex justify-between items-start mb-3">
        <h4 class="font-bold text-lg text-gray-900 leading-tight">${item.method}</h4>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(item.nature)} whitespace-nowrap ml-2">
          ${item.nature.split(' ')[0]}
        </span>
      </div>
      <div class="space-y-3 flex-grow text-sm">
        <p><strong class="text-gray-700">Design:</strong> ${item.iv}</p>
        <p><strong class="text-gray-700">Assumptions:</strong> <span class="text-gray-600">${item.assumptions}</span></p>
        <p class="text-gray-500 italic border-l-2 border-gray-300 pl-2">"${item.example}"</p>
      </div>
      <div class="mt-4 relative group">
        <div class="code-block text-xs">
          <code>${item.code}</code>
        </div>
        <button data-copy="${codeAttr}" class="btn-copy absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1" title="Copy Code">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </button>
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
      <div class="col-span-full py-12 text-center text-gray-500 glass-panel rounded-xl">
        <span class="text-4xl block mb-2 text-gray-300">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </span>
        <p class="text-lg font-medium">No methods match this exact combination.</p>
        <p class="text-sm mt-1">Try broadening your criteria.</p>
      </div>`;
  } else {
    container.innerHTML = dataArray.map(generateCardHTML).join('');
  }
};

const main = () => {
  const selDv = document.getElementById('sel-dv');
  const selIv = document.getElementById('sel-iv');
  const selNature = document.getElementById('sel-nature');
  const btnReset = document.getElementById('btn-reset');
  const finderContainer = document.getElementById('finder-results');
  const resultCount = document.getElementById('result-count');
  const fullGlossaryContainer = document.getElementById('full-glossary-grid');
  const searchInput = document.getElementById('search-input');

  // AI Elements
  const btnAi = document.getElementById('btn-ai');
  const aiDescription = document.getElementById('ai-description');
  const aiSpinner = document.getElementById('ai-spinner');
  const aiReasoningContainer = document.getElementById('ai-reasoning-container');
  const aiReasoning = document.getElementById('ai-reasoning');
  const aiError = document.getElementById('ai-error');

  const filterFinder = () => {
    const valDv = selDv.value;
    const valIv = selIv.value;
    const valNature = selNature.value;

    const filtered = statsData.filter(item => {
      const matchDv = valDv === 'all' || item.dv === valDv;
      const matchIv = valIv === 'all' || item.iv === valIv;
      const matchNature = valNature === 'all' || item.nature.includes(valNature) || (valNature === 'Categorical' && item.nature.includes('Categorical'));
      return matchDv && matchIv && matchNature;
    });

    renderResults(finderContainer, filtered);
    resultCount.innerText = `Showing ${filtered.length} matching method(s)`;
  };

  selDv.addEventListener('change', filterFinder);
  selIv.addEventListener('change', filterFinder);
  selNature.addEventListener('change', filterFinder);

  btnReset.addEventListener('click', () => {
    selDv.value = 'all';
    selIv.value = 'all';
    selNature.value = 'all';
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

  // Copy buttons (event delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('.btn-copy');
    if (!btn) return;
    const code = btn.getAttribute('data-copy') || '';
    copyToClipboard(code, btn);
  });

  async function analyzeWithAI() {
    const text = aiDescription.value.trim();
    if (!text) return;

    // UI loading state
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

        if (parsed.dv && Array.from(selDv.options).some(o => o.value === parsed.dv)) selDv.value = parsed.dv;
        if (parsed.iv && Array.from(selIv.options).some(o => o.value === parsed.iv)) selIv.value = parsed.iv;
        if (parsed.nature && Array.from(selNature.options).some(o => o.value === parsed.nature)) selNature.value = parsed.nature;

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
