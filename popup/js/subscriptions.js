"use strict";

const THERE_ARE_NO_SUBSCRIPTIONS_MESSAGE = "There are no subscriptions.";

let section;
let subscriptions;

document.addEventListener("DOMContentLoaded", () => {
  section = document.getElementById("section");
  browser.storage.sync.get(["subscriptions"]).then((items) => {
    subscriptions = items.subscriptions;
    if ((subscriptions !== undefined) && (subscriptions.length > 0)) {
      subscriptions.forEach((subscription) => {
        section.appendChild(createView(subscription.name, subscription.linkToUnsubscribe));
      });
    } else {
      section.appendChild(createParagraph(THERE_ARE_NO_SUBSCRIPTIONS_MESSAGE));
    }
  });
});

function createParagraph(text) {
  const paragraph = document.createElement("p");
  const content = document.createTextNode(text);

  paragraph.appendChild(content);
  
  return paragraph;
}

function removeSubscriptionFromStorage(index) {
  if ((subscriptions !== undefined) && (subscriptions.length > index)) {
    subscriptions.splice(index, 1);
    browser.storage.sync.set({subscriptions});
    return true;
  } else {
    return false;
  }
}

function onDeleteButtonClicked() {
  const children = section.children;
  const div = this.parentElement.parentElement;

  for (let i = 0; i < children.length; i++) {
    if (children[i] === div) {
      removeSubscriptionFromStorage(i);
      children[i].remove();
      break;
    }
  }

  if (section.firstChild === null) {
    section.appendChild(createParagraph(THERE_ARE_NO_SUBSCRIPTIONS_MESSAGE));
  }
}

function createView(name, linkToUnsubscribe) {
  const outerDiv = document.createElement("div");
  outerDiv.setAttribute("class", "w3-section w3-cell-row w3-leftbar w3-border");

  const innerDiv1 = document.createElement("div");
  innerDiv1.setAttribute("class", "w3-container w3-cell");

  const header = document.createElement("h5");
  header.appendChild(document.createTextNode(name));

  innerDiv1.appendChild(header);

  const innerDiv2 = document.createElement("div");
  innerDiv2.setAttribute("class", "w3-container w3-cell w3-cell-middle w3-right-align");

  const a1 = document.createElement("a");
  a1.setAttribute("class", "w3-button w3-small w3-border");
  a1.appendChild(document.createTextNode("Unsubscribe"));
  a1.addEventListener("click", function() {
    browser.tabs.create({
      "url": linkToUnsubscribe
    });
  });

  const a2 = document.createElement("a");
  a2.setAttribute("class", "w3-button w3-small w3-border");
  a2.appendChild(document.createTextNode("Delete"));
  a2.addEventListener("click", onDeleteButtonClicked);

  innerDiv2.appendChild(a1);
  innerDiv2.appendChild(document.createTextNode(" "));
  innerDiv2.appendChild(a2);

  outerDiv.appendChild(innerDiv1);
  outerDiv.appendChild(innerDiv2);

  return outerDiv;
}
