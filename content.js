let sidebarElement;
let toolbarElement;

document.addEventListener('mouseup', function(e) {
  console.log("Mouse up event triggered");
  const selection = window.getSelection();
  
  if (selection.toString().length > 0) {
    console.log("Text selected:", selection.toString());
    if (!toolbarElement) {
      console.log("Creating toolbar");
      toolbarElement = document.createElement('div');
      toolbarElement.id = 'selection-toolbar';
      
      const aiButton = document.createElement('button');
      aiButton.textContent = 'AI';
      aiButton.addEventListener('click', handleAIClick);
      toolbarElement.appendChild(aiButton);
      
      document.body.appendChild(toolbarElement);
      console.log("Toolbar created and appended");
    }
    
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    toolbarElement.style.position = 'absolute';
    toolbarElement.style.left = `${rect.left + window.pageXOffset}px`;
    toolbarElement.style.top = `${rect.top + window.pageYOffset - 40}px`;
    toolbarElement.style.display = 'block';
    console.log("Toolbar positioned at", toolbarElement.style.left, toolbarElement.style.top);
  } else {
    console.log("No text selected");
    if (toolbarElement) {
      toolbarElement.style.display = 'none';
      console.log("Toolbar hidden");
    }
  }
});

function handleAIClick() {
  console.log("AI button clicked");
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    console.log("Selected text:", selectedText);
    showSidebar(selectedText);
    // Replace the following line with your AI processing logic
    processingResult = "AI processing result for: " + selectedText;
    updateSidebar(processingResult);
  }
}

function showSidebar(content) {
  if (!sidebarElement) {
    sidebarElement = document.createElement('div');
    sidebarElement.id = 'ai-sidebar';
    sidebarElement.style.position = 'fixed';
    sidebarElement.style.top = '0';
    sidebarElement.style.right = '0';
    sidebarElement.style.width = '300px';
    sidebarElement.style.height = '100%';
    sidebarElement.style.backgroundColor = '#f0f0f0';
    sidebarElement.style.padding = '20px';
    sidebarElement.style.boxShadow = '-2px 0 5px rgba(0,0,0,0.2)';
    sidebarElement.style.overflowY = 'auto';
    sidebarElement.style.zIndex = '9999';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.addEventListener('click', () => {
      sidebarElement.style.display = 'none';
    });

    sidebarElement.appendChild(closeButton);
    document.body.appendChild(sidebarElement);
  }

  sidebarElement.style.display = 'block';
  sidebarElement.innerHTML = `
    <button id="close-sidebar" style="position: absolute; top: 10px; right: 10px;">Close</button>
    <h2>Selected Text:</h2>
    <p>${content}</p>
    <h2>AI Processing:</h2>
    <p id="ai-result">Processing...</p>
  `;

  document.getElementById('close-sidebar').addEventListener('click', () => {
    sidebarElement.style.display = 'none';
  });
}

function updateSidebar(result) {
  const aiResultElement = document.getElementById('ai-result');
  if (aiResultElement) {
    aiResultElement.textContent = result;
  }
}

// Hide toolbar when clicking outside the selection
document.addEventListener('mousedown', function(e) {
  if (toolbarElement && !toolbarElement.contains(e.target)) {
    toolbarElement.style.display = 'none';
  }
});

console.log("Content script loaded");