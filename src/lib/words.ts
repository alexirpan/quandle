import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  // TODO fix this
  return false;
}

export const getWordOfDay = () => {
  return {
    solutions: ['WARDS', 'SWORD', 'FOOLS']
  }
}

export const { solutions } = getWordOfDay()
