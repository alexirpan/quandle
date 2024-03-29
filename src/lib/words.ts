import { WORDS, ANSWER_WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string, realities: string[]) => {
  return realities.length === 1 && realities[0].toLowerCase() === word.toLowerCase();
}

export const getWordOfDay = () => {
  const solutions = ANSWER_WORDS;
  // expects uppercase versions of everything
  return {
    solutions: solutions.map(w => w.toUpperCase())
  }
}

export const { solutions } = getWordOfDay()
