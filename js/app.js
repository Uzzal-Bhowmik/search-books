// error container 
const searchBoxEmpty = document.getElementById('search-box-empty');
const nothingFound = document.getElementById('nothing-found');

// Search Button event listener handling
document.getElementById('search-btn').addEventListener('click', function () {
    const searchBar = document.getElementById('search-bar');
    const searchValue = searchBar.value;
    const bookCardsContainer = document.getElementById('book-cards-container');

    // display error if search field is empty
    if (searchValue === '') {
        document.getElementById('book-cards-container').textContent = '';
        searchBoxEmpty.style.display = 'block';
        nothingFound.style.display = 'none';
        document.getElementById('books-counter').textContent = '';

    }

    else {
        // clearing the search field 
        searchBar.value = '';
        // clearing the cards container 
        bookCardsContainer.textContent = '';
        // clearing the error msg 
        searchBoxEmpty.style.display = 'none';


        // displaying card loader 
        for (let i = 0; i < 4; i++) {
            const cardLoaderDiv = document.createElement('div');
            cardLoaderDiv.innerHTML = `
                <div class="bg-white p-4 rounded-md">
                    <div class="w-64 h-44 bg-gray-200 animate-pulse"></div>
                    <div class="mt-8 h-32 w-full space-y-3">
                    <div class="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    <div class="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    <div class="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    <div class="w-1/2 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            `;
            bookCardsContainer.appendChild(cardLoaderDiv);
        }

        // loading api data 
        fetch(`https://openlibrary.org/search.json?q=${searchValue}&limit=20`)
            .then(res => res.json())
            .then(data => displayBookCards(data))
    }
});

// function to display books 
const displayBookCards = (booksInfo) => {
    const booksCounter = document.getElementById('books-counter');
    const bookCardsContainer = document.getElementById('book-cards-container');

    // showing error if nothing found 
    if (booksInfo.docs.length === 0) {
        bookCardsContainer.textContent = '';
        nothingFound.style.display = 'block';
        searchBoxEmpty.style.display = 'none';
        document.getElementById('books-counter').textContent = '';
    }

    else {

        bookCardsContainer.textContent = '';

        // updating books counter 
        booksCounter.textContent = '';
        booksCounter.innerHTML = `
            <pre class="text-1xl text-gray-600 mt-0 font-semibold">Books Found: ${booksInfo.numFound} &Tab; Books Shown: 20</pre>
        `

        // updating book cards container
        const books = booksInfo.docs;
        books.forEach(book => {

            const bookDiv = document.createElement('div');
            bookDiv.innerHTML = `
            <div
                class="container mx-auto max-w-sm bg-white rounded-xl shadow-lg hover:scale-100 hover:shadow-2xl transform transition-all duration-500 h-full">

                <div class="border rounded-xl rounded-b-none w-full">
                    <img id='book-images' src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg"
                        alt="" class='mx-auto rounded-xl rounded-b-none'>
                </div>

                <div class="p-6">
                    <h1 class="text-3xl font-bold text-gray-800 cursor-pointer mb-4">${book.title}</h1>
                    <h2 class="text-xl text-gray-800 font-semibold mb-4">by <span class="text-pink-400">${book.author_name == undefined || book.author_name == null ? 'Unknown Author' : book.author_name}</span></p>
                    <p class="text-lg font font-thin mb-4">Published By: ${book.publisher == undefined ? "Not Available" : book.publisher[0]}</p>
                    <p class="text-lg font font-semibold mb-4">First Publish Year: <span class="text-blue-400 font-semibold">${book.first_publish_year == undefined ? 'Not Available' : book.first_publish_year}</span></p>

                </div>
            </div>
        
            `;
            bookCardsContainer.appendChild(bookDiv);

        });
    }
}