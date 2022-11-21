const dFrag = document.createDocumentFragment();
let main = document.getElementsByTagName("main");
let wrapper = document.createElement("div");
let header = document.createElement("div");
wrapper.appendChild(dFrag);
header.appendChild(dFrag);
header.classList.add("header");
wrapper.classList.add("wrapper");
main[0].appendChild(header);
main[0].appendChild(wrapper);
header.innerHTML = `<h1><span>Welcome to</span>the Bookshop</h1>`;

let bookCatalog = document.createElement("div");
let orderBooks = document.createElement("div");
wrapper.appendChild(bookCatalog);
wrapper.appendChild(orderBooks);
let mainTitle = document.createElement("h2");
let orderTitle = document.createElement("h2");
mainTitle.innerHTML = "Book Catalog";
orderTitle.innerHTML = "Order Books";
bookCatalog.appendChild(mainTitle);
orderBooks.appendChild(orderTitle);
let goToCart = document.createElement("button");
goToCart.innerHTML = "Confirm Order";
orderBooks.appendChild(goToCart);
goToCart.classList.add("gotocart");
goToCart.onclick = function () {
  window.location.href = "../form/index.html";
}
orderBooks.classList.add("order-books");
let total = document.createElement("h3");
orderBooks.appendChild(total);
let sum = 0;
total.innerHTML = `Total: $0`;

function library(data) {
  for(let i = 0; i < data.length; i++) {
    let book = document.createElement("div");
    let bookLeft = document.createElement("div");
    let bookRight = document.createElement("div");
    bookCatalog.appendChild(book);
    book.appendChild(bookLeft);
    book.appendChild(bookRight);
    let author = document.createElement("h4");
    let title = document.createElement("li");
    let price = document.createElement("li");
    let image = document.createElement("img");
    let showMore = document.createElement("a");
    let addToCart = document.createElement("button");
    author.innerHTML = data[i].author;
    title.innerHTML = data[i].title;
    price.innerHTML = `Price: $${data[i].price}`;
    showMore.innerHTML = "Show More";
    addToCart.innerHTML = "Add to Cart";
    image.src = data[i].imageLink;
    bookLeft.appendChild(author);
    bookLeft.appendChild(title);
    bookLeft.appendChild(price);
    bookLeft.appendChild(showMore);
    bookLeft.appendChild(addToCart);
    bookRight.appendChild(image);
    book.classList.add("book");
    bookLeft.classList.add("book-left");
    showMore.onclick = (function(i) {return function() {
      let description = document.createElement("p");
      description.innerHTML = data[i].description;
      description.classList.add("description");
      bookLeft.appendChild(description);
      let descriptionClose = document.createElement("button");
      descriptionClose.innerHTML = "Close";
      description.appendChild(descriptionClose);
      descriptionClose.onclick = function () {
        bookLeft.removeChild(description);
      }
    };
  })(i);
    addToCart.onclick = function(i) {return function() {
      console.log(data[i].price);
      sum += Number(data[i].price);
      total.innerHTML = `Total: $${sum}`;
      orderBooks.appendChild(book);
      bookLeft.removeChild(showMore);
      bookLeft.removeChild(addToCart);
      bookRight.removeChild(image);
      bookRight.classList.add("book-right");
      let cross = document.createElement("button");
      cross.innerHTML = "X";
      bookRight.appendChild(cross);
      cross.classList.add("cross");
      cross.onclick = function () {
        orderBooks.removeChild(book);
        sum = sum - Number(data[i].price);
        total.innerHTML = `Total: $${sum}`;
      }
  }}(i);
}
}

fetch('./books.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    library(data);
  });