document.addEventListener('DOMContentLoaded', () => {
  const itemNameSpan = document.getElementById('itemName');
  const itemPriceSpan = document.getElementById('itemPrice');
  const errorMessage = document.getElementById('errorMessage');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: "getItemDetails" }, (response) => {
      if (chrome.runtime.lastError || !response) {
        errorMessage.textContent = 'Failed to retrieve item details.';
      } else {
        itemNameSpan.textContent = response.itemName;
        itemPriceSpan.textContent = response.itemPrice;
        errorMessage.textContent = ''; // Clear any previous error message
      }
    });
  });
});