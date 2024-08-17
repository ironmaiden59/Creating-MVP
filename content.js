(function() {
  const getItemDetails = () => {
    let itemName = 'N/A';
    let itemPrice = 'N/A';

    // Define potential selectors for different sites
    const selectors = {
      name: [
        'h1[itemprop="name"]',
        'span[itemprop="name"]',
        'h1.title', // e.g., Kijiji
        '.product-title', // General fallback
        '.product-name', // General fallback
        'h1' // Final fallback
      ],
      price: [
        'span[itemprop="price"]',
        '.price',
        '.product-price',
        'span.price', // General fallback
        '.current-price', // General fallback
        '.offer-price' // General fallback
      ]
    };

    // Iterate over selectors until a match is found
    for (const selector of selectors.name) {
      const element = document.querySelector(selector);
      if (element) {
        itemName = element.innerText.trim();
        break;
      }
    }

    for (const selector of selectors.price) {
      const element = document.querySelector(selector);
      if (element) {
        itemPrice = element.innerText.trim();
        break;
      }
    }

    return { itemName, itemPrice };
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getItemDetails") {
      const details = getItemDetails();
      sendResponse(details);
    }
  });
})();