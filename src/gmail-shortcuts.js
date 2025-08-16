// ==UserScript==
// @name         Gmail Keyboard Shortcuts
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Delete single Gmail email using the Delete key
// @author       You
// @match        https://mail.google.com/*
// @match        https://mail.google.com/mail/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function log(message) {
    console.log("[Gmail Delete Script]:", message);
  }

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 2000);
  }

  function findDeleteButton() {
    // Common Gmail delete button selectors
    const selectors = [
      '[aria-label="Delete"]',
      '[data-tooltip="Delete"]',
      '.T-I[act="10"]',
      'div[act="10"]',
    ];

    for (const selector of selectors) {
      const button = document.querySelector(selector);
      if (button && button.offsetParent !== null) {
        return button;
      }
    }
    return null;
  }

  function deleteSingleEmail() {
    const deleteButton = findDeleteButton();

    if (!deleteButton) {
      showNotification("Delete button not found");
      return;
    }

    try {
      ["mouseover", "mousedown", "mouseup", "click"].forEach((eventType) => {
        deleteButton.dispatchEvent(
          new MouseEvent(eventType, { bubbles: true, cancelable: true })
        );
      });
      showNotification("Email deleted!");
      log("Email deleted successfully");
    } catch (error) {
      log("Error deleting email:", error);
      showNotification("Failed to delete email");
    }
  }

  function handleKeyDown(event) {
    // Delete key (keyCode 46)
    if (event.keyCode === 46) {
      event.preventDefault();
      event.stopPropagation();

      log("Delete shortcut triggered");
      deleteSingleEmail();
    }
  }

  function initialize() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initialize);
      return;
    }

    if (!window.location.hostname.includes("mail.google.com")) {
      return;
    }

    document.addEventListener("keydown", handleKeyDown, true);
    log("Gmail Delete Script initialized");
  }

  // Initialize
  initialize();

  // Handle Gmail SPA navigation
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(initialize, 1000);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
