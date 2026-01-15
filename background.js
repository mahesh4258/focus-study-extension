const BLOCKED_SITES = [
  "instagram.com", "facebook.com", "twitter.com", "x.com", "tiktok.com", "reddit.com"
];


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    startFocusTimer(request.minutes);
  } else if (request.action === "stopTimer") {
    stopFocusTimer();
  } else if (request.action === "setGoal") {
    chrome.storage.local.set({ dailyGoal: request.minutes });
  }
});



function startFocusTimer(minutes) {
  chrome.alarms.create("focusAlarm", { delayInMinutes: minutes });
  
  const deadline = Date.now() + (minutes * 60 * 1000);
  chrome.storage.local.set({ 
    timerActive: true, 
    timerDeadline: deadline,
    timerDuration: minutes,
    focusMode: true 
  });
}

function stopFocusTimer() {
  chrome.alarms.clear("focusAlarm");
  chrome.storage.local.set({ timerActive: false, focusMode: false });
}


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusAlarm") {
    chrome.storage.local.get(['timerDuration', 'todayMinutes', 'lastStudyDate'], (data) => {
        const minutesDone = data.timerDuration || 25;
        const todayStr = new Date().toDateString();
        let newTodayMinutes = data.todayMinutes || 0;
        if (data.lastStudyDate !== todayStr) {
            newTodayMinutes = 0;
        }
        newTodayMinutes += minutesDone;
        
        chrome.storage.local.set({ 
            todayMinutes: newTodayMinutes,
            lastStudyDate: todayStr,
            timerActive: false, 
            focusMode: false 
        });
    });

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Session Complete!",
      message: "Progress saved to your daily goal."
    });
  }
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    checkAndBlock(tabId, tab.url);
  }
});

function checkAndBlock(tabId, url) {
  chrome.storage.local.get(['focusMode'], (result) => {
    if (!result.focusMode) return;
    const isBlocked = BLOCKED_SITES.some(site => url.includes(site));
    if (isBlocked) {
      const blockedPageUrl = chrome.runtime.getURL("focus-page.html");
      chrome.tabs.update(tabId, { url: blockedPageUrl });
    }
  });
}