import { id } from "@nuxt/ui/runtime/locale/index.js";

export interface Goal {
  id: string;
  gameId: string;
  playerId: string;
  timestamp: number;
  title: string;
  description: string;
  completed?: boolean;
  
  // Pour les objectifs basés sur le temps
  currentHours?: number;
  targetHours?: number;
  
  // Pour les objectifs basés sur un pourcentage
  progress?: number; // 0-100
  
  // Pour les objectifs avec date limite
  deadline?: number; // timestamp
}

export const mockGoals: Goal[] = [
  {
    id: "goal1",
    gameId: "game1",
    playerId: "player1",
    timestamp: Date.now() - 10000000,
    title: "Jouer max 5h cette semaine",
    description: "Limiter mon temps de jeu à 5h maximum pour cette semaine.",
    completed: false,
    currentHours: 3.2,
    targetHours: 5,
  },
  {
    id: "goal2",
    gameId: "game3",
    playerId: "player1",
    timestamp: Date.now() - 5000000,
    title: "Terminer The Witcher 3",
    description: "Finir l'histoire principale et les quêtes secondaires importantes.",
    completed: false,
    progress: 80,
  },
  {
    id: "goal3",
    gameId: "game2",
    playerId: "player1",
    timestamp: Date.now() - 2000000,
    title: "Construire une méga-usine",
    description: "Créer une usine automatisée de production en masse dans Satisfactory.",
    completed: false,
    deadline: new Date("2022-06-01").getTime(),
  },
  {
    id: "goal4",
    gameId: "game4",
    playerId: "player1",
    timestamp: Date.now() - 1000000,
    title: "Battre tous les boss",
    description: "Vaincre tous les boss majeurs d'Elden Ring.",
    completed: false,
    progress: 45,
  },
];