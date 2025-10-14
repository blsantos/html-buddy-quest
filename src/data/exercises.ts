export interface Exercise {
  id: number;
  category: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  encouragement: string;
  type?: "quiz" | "code";
  placeholder?: string;
}

export const exercises: Exercise[] = [
  {
    id: 1,
    category: "Balises obligatoires",
    question: "Quelle est la toute première balise d'un document HTML ?",
    options: ["<html>", "<!DOCTYPE html>", "<head>", "<body>"],
    correctAnswer: "<!DOCTYPE html>",
    explanation: "<!DOCTYPE html> indique au navigateur que c'est un document HTML5. C'est toujours la première ligne !",
    encouragement: "Super départ ! Tu comprends déjà les bases ! 🎯"
  },
  {
    id: 2,
    category: "Balises obligatoires",
    question: "Quelle balise contient les informations invisibles de la page (titre, métadonnées) ?",
    options: ["<body>", "<head>", "<header>", "<meta>"],
    correctAnswer: "<head>",
    explanation: "La balise <head> contient toutes les informations invisibles comme le titre, les liens CSS, etc.",
    encouragement: "Excellent ! Tu maîtrises la structure HTML ! 🌟"
  },
  {
    id: 3,
    category: "Balises obligatoires",
    question: "Dans quelle balise met-on tout le contenu visible de la page ?",
    options: ["<html>", "<head>", "<body>", "<main>"],
    correctAnswer: "<body>",
    explanation: "Tout ce qui est visible sur la page (textes, images, liens) va dans la balise <body>.",
    encouragement: "Parfait ! Continue comme ça ! 💪"
  },
  {
    id: 4,
    category: "Titres",
    question: "Quelle balise crée le titre le PLUS GRAND et le plus important ?",
    options: ["<h6>", "<h3>", "<h1>", "<title>"],
    correctAnswer: "<h1>",
    explanation: "<h1> est le titre le plus important. Il devrait y en avoir qu'un seul par page !",
    encouragement: "Bravo ! Tu connais la hiérarchie des titres ! 🎉"
  },
  {
    id: 5,
    category: "Titres",
    question: "Si j'ai un <h2>, quel titre vient juste après en importance ?",
    options: ["<h1>", "<h3>", "<h4>", "<p>"],
    correctAnswer: "<h3>",
    explanation: "Les titres vont de <h1> (le plus important) à <h6> (le moins important), dans l'ordre.",
    encouragement: "Super logique ! Tu progresses rapidement ! 🚀"
  },
  {
    id: 6,
    category: "Liens",
    question: "Quelle balise permet de créer un lien cliquable ?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>",
    explanation: "La balise <a> (pour 'anchor' = ancre) crée des liens. L'attribut 'href' indique la destination.",
    encouragement: "Génial ! Les liens n'ont plus de secret pour toi ! 🔗"
  },
  {
    id: 7,
    category: "Liens",
    question: "Comment écrit-on correctement un lien vers 'www.google.fr' ?",
    options: [
      "<a>www.google.fr</a>",
      "<a href='www.google.fr'>Google</a>",
      "<link>www.google.fr</link>",
      "<url href='www.google.fr'>Google</url>"
    ],
    correctAnswer: "<a href='www.google.fr'>Google</a>",
    explanation: "Un lien s'écrit : <a href='adresse'>Texte du lien</a>. L'attribut href contient l'adresse !",
    encouragement: "Fantastique ! Tu sais créer des liens parfaits ! ✨"
  },
  {
    id: 8,
    category: "Tableaux",
    question: "Quelle balise crée un tableau en HTML ?",
    options: ["<table>", "<tab>", "<tableau>", "<grid>"],
    correctAnswer: "<table>",
    explanation: "La balise <table> crée un tableau. Simple et logique !",
    encouragement: "Excellent ! Les tableaux arrivent ! 📊"
  },
  {
    id: 9,
    category: "Tableaux",
    question: "Dans un tableau, quelle balise crée une ligne ?",
    options: ["<line>", "<row>", "<tr>", "<td>"],
    correctAnswer: "<tr>",
    explanation: "<tr> (table row) crée une ligne dans un tableau. Chaque ligne contient des cellules <td>.",
    encouragement: "Super ! Tu construis des tableaux comme un pro ! 🏆"
  },
  {
    id: 10,
    category: "Tableaux",
    question: "Quelle balise crée une cellule normale dans un tableau ?",
    options: ["<cell>", "<tc>", "<td>", "<th>"],
    correctAnswer: "<td>",
    explanation: "<td> (table data) crée une cellule normale. <th> crée un en-tête de colonne.",
    encouragement: "Parfait ! Tu as tout compris sur les tableaux ! 🎊"
  },
  {
    id: 11,
    category: "Texte et mise en forme",
    question: "Quelle balise met un texte en gras ?",
    options: ["<b>", "<strong>", "<bold>", "<gras>"],
    correctAnswer: "<strong>",
    explanation: "<strong> met en gras ET indique que c'est important. <b> met juste en gras visuellement.",
    encouragement: "Bien joué ! Tu sais mettre en valeur ton texte ! 💪"
  },
  {
    id: 12,
    category: "Texte et mise en forme",
    question: "Quelle balise met un texte en italique ?",
    options: ["<i>", "<em>", "<italic>", "<italique>"],
    correctAnswer: "<em>",
    explanation: "<em> (emphasis) met en italique ET donne de l'importance. <i> met juste en italique.",
    encouragement: "Excellent ! Tu maîtrises la mise en forme ! ✨"
  },
  {
    id: 13,
    category: "Listes",
    question: "Quelle balise crée une liste à puces (non numérotée) ?",
    options: ["<list>", "<ul>", "<ol>", "<li>"],
    correctAnswer: "<ul>",
    explanation: "<ul> (unordered list) crée une liste à puces. <ol> crée une liste numérotée.",
    encouragement: "Super ! Les listes n'ont plus de secret ! 📝"
  },
  {
    id: 14,
    category: "Listes",
    question: "Quelle balise crée un élément dans une liste ?",
    options: ["<item>", "<element>", "<li>", "<point>"],
    correctAnswer: "<li>",
    explanation: "<li> (list item) crée chaque élément de la liste, qu'elle soit numérotée ou à puces.",
    encouragement: "Parfait ! Tu construis des listes comme un pro ! 🏆"
  },
  {
    id: 15,
    category: "Images",
    question: "Quelle balise affiche une image ?",
    options: ["<image>", "<img>", "<picture>", "<photo>"],
    correctAnswer: "<img>",
    explanation: "<img> affiche une image. Elle a besoin de l'attribut 'src' pour l'adresse de l'image.",
    encouragement: "Génial ! Tu sais intégrer des images ! 🖼️"
  },
  {
    id: 16,
    category: "Pratique - Code",
    question: "Écris la balise complète pour créer un paragraphe contenant 'Bonjour'",
    type: "code",
    correctAnswer: "<p>Bonjour</p>",
    placeholder: "Écris ton code HTML ici...",
    explanation: "Un paragraphe s'écrit : <p>Ton texte</p>. N'oublie pas la balise fermante !",
    encouragement: "Bravo bâtisseur ! Tu écris ton premier code ! 🎯"
  },
  {
    id: 17,
    category: "Pratique - Code",
    question: "Écris un titre de niveau 1 avec le texte 'Mon Site Web'",
    type: "code",
    correctAnswer: "<h1>Mon Site Web</h1>",
    placeholder: "Écris ton code HTML ici...",
    explanation: "Le titre principal s'écrit : <h1>Mon Site Web</h1>",
    encouragement: "Excellent ! Tu poses les premières pierres ! 🏗️"
  },
  {
    id: 18,
    category: "Pratique - Code",
    question: "Écris un lien vers 'https://google.fr' avec le texte 'Recherche'",
    type: "code",
    correctAnswer: "<a href='https://google.fr'>Recherche</a>",
    placeholder: "Écris ton code HTML ici...",
    explanation: "Un lien s'écrit : <a href='adresse'>Texte</a>. Tu peux aussi utiliser des guillemets doubles.",
    encouragement: "Parfait ! Tu crées des connexions ! 🔗"
  },
  {
    id: 19,
    category: "Pratique - Code",
    question: "Crée une liste à puces avec deux éléments : 'HTML' et 'CSS'",
    type: "code",
    correctAnswer: "<ul><li>HTML</li><li>CSS</li></ul>",
    placeholder: "Écris ton code HTML ici...",
    explanation: "Une liste à puces : <ul><li>HTML</li><li>CSS</li></ul>. Chaque élément dans un <li> !",
    encouragement: "Magnifique ! Tu organises l'information ! 📋"
  },
  {
    id: 20,
    category: "Pratique - Code",
    question: "Crée un tableau avec une ligne contenant deux cellules : 'Nom' et 'Prénom'",
    type: "code",
    correctAnswer: "<table><tr><td>Nom</td><td>Prénom</td></tr></table>",
    placeholder: "Écris ton code HTML ici...",
    explanation: "Un tableau : <table><tr><td>Nom</td><td>Prénom</td></tr></table>",
    encouragement: "Incroyable ! Tu es un vrai bâtisseur du digital ! 🏆"
  }
];
