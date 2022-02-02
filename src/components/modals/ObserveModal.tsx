import classnames from 'classnames'
import { useState } from 'react'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { Superposition } from '../../lib/statuses';

// Modal for observing different outcomes

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  status: Superposition;
  guess: string;
  index: number;
}

export const ObserveModal = ({ isOpen, handleClose, status, guess, index }: Props) => {
  const splitGuess = guess.split('');
  return (
    <BaseModal title="" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex justify-center mb-1 mt-4">
        {splitGuess.map((letter, i) => {
            return <Cell value={letter} status={i === index ? status : undefined} />
        })}
      </div>
      <p className="text-sm text-gray-500">
        <button
          style={{ width: '50px', height: '50px' }}
          className="text-lg font-bold rounded text-white bg-slate-400"
          onClick={undefined}
        >
        {status.absent}
        </button>
        <button
          style={{ width: '50px', height: '50px' }}
          className="text-lg font-bold rounded text-white bg-yellow-500"
          onClick={undefined}
        >
        {status.present}
        </button>
        <button
          style={{ width: '50px', height: '50px' }}
          className="text-lg font-bold rounded text-white bg-green-500"
          onClick={undefined}
        >
        {status.correct}
        </button>
      </p>
    </BaseModal>
  )
}
