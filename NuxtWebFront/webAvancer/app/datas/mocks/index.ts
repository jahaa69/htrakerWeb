export * from './players.mock';
export * from './games.mock';
export * from './sessions.mock';
export * from './goal.mock';

// 🎁 Fonction magique pour retrouver les jeux d'un joueur
import { mockSessions } from './sessions.mock';
import { mockGames } from './games.mock';
import { mockPlayers, type Player } from './players.mock';
import { mockGoals } from './goal.mock';

export function getPlayerWithGames(playerId: string) {
  const player = mockPlayers.find(p => p.id === playerId);
  const sessions = mockSessions.filter(s => s.playerId === playerId);
  
  const games = sessions.map(session => {
    const game = mockGames.find(g => g.id === session.gameId);
    return {
      ...game!,
      hoursPlayed: session.hours,
    };
  });

  return { ...player!, games };
}

export function getPlayerWithGoals(playerId: string) {
  const player = mockPlayers.find(p => p.id === playerId);
  const goals = mockGoals.filter(g => g.playerId === playerId);
  return { ...player!, goals };
}