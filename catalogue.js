// JavaScript DOM operations

const bookList = document.getElementById("book-list");

// getElementById + innerHTML: change the text
document.getElementById("change-book").addEventListener("click", () => {
  document.getElementById("book-of-week").innerHTML = "Book of the week: <em>Clean Code</em>";
});

// Change CSS properties: colour and position
document.getElementById("move-due-tag").addEventListener("click", () => {
  const tag = document.getElementById("due-tag");
  tag.style.color = "#1d1a4b";
  tag.style.backgroundColor = "#e5b94e";
  tag.style.position = "relative";
  tag.style.left = "24px";
});

// getElementsByTagName
document.getElementById("count-books").addEventListener("click", () => {
  const books = bookList.getElementsByTagName("li");
  document.getElementById("book-total").innerHTML = `${books.length} books on the shelf.`;
});

// getElementsByClassName
document.getElementById("mark-authors").addEventListener("click", () => {
  const authors = document.getElementsByClassName("book-author");
  for (let i = 0; i < authors.length; i++) {
    authors[i].style.color = "#a3341f";
  }
});

// Change the image source on click
document.getElementById("swap-photo").addEventListener("click", () => {
  const photo = document.getElementById("room-photo");
  const showingRoom = photo.getAttribute("src").includes("reading-room");

  photo.src = showingRoom ? "images/main-hall.jpg" : "images/reading-room.jpg";
  photo.alt = showingRoom
    ? "A grand domed library hall with circular rows of reading desks"
    : "Dark wooden bookcases under stained glass windows in a reading room";
});

// Add a text node and attach it to a parent node
document.getElementById("add-book").addEventListener("click", () => {
  const input = document.getElementById("book-title");
  const error = document.getElementById("book-error");

  if (input.value.trim() === "") {
    error.innerHTML = "Enter a book title first.";
    return;
  }

  const item = document.createElement("li");
  item.appendChild(document.createTextNode(input.value.trim()));
  bookList.appendChild(item);

  error.innerHTML = "";
  input.value = "";
});

// Delete a node
document.getElementById("remove-book").addEventListener("click", () => {
  if (bookList.lastElementChild) {
    bookList.removeChild(bookList.lastElementChild);
  }
});

// jQuery operations
$(function () {
  // Set background-image using the css() method
  $("#change-background").on("click", function () {
    $("#catalogue-header").css("background-image", "linear-gradient(rgba(29, 26, 75, 0.8), rgba(29, 26, 75, 0.8)), url('images/main-hall.jpg')");
  });

  // Add an attribute
  $("#name-hint").on("click", function () {
    $("#reader-name").attr("placeholder", "Name on your library card");
  });

  // Access form data and change the button text
  $("#reserve-form").on("submit", function (event) {
    event.preventDefault();

    const reader = $("#reader-name").val().trim();
    const book = $("#reserve-book").val();

    if (reader === "") {
      $("#reserve-result").text("Enter your name to reserve a book.");
      return;
    }

    $("#reserve-result").text(`${book} is reserved for ${reader}.`);
    $("#reserve-button").text("Book reserved");
  });
});
