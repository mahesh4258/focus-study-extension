function updateFocusMode(isEnabled) {
    if (isEnabled) {
        document.body.classList.add('focus-mode-active');
        // console.log("Focus Mode: ON");
    } else {
        document.body.classList.remove('focus-mode-active');
    }
}

chrome.storage.local.get(['focusMode'], (result) => {
    updateFocusMode(result.focusMode);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.focusMode) {
        updateFocusMode(changes.focusMode.newValue);
    }
});