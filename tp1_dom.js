document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-ajout").addEventListener("submit", addBook);
    document.getElementById("btn-rechercher").addEventListener("click", findBook);
    document.getElementById("btn-afficher").addEventListener("click", displayBooks);
});

let library = [];

class Book{
    constructor(title, year, author) {
        this.title = title;
        this.year = year;
        this.author = author;
    }

    showInfo = function () {
        return `📘 ${this.title} (${this.year}) par ${this.author}`;
    };
}

function addBook(e) {
  e.preventDefault();

  const title = document.getElementById("titre").value.trim();
  const year = document.getElementById("annee").value.trim();
  const author = document.getElementById("auteur").value.trim();

  if (!title || !year || isNaN(year) || !author) {
    return alert("Veuillez entrer un titre, une année valide et un auteur.");
  }

  const newBook = new Book(title, year, author);
  library.push(newBook);
  clearInputs();
  displayBooks();
}

function displayBooks() {
  const div = document.getElementById("bibliothequeDisplay");
  div.innerHTML = "";

  if (library.length === 0) {
    return div.innerText = "Aucun livre dans la bibliothèque.";
  }

  library.forEach((book, index) => {
    const container = document.createElement("div");
    container.className = "livre";

    const text = document.createElement("span");
    text.textContent = book.showInfo();

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "✏️ Modifier";
    btnEdit.style.marginLeft = "5px";
    btnEdit.addEventListener("click", () => editBook(book));

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "🗑 Supprimer";
    btnDelete.style.marginLeft = "10px";
    btnDelete.addEventListener("click", () => {
      library.splice(index, 1);
      displayBooks();
    });

    container.appendChild(text);
    container.appendChild(btnEdit);
    container.appendChild(btnDelete);
    div.appendChild(container);
  });
}

function findBook() {
  const findTitle = document.getElementById("recherche").value.trim();
  const book = library.find(l => l.title.toLowerCase() === findTitle.toLowerCase());

  const div = document.getElementById("bibliothequeDisplay");
  div.innerHTML = "";

  if (book) {
    div.innerHTML = `<strong>Livre trouvé :</strong><br>${book.showInfo()}`;
  } else {
    div.innerHTML = "Livre non trouvé.";
  }
}

function editBook(book) {
  let option;

  do {
    option = prompt(
      `Modification du livre :\n\n${book.showInfo()}\n\n` +
      `1. Modifier le titre\n` +
      `2. Modifier l'année\n` +
      `3. Modifier l'auteur\n` +
      `4. Quitter\n\nEntrez un numéro :`
    );

    switch (option) {
      case "1":
        const newTitle = prompt("Nouveau titre :");
        if (newTitle) book.title = newTitle.trim();
        break;
      case "2":
        const newYear = prompt("Nouvelle année :");
        if (newYear && !isNaN(newYear)) book.year = newYear.trim();
        break;
      case "3":
        const newAuthor = prompt("Nouvel auteur :");
        if (newAuthor) book.author = newAuthor.trim();
        break;
      case "4":
        break;
      default:
        alert("Option invalide.");
    }
  } while (option !== "4");

  displayBooks();
}

function clearInputs() {
  document.getElementById("titre").value = "";
  document.getElementById("annee").value = "";
  document.getElementById("auteur").value = "";
  document.getElementById("recherche").value = "";
}
