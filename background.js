console.log('Background script running');

// Store the most recent item data
let latestItemData = {};

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background script received message:', message);

  if (message.itemName && message.itemPrice) {
    // Update the stored item data
    latestItemData = {
      itemName: message.itemName,
      itemPrice: message.itemPrice
    };
    console.log('Stored item data:', latestItemData);

    // Send the item data to the backend
    fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: latestItemData.itemName,
        price: latestItemData.itemPrice,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Item successfully sent to the backend:', data);
      sendResponse({ status: "Data stored and sent to backend successfully" });
    })
    .catch(error => {
      console.error('Error sending item data to the backend:', error);
      sendResponse({ status: "Failed to send data to backend" });
    });
  } else if (message.action === 'getLatestItem') {
    // Provide the stored data to the popup when requested
    console.log('Background script sending stored data to popup:', latestItemData);
    sendResponse(latestItemData);
  } else {
    sendResponse({ status: "No valid data received" });
  }

  // Return true to keep the message channel open for async response
  return true;
});