// JavaScript DOM operations

const noticeList = document.getElementById("notice-list");

// getElementById + innerHTML: change the text
document.getElementById("change-title").addEventListener("click", () => {
  document.getElementById("club-title").innerHTML = "Next trek: <em>Rajgad</em>";
});

// Change CSS properties: colour and position
document.getElementById("move-tag").addEventListener("click", () => {
  const tag = document.getElementById("trip-tag");
  tag.style.color = "#17352c";
  tag.style.backgroundColor = "#f2c063";
  tag.style.position = "relative";
  tag.style.left = "24px";
});

// getElementsByTagName
document.getElementById("count-notices").addEventListener("click", () => {
  const notices = noticeList.getElementsByTagName("li");
  document.getElementById("notice-count").innerHTML = `${notices.length} notices on the board.`;
});

// getElementsByClassName
document.getElementById("highlight-dates").addEventListener("click", () => {
  const dates = document.getElementsByClassName("notice-date");
  for (let i = 0; i < dates.length; i++) {
    dates[i].style.color = "#b3541e";
  }
});

// Change the image source on click
document.getElementById("change-photo").addEventListener("click", () => {
  const photo = document.getElementById("trip-photo");
  const showingRidge = photo.getAttribute("src").includes("ridge");

  photo.src = showingRidge ? "images/sinhagad-statues.jpg" : "images/sinhagad-ridge.jpg";
  photo.alt = showingRidge
    ? "Bronze statues of warriors on a green lawn at Sinhagad fort"
    : "A lone hiker on a green ridge at Sinhagad under low grey clouds";
});

// Add a text node and attach it to a parent node
document.getElementById("add-notice").addEventListener("click", () => {
  const input = document.getElementById("new-notice");
  const error = document.getElementById("notice-error");

  if (input.value.trim() === "") {
    error.innerHTML = "Write a notice first.";
    return;
  }

  const item = document.createElement("li");
  item.appendChild(document.createTextNode(input.value.trim()));
  noticeList.appendChild(item);

  error.innerHTML = "";
  input.value = "";
});

// Delete a node
document.getElementById("delete-notice").addEventListener("click", () => {
  if (noticeList.lastElementChild) {
    noticeList.removeChild(noticeList.lastElementChild);
  }
});

// jQuery operations
$(function () {
  // Set background-image using the css() method
  $("#set-background").on("click", function () {
    $("#banner").css("background-image", "url('images/sinhagad-ridge.jpg')");
  });

  // Add an attribute
  $("#add-attribute").on("click", function () {
    $("#join-name").attr("placeholder", "Your full name");
  });

  // Access form data and change the button text
  $("#join-form").on("submit", function (event) {
    event.preventDefault();

    const name = $("#join-name").val().trim();
    const trek = $("#join-trek").val();

    if (name === "") {
      $("#join-summary").text("Enter your name to reserve a seat.");
      return;
    }

    $("#join-summary").text(`${name}, your seat for ${trek} is reserved.`);
    $("#join-button").text("Seat reserved");
  });
});
