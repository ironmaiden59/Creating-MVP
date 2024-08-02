// content.js
(function() {
  const getItemDetails = () => {
    const itemNameElement = document.querySelector('h1[itemprop="name"]');
    const itemPriceElement = document.querySelector('span[itemprop="price"]');

    const itemName = itemNameElement ? itemNameElement.innerText : 'N/A';
    const itemPrice = itemPriceElement ? itemPriceElement.innerText : 'N/A';

    return { itemName, itemPrice };
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getItemDetails") {
      const details = getItemDetails();
      sendResponse(details);
    }
  });
})();