import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

// Repurposing stats array to store list of words found so far.
// In stats array elements 0-5 are successes in 1-6 trys

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  currentGuess: string,
) => {
  // O(N) inclusion check but whatever
  // Return the original list if we don't change
  if (gameStats.foundWords.includes(currentGuess.toLowerCase())) {
      return gameStats;
  }
  const stats = { ...gameStats }

  stats.foundWords.push(currentGuess.toLowerCase());
  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  foundWords: [],
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}
