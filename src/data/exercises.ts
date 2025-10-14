export interface Exercise {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  encouragement: string;
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
  }
];
