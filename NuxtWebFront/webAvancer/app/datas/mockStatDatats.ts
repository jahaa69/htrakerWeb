type GamingSession = {
  id: string;
  date: string;      // ISO
  playerId: string;
  gameId: string;
  hours: number;
};




export const mockGamingHoursByDayData = [
    {
        id: 1,
        date: '2024-01-01',
        game: 'Elden Ring',
        hours: 4.5
    },
    {
        id: 2,
        date: '2024-01-01',
        game: 'Cyberpunk 2077',
        hours: 2.3
    },
    {
        id: 3,
        date: '2024-01-02',
        game: 'Elden Ring',
        hours: 3.2
    },
    {
        id: 4,
        date: '2024-01-02',
        game: 'The Witcher 3',
        hours: 5.1
    },
    {
        id: 5,
        date: '2024-01-03',
        game: 'Cyberpunk 2077',
        hours: 6.7
    },
    {
        id: 6,
        date: '2024-01-03',
        game: 'Elden Ring',
        hours: 2.1
    },
    {
        id: 7,
        date: '2024-01-04',
        game: 'The Witcher 3',
        hours: 4.3
    },
    {
        id: 8,
        date: '2024-01-04',
        game: 'Cyberpunk 2077',
        hours: 3.8
    },
    {
        id: 9,
        date: '2024-01-05',
        game: 'Elden Ring',
        hours: 7.2
    },
    {
        id: 10,
        date: '2024-01-05',
        game: 'The Witcher 3',
        hours: 1.5
    }
];

// Données statistiques globales
export const mockStatData = {
    totalGamingTime: 82.10,
    totalGamesOwned: 24,
    averageGamingTimePerDay: 2.30
};