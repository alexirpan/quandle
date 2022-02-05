import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { GameStats } from '../../lib/localStorage'

type Props = {
  guesses: string[]
  currentGuess: string
  realities: string[]
  setRealities: (arg0: string[]) => void
  eyes: number
  setEyes: (arg0: number) => void
  setStats: (arg0: GameStats) => void
  setIsGameWon: (arg0: boolean) => void
}

export const Grid = ({ guesses, currentGuess, realities, setRealities, eyes, setEyes, setStats, setIsGameWon }: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} realities={realities} setRealities={setRealities} eyes={eyes} setEyes={setEyes} guesses={guesses} setStats={setStats} setIsGameWon={setIsGameWon} />
      ))}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
