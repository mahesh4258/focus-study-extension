document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('focus-toggle');
  const statusText = document.getElementById('status-text');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const minutesInput = document.getElementById('minutes');
  const inputArea = document.getElementById('input-area');
  const runningArea = document.getElementById('running-area');
  const timeDisplay = document.getElementById('time-display');
  

  const progressBar = document.getElementById('progress-bar');
  const fractionDisplay = document.getElementById('fraction-display');
  const dailyGoalInput = document.getElementById('daily-goal-input');

  function updateUI() {
    chrome.storage.local.get(['focusMode', 'timerActive', 'timerDeadline', 'todayMinutes', 'dailyGoal', 'lastStudyDate'], (data) => {
      const todayStr = new Date().toDateString();
      let minutesDone = data.todayMinutes || 0;
      
      if (data.lastStudyDate !== todayStr) {
        minutesDone = 0; 
      }

      const goal = data.dailyGoal || 60;
      dailyGoalInput.value = goal;
      
      const percentage = Math.min((minutesDone / goal) * 100, 100);
      progressBar.style.width = percentage + "%";
      fractionDisplay.textContent = `${minutesDone} / ${goal} min`;


      toggle.checked = !!data.focusMode;
      statusText.textContent = data.focusMode ? "Mode: ON" : "Mode: OFF";
      statusText.style.color = data.focusMode ? "#27ae60" : "#7f8c8d";

      if (data.timerActive) {
        inputArea.style.display = 'none';
        runningArea.style.display = 'block';
        stopBtn.style.display = 'inline-block';
        
        const remainingMs = data.timerDeadline - Date.now();
        const remainingMins = Math.ceil(remainingMs / 60000);
        
        if (remainingMins > 0) {
            timeDisplay.textContent = `${remainingMins} min left`;
        } else {
            timeDisplay.textContent = "Almost done...";
        }
      } else {
        inputArea.style.display = 'block';
        runningArea.style.display = 'none';
      }
    });
  }


  updateUI();
  setInterval(updateUI, 1000);


  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ focusMode: toggle.checked }, updateUI);
  });

  startBtn.addEventListener('click', () => {
    const mins = parseInt(minutesInput.value);
    if (mins > 0) {
      chrome.runtime.sendMessage({ action: "startTimer", minutes: mins });
      setTimeout(updateUI, 100); 
    }
  });

  stopBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stopTimer" });
    setTimeout(updateUI, 100);
  });

  dailyGoalInput.addEventListener('change', () => {
    const newGoal = parseInt(dailyGoalInput.value);
    if (newGoal > 0) {
        chrome.runtime.sendMessage({ action: "setGoal", minutes: newGoal });
        setTimeout(updateUI, 100);
    }
  });
});