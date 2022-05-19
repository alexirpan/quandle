import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'
import { ANSWER_WORDS, EXTRACT_INDICES } from '../constants/wordlist';

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

export type Extract = {
    word: string
    index: number[]
}

export const displayWords = (gameStats: GameStats): Extract[] => {
    // O(N^2) but again whatever
    let outWords: Extract[] = [];
    for (let i = 0; i < ANSWER_WORDS.length; i++) {
        if (gameStats.foundWords.includes(ANSWER_WORDS[i].toLowerCase())) {
            outWords.push({ word: ANSWER_WORDS[i], index: EXTRACT_INDICES[i] });
        }
    }
    console.log(outWords);
    return outWords;
}
