type Game = {
  id: string;
  title: string;
  hoursPlayed: number;
  image: string;
};

type Player = {
  id: string;
  nom: string;
  prenom: string;
  pp: string;
  jour: string;
  games: Game[];
};


export const mockGamingDataPlayers: Player[] = [
  {
    id: "1a2b3c",
    nom: "Dupont",
    prenom: "Jean",
    pp: "https://randomuser.me/api/portraits/men/1.jpg",
    jour: "Lundi",
    games: [
      {
        id: "g1",
        title: "Cyberpunk 2077",
        hoursPlayed: 42,
        image: "/cyberpunk.png",
      },
      {
        id: "g2",
        title: "Satisfactory",
        hoursPlayed: 18,
        image: "/satisfactory.png",
      },
    ],
  },
  {
    id: "4d5e6f",
    nom: "Martin",
    prenom: "Claire",
    pp: "https://randomuser.me/api/portraits/women/2.jpg",
    jour: "Mercredi",
    games: [
      {
        id: "g3",
        title: "The Witcher 3",
        hoursPlayed: 60,
        image: "/witcher.png",
      },
    ],
  },
];
export const mockData = mockGamingDataPlayers;