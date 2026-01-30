export type Game = {
  id: string;        // 🏷️ Son étiquette (ex: "game1")
  title: string;
  image: string;
};

export const mockGames: Game[] = [
  {
    id: "game1",
    title: "Cyberpunk 2077",
    image: "/cyberpunk.png",
  },
  {
    id: "game2",
    title: "Satisfactory",
    image: "/satisfactory.png",
  },
  {
    id: "game3",
    title: "The Witcher 3",
    image: "/theWitcher.png",
  },
  {
    id: "game4",
    title: "Elden Ring",
    image: "/eldenring.png",
  },
  {
    id: "game5",
    title: "ARC",
    image: "/ARC.png",
  },
  {
    id: "game6",
    title: "Assassin's Creed Valhalla",
    image: "/AssAssinsCreedValhalla.png",
  },
  {
    id: "game7",
    title: "Red Dead Redemption 2",
    image: "/RedDead2.png",
  }
];