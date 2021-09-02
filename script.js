const searchBtn = document.getElementById("search-btn");
const bookList = document.getElementById("book");

// get book list that matches with the name
const getBookList = () => {
    let searchInputTxt = document.getElementById("search-input").value.trim();
    //fetching data from api call
    fetch(`https://openlibrary.org/search.json?q=${searchInputTxt}`)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            const res = document.getElementById("results");
            const searchInput = document.getElementById("searchInput");
            res.innerText = data.numFound;
            searchInput.innerText = searchInputTxt;
            const noMatch = document.getElementById("noMatch");
            //warning message if no match
            if (data.numFound === 0) {
                noMatch.innerText = "No match found for your search...!!!";
            } else {
                for (let i = 0; i < 12; i++) {
                    noMatch.innerText = "";
                    let url, author, pubDate, pubName;
                    // checking all data are available or not
                    if (data.docs[i].cover_i === undefined) {
                        url = "notFound.jpg";
                    } else if (data.docs[i].cover_i !== undefined) {
                        url = `https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-M.jpg`;
                    }
                    if (data.docs[i].author_name === undefined) {
                        author = "Not Found";
                    } else {
                        author = data.docs[i].author_name[0];
                    }
                    if (data.docs[i].publish_date === undefined) {
                        pubDate = "Not Found";
                    } else {
                        pubDate = data.docs[i].publish_date[0];
                    }
                    if (data.docs[i].publisher === undefined) {
                        pubName = "Not Found";
                    } else {
                        pubName = data.docs[i].publisher[0];
                    }
                    // updating ui
                    html += `
                    <div class="col-3">
                        <div class="card" style="width: 100%;">
                                <img class="book-img" src = "${url}">
                            <div class="card-body">
                                <h5 class="card-title">${data.docs[i].text[1]}</h5>
                                <p class="card-text"> <b>Author :</b> ${author}</br> <b>Publisher :</b> ${pubName}</br> <b>Published in :</b> ${pubDate}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                }
            }
            bookList.innerHTML = html;
        });
};

// event listeners
searchBtn.addEventListener("click", getBookList);
