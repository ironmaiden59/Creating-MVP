document.addEventListener('DOMContentLoaded', () => {
  const itemNameSpan = document.getElementById('itemName');
  const itemPriceSpan = document.getElementById('itemPrice');
  const nextButton = document.getElementById('nextButton');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: "getItemDetails" }, (response) => {
      if (response) {
        itemNameSpan.textContent = response.itemName;
        // Remove the dollar sign and any commas
        const sanitizedPrice = response.itemPrice.replace(/[^0-9.]/g, '');
        itemPriceSpan.textContent = sanitizedPrice;

        nextButton.onclick = () => {
          const itemData = {
            name: response.itemName,
            price: sanitizedPrice,
          };

          // Send the data to the backend
          fetch('http://localhost:5000/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
          })
          .then(() => {
            // Redirect to BuyItem page
            chrome.tabs.create({ url: 'http://localhost:3000/buy-item' });
          })
          .catch((error) => {
            console.error('Error sending item data to backend:', error);
          });
        };
      }
    });
  });
});