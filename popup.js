
document.addEventListener('DOMContentLoaded', () => {
  const itemNameSpan = document.getElementById('itemName');
  const itemPriceSpan = document.getElementById('itemPrice');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: "getItemDetails" }, (response) => {
      if (response) {
        itemNameSpan.textContent = response.itemName;
        itemPriceSpan.textContent = response.itemPrice;
      }
    });
  });
});