// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class: Handle UI Tasks
class UI {
    static displayBooks() {
        // const StoredBooks = [
        //     {
        //         title: "ಆವರಣ",
        //         author: "ಸಂತೇಶಿವರ ಲಿಂಗಣ್ಣಯ್ಯ ಭೈರಪ್ಪ",
        //         isbn: 9781536682830
        //     }, {
        //         title: "ತಬ್ಬಲಿಯು ನೀನಾದೆ ಮಗನೆ",
        //         author: "ಎಸ್‌. ಎಲ್‌. ಭೈರಪ್ಪ",
        //         isbn: 5551234092387
        //     }
        // ]
        // const books = StoredBooks;
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book))

    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `;
        list.appendChild(row);
    }
    static clearFields() {
        // Resetting the form 
        document.querySelector("#book-form").reset();
        // Resetting the fields of the form
        // document.querySelector("#title").value = "";
        // document.querySelector("#author").value = "";
        // document.querySelector("#isbn").value = "";
    }
    static deleteBook(targetEle) {
        if (targetEle.classList.contains('delete')) {
            targetEle.parentElement.parentElement.remove();
            this.showAlert("Book removed succesfully", "success");
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container"),
            form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        // Vanish the alert messages after three seconds
        setTimeout(() => document.querySelector(".alert").remove(), 3000)
    }
}
// Store Class: Handels Storage
class Store {
    static getBooks() {
        let books;
        (localStorage.getItem('books') == null) ? books = [] : books = JSON.parse(localStorage.getItem('books'));
        return books;
    }
    static addBook(book) {
        const books = this.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))

    }
    static removeBook(isbn) {
        const books = this.getBooks();
        books.forEach((book, index) => (book.isbn === isbn) && books.splice(index, 1));
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    // Prevent actual submit
    e.preventDefault();
    // Get form values
    const title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;
    // Validation
    if (title == "" || author == "" || isbn == "") {
        UI.showAlert("Please fill all the fields", "danger")

    } else {
        // Instantiate book
        const book = new Book(title, author, isbn);
        // Add to book to UI
        UI.addBookToList(book);
        // Add book to local storage
        Store.addBook(book);
        // Clear fields on submit
        UI.clearFields();
        // Alert message
        UI.showAlert("Book added succesfully", "success")
    }

});
// Event: Remove Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    // Remove bokk from UI
    UI.deleteBook(e.target);
    // Remove book from localstorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

});