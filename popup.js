document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('startButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: getTextContent
      }).then(result => {
        const content = result[0].result;
        document.getElementById('content').innerText = content;
      }).catch(error => {
        console.error('Failed to read content:', error);
        document.getElementById('content').innerText = 'Failed to read content. Please try again.';
      });
    });
  });
});

function getTextContent() {
  // This function will be injected into the page
  function extractTextContent(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }
    if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
      return '';
    }
    let text = '';
    for (let child of node.childNodes) {
      text += extractTextContent(child);
    }
    return text.trim() + (text ? '\n' : '');
  }

  return extractTextContent(document.body).trim();
}