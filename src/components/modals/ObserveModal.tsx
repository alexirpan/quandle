import classnames from 'classnames'
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
      <p className="text-sm text-gray-500">
        {status.absent > 0 && (
            <button
              style={{ width: '50px', height: '50px' }}
              className="text-lg font-bold rounded text-white bg-slate-400"
              onClick={makeLimitOnClick('absent')}
            >
            {status.absent}
            </button>
        )}
        {status.present > 0 && (
            <button
              style={{ width: '50px', height: '50px' }}
              className="text-lg font-bold rounded text-white bg-yellow-500"
              onClick={makeLimitOnClick('present')}
            >
            {status.present}
            </button>
        )}
        {status.correct > 0 && (
            <button
              style={{ width: '50px', height: '50px' }}
              className="text-lg font-bold rounded text-white bg-green-500"
              onClick={makeLimitOnClick('correct')}
            >
            {status.correct}
            </button>
        )}
      </p>
    </BaseModal>
  )
}
