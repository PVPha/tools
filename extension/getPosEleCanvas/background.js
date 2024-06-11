// Keep track of enabled tabs
let enabledTabs = {};

chrome.runtime.onInstalled.addListener(() => {
    // Initialize the extension state
    chrome.storage.sync.set({ extensionEnabled: false, enabledTabs: {} });
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.extensionEnabled !== undefined) {
        // Handle the state change
        console.log(`Extension is now ${message.extensionEnabled ? 'enabled' : 'disabled'}`);
        const isEnabled = message.extensionEnabled;

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // console.log('tabs', tabs[0].id, isEnabled);
            if (tabs.length > 0) {
                const tabId = tabs[0].id;
                const action = isEnabled ? 'inject' : 'remove';
                //save tab is enabled extension
                chrome.storage.sync.set({ enabledTabs: { [tabId]: isEnabled } });
                // Inject the content script if not already injected
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabId },
                        files: ['content.js']
                    },
                    () => {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        } else {
                            // Send the message to the content script
                            chrome.tabs.sendMessage(tabId, { action: action }, (response) => {
                                if (chrome.runtime.lastError) {
                                    // console.error(chrome.runtime.lastError);
                                }
                            });
                            // updateIcon(tab.id, !!enabledTabs[tab.id]);
                            updateIcon(tabId, isEnabled);
                        }
                    }
                );
            }
        });

        // Perform actions based on the state change
        if (isEnabled) {
            // Code to enable extension features
        } else {
            // Code to disable extension features
        }
    }
    if(message.log !== undefined){
        console.log(message.log);
    }
});

// Function to update the icon
function updateIcon(tabId, isEnabled) {
    chrome.action.setIcon({
        tabId: tabId,
        path: isEnabled ? {
            "16": "images/icon_active16.png",
            "48": "images/icon_active48.png",
            "128": "images/icon_active128.png"
        } : {
            "16": "images/icon16.png",
            "48": "images/icon48.png",
            "128": "images/icon128.png"
        }
    });
}
