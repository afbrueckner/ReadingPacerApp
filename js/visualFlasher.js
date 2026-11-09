let currentFlashDelay = 350;

window.buildChunksFromPassage = function(passageText) {
  if (!passageText) return [];

  const sentences = passageText.match(/[^.!?]+[.!?]+/g) || [passageText];
  const chunks = [];

  sentences.forEach(sentence => {
    const clauses = sentence.trim().split(/(?<=[,;:])/g);

    clauses.forEach(clause => {
      const words = clause.trim().split(/\s+/).filter(w => w.length > 0);
      let i = 0;

      while (i < words.length) {
        const remaining = words.length - i;
        let count = 3;

        if (remaining === 4) {
          count = 2;
        } else if (remaining < 3) {
          count = remaining;
        }

        const chunkText = words.slice(i, i + count).join(' ');
        if (chunkText.trim()) {
          const oapIndex = Math.floor(chunkText.length / 2);
          chunks.push({ text: chunkText, oap: oapIndex });
        }
        i += count;
      }
    });
  });

  return chunks;
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