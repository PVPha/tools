// // inject injected script
// var s = document.createElement('script');
// s.src = chrome.runtime.getURL('injected.js');
// s.onload = function () {
//     this.remove();
// };
// (document.head || document.documentElement).appendChild(s);


// Function to inject HTML
function injectHtml() {
    if (!document.getElementById('myInjectedContent')) {
        const htmlContent = `
        <div id="myInjectedContent" style="position: fixed; top: 10px; left: 10px; background: gray; border: 1px solid black; padding: 10px; z-index: 1000;">
            <h1>Hello, World!</h1>
            <div id="clientX"></div>
            <div id="clientY"></div>
            <button id="closeButton">Close</button>
        </div>
        `;
        const container = document.createElement('div');
        container.innerHTML = htmlContent;
        document.body.appendChild(container);

        // Add an event listener to the close button
        document.getElementById('closeButton').addEventListener('click', () => {
            chrome.runtime.sendMessage({ extensionEnabled: false });
            window.removeEventListener('mousemove', (event) => {
                console.log('remove event');
                clientX.innerHTML = event.clientX;
                clientY.innerHTML = event.clientY;
                console.log(document.elementFromPoint(event.clientX, event.clientY).nodeName);
            }, true)
            removeHtml()
        });
        const clientX = document.getElementById('clientX')
        const clientY = document.getElementById('clientY')
        window.addEventListener('mousemove', (event) => { 
            clientX.innerHTML = event.clientX; 
            clientY.innerHTML = event.clientY; 
            console.log(document.elementFromPoint(event.clientX, event.clientY).nodeName);
        })
    }
}

// Function to remove HTML
function removeHtml() {
    const injectedElement = document.getElementById('myInjectedContent');
    if (injectedElement) {
        injectedElement.remove();
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.action);
    if (message.action === 'inject') {
        injectHtml();
    } else if (message.action === 'remove') {
        removeHtml();
    }
});

