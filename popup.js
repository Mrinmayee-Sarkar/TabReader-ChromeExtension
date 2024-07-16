document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('startButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: getSelectedText
      }).then(result => {
        const selectedText = result[0].result;
        if (selectedText) {
          document.getElementById('content').textContent = selectedText;
        } else {
          document.getElementById('content').textContent = 'No text selected. Please select some text on the page and try again.';
        }
      }).catch(error => {
        console.error('Failed to read selected text:', error);
        document.getElementById('content').textContent = 'Failed to read selected text. Please try again.';
      });
    });
  });
});

function getSelectedText() {
  return window.getSelection().toString();
}