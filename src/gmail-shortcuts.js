// ==UserScript==
// @name         Gmail Keyboard Shortcuts
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Gmail keyboard shortcuts: Delete key to delete email, Right arrow to move to next email, Left arrow to move to previous email, 'a' key to archive email
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

  function clickButton(button) {
    if (!button) {
      return false;
    }

    try {
      ["mouseover", "mousedown", "mouseup", "click"].forEach((eventType) => {
        button.dispatchEvent(
          new MouseEvent(eventType, { bubbles: true, cancelable: true })
        );
      });
      return true;
    } catch (error) {
      log("Error clicking button:", error);
      return false;
    }
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

  function findOlderButton() {
    // Gmail "Older" button selectors (next email)
    const selectors = [
      '[aria-label="Older"]',
      '[data-tooltip="Older"]',
      'div[role="button"][aria-label="Older"]',
    ];

    for (const selector of selectors) {
      const button = document.querySelector(selector);
      if (button && button.offsetParent !== null) {
        return button;
      }
    }
    return null;
  }

  function findNewerButton() {
    // Gmail "Newer" button selectors (previous email)
    const selectors = [
      '[aria-label="Newer"]',
      '[data-tooltip="Newer"]',
      'div[role="button"][aria-label="Newer"]',
    ];

    for (const selector of selectors) {
      const button = document.querySelector(selector);
      if (button && button.offsetParent !== null) {
        return button;
      }
    }
    return null;
  }

  function findArchiveButton() {
    // Gmail Archive button selectors
    const selectors = [
      '[aria-label="Archive"]',
      '[data-tooltip="Archive"]',
      '.T-I[act="7"]',
      'div[act="7"]',
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

    const success = clickButton(deleteButton);
    if (success) {
      showNotification("Email deleted!");
      log("Email deleted successfully");
    } else {
      showNotification("Failed to delete email");
    }
  }

  function moveToNextEmail() {
    const olderButton = findOlderButton();

    if (!olderButton) {
      showNotification("Next email button not found");
      return;
    }

    const success = clickButton(olderButton);
    if (success) {
      showNotification("Moved to next email");
      log("Moved to next email successfully");
    } else {
      showNotification("Failed to move to next email");
    }
  }

  function moveToPreviousEmail() {
    const newerButton = findNewerButton();

    if (!newerButton) {
      showNotification("Previous email button not found");
      return;
    }

    const success = clickButton(newerButton);
    if (success) {
      showNotification("Moved to previous email");
      log("Moved to previous email successfully");
    } else {
      showNotification("Failed to move to previous email");
    }
  }

  function archiveEmail() {
    const archiveButton = findArchiveButton();

    if (!archiveButton) {
      showNotification("Archive button not found");
      return;
    }

    const success = clickButton(archiveButton);
    if (success) {
      showNotification("Email archived!");
      log("Email archived successfully");
    } else {
      showNotification("Failed to archive email");
    }
  }

  function handleKeyDown(event) {
    event.preventDefault();
    event.stopPropagation();

    // Delete key (keyCode 46)
    if (event.keyCode === 46) {
      log("Delete shortcut triggered");
      deleteSingleEmail();
      return;
    }

    // Right arrow key (keyCode 39) - Move to next email
    if (event.keyCode === 39) {
      log("Right arrow shortcut triggered");
      moveToNextEmail();
      return;
    }

    // Left arrow key (keyCode 37) - Move to previous email
    if (event.keyCode === 37) {
      log("Left arrow shortcut triggered");
      moveToPreviousEmail();
      return;
    }

    // 'a' key (keyCode 65) - Archive email
    if (
      event.keyCode === 65 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      log("Archive shortcut triggered");
      archiveEmail();
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
