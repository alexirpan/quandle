import { getGuessStatusSuperpos } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
}

export const CompletedRow = ({ guess }: Props) => {
  // TODO known char
  const superpos = getGuessStatusSuperpos(guess, []);
  console.log(superpos);

  // TODO use status
  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell key={i} value={letter} status={"absent"} />
      ))}
    </div>
  )
}
