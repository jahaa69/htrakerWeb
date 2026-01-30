export type Player = {
  id: string;        // 🏷️ Son étiquette (ex: "player1")
  nom: string;
  prenom: string;
  plseudo: string;
  mdp: string;
  pp: string;
  jour: string;
};

export const mockPlayers: Player[] = [
  {
    id: "player1",
    nom: "Dupont",
    prenom: "Jean",
    plseudo: "JeanD",
    mdp: "azerty",
    pp: "https://randomuser.me/api/portraits/men/1.jpg",
    jour: "Lundi",
  },
  {
    id: "player2",
    nom: "Martin",
    prenom: "Claire",
    plseudo: "ClaireM",
    mdp: "azerty",
    pp: "https://randomuser.me/api/portraits/women/2.jpg",
    jour: "Mercredi",
  },
];