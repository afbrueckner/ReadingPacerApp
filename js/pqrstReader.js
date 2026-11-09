window.pqrstNext = function(step) {
    document.getElementById('pqrstStep1').classList.add('hidden');
    document.getElementById('pqrstStep2').classList.add('hidden');
    document.getElementById('pqrstStep3').classList.add('hidden');
    document.getElementById(`pqrstStep${step}`).classList.remove('hidden');
  };
  
  window.pqrstReset = function() {
    window.pqrstNext(1);
  };
  
  window.submitPqrstQuiz = function() {
    const questions = window.currentData.questions;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const selected = document.querySelector(`input[name="pqrst_q${idx}"]:checked`);
      if (selected && parseInt(selected.value) === q.correctIndex) {
        correctCount++;
      }
    });
    const pct = Math.round((correctCount / questions.length) * 100);
    alert(`PQRST Module Completed!\nScore: ${correctCount}/${questions.length} Correct (${pct}%)`);
  };