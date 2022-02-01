import { getGuessStatusSuperpos } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  realities: string[]
}

export const CompletedRow = ({ guess, realities }: Props) => {
  // TODO known char
  const superpos = getGuessStatusSuperpos(guess, realities);
  console.log(guess);
  console.log(superpos);

  // TODO use status
  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell key={i} value={letter} status={superpos[i]} />
      ))}
    </div>
  )
}
