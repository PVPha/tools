document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        // Load the current state from storage
        chrome.storage.sync.get(['enabledTabs'], (result) => {
            toggleSwitch.checked = result?.enabledTabs?.[tab?.[0]?.id] || false;
            chrome.runtime.sendMessage({ log: [result, tab?.[0]?.id, result?.enabledTabs?.[tab?.[0]?.id]]});
        });
    })

    // Add an event listener to the toggle switch
    toggleSwitch.addEventListener('change', () => {
        const isEnabled = toggleSwitch.checked;
        chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
            // Notify the background script of the change
            chrome.runtime.sendMessage({ extensionEnabled: isEnabled });
        });
    });
});