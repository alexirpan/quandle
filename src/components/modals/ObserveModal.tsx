import classnames from 'classnames'
import { useState } from 'react'
import { Cell } from '../grid/Cell' import { BaseModal } from './BaseModal'
import { Superposition } from '../../lib/statuses';

// Modal for observing different outcomes

type Props = {
  isOpen: boolean
  handleClose: () => void
  status: Superposition
}

export const ObserveModal = ({ isOpen, handleClose, status }: Props) => {
  return (
    <BaseModal title="" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        <button
          style={{ width: '50px', height: '50px' }}
          className="bg-slate-400"
          onClick={undefined}
        >
        {status.absent}
        </button>
        <button
          style={{ width: '50px', height: '50px' }}
          className="bg-yellow-500"
          onClick={undefined}
        >
        {status.present}
        </button>
        <button
          style={{ width: '50px', height: '50px' }}
          className="bg-green-500"
          onClick={undefined}
        >
        {status.correct}
        </button>
      </p>
    </BaseModal>
  )
}
