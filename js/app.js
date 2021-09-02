const inputText = document.getElementById('input-text');
const display = document.getElementById('books');
const bookImage = document.getElementById('book-img');
const bookName = document.getElementById('book-name');
const authorName = document.getElementById('author-name');
const publication = document.getElementById('first-piblication');

const searchClick = () => {
    const text = inputText.value;
    inputText.value = '';
    // console.log(text);
    const url = `https://openlibrary.org/search.json?q=${text}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
}

const displayBook = books => {
    document.getElementById('total-search').innerText = books.numFound
    display.textContent = '';

    if (books.docs.length === 0) {
        display.innerHTML = `
        <div class="col-md-12 text-center">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Sorry, The page you requested was not found!
                </div>
            </div>
        </div>
        `;
    }

    // get single book
    books.docs.forEach(book => {
        // console.log(book);
        const cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;


        // dynamic card
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <div class="row g-0">
                <div class="col-md-4 p-2">
                    <img src=${cover} class="card-img-top" style="height: 200px;" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="">${book.title}</h5>
                        <p class="card-text">By ${book.author_name}</p>
                        <p class="card-text"><small class="text-muted">First published in ${book.first_publish_year}</small></p>
                        <p class="card-text"><small class="text-muted">Publisher : ${book.publisher}</small></p>
                    </div>
                </div>
            </div>
        </div>
        `;
        display.appendChild(div);
    });
}
