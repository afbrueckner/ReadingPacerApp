let currentFlashDelay = 350;

// SURGICAL FIX: Natural 3-4 word chunking with ORP Word-Center Anchor
window.buildChunksFromPassage = function(passageText) {
  if (!passageText) return [];

  // 1. Split into primary clauses by punctuation
  const rawClauses = passageText.split(/([,.;:!—–\n]+)/);
  const rawUnits = [];

  for (let i = 0; i < rawClauses.length; i++) {
    const text = rawClauses[i].trim();
    if (!text) continue;

    // Attach punctuation directly to the preceding word group
    if (/^[,.;:!—–]+$/.test(text)) {
      if (rawUnits.length > 0) {
        rawUnits[rawUnits.length - 1] += text;
      }
      continue;
    }
    rawUnits.push(text);
  }

  // 2. Break clauses into tight 3-4 word visual targets (no 1-word orphans)
  const phrases = [];
  rawUnits.forEach(clause => {
    const words = clause.split(/\s+/);
    let current = [];

    for (let w = 0; w < words.length; w++) {
      current.push(words[w]);

      // Target 3-4 words per chunk
      if (current.length === 3 && w === words.length - 2) {
        // Leave 2 words for the last chunk instead of an orphan 1 word
        phrases.push(current.join(' '));
        current = [];
      } else if (current.length >= 4 || w === words.length - 1) {
        phrases.push(current.join(' '));
        current = [];
      }
    }
  });

  // 3. Calculate True Optimal Recognition Point (ORP) per phrase
  return phrases.map(phrase => {
    const words = phrase.split(' ');
    // Select the middle word as the visual focus target
    const targetWordIndex = Math.floor(words.length / 2);
    
    let charOffset = 0;
    for (let i = 0; i < targetWordIndex; i++) {
      charOffset += words[i].length + 1; // Word length + space
    }

    const targetWord = words[targetWordIndex];
    // Select the ORP character inside the middle word (~30-40% into the word)
    const wordOrpIndex = Math.max(0, Math.floor(targetWord.length / 3));
    const oap = charOffset + wordOrpIndex;

    return {
      text: phrase,
      oap: oap
    };
  });
};

window.setFlashSpeed = function(speedMs) {
  currentFlashDelay = speedMs;
  document.getElementById('spd500').className = speedMs === 500 ? 'px-3 py-1 rounded-md bg-indigo-700 text-white font-bold' : 'px-3 py-1 rounded-md bg-stone-200 text-stone-700 font-bold';
  document.getElementById('spd350').className = speedMs === 350 ? 'px-3 py-1 rounded-md bg-indigo-700 text-white font-bold' : 'px-3 py-1 rounded-md bg-stone-200 text-stone-700 font-bold';
  document.getElementById('spd200').className = speedMs === 200 ? 'px-3 py-1 rounded-md bg-indigo-700 text-white font-bold' : 'px-3 py-1 rounded-md bg-stone-200 text-stone-700 font-bold';
};

window.startFlasher = function() {
  let i = 0;
  const display = document.getElementById('flashDisplay');
  const counter = document.getElementById('flashCounter');
  const chunks = window.currentData.chunks || window.buildChunksFromPassage(window.currentData.passage);
  
  const interval = setInterval(() => {
    if (i >= chunks.length) { 
      clearInterval(interval); 
      display.innerHTML = `<span class="text-emerald-700 font-bold text-base">Session Complete! (${chunks.length} Flashes)</span>`; 
      counter.innerText = `Done: ${chunks.length} / ${chunks.length} Flashes`;
      return; 
    }
    
    const item = chunks[i];
    const text = item.text || "";
    const oap = item.oap !== undefined ? item.oap : Math.floor(text.length / 2);
    
    const prefix = text.slice(0, oap);
    const anchorChar = text[oap] || text[0];
    const suffix = text.slice(oap + 1);

    display.innerHTML = `
      <div class="flash-container">
        <span class="flash-prefix">${prefix}</span>
        <span class="flash-anchor">${anchorChar}</span>
        <span class="flash-suffix">${suffix}</span>
      </div>
    `;
    
    counter.innerText = `Training: ${i + 1} / ${chunks.length} Flashes`;
    i++;
  }, currentFlashDelay);
};