"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  form.addEventListener("submit", () => {
    browser.storage.sync.get(["subscriptions"]).then(items => {
      let subscriptions = items.subscriptions;

      if (!subscriptions) {
        subscriptions = [];
      }

      subscriptions.push({
        "name": document.getElementById("name").value,
        "linkToUnsubscribe": document.getElementById("link-to-unsubscribe").value
      });
      
      browser.storage.sync.set({subscriptions});
    });
  });
});
