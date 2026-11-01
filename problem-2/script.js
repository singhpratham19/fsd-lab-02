// External JavaScript: DOM operations

// getElementById
document.getElementById("by-id").addEventListener("click", () => {
  const list = document.getElementById("item-list");
  document.getElementById("access-result").innerHTML = `Found the list with id "${list.id}".`;
});

// getElementsByTagName
document.getElementById("by-tag").addEventListener("click", () => {
  const items = document.getElementById("item-list").getElementsByTagName("li");
  document.getElementById("access-result").innerHTML = `Found ${items.length} li elements.`;
});

// getElementsByClassName
document.getElementById("by-class").addEventListener("click", () => {
  const items = document.getElementsByClassName("item");
  for (let i = 0; i < items.length; i++) {
    items[i].style.fontWeight = "700";
  }
  document.getElementById("access-result").innerHTML = `Made ${items.length} elements with class "item" bold.`;
});

// Change the text using innerHTML
document.getElementById("text-button").addEventListener("click", () => {
  document.getElementById("change-text").innerHTML = "The text was changed using <strong>innerHTML</strong>.";
});

// Change CSS properties: color and position
document.getElementById("color-button").addEventListener("click", () => {
  document.getElementById("style-box").style.color = "#a3341f";
});

document.getElementById("position-button").addEventListener("click", () => {
  const box = document.getElementById("style-box");
  box.style.position = "relative";
  box.style.left = "40px";
});

// Change the image source on click
document.getElementById("image-button").addEventListener("click", () => {
  const photo = document.getElementById("photo");
  const firstImage = photo.getAttribute("src").includes("reading-room");

  photo.src = firstImage ? "images/main-hall.jpg" : "images/reading-room.jpg";
  photo.alt = firstImage
    ? "A domed library hall with circular rows of desks"
    : "Wooden bookcases under stained glass windows";
});

// Add a text node and attach it to a parent node
document.getElementById("add-node").addEventListener("click", () => {
  const textNode = document.createTextNode(" New text node.");
  document.getElementById("parent-node").appendChild(textNode);
});

// Delete a node
document.getElementById("delete-node").addEventListener("click", () => {
  const list = document.getElementById("delete-list");
  if (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
});

// jQuery operations
$(function () {
  // Change button text
  $("#jq-button").on("click", function () {
    $(this).text("Text changed using jQuery");
  });

  // Set background-image using the css() method
  $("#jq-background").on("click", function () {
    $("#background-box").css("background-image", "url('images/main-hall.jpg')");
  });

  // Access HTML form data
  $("#jq-form").on("submit", function (event) {
    event.preventDefault();
    const name = $("#jq-name").val().trim();
    const course = $("#jq-course").val();
    $("#jq-result").text(name ? `Name: ${name}, Course: ${course}` : "Enter a name first.");
  });

  // Add an attribute
  $("#jq-add-attribute").on("click", function () {
    $("#jq-attribute").attr("placeholder", "Added using jQuery");
    $("#attribute-result").text("The placeholder attribute was added to the input above.");
  });
});
