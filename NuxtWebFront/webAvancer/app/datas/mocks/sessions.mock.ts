export type GamingSession = {
  id: string;
  date: string;
  playerId: string;  // 👈 Regarde l'étiquette du bonhomme !
  gameId: string;    // 👈 Regarde l'étiquette du jeu !
  hours: number;
};

export const mockSessions: GamingSession[] = [
  {
    id: "s1",
    date: "2024-01-01",
    playerId: "player1",  // 👤 Jean
    gameId: "game1",      // 🎮 Cyberpunk 2077
    hours: 2.3,
  },
  {
    id: "s2",
    date: "2024-01-01",
    playerId: "player1",  // 👤 Jean
    gameId: "game4",      // 🎮 Elden Ring
    hours: 4.5,
  },
  {
    id: "s3",
    date: "2024-01-02",
    playerId: "player2",  // 👤 Claire
    gameId: "game3",      // 🎮 The Witcher 3
    hours: 5.1,
  },
  {
    id: "s4",
    date: "2024-01-03",
    playerId: "player1",  // 👤 Jean
    gameId: "game2",      // 🎮 Satisfactory
    hours: 3.0,
  },
  {
    id: "s5",
    date: "2024-01-03",
    playerId: "player2",  // 👤 Claire
    gameId: "game4",      // 🎮 Elden Ring
    hours: 2.7,
  },
  {
    id: "s6",
    date: "2024-01-04",
    playerId: "player2",  // 👤 Claire
    gameId: "game1",      // 🎮 Cyberpunk 2077
    hours: 1.5,
  },
];