let diagStartTime;

window.startDiagnostic = function() { 
  diagStartTime = Date.now(); 
  document.getElementById('diagStartBtn').classList.add('hidden'); 
  document.getElementById('diagFinishBtn').classList.remove('hidden'); 
};

window.finishDiagnostic = function() { 
  const elapsed = (Date.now() - diagStartTime) / 1000; 
  const wordCount = window.benchmarkBank[window.currentLexileTier][window.currentBenchmarkForm].wordCount;
  window.rawWpm = Math.round((wordCount / elapsed) * 60); 
  document.getElementById('diagFinishBtn').classList.add('hidden'); 
  document.getElementById('diagQuiz').classList.remove('hidden'); 
};

window.submitDiagnostic = function() { 
  const questions = window.currentData.questions || window.benchmarkBank[window.currentLexileTier][window.currentBenchmarkForm].questions;
  let correctCount = 0;

  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="diag_q${idx}"]:checked`);
    if (selected && parseInt(selected.value) === q.correctIndex) {
      correctCount++;
    }
  });

  const accuracy = correctCount / questions.length;
  const calculatedERR = Math.round(window.rawWpm * accuracy);

  if (window.saveStudentAssessment) {
    window.saveStudentAssessment(window.currentBenchmarkForm, window.rawWpm, accuracy, calculatedERR);
  }

  alert(`Diagnostic Sprint Completed!\n------------------------------\nSpeed: ${window.rawWpm} WPM\nComprehension: ${correctCount}/${questions.length} Correct (${Math.round(accuracy * 100)}%)\nCalculated ERR: ${calculatedERR}`);

  document.getElementById('diagQuiz').classList.add('hidden');
  document.getElementById('diagStartBtn').classList.remove('hidden');
  window.switchTab('module1');
};