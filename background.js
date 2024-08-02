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

    // Respond back to the content script if needed
    sendResponse({ status: "Data stored successfully" });
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