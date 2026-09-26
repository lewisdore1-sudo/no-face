const navButtons = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('.tab-panel');
const targetButtons = document.querySelectorAll('[data-tab-target]');
const mansionState = document.getElementById('mansionState');

function openTab(name){
  panels.forEach(panel => panel.classList.toggle('active', panel.id === name));
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
  window.scrollTo({top:0, behavior:'smooth'});
}

navButtons.forEach(button => {
  button.addEventListener('click', () => openTab(button.dataset.tab));
});

targetButtons.forEach(button => {
  button.addEventListener('click', () => openTab(button.dataset.tabTarget));
});

document.querySelectorAll('.small-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.variant');
    document.querySelectorAll('.variant').forEach(v => v.style.borderColor = '');
    card.style.borderColor = '#a94a4e';
    button.textContent = 'ACTIVE ✓';
    mansionState.textContent = 'SHIFT READY';
  });
});

document.querySelectorAll('.audio-play').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = button.textContent === '▶' ? '■' : '▶';
  });
});

document.querySelectorAll('.folder').forEach(folder => {
  folder.addEventListener('click', () => {
    folder.style.borderColor = '#687571';
  });
});

const testButton = document.getElementById('testButton');
if(testButton){
  testButton.addEventListener('click', () => {
    mansionState.textContent = 'TESTING';
    testButton.textContent = 'ATMOSPHERE TEST RUNNING...';
    setTimeout(() => {
      mansionState.textContent = 'WATCHING';
      testButton.textContent = 'TEST COMPLETE ✓';
      setTimeout(() => testButton.textContent = 'RUN ATMOSPHERE TEST →', 1800);
    }, 1800);
  });
}

// Subtle environmental state changes keep the dashboard alive.
const states = ['WATCHING', 'LISTENING', 'SHIFT READY', 'UNSTABLE'];
let stateIndex = 0;
setInterval(() => {
  stateIndex = (stateIndex + 1) % states.length;
  if(mansionState && !mansionState.textContent.includes('TEST')) {
    mansionState.textContent = states[stateIndex];
  }
}, 5200);
