let shutterIdx = 0, shutterInterval;

window.startShutter = function() {
  clearInterval(shutterInterval);
  shutterIdx = 0;
  const lines = document.querySelectorAll('#shutterContainer > div');
  const wpm = parseInt(document.getElementById('wpmInput').value);
  const delay = (60 / (wpm / 10)) * 1000;
  
  shutterInterval = setInterval(() => {
    lines.forEach((el, i) => {
      if (i === shutterIdx) {
        el.className = 'shutter-line focused p-3.5 rounded-lg';
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        el.className = 'shutter-line dimmed p-3.5 rounded-lg';
      }
    });
    shutterIdx++;
    if (shutterIdx >= lines.length) clearInterval(shutterInterval);
  }, delay);
};

window.stopShutter = function() { 
  clearInterval(shutterInterval); 
};