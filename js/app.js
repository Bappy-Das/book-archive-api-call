const inputText = document.getElementById('input-text');
const display = document.getElementById('books');
const total = document.getElementById('total-result');



const searchClick = () => {
    const text = inputText.value;
    inputText.value = '';

    // clean display text 
    display.textContent = '';
    total.textContent = '';
    const url = `https://openlibrary.org/search.json?q=${text}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
}

const displayBook = books => {

    // total search result
    const p = document.createElement('p');
    p.innerHTML = `
        <div class="card w-75 mx-auto">
            <div class="card-body text-center text-uppercase fw-bold">
                Search Found ${books.numFound} Books.
            </div>
        </div>
    
    
    
    `;
    total.appendChild(p);
    // error handling
    if (books.docs.length === 0) {
        display.innerHTML = `
        <div class="col-md-12 text-center mt-5">
            <div class="error-template mt-5">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Sorry, The page you requested was not found!
                </div>
                <div>
                    <a href="" onclick = "reDirectHome()">Back To Home Page</a>
                </div>

            </div>
        </div>
        `;
    }

    // get single book
    books.docs.forEach(book => {

        // book image
        const cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        // dynamic card
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <div class="row g-0">
                <div class="col-md-4 p-2 " >
                    <img src=${cover} class=" card-img-top" style="height: 250px;" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="">${book.title}</h5>
                        <p class="card-text">By ${book.author_name?.[0]}</p>
                        <p class="card-text"><small class="text-muted">First published in ${book.first_publish_year}</small></p>
                        <p class="card-text"><small class="text-muted">Publisher : ${book.publisher?.[0]}</small></p>
                    </div>
                </div>
            </div>
        </div>
        `;
        display.appendChild(div);
    });
}
function reDirectHome() {
    document.location.href = "/";
}
