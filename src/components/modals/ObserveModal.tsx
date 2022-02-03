import classnames from 'classnames'
import { EyeIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { possibleRealities, CharStatus, Superposition } from '../../lib/statuses';

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
}


export const ObserveModal = ({ isOpen, handleClose, status, guess, index, realities, setRealities, eyes, setEyes }: Props) => {
  const limitRealities = (status: CharStatus) => {
    const newRealities = possibleRealities(realities, guess, index, status);
    setRealities(newRealities);
  };
  const makeLimitOnClick = (status: CharStatus) => {
    return () => {
      setEyes(eyes - 1);
      limitRealities(status);
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
                    {status.absent}
                    </button>
                </p>
                {eyes > 0 && <EyeIcon className="h-8 w-8" />}
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
                    {status.present}
                    </button>
                </p>
                {eyes > 0 && <EyeIcon className="h-8 w-8" />}
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
                    {status.correct}
                    </button>
                </p>
                {eyes > 0 && <EyeIcon className="h-8 w-8" />}
            </td>
        )}
      </tr>
      </table>
      </div>
    </BaseModal>
  )
}
