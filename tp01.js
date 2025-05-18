let bibliotheque = [];

function Livre(titre, annee, auteur) {
  this.titre = titre;
  this.annee = annee;
  this.auteur = auteur;

  this.afficherInformations = function () {
    return `Titre : ${this.titre}\nAnnée : ${this.annee}\nAuteur : ${this.auteur}`;
  };
}

function demarrer() {
  let choix;

  do {
    choix = prompt(
      "Bibliothèque \n" +
      "1. Ajouter un livre\n" +
      "2. Afficher les livres\n" +
      "3. Rechercher un livre\n" +
      "4. Supprimer un livre\n" +
      "5. Quitter\n" +
      "Entrez votre choix :"
    );
    console.log("Choix utilisateur : ", choix);

    switch (choix) {
      case "1":
        ajouterLivre();
        break;
      case "2":
        afficherLivres();
        break;
      case "3":
        rechercherLivre();
        break;
      case "4":
        supprimerLivre();
        break;
      case "5":
        console.log("Fin du programme, utilisateur a quitté.");
        alert("Au revoir !");
        break;
      default:
        console.log("Option invalide sélectionnée : ", choix);
        alert("Veuillez choisir entre 1 et 5.");
    }
  } while (choix !== "5");
}

function ajouterLivre() {
  try {
    let titre = prompt("Entrez le titre du livre :");
    if (!titre) throw "Titre manquant";
    console.log('Ajout titre : ', titre);

    let annee = prompt("Entrez l\'année de publication :");
    if (!annee || isNaN(annee)) throw "Année invalide";
    console.log('Ajout année : ', annee);

    let auteur = prompt("Entrez le nom de l’auteur :");
    if (!auteur) throw "Auteur manquant";
    console.log('Ajout auteur : ', auteur);

    let nouveauLivre = new Livre(titre, annee, auteur);
    bibliotheque.push(nouveauLivre);
    console.log(`Livre ajouté avec succès !\nTitre : ${titre}\nAnnée : ${annee}\nAuteur : ${auteur}`);
    alert("Livre ajouté avec succès !");
  } catch (error) {
    console.log("Erreur attrapée lors de l'ajout : ", error);
    alert("Erreur : " + error);
  }
}

function afficherLivres() {
  if (bibliotheque.length === 0) {
    console.log("Affichage livres : bibliothèque vide.");
    return alert("La bibliothèque est vide.");
  }

  let message = "Liste des livres :\n\n";
  bibliotheque.forEach((livre, index) => {
    message += `${index + 1}.\n${livre.afficherInformations()}\n\n`;
  });

  console.log("Affichage livres : \n" + message);
  alert(message);
}

function rechercherLivre() {
  let titreRecherche = prompt("Entrez le titre du livre à rechercher :");
  console.log("Recherche livre, titre demandé : ", titreRecherche);

  let livreTrouve = bibliotheque.find(livre => livre.titre === titreRecherche);

  if (livreTrouve) {
    console.log("Livre trouvé :", livreTrouve);
    alert("Livre trouvé :\n\n" + livreTrouve.afficherInformations());
  } else {
    console.log("le livre na pas été trouvé : ", titreRecherche);
    alert("le livre na pas été trouvé.");
  }
}

function supprimerLivre() {
  let titreASupprimer = prompt("Entrez le titre exact du livre à supprimer :");
  console.log("Suppression livre, titre demandé : ", titreASupprimer);

  let index = bibliotheque.findIndex(livre => livre.titre === titreASupprimer);

  if (index !== -1) {
    let livreSupprime = bibliotheque.splice(index, 1)[0];
    console.log("Livre supprimé avec succès :", livreSupprime);
    alert("Le livre a bien été supprimé !");
  } else {
    console.log("Livre à supprimer non trouvé pour le titre : ", titreASupprimer);
    alert("Le livre n'a pas été trouvé.");
  }
}

demarrer();
