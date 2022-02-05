import { EyeIcon } from '@heroicons/react/outline'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { possibleRealities, CharStatus, Superposition } from '../../lib/statuses';
import { addStatsForCompletedGame, loadStats } from '../../lib/stats'
import { GameStats } from '../../lib/localStorage';

// Modal for observing different outcomes

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  status: Superposition;
  guess: string;
  index: number;
  realities: string[];
  setRealities: (arg0: string[]) => void;
  eyes: number;
  setEyes: (arg0: number) => void;
  guesses: string[];
  setStats: (arg0: GameStats) => void;
  setIsGameWon: (arg0: boolean) => void;
}

const percentage = (superpos: Superposition, status: CharStatus) => {
    return Math.round((100. * superpos[status]) / superpos.total);
}


export const ObserveModal = ({ isOpen, handleClose, status, guess, index, realities, setRealities, eyes, setEyes, guesses, setStats, setIsGameWon }: Props) => {
  const limitRealities = (status: CharStatus) => {
    const newRealities = possibleRealities(realities, guess, index, status);
    setRealities(newRealities);
    return newRealities;
  };
  const stats = loadStats();
  const makeLimitOnClick = (status: CharStatus) => {
    return () => {
      setEyes(eyes - 1);
      const newReal = limitRealities(status);
      // Now check if the game is won
      // At this point, the list of guesses should contain the answer if the
      // game is won (may not necessarily be this guess)
      if (newReal.length === 1 && guesses.includes(newReal[0])) {
        setStats(addStatsForCompletedGame(stats, newReal[0]));
        return setIsGameWon(true);
      }
    };
  };

  const splitGuess = guess.split('');
  return (
    <BaseModal title="" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex justify-center mb-1 mt-4">
        {splitGuess.map((letter, i) => {
            return <Cell value={letter} status={i === index ? status : undefined} />
        })}
      </div>
      <div className="flex justify-center">
      <table>
      <tr>
        {status.absent > 0 && (
            <td>
                <p className="text-sm text-gray-500">
                    <button
                      style={{ width: '50px', height: '50px' }}
                      className="text-lg font-bold rounded text-white bg-slate-400"
                      onClick={eyes > 0 ? makeLimitOnClick('absent') : undefined}
                    >
                    {`${percentage(status, 'absent')}%`}
                    </button>
                </p>
                {eyes > 0 && <EyeIcon className="h-8 w-8" onClick={makeLimitOnClick('absent')} />}
            </td>
        )}
        {status.present > 0 && (
            <td>
                <p className="text-sm text-gray-500">
                    <button
                      style={{ width: '50px', height: '50px' }}
                      className="text-lg font-bold rounded text-white bg-yellow-500"
                      onClick={eyes > 0 ? makeLimitOnClick('present') : undefined}
                    >
                    {`${percentage(status, 'present')}%`}
                    </button>
                </p>
                {eyes > 0 && <EyeIcon className="h-8 w-8" onClick={makeLimitOnClick('present')} />}
            </td>
        )}
        {status.correct > 0 && (
            <td>
                <p className="text-sm text-gray-500">
                    <button
                      style={{ width: '50px', height: '50px' }}
                      className="text-lg font-bold rounded text-white bg-green-500"
                      onClick={eyes > 0 ? makeLimitOnClick('correct') : undefined}
                    >
                    {`${percentage(status, 'correct')}%`}
                    </button>
                </p>
                {eyes > 0 && <EyeIcon className="h-8 w-8" onClick={makeLimitOnClick('correct')} />}
            </td>
        )}
      </tr>
      </table>
      </div>
    </BaseModal>
  )
}
